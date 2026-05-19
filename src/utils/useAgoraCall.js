import { useState, useEffect, useRef, useCallback } from "react";
import AgoraRTC from "agora-rtc-sdk-ng";

/**
 * useAgoraCall
 * Encapsulates all Agora RTC join / leave / track / toggle logic.
 *
 * @param {object} params
 * @param {string}   params.appId
 * @param {string}   params.channel
 * @param {string}   [params.token]        - pass "" or null for testing without token
 * @param {Function} [params.onJoined]     - fired after local user joins + publishes
 * @param {Function} [params.onRemoteJoin] - fired when a remote user's video appears
 * @param {Function} [params.onRemoteLeft] - fired when a remote user leaves
 */
const useAgoraCall = ({
    appId,
    channel,
    token = null,
    onJoined,
    onRemoteJoin,
    onRemoteLeft,
}) => {
    const clientRef = useRef(null);
    const tracksRef = useRef({ audio: null, video: null }); // keeps latest tracks for cleanup
    const mountedRef = useRef(true);
    const joiningRef = useRef(false);  // FIX: prevents concurrent/double join calls

    const [localTracks, setLocalTracks] = useState({ audio: null, video: null });
    const [remoteUsers, setRemoteUsers] = useState([]);
    const [joined, setJoined] = useState(false);
    const [isAudioEnabled, setIsAudioEnabled] = useState(true);  // FIX: audio starts ON
    const [isVideoEnabled, setIsVideoEnabled] = useState(true);
    const [error, setError] = useState(null);

    // Keep callback refs stable so Agora handlers never capture stale functions
    const onJoinedRef = useRef(onJoined);
    const onRemoteJoinRef = useRef(onRemoteJoin);
    const onRemoteLeftRef = useRef(onRemoteLeft);
    useEffect(() => { onJoinedRef.current = onJoined; }, [onJoined]);
    useEffect(() => { onRemoteJoinRef.current = onRemoteJoin; }, [onRemoteJoin]);
    useEffect(() => { onRemoteLeftRef.current = onRemoteLeft; }, [onRemoteLeft]);

    // ─── Init client once ────────────────────────────────────────────────────────
    useEffect(() => {
        mountedRef.current = true;
        const client = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });
        clientRef.current = client;

        const handlePublished = async (remoteUser, mediaType) => {
            await client.subscribe(remoteUser, mediaType);

            if (mediaType === "video") {
                if (!mountedRef.current) return;
                setRemoteUsers((prev) =>
                    prev.find((u) => u.uid === remoteUser.uid) ? prev : [...prev, remoteUser]
                );
                // Increased delay to 500ms to allow DOM element mount
                setTimeout(() => remoteUser.videoTrack?.play("remote-video"), 500);
                onRemoteJoinRef.current?.(remoteUser);
            }
            if (mediaType === "audio") {
                // Ensure remote audio plays reliably
                setTimeout(() => remoteUser.audioTrack?.play(), 100);
            }
        };

        const handleUnpublished = (remoteUser, mediaType) => {
            if (mediaType === "video") {
                setRemoteUsers((prev) => prev.filter((u) => u.uid !== remoteUser.uid));
            }
        };

        const handleLeft = (remoteUser) => {
            setRemoteUsers((prev) => prev.filter((u) => u.uid !== remoteUser.uid));
            onRemoteLeftRef.current?.(remoteUser);
        };

        client.on("user-published", handlePublished);
        client.on("user-unpublished", handleUnpublished);
        client.on("user-left", handleLeft);

        return () => {
            mountedRef.current = false;
            client.removeAllListeners();
        };
    }, []);

    // ─── Join ─────────────────────────────────────────────────────────────────────
    const join = useCallback(async () => {
        // FIX 1: prevent concurrent joins (React StrictMode fires effects twice)
        if (joiningRef.current) return false;
        if (!clientRef.current || !channel || !appId) return false;

        // FIX 2: if the client is already connected/connecting, bail out silently
        const state = clientRef.current.connectionState;
        if (state === "CONNECTED" || state === "CONNECTING") return false;

        // FIX 3: if left in a bad state from the StrictMode cleanup, recreate the client
        if (state === "DISCONNECTING") {
            await new Promise((r) => setTimeout(r, 300)); // wait for leave to finish
        }

        joiningRef.current = true;

        // Per-call mounted guard — captures whether THIS invocation should proceed
        let callCancelled = false;
        const cancelToken = () => { callCancelled = true; };
        mountedRef._cancelJoin = cancelToken; // expose for cleanup below

        try {
            await clientRef.current.join(appId, channel, token || null, null);

            if (callCancelled || !mountedRef.current) return false;

            const audioTrack = await AgoraRTC.createMicrophoneAudioTrack();
            const videoTrack = await AgoraRTC.createCameraVideoTrack();

            if (callCancelled || !mountedRef.current) {
                audioTrack.close();
                videoTrack.close();
                return false;
            }

            await clientRef.current.publish([audioTrack, videoTrack]);

            tracksRef.current = { audio: audioTrack, video: videoTrack };
            setLocalTracks({ audio: audioTrack, video: videoTrack });
            setJoined(true);

            // Give the local-video DOM element time to mount
            setTimeout(() => videoTrack.play("local-video"), 300);

            onJoinedRef.current?.();
            return true;
        } catch (e) {
            // FIX 4: OPERATION_ABORTED is a React StrictMode dev artifact — not a real error
            if (e?.code === "OPERATION_ABORTED" || e?.message?.includes("cancel token")) {
                console.warn("[useAgoraCall] join aborted (StrictMode cleanup) — will retry on remount");
                return false;
            }
            console.error("[useAgoraCall] join error:", e);
            setError(e.message ?? "Failed to join channel");
            return false;
        } finally {
            joiningRef.current = false;
        }
    }, [appId, channel, token]);

    // ─── Leave ────────────────────────────────────────────────────────────────────
    const leave = useCallback(async () => {
        // Cancel any in-flight join before leaving
        mountedRef._cancelJoin?.();
        joiningRef.current = false;
        try {
            const { audio, video } = tracksRef.current;
            audio?.close();
            video?.close();
            tracksRef.current = { audio: null, video: null };

            await clientRef.current?.leave();
        } catch (e) {
            console.error("[useAgoraCall] leave error:", e);
        } finally {
            if (mountedRef.current) {
                setLocalTracks({ audio: null, video: null });
                setRemoteUsers([]);
                setJoined(false);
            }
        }
    }, []);

    // ─── Toggle audio ─────────────────────────────────────────────────────────────
    const toggleAudio = useCallback(async () => {
        const { audio } = tracksRef.current;
        if (!audio) return;
        const next = !isAudioEnabled;
        await audio.setEnabled(next);
        setIsAudioEnabled(next);
    }, [isAudioEnabled]);

    // ─── Toggle video ─────────────────────────────────────────────────────────────
    const toggleVideo = useCallback(async () => {
        const { video } = tracksRef.current;
        if (!video) return;
        const next = !isVideoEnabled;
        await video.setEnabled(next);
        setIsVideoEnabled(next);
        if (next) video.play("local-video");
        else video.stop();
    }, [isVideoEnabled]);

    // ─── Unmount cleanup ─────────────────────────────────────────────────────────
    useEffect(() => {
        return () => {
            mountedRef.current = false;
            mountedRef._cancelJoin?.();   // abort any in-flight join
            joiningRef.current = false;
            const { audio, video } = tracksRef.current;
            audio?.close();
            video?.close();
            clientRef.current?.leave().catch(() => { });
        };
    }, []);

    return {
        join,
        leave,
        toggleAudio,
        toggleVideo,
        remoteUsers,
        joined,
        isAudioEnabled,
        isVideoEnabled,
        error,
    };
};

export default useAgoraCall;
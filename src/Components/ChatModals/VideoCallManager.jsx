/**
 * VideoCallManager
 *
 * Drop once in your app layout (e.g. App.jsx).
 * Reads Redux state → renders <CallNotification /> or <VideoCallModal />.
 */

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import VideoCallModal from "./VideoCallModal";
import CallNotification from "./CallNotification";
import { handleVideoCallModal } from "../../network/reducers/AuthReducer";

const APP_ID = import.meta.env.VITE_APP_AGORA_APP_ID;
const PUSHER_KEY = import.meta.env.VITE_APP_PUSHER_APP_KEY;
const PUSHER_CLUSTER = import.meta.env.VITE_APP_PUSHER_APP_CLUSTER;

const VideoCallManager = () => {
    const dispatch = useDispatch();
    const { user, videoCallData } = useSelector((state) => state.auth);
    const [accepted, setAccepted] = useState(false);

    const isOpen = Boolean(videoCallData?.status);
    const callType = videoCallData?.data?.type;
    const callData = videoCallData?.data ?? {};
    const remoteUser =
        callType === "isCalling" ? callData.calling_user : callData.caller_user;
    const transactionId = callData.transaction_id ?? 0;
    const channelName = `channel_${remoteUser?.id}`;

    const closeModal = () => {
        setAccepted(false);
        dispatch(handleVideoCallModal({ status: false, data: {} }));
    };

    if (!isOpen) return null;

    const sharedCallProps = {
        appId: APP_ID,
        channel: channelName,
        token: "",
        transactionId,
        currentUser: user,
        remoteUser,
        pusherKey: PUSHER_KEY,
        pusherCluster: PUSHER_CLUSTER,
    };

    // ── Incoming: show notification banner until accepted ─────────────────
    if (callType === "IsReceiving" && !accepted) {
        return (
            <CallNotification
                callerUser={remoteUser}
                transactionId={transactionId}
                channelName={channelName}
                currentUserId={user?.id}
                pusherKey={PUSHER_KEY}
                pusherCluster={PUSHER_CLUSTER}
                onAccept={() => setAccepted(true)}
                onReject={closeModal}
            />
        );
    }

    // ── Outgoing call OR accepted incoming → open modal ───────────────────
    return (
        <VideoCallModal
            isOpen={isOpen}
            onClose={closeModal}
            callProps={{
                ...sharedCallProps,
                callType: callType === "isCalling" ? "isCalling" : "IsReceiving",
            }}
        />
    );
};

export default VideoCallManager;
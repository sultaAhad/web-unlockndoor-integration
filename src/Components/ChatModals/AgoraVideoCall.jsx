/**
 * AgoraVideoCall — reusable, fully self-contained video-call component.
 *
 * Props (all required unless marked optional):
 * ─────────────────────────────────────────────
 * appId          {string}   - Agora App ID
 * channel        {string}   - channel name for this call
 * token          {string}   - Agora token, pass "" for testing without token auth
 * callType       {string}   - "isCalling" | "IsReceiving"
 * transactionId  {number}   - billing transaction ID
 * currentUser    {object}   - { id, name, gender, profile_image_url }
 * remoteUser     {object}   - { id, name, gender, profile_image_url }
 * onCallEnd      {Function} - called when the call ends for any reason
 *
 * Usage example (inside a Redux-connected parent):
 *   <AgoraVideoCall
 *     appId={import.meta.env.VITE_APP_AGORA_APP_ID}
 *     channel={`channel_${remoteUser.id}`}
 *     token=""
 *     callType={videoCallData.data.type}
 *     transactionId={videoCallData.data.transaction_id}
 *     currentUser={user}
 *     remoteUser={videoCallData.data.calling_user}
 *     onCallEnd={() => dispatch(handleVideoCallModal({ status: false, data: {} }))}
 *   />
 */

import React, { useState, useEffect, useRef, useCallback } from "react";
import { Button } from "react-bootstrap";
import { formatDateTime, formatTime } from "../../Constant/HelperFunction";
import { useCallActionMutation } from "../../network/services/Chat";
import "../../assets/Css/AgoraVideoCall.css";
import useAgoraCall from "../../utils/useAgoraCall";
import {
	cleanupPusherClient,
	createPusherClient,
	getRejectCallChannelName,
} from "../../utils/pusher";

// ─── Gender helper ────────────────────────────────────────────────────────────
const resolveGender = (user) =>
	user?.gender?.toLowerCase() === "men" ? "Men" : "Women";

// ─── Build user payload for API ───────────────────────────────────────────────
const buildUserPayload = (user) => ({
	id: user?.id,
	name: user?.name,
	profile_image_url: user?.profile_image_url,
	type: resolveGender(user),
});

const AgoraVideoCall = ({
	appId,
	channel,
	token = "",
	callType,           // "isCalling" | "IsReceiving"
	transactionId = 0,
	currentUser,
	remoteUser,
	onCallEnd,
}) => {
	const [callAction] = useCallActionMutation();

	const currentGender = resolveGender(currentUser);
	const remoteGender = resolveGender(remoteUser);

	// ─── Persisted call-start data (kept in a ref so Pusher callbacks always
	//     see the latest value without re-subscribing) ──────────────────────────
	const callStartRef = useRef({
		start_date: null,
		start_time: null,
		transaction_id: transactionId,
	});
	// Mirror into state only for the timer visibility check
	const [callStarted, setCallStarted] = useState(false);

	const [elapsedSeconds, setElapsedSeconds] = useState(0);
	const timerRef = useRef(null);

	// ─── Agora hook ───────────────────────────────────────────────────────────
	const {
		join,
		leave,
		toggleAudio,
		toggleVideo,
		remoteUsers,
		joined,
		isAudioEnabled,
		isVideoEnabled,
		error: agoraError,
	} = useAgoraCall({
		appId,
		channel,
		token,
		onJoined: handleLocalJoined,
		onRemoteLeft: handleRemoteLeft,
	});

	// ─── Start Agora on mount ────────────────────────────────────────────────
	useEffect(() => {
		if (!channel) return;
		let cancelled = false;

		// Small delay avoids the StrictMode first-mount/unmount race
		const t = setTimeout(() => {
			if (!cancelled) join();
		}, 50);

		return () => {
			cancelled = true;
			clearTimeout(t);
		};
	}, [channel]); // eslint-disable-line react-hooks/exhaustive-deps

	// ─── Called by the hook when local user joins & publishes ─────────────────
	function handleLocalJoined() {
		if (callType === "isCalling") {
			startCallAction();
		}
	}

	// ─── Called by the hook when remote user disconnects ──────────────────────
	function handleRemoteLeft() {
		// Gracefully end the call if the remote peer drops
		endCall("Remote peer left");
	}

	// ─── Timer: start when callStartRef.start_time is set ────────────────────
	const startTimer = useCallback(() => {
		if (timerRef.current) return;            // already running
		setElapsedSeconds(0);
		timerRef.current = setInterval(
			() => setElapsedSeconds((s) => s + 1),
			1000
		);
	}, []);

	const stopTimer = useCallback(() => {
		if (timerRef.current) {
			clearInterval(timerRef.current);
			timerRef.current = null;
		}
		setElapsedSeconds(0);
	}, []);

	// Cleanup timer on unmount
	useEffect(() => () => stopTimer(), [stopTimer]);

	// ─── Resolve men_id / women_id ────────────────────────────────────────────
	const resolvePartyIds = () => {
		if (currentGender === "Men") {
			return { men_id: currentUser?.id, women_id: remoteUser?.id };
		}
		return { men_id: remoteUser?.id, women_id: currentUser?.id };
	};

	// ─── API: start-call ──────────────────────────────────────────────────────
	const startCallAction = async () => {
		const { date: start_date, time: start_time } = formatDateTime();

		// FIX: persist start data in a ref so the end-call path always gets it
		callStartRef.current = { start_date, start_time, transaction_id: transactionId };
		setCallStarted(true);
		startTimer();

		const { men_id, women_id } = resolvePartyIds();
		const payload = buildCallPayload({
			action: "start-call",
			channel_name: channel,
			start_date,
			start_time,
			end_date: null,
			end_time: null,
			transaction_id: transactionId,
			remark: "Video call started",
			men_id,
			women_id,
		});

		await callAction(payload).catch(console.error);
	};

	// ─── API: end-call ────────────────────────────────────────────────────────
	const endCallAction = async (remark = "Video call ended") => {
		// FIX: capture BOTH timestamps in a single call
		const { date: end_date, time: end_time } = formatDateTime();
		const { start_date, start_time, transaction_id } = callStartRef.current;
		const { men_id, women_id } = resolvePartyIds();

		const payload = buildCallPayload({
			action: "end-call",
			channel_name: `reject_call_${remoteUser?.id}`,
			start_date,
			start_time,
			end_date,
			end_time,
			transaction_id,
			remark,
			men_id,
			women_id,
		});

		await callAction(payload).catch(console.error);
		stopTimer();
	};

	// ─── Shared payload builder ───────────────────────────────────────────────
	const buildCallPayload = ({
		action, channel_name, start_date, start_time,
		end_date, end_time, transaction_id, remark, men_id, women_id,
	}) => {
		const inner = {
			start_date,
			start_time,
			end_date,
			end_time,
			charges_transaction_id: transaction_id,
			remark,
			caller_type: currentGender,
			men_id,
			women_id,
			calling_user: buildUserPayload(remoteUser),
			caller_user: buildUserPayload(currentUser),
		};
		return {
			channel_name,
			action,
			...inner,
			data: inner,
		};
	};

	// ─── Full leave + cleanup ─────────────────────────────────────────────────
	// leaveRef keeps a stable reference so the Pusher callback never gets stale
	const endCallRef = useRef(null);

	const endCall = useCallback(
		async (remark = "User ended call") => {
			await leave();                  // stops Agora tracks + leaves channel
			await endCallAction(remark);    // fires API
			onCallEnd?.();                  // tells parent to close the modal / clear Redux
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[leave, onCallEnd]
	);

	// Keep the ref in sync
	useEffect(() => {
		endCallRef.current = endCall;
	}, [endCall]);

	// ─── Pusher subscription ──────────────────────────────────────────────────
	useEffect(() => {
		if (!currentUser?.id) return;

		const pusher = createPusherClient({ encrypted: false });
		const psChannel = pusher.subscribe(getRejectCallChannelName(currentUser.id));

		psChannel.bind("call.action", (data) => {
			const action = data?.data?.action;
			if (action === "reject-call") {
				endCallRef.current?.("Call rejected by other user");
			}
			if (action === "end-call") {
				endCallRef.current?.("Call ended by other user");
			}
		});

		return () => {
			if (psChannel) {
				psChannel.unbind_all();
				pusher.unsubscribe(getRejectCallChannelName(currentUser.id));
			}
			pusher.disconnect();
		};
	}, [currentUser?.id]);

	// ─── Replay remote video when user list updates ───────────────────────────
	useEffect(() => {
		const remote = remoteUsers.find((u) => u.uid !== undefined);
		if (remote?.videoTrack) {
			remote.videoTrack.play("remote-video");
		}
	}, [remoteUsers]);

	// ─── Render ───────────────────────────────────────────────────────────────
	return (
		<div className="chat_img_wrapper">
			<figure className="position-relative">
				<div className="video-call-layout">

					{/* Remote (large) */}
					<div className="remote-video-large">
						<div id="remote-video" className="video-player" />

						{callStarted && (
							<div className="timer">{formatTime(elapsedSeconds)}</div>
						)}

						{remoteUsers.length === 0 && (
							<div className="calling-overlay">
								{callType === "isCalling" && (
									<h2 className="text-white">Calling…</h2>
								)}
								{callType === "IsReceiving" && (
									<h2 className="text-white">Connecting…</h2>
								)}
							</div>
						)}

						{agoraError && (
							<div className="calling-overlay">
								<p className="text-danger small">{agoraError}</p>
							</div>
						)}
					</div>

					{/* Local (small PiP) */}
					<div className="local-video-small">
						<div id="local-video" className="video-player" />
					</div>
				</div>

				{/* Controls */}
				<div className="row">
					<div className="col-md-12 d-flex justify-content-center pt-3">

						{/* Video toggle */}
						<div className="chat_wrap mx-2 text-center">
							<Button
								type="button"
								onClick={toggleVideo}
								className="bg-transparent border-0 p-0"
								aria-label={isVideoEnabled ? "Turn off camera" : "Turn on camera"}
							>
								<span className="chat_span">
									<i
										className={`fa-solid ${isVideoEnabled ? "fa-video" : "fa-video-slash text-secondary"
											} fs-4`}
									/>
								</span>
								<p className="mt-2">{isVideoEnabled ? "Off Video" : "On Video"}</p>
							</Button>
						</div>

						{/* Audio toggle */}
						<div className="chat_wrap mx-2 text-center">
							<Button
								type="button"
								onClick={toggleAudio}
								className="bg-transparent border-0 p-0"
								aria-label={isAudioEnabled ? "Mute" : "Unmute"}
							>
								<span className="chat_span">
									<i
										className={`fa-solid ${isAudioEnabled
												? "fa-microphone"
												: "fa-microphone-slash text-secondary"
											} fs-4`}
									/>
								</span>
								<p className="mt-2">{isAudioEnabled ? "Mute" : "Unmute"}</p>
							</Button>
						</div>

						{/* End call */}
						<div className="chat_wrap mx-2 text-center">
							<Button
								type="button"
								onClick={() => endCall("User ended call")}
								className="bg-transparent border-0 p-0"
								aria-label="End call"
							>
								<span className="chat_span chat_end">
									<svg width="46" height="46" fill="white" viewBox="0 0 46 46">
										<path d="M7.3 22c2-2 4.4-3.5 7.2-4.6 2.8-1 5.8-1.6 8.9-1.6 3.1 0 6.1.5 8.9 1.6 2.8 1 5.2 2.6 7.1 4.6l1 1-5.5 5.5-5.6-3.9v-5.4c-1-.3-2-.5-3-.7-1-.1-2-.2-3-.2-1 0-2 .1-3 .2-1 .2-2 .4-3 .7v5.5l-5.7 3.8L6.3 23l1-1z" />
									</svg>
								</span>
								<p className="mt-2">End Call</p>
							</Button>
						</div>

					</div>
				</div>
			</figure>
		</div>
	);
};

export default AgoraVideoCall;

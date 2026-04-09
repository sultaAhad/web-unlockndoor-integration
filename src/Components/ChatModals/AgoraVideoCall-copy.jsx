// ******************************************
//          FIXED — AGORA VIDEO CALL
// ******************************************

import React, { useState, useEffect, useRef } from "react";
import AgoraRTC from "agora-rtc-sdk-ng";
import "../../assets/Css/AgoraVideoCall.css";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "react-bootstrap";
import { handleVideoCallModal } from "../../network/reducers/AuthReducer";
import { useCallActionMutation } from "../../network/services/Chat";
import Pusher from "pusher-js";
import { toast } from "react-toastify";
import { formatDateTime, formatTime } from "../../Constant/HelperFunction";

const AgoraVideoCall = ({ onCallEnd }) => {
	const [callAction] = useCallActionMutation();
	const { user, videoCallData } = useSelector((state) => state.auth);

	// ---- FIXED GENDER ----
	const userGender = user?.gender?.toLowerCase() === "men" ? "Men" : "Women";

	const [callingUser, setCallingUser] = useState(
		videoCallData?.data?.calling_user ?? null,
	);
	const memberGender =
		callingUser?.gender?.toLowerCase() === "men" ? "Men" : "Women";

	// ---- CALL START DATA FIX ----
	const [callStartData, setCallStartData] = useState({
		start_date: null,
		start_time: null,
		transaction_id: null, // ADD TRANSACTION ID TO CALL START DATA
	});

	// Agora states
	const [appId] = useState(import.meta.env.VITE_APP_AGORA_APP_ID);
	const [channel, setChannel] = useState(null);
	const [token] = useState("");
	const [uid] = useState(() => crypto.randomUUID());
	const [joined, setJoined] = useState(false);
	const [users, setUsers] = useState([]);
	const [localTracks, setLocalTracks] = useState([]);
	const [isAudioEnabled, setIsAudioEnabled] = useState(false);
	const [isVideoEnabled, setIsVideoEnabled] = useState(true);

	const [elapsedSeconds, setElapsedSeconds] = useState(0);
	const timerRef = useRef(null);

	const dispatch = useDispatch();
	const client = useRef();

	// ---------------------------
	// SET CHANNEL
	// ---------------------------
	useEffect(() => {
		if (videoCallData?.status) {
			setChannel(`channel_${callingUser?.id}`);
		}
	}, [videoCallData]);

	// ---------------------------
	// INIT AGORA CLIENT
	// ---------------------------
	useEffect(() => {
		client.current = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });

		client.current.on("user-published", async (remoteUser, mediaType) => {
			await client.current.subscribe(remoteUser, mediaType);

			if (mediaType === "video") {
				setUsers((prev) => {
					if (!prev.find((u) => u.uid === remoteUser.uid)) {
						return [...prev, remoteUser];
					}
					return prev;
				});
				remoteUser.videoTrack.play("remote-video");
			}
			if (mediaType === "audio") {
				remoteUser.audioTrack.play();
			}
		});

		client.current.on("user-unpublished", (remoteUser, mediaType) => {
			if (mediaType === "video") {
				setUsers((prev) => prev.filter((u) => u.uid !== remoteUser.uid));
			}
		});

		client.current.on("user-left", (remoteUser) => {
			setUsers((prev) => prev.filter((u) => u.uid !== remoteUser.uid));
		});

		return () => client.current.removeAllListeners();
	}, []);

	// ---------------------------
	// START CALL WHEN CHANNEL READY
	// ---------------------------
	useEffect(() => {
		if (channel) startVideoCall();
	}, [channel]);

	// ---------------------------
	// API CALL — START CALL
	// ---------------------------
	const startCallAction = async () => {
		const { date: start_date, time: start_time } = formatDateTime();

		// FIX — SAVE FOR END CALL (INCLUDING TRANSACTION ID)
		setCallStartData({
			start_date,
			start_time,
			transaction_id: videoCallData?.data?.transaction_id || 0,
		});

		let men_id = null;
		let women_id = null;

		if (userGender === "Men") {
			men_id = user?.id;
			women_id = callingUser?.id;
		} else {
			women_id = user?.id;
			men_id = callingUser?.id;
		}
		const formData = {
			channel_name: channel,
			action: "start-call",
			// FIX — start time always correct
			start_date,
			start_time,
			end_date: null,
			end_time: null,
			charges_transaction_id: videoCallData?.data?.transaction_id || 0,
			remark: "Video call started",
			caller_type: userGender,
			calling_user: {
				id: callingUser?.id,
				name: callingUser?.name,
				profile_image_url: callingUser?.profile_image_url,
				type: memberGender,
			},
			caller_user: {
				id: user?.id,
				name: user?.name,
				profile_image_url: user?.profile_image_url,
				type: userGender,
			},
			data: {
				// FIX — start time always correct
				start_date,
				start_time,
				end_date: null,
				end_time: null,
				charges_transaction_id: videoCallData?.data?.transaction_id || 0,
				remark: "Video call started",
				caller_type: userGender,
				calling_user: {
					id: callingUser?.id,
					name: callingUser?.name,
					profile_image_url: callingUser?.profile_image_url,
					type: memberGender,
				},
				caller_user: {
					id: user?.id,
					name: user?.name,
					profile_image_url: user?.profile_image_url,
					type: userGender,
				},
			},
		};

		await callAction(formData);
	};

	// ---------------------------
	// API CALL — END CALL FIXED
	// ---------------------------
	const endCallAction = async (reason = "Video call ended") => {
		const { date: end_date, time: end_time } = formatDateTime();

		let men_id = null;
		let women_id = null;

		if (userGender === "Men") {
			men_id = user?.id;
			women_id = callingUser?.id;
		} else {
			women_id = user?.id;
			men_id = callingUser?.id;
		}

		// FIX: Use the transaction_id from callStartData
		const transaction_id =
			callStartData.transaction_id || videoCallData?.data?.transaction_id || 0;

		const formData = {
			channel_name: `reject_call_${callingUser?.id}`,
			action: "end-call",
			start_date: callStartData.start_date,
			start_time: callStartData.start_time,
			end_date,
			end_time,
			charges_transaction_id: transaction_id, // proper transaction ID
			remark: reason,
			caller_type: userGender,
			men_id,
			women_id,
			calling_user: {
				id: callingUser?.id,
				name: callingUser?.name,
				profile_image_url: callingUser?.profile_image_url,
				type: memberGender,
			},
			caller_user: {
				id: user?.id,
				name: user?.name,
				profile_image_url: user?.profile_image_url,
				type: userGender,
			},
			data: {
				// FIX — start time always correct
				start_date: callStartData.start_date,
				start_time: callStartData.start_time,
				end_date,
				end_time,
				charges_transaction_id: transaction_id, // proper transaction ID
				remark: reason,
				caller_type: userGender,
				men_id,
				women_id,
				calling_user: {
					id: callingUser?.id,
					name: callingUser?.name,
					profile_image_url: callingUser?.profile_image_url,
					type: memberGender,
				},
				caller_user: {
					id: user?.id,
					name: user?.name,
					profile_image_url: user?.profile_image_url,
					type: userGender,
				},
			},
		};

		await callAction(formData);

		// RESET TIMER
		clearInterval(timerRef.current);
		timerRef.current = null;
		setElapsedSeconds(0);
		setCallStartData({
			start_date: null,
			start_time: null,
			transaction_id: null,
		});
	};

	// ---------------------------
	// START AGORA CALL
	// ---------------------------
	const startVideoCall = async () => {
		try {
			await client.current.join(appId, channel, token || null, uid || null);

			const audioTrack = await AgoraRTC.createMicrophoneAudioTrack();
			const videoTrack = await AgoraRTC.createCameraVideoTrack();

			await client.current.publish([audioTrack, videoTrack]);

			setLocalTracks([audioTrack, videoTrack]);
			setJoined(true);

			// FIX — CALL START TIME
			if (videoCallData?.data?.type === "isCalling") {
				startCallAction();
			}

			setTimeout(() => {
				videoTrack.play("local-video");
			}, 500);
		} catch (e) {
			console.error("Join error:", e);
		}
	};

	// ---------------------------
	// LEAVE CALL FIXED
	// ---------------------------
	const leaveChannel = async (reason = "User ended call", action = null) => {
		try {
			if (localTracks) localTracks.forEach((track) => track.close());

			await client.current.leave();

			setUsers([]);
			setLocalTracks([]);
			setJoined(false);

			let id =
				videoCallData?.data?.caller_user?.id ??
				videoCallData?.data?.calling_user?.id;

			if (action === "reject-call") {
				// FIX: Pass transaction_id for reject-call as well
				const transaction_id =
					callStartData.transaction_id ||
					videoCallData?.data?.transaction_id ||
					0;
				await callAction({
					channel_name: `reject_call_${id}`,
					action: "end-call",
					charges_transaction_id: transaction_id, // ADD TRANSACTION ID
					start_date: callStartData.start_date,
					start_time: callStartData.start_time,
					end_date: formatDateTime().date,
					end_time: formatDateTime().time,
					remark: reason,
					caller_type: userGender,
					men_id: userGender === "Men" ? user?.id : id,
					women_id: userGender === "Women" ? user?.id : id,
					data: {
						charges_transaction_id: transaction_id, // ADD TRANSACTION ID
						start_date: callStartData.start_date,
						start_time: callStartData.start_time,
						end_date: formatDateTime().date,
						end_time: formatDateTime().time,
						remark: reason,
						caller_type: userGender,
						men_id: userGender === "Men" ? user?.id : id,
						women_id: userGender === "Women" ? user?.id : id,
					},
				});
			} else {
				await endCallAction(reason);
			}

			onCallEnd(false);
			dispatch(handleVideoCallModal({ status: false, data: {} }));
		} catch (e) {
			console.error("Leave error:", e);
		}
	};

	// ---------------------------
	// TIMER FIX
	// ---------------------------
	useEffect(() => {
		if (callStartData.start_time && !timerRef.current) {
			setElapsedSeconds(0);
			timerRef.current = setInterval(() => {
				setElapsedSeconds((sec) => sec + 1);
			}, 1000);
		}
	}, [callStartData]);

	// ---------------------------
	// TOGGLE AUDIO/VIDEO
	// ---------------------------
	const toggleAudio = async () => {
		if (localTracks[0]) {
			await localTracks[0].setEnabled(!isAudioEnabled);
			setIsAudioEnabled(!isAudioEnabled);
		}
	};

	const toggleVideo = async () => {
		if (localTracks[1]) {
			await localTracks[1].setEnabled(!isVideoEnabled);
			setIsVideoEnabled(!isVideoEnabled);

			if (!isVideoEnabled) localTracks[1].play("local-video");
			else localTracks[1].stop();
		}
	};

	// ---------------------------
	// PUSHER FIXED
	// ---------------------------
	useEffect(() => {
		const pusher = new Pusher(import.meta.env.VITE_APP_PUSHER_APP_KEY, {
			cluster: import.meta.env.VITE_APP_PUSHER_APP_CLUSTER,
			encrypted: false,
		});

		const videoChannel = pusher.subscribe(`reject_call_${user.id}`);

		videoChannel.bind("call.action", (data) => {
			if (data?.data?.action === "reject-call") {
				leaveChannel("Call rejected", "reject-call");
			}

			if (data?.data?.action === "end-call") {
				leaveChannel("Call ended remotely", "end-call");
			}
		});

		return () => {
			videoChannel.unbind_all();
			videoChannel.unsubscribe();
			pusher.disconnect();
		};
	}, []);

	useEffect(() => {
		if (users.length > 0) {
			const remoteUser = users.find((u) => u.uid !== client.current.uid);
			if (remoteUser?.videoTrack) {
				remoteUser.videoTrack.play("remote-video");
			}
		}
	}, [users]);

	return (
		<div className="chat_img_wrapper">
			<figure className="position-relative">
				<div className="video-call-layout">
					<div className="remote-video-large">
						<div id="remote-video" className="video-player"></div>

						{/* Show Timer */}
						{callStartData.start_time && (
							<div className="timer">{formatTime(elapsedSeconds)}</div>
						)}

						{/* Calling overlay */}
						{users.length === 0 && (
							<div className="calling-overlay">
								{videoCallData?.data?.type === "isCalling" && (
									<h2 className="text-white">Calling...</h2>
								)}
								{videoCallData?.data?.type === "IsReceiving" && (
									<h2 className="text-white">Connecting...</h2>
								)}
							</div>
						)}
					</div>

					<div className="local-video-small">
						<div id="local-video" className="video-player"></div>
					</div>
				</div>

				{/* Controls */}
				<div className="row">
					<div className="col-md-12 d-flex justify-content-center pt-3">
						<div className="chat_wrap mx-2 text-center">
							<Button
								type="button"
								onClick={toggleVideo}
								className="bg-transparent border-0 p-0"
							>
								<span className="chat_span">
									<i
										className={`fa-solid ${
											isVideoEnabled
												? "fa-video"
												: "fa-video-slash text-secondary"
										} fs-4`}
									></i>
								</span>
								<p className="mt-2">
									{isVideoEnabled ? "Off Video" : "On Video"}
								</p>
							</Button>
						</div>

						<div className="chat_wrap mx-2 text-center">
							<Button
								type="button"
								onClick={toggleAudio}
								className="bg-transparent border-0 p-0"
							>
								<span className="chat_span">
									<i
										className={`fa-solid ${
											isAudioEnabled
												? "fa-microphone"
												: "fa-microphone-slash text-secondary"
										} fs-4`}
									></i>
								</span>
								<p className="mt-2">{isAudioEnabled ? "Mute" : "Unmute"}</p>
							</Button>
						</div>

						<div className="chat_wrap mx-2 text-center">
							<Button
								type="button"
								onClick={() => leaveChannel("User ended call", "reject-call")}
								className="bg-transparent border-0 p-0"
							>
								<span className="chat_span chat_end">
									<svg width="46" height="46" fill="white">
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

import React, { useState, useEffect, useRef } from "react";
import AgoraRTC from "agora-rtc-sdk-ng";
import "../../assets/Css/AgoraVideoCall.css";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "react-bootstrap";
import { handleVideoCallModal } from "../../network/reducers/AuthReducer";
import { useCallActionMutation } from "../../network/services/Chat";
import Pusher from "pusher-js";
import { toast } from "react-toastify";

const AgoraVideoCall = ({ onCallEnd }) => {
	const [callAction] = useCallActionMutation();
	const { user, videoCallData } = useSelector((state) => state.auth);
	const [appId] = useState(import.meta.env.VITE_APP_AGORA_APP_ID);
	const [channel, setChannel] = useState(null);
	const [token] = useState("");
	const [uid] = useState(() => crypto.randomUUID());
	const [joined, setJoined] = useState(false);
	const [users, setUsers] = useState([]);
	const [localTracks, setLocalTracks] = useState([]);
	const [isAudioEnabled, setIsAudioEnabled] = useState(true);
	const [isVideoEnabled, setIsVideoEnabled] = useState(true);
	const gender = localStorage.getItem("gender");

	// Call timing
	const [callStart, setCallStart] = useState(null);
	const [elapsedSeconds, setElapsedSeconds] = useState(0);
	const timerRef = useRef(null);

	const dispatch = useDispatch();
	const client = useRef();

	useEffect(() => {
		setChannel(videoCallData?.data?.channel);
	}, [videoCallData]);

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

		return () => {
			if (client.current) client.current.removeAllListeners();
		};
	}, []);

	useEffect(() => {
		if (channel) startVideoCall();
	}, [channel]);

	// Timer formatter
	const formatTime = (seconds) => {
		const h = Math.floor(seconds / 3600);
		const m = Math.floor((seconds % 3600) / 60);
		const s = seconds % 60;
		return h > 0
			? `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}:${s
					.toString()
					.padStart(2, "0")}`
			: `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
	};

	const formatDateTime = (dateObj) => {
		const date = dateObj.toISOString().split("T")[0];
		const time = dateObj.toTimeString().split(" ")[0];
		return { date, time };
	};

	// ---------- START CALL ----------
	const startCallAction = async () => {
		const startTime = new Date();
		setCallStart(startTime);

		if (!timerRef.current) {
			timerRef.current = setInterval(
				() => setElapsedSeconds((prev) => prev + 1),
				1000,
			);
		}

		const { date: start_date, time: start_time } = formatDateTime(startTime);

		// ✅ Gender normalize
		const userGender = user?.gender?.toLowerCase();
		const memberGender = videoCallData?.data?.member?.gender?.toLowerCase();

		const formData = {
			channel_name: `channel_${videoCallData?.data?.member?.id}`,
			action: "start-call",
			data: {
				channel,
				member: videoCallData?.data?.member,
				from_id: user?.id,
				from_user_name: user?.name,
				from_user_profile_image_url: user?.profile_image_url,
				from_type:
					userGender === "male" || userGender === "men" ? "Men" : "Women",
				to_id: videoCallData?.data?.member?.id,
				to_type:
					memberGender === "male" || memberGender === "men" ? "Men" : "Women",
				start_date,
				start_time,
				remark: "Video call started",

				// ✅ caller_type bhi fix
				caller_type:
					userGender === "male" || userGender === "men" ? "Men" : "Women",
			},
		};

		try {
			await callAction(formData);
		} catch (error) {
			console.error(error);
		}
	};

	// ---------- END CALL ----------
	// ---------- END CALL ----------
	const endCallAction = async (reason = "Video call ended") => {
		const endTime = new Date();
		let duration_seconds = 0;
		let duration = null;

		if (callStart) {
			const diff = Math.floor((endTime - callStart) / 1000);
			duration_seconds = diff;
			duration = {
				hours: Math.floor(diff / 3600),
				minutes: Math.floor((diff % 3600) / 60),
				seconds: diff % 60,
			};
		}

		const { date: start_date, time: start_time } = callStart
			? formatDateTime(callStart)
			: { date: null, time: null };
		const { date: end_date, time: end_time } = formatDateTime(endTime);

		// ✅ Gender normalize
		const userGender = user?.gender?.toLowerCase();
		const memberGender = videoCallData?.data?.member?.gender?.toLowerCase();

		const from_type =
			userGender === "male" || userGender === "men" ? "Men" : "Women";

		const caller_type = from_type; // ✅ caller hamisha jisne call end kiya (local user)

		// ✅ men_id / women_id decide dynamically
		let men_id = null;
		let women_id = null;

		if (from_type === "Men") {
			men_id = user?.id;
			women_id = videoCallData?.data?.member?.id;
		} else {
			women_id = user?.id;
			men_id = videoCallData?.data?.member?.id;
		}

		// ✅ Transaction id uthao
		const charges_transaction_id =
			videoCallData?.data?.charges_transaction_id ||
			videoCallData?.data?.transaction_id ||
			videoCallData?.data?.member?.transaction_id || // ✅ add this
			videoCallData?.data?.member?.minutes?.transaction?.id ||
			null;

		// ✅ Final payload
		// ✅ Final payload
		const formData = {
			channel_name: `reject_call_${
				videoCallData?.data?.member?.id || user?.id
			}`,
			action: "end-call",
			data: {
				channel,
				start_date,
				start_time,
				end_date,
				end_time,
				duration,
				duration_seconds,
				remark: reason,
				men_id: men_id, // ✅ always send
				women_id: women_id, // ✅ always send
				caller_type,
				charges_transaction_id: charges_transaction_id
					? Number(charges_transaction_id)
					: null,
			},
		};

		try {
			console.log("📤 End Call Payload:", formData);
			await callAction(formData);
		} catch (error) {
			console.error(error);
		} finally {
			if (timerRef.current) {
				clearInterval(timerRef.current);
				timerRef.current = null;
			}
			setElapsedSeconds(0);
			setCallStart(null);
		}
	};

	// ---------- START VIDEO CALL ----------
	const startVideoCall = async () => {
		if (!appId || !channel) {
			alert("Missing App ID or Channel Name");
			return;
		}
		try {
			await client.current.join(appId, channel, token || null, uid || null);
			const audioTrack = await AgoraRTC.createMicrophoneAudioTrack();
			const videoTrack = await AgoraRTC.createCameraVideoTrack();
			await client.current.publish([audioTrack, videoTrack]);

			setLocalTracks([audioTrack, videoTrack]);
			setJoined(true);

			if (videoCallData?.data?.type === "isCalling") {
				startCallAction();
			}

			setTimeout(() => {
				videoTrack.play("local-video");
			}, 500);
		} catch (error) {
			console.error("Join error:", error);
			alert("Failed to join channel: " + error.message);
		}
	};

	// ---------- LEAVE ----------
	const leaveChannel = async (reason = "User ended call") => {
		try {
			if (localTracks) {
				localTracks.forEach((track) => track.close());
			}
			await client.current.leave();
			setUsers([]);
			setLocalTracks([]);
			setJoined(false);
			setIsAudioEnabled(true);
			setIsVideoEnabled(true);
			setChannel(null);

			await endCallAction(reason);
			onCallEnd(false);

			dispatch(handleVideoCallModal({ status: false, data: {} }));
		} catch (error) {
			console.error("Leave error:", error);
		}
	};

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
			if (!isVideoEnabled) {
				localTracks[1].play("local-video");
			} else {
				localTracks[1].stop();
			}
		}
	};

	// ---------- PUSHER ----------
	useEffect(() => {
		const pusher = new Pusher(import.meta.env.VITE_APP_PUSHER_APP_KEY, {
			cluster: import.meta.env.VITE_APP_PUSHER_APP_CLUSTER,
			encrypted: false,
		});

		const videoChannel = pusher.subscribe(`reject_call_${user.id}`);
		videoChannel.bind("call.action", (data) => {
			if (data?.data?.action === "reject-call") {
				leaveChannel("Call rejected");
				toast.info("Call rejected by user.");
			}
			if (data?.data?.action === "end-call") {
				leaveChannel("Call ended remotely");
				toast.info("Call has been ended.");
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
			if (remoteUser && remoteUser.videoTrack) {
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
						{gender?.toLowerCase() === "male" && (
							<div className="timer">{formatTime(elapsedSeconds)}</div>
						)}
						{users.length === 0 && (
							<div className="calling-overlay">
								{videoCallData?.data?.type === "isCalling" && (
									<h2 className="text-white secondary-medium-font">
										Calling...
									</h2>
								)}
								{videoCallData?.data?.type === "IsReceiving" && (
									<h2 className="text-white secondary-medium-font">
										Connecting Call...
									</h2>
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
												? "fa-video text-dark"
												: "fa-video-slash text-secondary"
										} fs-4`}
									></i>
								</span>
								<div className="chat_desc mt-2">
									<p className="level-8 secondary-medium-font">
										{isVideoEnabled ? "Off Video" : "On Video"}
									</p>
								</div>
							</Button>
						</div>
						<div className="chat_wrap mx-2 text-center">
							<Button
								type="button"
								className="bg-transparent border-0 p-0"
								onClick={toggleAudio}
							>
								<span className="chat_span">
									<i
										className={`fa-solid ${
											isAudioEnabled
												? "fa-microphone text-dark"
												: "fa-microphone-slash text-secondary"
										} fs-4`}
									></i>
								</span>
								<div className="chat_desc mt-2">
									<p className="level-8 secondary-medium-font">
										{isAudioEnabled ? "Mute" : "Unmute"}
									</p>
								</div>
							</Button>
						</div>
						<div className="chat_wrap mx-2 text-center">
							<Button
								type="button"
								className="bg-transparent border-0 p-0"
								onClick={() => leaveChannel("User ended call")}
							>
								<span className="chat_span chat_end">
									<svg width="46" height="46" viewBox="0 0 46 46" fill="none">
										<g clipPath="url(#clip0_1_795)">
											<path
												d="M7.39208 22.0101C9.35627 20.0459 11.7249 18.5257 14.498 17.4497C17.2712 16.3736 20.2294 15.8353 23.3727 15.8347C26.516 15.834 29.4702 16.3683 32.2351 17.4374C35 18.5066 37.3728 20.0308 39.3533 22.0101L40.3433 23L34.7807 28.5626L29.171 24.6971L29.1474 19.2995C28.1889 19.0323 27.2225 18.8359 26.2483 18.7102C25.274 18.5845 24.3077 18.5295 23.3491 18.5452C22.4377 18.5452 21.5025 18.6081 20.5433 18.7338C19.5842 18.8595 18.6103 19.0559 17.6216 19.323V24.7913L11.9411 28.539L6.40214 23L7.39208 22.0101Z"
												fill="white"
											/>
										</g>
										<defs>
											<clipPath id="clip0_1_795">
												<rect
													width="32"
													height="32"
													fill="white"
													transform="translate(46 23) rotate(135)"
												/>
											</clipPath>
										</defs>
									</svg>
								</span>
								<div className="chat_desc mt-2">
									<p className="level-8 secondary-medium-font">End Call</p>
								</div>
							</Button>
						</div>
					</div>
				</div>
			</figure>
		</div>
	);
};

export default AgoraVideoCall;

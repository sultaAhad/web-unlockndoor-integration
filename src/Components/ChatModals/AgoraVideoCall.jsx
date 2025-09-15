import React, { useState, useEffect, useRef } from "react";
import AgoraRTC from "agora-rtc-sdk-ng";
import "../../assets/Css/AgoraVideoCall.css";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "react-bootstrap";
import { handleVideoCallModal } from "../../network/reducers/AuthReducer";
import { useCallActionMutation } from "../../network/services/Chat";
import Pusher from "pusher-js";

const AgoraVideoCall = ({ onCall, onCallEnd }) => {
  const [callAction] = useCallActionMutation();
  const { user, videoCallData } = useSelector((state) => state.auth);
  const [appId] = useState(import.meta.env.VITE_APP_AGORA_APP_ID);
  const [channel, setChannel] = useState(null);
  const [token, setToken] = useState("");
  const [uid] = useState(() => crypto.randomUUID());
  const [joined, setJoined] = useState(false);
  const [users, setUsers] = useState([]);
  const [localTracks, setLocalTracks] = useState([]);
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);
  const [callLink, setCallLink] = useState("");

  const dispatch = useDispatch();
  const client = useRef();
  useEffect(() => {
    setChannel(videoCallData?.data?.channel);
  }, [videoCallData]);

  useEffect(() => {
    client.current = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });

    client.current.on("user-published", async (user, mediaType) => {
      await client.current.subscribe(user, mediaType);
      if (mediaType === "video") {
        setUsers((prevUsers) => {
          if (!prevUsers.find((u) => u.uid === user.uid)) {
            return [...prevUsers, user];
          }
          return prevUsers;
        });
        user.videoTrack.play(`remote-video`);
      }
      if (mediaType === "audio") {
        user.audioTrack.play();
      }
    });

    client.current.on("user-unpublished", (user, mediaType) => {
      if (mediaType === "video") {
        setUsers((prevUsers) => prevUsers.filter((u) => u.uid !== user.uid));
      }
    });

    client.current.on("user-left", (user) => {
      setUsers((prevUsers) => prevUsers.filter((u) => u.uid !== user.uid));
    });

    return () => {
      if (client.current) {
        client.current.removeAllListeners();
      }
    };
  }, []);

  useEffect(() => {
    if (channel) {
      startVideoCall();
    }
  }, [channel]);

  // const endCallAction = async () => {
  //   const formData = {
  //     channel: channel,
  //     action: "end-call",
  //     data: {},
  //   };
  //   try {
  //     let response = await callAction(formData);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  const startCallAction = async () => {
    const formData = {
      channel_name: `channel_${videoCallData?.data?.member?.id}`,
      action: "start-call",
      data: {
        channel: channel,
        from_id: user?.id,
        from_user_name: user?.name,
        from_user_profile_image_url: user?.profile_image_url,
        from_type: user?.gender == "male" ? "Men" : "Women",
        to_id: videoCallData?.data?.member?.id,
        to_type:
          videoCallData?.data?.member?.gender == "male" ? "Men" : "Women",
      },
    };
    try {
      let response = await callAction(formData);
      if (response?.data?.success) {
      }
    } catch (error) {
      console.log(error);
    }
  };

  const startVideoCall = async () => {
    console.log(user);
    if (!appId || !channel) {
      alert("Please enter App ID and Channel Name");
      return;
    }
    try {
      await client.current.join(appId, channel, token || null, uid || null);
      const audioTrack = await AgoraRTC.createMicrophoneAudioTrack();
      const videoTrack = await AgoraRTC.createCameraVideoTrack();
      await client.current.publish([audioTrack, videoTrack]);

      setLocalTracks([audioTrack, videoTrack]);
      setJoined(true);
      if (videoCallData?.data?.type == "isCalling") {
        // setCallLink(
        //   `${window.location.origin}${
        //     window.location.pathname
        //   }?channel=${encodeURIComponent(channel)}`
        // );
        startCallAction();
      }
      setTimeout(() => {
        videoTrack.play("local-video");
      }, 500);
    } catch (error) {
      console.error("Error joining channel:", error);
      alert("Failed to join channel: " + error.message);
    }
  };

  const leaveChannel = async () => {
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
      onCallEnd(false);
      dispatch(
        handleVideoCallModal({
          status: false,
          data: {},
        })
      );
    } catch (error) {
      console.error("Error leaving channel:", error);
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

  useEffect(() => {
    const pusher = new Pusher(import.meta.env.VITE_APP_PUSHER_APP_KEY, {
      cluster: import.meta.env.VITE_APP_PUSHER_APP_CLUSTER,
      encrypted: false,
    });
    const videoChannel = pusher.subscribe(`reject_call_${user.id}`);
    videoChannel.bind("call.action", (data) => {
      if (data?.data?.action === "reject-call") {
        leaveChannel();
      }
    });
    return () => {
      videoChannel.unbind_all();
      videoChannel.unsubscribe();
      pusher.disconnect();
    };
  }, []);

  // Render logic for remote video
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
			{/* {callLink && (
        <div className="call-link">
          <p>Share this link to invite someone:</p>
          <input
            type="text"
            value={callLink}
            readOnly
            style={{ width: "100%" }}
          />
          <button
            onClick={() => {
              navigator.clipboard.writeText(callLink);
              alert("Link copied!");
            }}
          >
            Copy Link
          </button>
        </div>
      )} */}
			<figure className="position-relative">
				<div className="video-call-layout">
					<div className="remote-video-large">
						<div id="remote-video" className="video-player"></div>
						{users.length === 0 && (
							<div className="calling-overlay">
								{videoCallData?.data?.type == "isCalling" && (
									<h2 className="text-white secondary-medium-font">
										Calling...
									</h2>
								)}
								{videoCallData?.data?.type == "IsReceiving" && (
									<h2 className="text-white secondary-medium-font">
										Connecting Call...
									</h2>
								)}
							</div>
						)}
					</div>
					<div className="local-video-small">
						<div id="local-video" className="video-player"></div>
						<div className="user-info">You ({user?.name})</div>
					</div>
				</div>
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
										className={`fa-solid   ${
											isVideoEnabled
												? "fa-video text-dark"
												: "fa-video-slash text-secondary"
										}  fs-4`}
									></i>
								</span>
								<div className="chat_desc mt-2">
									<p className="level-8 secondary-medium-font text-dark">
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
										className={`fa-solid   ${
											isAudioEnabled
												? "fa-microphone text-dark"
												: "fa-microphone-slash text-secondary"
										} fs-4`}
									></i>
								</span>
								<div className="chat_desc mt-2">
									<p className="level-8 secondary-medium-font text-dark">
										{isAudioEnabled ? "Mute" : "Unmute"}
									</p>
								</div>
							</Button>
						</div>
						<div className="chat_wrap mx-2 text-center">
							<Button
								type="button"
								className="bg-transparent border-0 p-0"
								onClick={leaveChannel}
							>
								<span className="chat_span chat_end">
									{/* End call icon */}
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
									<p className="level-8 secondary-medium-font text-dark">
										{"End Call"}
									</p>
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

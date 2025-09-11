import React, { useState, useEffect, useRef } from "react";
import AgoraRTC from "agora-rtc-sdk-ng";
import "../../assets/Css/AgoraVideoCall.css";
import { useDispatch, useSelector } from "react-redux";
import { videocall } from "../../Constant/Index";
import { Button } from "react-bootstrap";
import { button } from "framer-motion/client";
import { handleVideoCallModal } from "../../network/reducers/AuthReducer";

const AgoraVideoCall = ({ onCallEnd }) => {
  const { user, videoCallData } = useSelector((state) => state.auth);
  const urlParams = new URLSearchParams(window.location.search);
  const [appId] = useState(import.meta.env.VITE_APP_AGORA_APP_ID);
  const [channel, setChannel] = useState(null);
  const [token, setToken] = useState("");
  const [uid, setUid] = useState(user?.id);
  const [joined, setJoined] = useState(false);
  const [published, setPublished] = useState(false);
  const [users, setUsers] = useState([]);
  const [localTracks, setLocalTracks] = useState([]);
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [callLink, setCallLink] = useState("");
  const dispatch = useDispatch();

  const client = useRef();
  const screenClient = useRef();

  useEffect(() => {
    setChannel(videoCallData?.data?.channel);
    if (channel != null) {
      joinChannel();
    }
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

    client.current.on("user-joined", (user) => {
      console.log("User joined:", user.uid);
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

  const joinChannel = async () => {
    if (!appId || !channel) {
      alert("Please enter App ID and Channel Name");
      return;
    }

    try {
      await client.current.join(appId, channel, token || null, uid || null);

      const audioTrack = await AgoraRTC.createMicrophoneAudioTrack();
      const videoTrack = await AgoraRTC.createCameraVideoTrack();

      await client.current.publish([audioTrack, videoTrack]);

      const localUser = {
        uid: client.current.uid,
        videoTrack: videoTrack,
        audioTrack: audioTrack,
      };

      setLocalTracks([audioTrack, videoTrack]);
      setUsers((prevUsers) => [...prevUsers, localUser]);
      setJoined(true);
      setPublished(true);

      videoTrack.play("local-video");
      const link = `${window.location.origin}${
        window.location.pathname
      }?channel=${encodeURIComponent(channel)}`;
      setCallLink(link);
    } catch (error) {
      console.error("Error joining channel:", error);
      alert("Failed to join channel: " + error.message);
    }
  };

  const leaveChannel = async () => {
    try {
      if (localTracks) {
        localTracks.forEach((track) => {
          track.close();
        });
      }
      await client.current.leave();

      setUsers([]);
      setLocalTracks([]);
      setJoined(false);
      setPublished(false);
      setIsAudioEnabled(true);
      setIsVideoEnabled(true);
      setChannel(null);
      onCallEnd(false);
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
  return (
    <div className="chat_img_wrapper">
      {!joined ? (
        <div className="join-form">
          <button className="join-btn" onClick={joinChannel}>
            Start Call
          </button>
        </div>
      ) : (
        <>
          {" "}
          {callLink && (
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
          )}
          <figure className="position-relative">
            <div className="video-container">
              <div className="local-video-container">
                <div id="local-video" className="video-player"></div>
                <div className="user-info">You</div>
              </div>
            </div>
            <div className="remote-videos">
              {users
                .filter((user) => user.uid !== client.current.uid)
                .map((user) => (
                  <div key={user.uid} className="remote-video-container">
                    <div
                      id={`remote-video-${user.uid}`}
                      className="video-player"
                      ref={(el) => {
                        if (el && user.videoTrack) {
                          user.videoTrack.play(`remote-video-${user.uid}`);
                        }
                      }}
                    ></div>
                    <div className="user-info">User {user.uid}</div>
                  </div>
                ))}
            </div>
            <div className="row">
              <div className="col-md-12 d-flex justify-content-center pt-3">
                <div className="chat_wrap mx-2 text-center">
                  <Button
                    type={button}
                    onClick={toggleVideo}
                    className="bg-transparent border-0 p-0"
                  >
                    <span className="chat_span">
                      <svg
                        width="28"
                        height="28"
                        viewBox="0 0 28 28"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M3.81516 2.33331L2.3335 3.81498L5.5185 6.99998H4.66683C4.35741 6.99998 4.06066 7.1229 3.84187 7.34169C3.62308 7.56048 3.50016 7.85723 3.50016 8.16665V19.8333C3.50016 20.1427 3.62308 20.4395 3.84187 20.6583C4.06066 20.8771 4.35741 21 4.66683 21H18.6668C18.9002 21 19.1218 20.9066 19.2968 20.79L23.0185 24.5L24.5002 23.0183M24.5002 7.58331L19.8335 12.25V8.16665C19.8335 7.85723 19.7106 7.56048 19.4918 7.34169C19.273 7.1229 18.9762 6.99998 18.6668 6.99998H11.4568L24.5002 20.0433V7.58331Z"
                          fill="black"
                        />
                      </svg>
                    </span>
                    <div className="chat_desc mt-2">
                      <p className="level-8 secondary-medium-font text-dark">
                        Off Video
                      </p>
                    </div>
                  </Button>
                </div>
                <div className="chat_wrap mx-2 text-center">
                  <Button
                    type={button}
                    className="bg-transparent border-0 p-0"
                    onClick={toggleAudio}
                  >
                    <span className="chat_span">
                      <svg
                        width="28"
                        height="28"
                        viewBox="0 0 28 28"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g opacity="0.5">
                          <g clipPath="url(#clip0_1_801)">
                            <path
                              d="M26.6 0L19.25 7.35V5.25C19.25 2.275 16.975 0 14 0C11.025 0 8.75 2.275 8.75 5.25V12.25C8.75 13.825 9.45 15.225 10.5 16.1L9.1 17.5C7.875 16.45 7 14.875 7 13.125V8.75C5.95 8.75 5.25 9.45 5.25 10.5V13.125C5.25 15.4 6.3 17.325 7.875 18.725L0 26.775V28H1.225L28 1.05V0H26.6ZM21.875 8.925L21 9.8V13.125C21 16.45 17.85 19.25 14.35 19.25H13.65C13.125 19.25 12.6 19.075 12.075 19.075L10.5 20.3C11.025 20.475 11.55 20.65 12.25 20.825V24.5C7 24.5 7.875 28 7.875 28H20.125C20.125 28 21 24.5 15.75 24.5V20.825C19.6 20.125 22.75 16.975 22.75 13.125V10.5C22.75 9.8 22.4 9.275 21.875 8.925Z"
                              fill="black"
                            />
                            <path
                              d="M19.2501 12.25V11.55L13.4751 17.5H14.0001C16.9751 17.5 19.2501 15.05 19.2501 12.25Z"
                              fill="black"
                            />
                          </g>
                        </g>
                        <defs>
                          <clipPath id="clip0_1_801">
                            <rect width="28" height="28" fill="white" />
                          </clipPath>
                        </defs>
                      </svg>
                    </span>
                    <div className="chat_desc mt-2">
                      <p className="level-8 secondary-medium-font text-dark">
                        {"Unmute"}
                      </p>
                    </div>
                  </Button>
                </div>
                <div className="chat_wrap mx-2 text-center">
                  <Button
                    type={button}
                    className="bg-transparent border-0 p-0"
                    onClick={leaveChannel}
                  >
                    <span className="chat_span chat_end">
                      <svg
                        width="46"
                        height="46"
                        viewBox="0 0 46 46"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
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
        </>
      )}
    </div>
  );
};

export default AgoraVideoCall;

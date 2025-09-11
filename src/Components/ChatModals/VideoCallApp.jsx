import React, { useState, useEffect, useRef } from "react";
import DailyIframe from "@daily-co/daily-js";

const VideoCallApp = () => {
  const [roomUrl, setRoomUrl] = useState("");
  const [isJoined, setIsJoined] = useState(false);
  const callFrameRef = useRef();

  const createRoom = async () => {
    const response = await fetch(
      "http://what-she-said-api.test/v1/api/start-call"
    );
    const data = await response.json();
    setRoomUrl(data.url);
  };

  const joinCall = () => {
    if (roomUrl) {
      callFrameRef.current = DailyIframe.createFrame({
        url: roomUrl,
        showLeaveButton: true,
      });
      callFrameRef.current.join();
      setIsJoined(true);
    }
  };

  const leaveCall = () => {
    if (callFrameRef.current) {
      callFrameRef.current.leave();
      setIsJoined(false);
    }
  };

  return (
    <div className="video-call-app">
      {!roomUrl && <button onClick={createRoom}>Create Room</button>}

      {roomUrl && !isJoined && (
        <div>
          <p>Room created: {roomUrl}</p>
          <button class="btn btn-warning mb-3 mt-5 w-100" onClick={joinCall}>
            Join Call
          </button>
        </div>
      )}

      {isJoined && (
        <div>
          <div id="video-container"></div>
          <button onClick={leaveCall}>Leave Call</button>
        </div>
      )}
    </div>
  );
};

export default VideoCallApp;

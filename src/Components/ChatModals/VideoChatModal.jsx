import { Button, Modal } from "react-bootstrap";
import { signalImg, videocall } from "../../Constant/Index";
import { button } from "framer-motion/client";
import VideoCallApp from "./VideoCallApp";
import AgoraVideoCall from "./AgoraVideoCall";
import { useSelector } from "react-redux";

const VideoChatModal = ({ showVideoChatModal, handleVideoChatClose }) => {
  const { user, videoCallData } = useSelector((state) => state.auth);
  
  return (
    <>
      <Modal
        show={showVideoChatModal}
        className="chat_modal"
        // onHide={handleVideoChatClose}
        onHide={() => {}}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header closeButton className="border-0 ms-0">
          <Modal.Title className="secondary-medium-font level-7 dark-color">
            {videoCallData?.data?.type == "isCalling" && (
              <> Video Call to {videoCallData?.data?.member?.name}</>
            )}
            {videoCallData?.data?.type == "IsReceiving" && (
              <> Video Call From {videoCallData?.data?.member?.name}</>
            )}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center py-0">
          {/* <VideoCallApp/> */}
          <AgoraVideoCall
            onCall={showVideoChatModal}
            onCallEnd={(res) => {
              handleVideoChatClose(res);
            }}
          />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default VideoChatModal;

import { useEffect, useState } from "react";

import "react-loading-skeleton/dist/skeleton.css";
import PricingModal from "./ChatModals/PricingModal";
import PayNowModal from "./ChatModals/PayNowModal";
import { Link } from "react-router-dom";
import ThankYouModal from "./ChatModals/ThankYouModal";
import VideoChatModal from "./ChatModals/videoChatModal";

function VideoCallButton({ member, type = "icon" }) {
  const [showPricingModal, setShowPricingModal] = useState(false);
  const [showPayModal, setShowPayModal] = useState(false);
  const [showThankModal, setShowThankModal] = useState(false);
  const [showVideoChatModal, setShowVideoChatModal] = useState(false);

  const Loader = () => (
    <div className="btn-loader spinner-border text-warning" role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
  );

  return (
    <>
      {type == "button" && (
        <button
          onClick={(e) => {
            e.preventDefault();
            // setShowPricingModal(true);
            setShowVideoChatModal(true);
          }}
          className="wrapper-bg-good btn rounded-pill text-white px-4 d-flex align-items-center gap-2"
          style={{ backgroundColor: "transparent" }}
        >
          <i className="fas fa-video"></i> Video Call
        </button>
      )}
      {type == "icon" && (
        <div className="icon-circle iconwra2">
          <Link
            to="#"
            onClick={(e) => {
              e.preventDefault();
              // setShowPricingModal(true);
              setShowVideoChatModal(true);
            }}
          >
            <i className="fa-solid fa-video video-icon"></i>
          </Link>
        </div>
      )}

      <PricingModal
        showPricingModal={showPricingModal}
        handlePricingClose={() => setShowPricingModal(false)}
        setShowPricingModal={setShowPricingModal}
        setShowPayModal={setShowPayModal}
      />
      <PayNowModal
        showPayModal={showPayModal}
        handlePayClose={() => setShowPayModal(false)}
        setShowPayModal={setShowPayModal}
        setShowThankModal={setShowThankModal}
      />
      <ThankYouModal
        showThankModal={showThankModal}
        handleThankClose={() => {
          setShowThankModal(false);
          setShowVideoChatModal(true); // 🔹 ThankYou ke baad Video Chat open hoga
        }}
        setShowThankModal={setShowThankModal}
        setShowVideoChatModal={setShowVideoChatModal}
      />
      <VideoChatModal
        showVideoChatModal={showVideoChatModal}
        handleVideoChatClose={() => setShowVideoChatModal(false)}
      />
    </>
  );
}

export default VideoCallButton;

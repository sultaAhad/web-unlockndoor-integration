import { Link } from "react-router-dom";
import { mchat } from "../Constant/Index";
import { useState } from "react";
import OfferModal from "../Pages/ManProfile/OfferModal";
import PricingModal from "./ChatModals/PricingModal";
import PayNowModal from "./ChatModals/PayNowModal";
import ThankYouModal from "./ChatModals/ThankYouModal";
import VideoChatModal from "./ChatModals/videoChatModal";

const FemaleMemberCard = ({ member, key }) => {
  const packageTitle = member?.package?.slug
    ?.replace("-package", "")
    .toUpperCase();

  const [showPricingModal, setShowPricingModal] = useState(false);
  const [showPayModal, setShowPayModal] = useState(false);
  const [showThankModal, setShowThankModal] = useState(false);
  const [showVideoChatModal, setShowVideoChatModal] = useState(false);
  const [showofferModal, setShowofferModal] = useState(false);

  const checkFeatureAccess = (member, feature) => {
    const pkg = member?.package?.slug || "";
    if (!pkg) return false;

    if (pkg.includes("silver")) {
      return feature === "chat";
    }
    if (pkg.includes("gold")) {
      return feature === "chat" || feature === "video";
    }
    if (pkg.includes("platinum")) {
      return true;
    }
    return false;
  };

  const handleofferClose = () => setShowofferModal(false);
  const handleofferShow = () => setShowofferModal(true);

  return (
    <>
      <div key={key} className="col-lg-4 col-md-6 mb-4">
        <div className="profile-card">
          <span className={`card-badge ${packageTitle.toLowerCase()}`}>
            {packageTitle}
          </span>
          <div className="card-icons">
            {checkFeatureAccess(member, "chat") && (
              <div className="icon-circle iconwra1">
                <Link to="/chat">
                  <img src={mchat} alt="chat" />
                </Link>
              </div>
            )}

            {checkFeatureAccess(member, "video") && (
              <div className="icon-circle iconwra2">
                <Link
                  to="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setShowPricingModal(true);
                  }}
                >
                  <i className="fa-solid fa-video video-icon"></i>
                </Link>
              </div>
            )}

            {checkFeatureAccess(member, "offer") && (
              <div className="icon-circle iconwra3">
                <Link
                  to="#"
                  onClick={(e) => {
                    e.preventDefault();
                    handleofferShow();
                  }}
                >
                  <i className="fa-solid fa-heart-circle-plus heart-icon"></i>
                </Link>
              </div>
            )}
          </div>

          <img
            src={member.profile_image_url}
            alt="profile"
            className="card-image"
          />

          <div className="play-button">
            <i className="fa-solid fa-play"></i>
          </div>

          <div
            className="card-footer"
            onClick={() => handleClick(member)}
            style={{ cursor: "pointer" }}
          >
            <h4>{member.name}</h4>
            <p>{member.nationality || member.address}</p>
          </div>

          <div className="card-actions">
            <div>
              <span className="like-count me-0 ms-1">200</span>
              <div className="wrapper-dash">
                <div className="icon-circle linear-bg">
                  <i className="fa-solid fa-heart"></i>
                </div>
              </div>
            </div>
            <div className="wrapper-dash">
              <div className="icon-circle">
                <i className="fa-solid fa-xmark close-icon"></i>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <OfferModal
        showofferModal={showofferModal}
        handleofferClose={handleofferClose}
      />

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
};

export default FemaleMemberCard;

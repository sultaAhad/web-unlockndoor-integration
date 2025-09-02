import React, { useEffect, useState } from "react";
import "../../assets/Css/profile.css";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer";
import { mchat, innerpages1 } from "../../Constant/Index";
import AOS from "aos";
import { Link, useNavigate } from "react-router-dom";
import ProfileNavbartwo from "../../Components/ProfileNavbartwo";
import VideoChatModal from "../../Components/ChatModals/videoChatModal";
import ThankYouModal from "../../Components/ChatModals/ThankYouModal";
import PayNowModal from "../../Components/ChatModals/PayNowModal";
import PricingModal from "../../Components/ChatModals/PricingModal";
import OfferModal from "./OfferModal";
import { useGetFemaleMembershipQuery } from "../../network/services/ManAuth";
import Spinner from "../../Components/Spinner";
import ProfileHeader from "../../Components/ProfileHeader";

function Femalemembers({ member }) {
  // 🔹 Modals
  const [showPricingModal, setShowPricingModal] = useState(false);
  const [showPayModal, setShowPayModal] = useState(false);
  const [showThankModal, setShowThankModal] = useState(false);
  const [showVideoChatModal, setShowVideoChatModal] = useState(false);
  const [showofferModal, setShowofferModal] = useState(false);

  // 🔹 Load More state
  const [visibleCount, setVisibleCount] = useState(12);

  const handleofferClose = () => setShowofferModal(false);
  const handleofferShow = () => setShowofferModal(true);

  // 🔹 API Call with RTK Query
  const { data, isLoading } = useGetFemaleMembershipQuery();
  const members = data?.response?.data?.Women || [];
  const navigate = useNavigate();

  const handleClick = (member) => {
    navigate(`/women-details/${member.id}`, { state: { member } });
  };

  // 🔹 Feature check by each member package
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

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  useEffect(() => {
    document.body.style.backgroundImage = `url(${innerpages1})`;
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundPosition = "center";
    document.body.style.minHeight = "100vh";
    return () => {
      document.body.style.backgroundImage = "";
    };
  }, []);

  return (
    <>
      <Header />

      <section className="profile_sec" data-aos="fade-up">
        <div className="container">
          <div className="row">
            <ProfileHeader />
            <div className="col-md-12 pt-5 for-extra-space">
              <ProfileNavbartwo />
            </div>
          </div>
        </div>
      </section>

      <section className="videos_sec" data-aos="fade-right">
        <div className="container">
          {isLoading ? (
            <div className="row justify-content-center">
              <Spinner />
            </div>
          ) : (
            <div className="row">
              {members.slice(0, visibleCount).map((member) => {
                const badge = member.package?.slug
                  ? member.package.slug.replace("-package", "").toUpperCase()
                  : "N/A";

                return (
                  <div key={member.id} className="col-lg-4 col-md-6 mb-4">
                    <div className="profile-card">
                      {/* Badge */}
                      <span className={`card-badge ${badge.toLowerCase()}`}>
                        {badge}
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
                );
              })}
            </div>
          )}

          {/* Load More */}
          {!isLoading && visibleCount < members.length && (
            <div className="row">
              <div className="col-lg-2 mx-auto">
                <button
                  className="btn-write secondary-medium-font load-more-wrapper rounded-0 d-flex align-items-center justify-content-center extra-bg-1 border-none"
                  onClick={() => setVisibleCount(visibleCount + 12)}
                >
                  Load More
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

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

      <Footer />
    </>
  );
}

export default Femalemembers;

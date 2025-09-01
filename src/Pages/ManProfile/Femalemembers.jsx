import React, { useEffect, useState } from "react";
import "../../assets/Css/profile.css";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer";
import { mchat, innerpages1 } from "../../Constant/Index";
import AOS from "aos";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileNavbartwo from "../../Components/ProfileNavbartwo";
import VideoChatModal from "../../Components/ChatModals/videoChatModal";
import ThankYouModal from "../../Components/ChatModals/ThankYouModal";
import PayNowModal from "../../Components/ChatModals/PayNowModal";
import PricingModal from "../../Components/ChatModals/PricingModal";
import OfferModal from "./OfferModal";
import { useGetFemaleMembershipQuery } from "../../network/services/ManAuth";
import Spinner from "../../Components/Spinner";

// 🔹 Import RTK Query hook

function Femalemembers() {
  // Modals
  const [showPricingModal, setShowPricingModal] = useState(false);
  const [showPayModal, setShowPayModal] = useState(false);
  const [showThankModal, setShowThankModal] = useState(false);
  const [showVideoChatModal, setShowVideoChatModal] = useState(false);
  const [showofferModal, setShowofferModal] = useState(false);

  const handleofferClose = () => setShowofferModal(false);
  const handleofferShow = () => setShowofferModal(true);

  // 🟢 Redux user
  const authUser = useSelector((state) => state.auth.user);
  console.log("🟢 Current Redux User:", authUser);

  // 🟢 API Call with RTK Query
  const { data, isLoading, isError } = useGetFemaleMembershipQuery();

  // Safely extract members
  const members = data?.response?.data?.Women || [];
  console.log(members);

  // 🟢 Feature check
  const checkFeatureAccess = (feature) => {
    const pkg = authUser?.package || authUser?.membership || "";
    if (!pkg) return false;

    if (pkg.toLowerCase().includes("silver")) {
      return feature === "chat";
    }
    if (pkg.toLowerCase().includes("gold")) {
      return feature === "chat" || feature === "video";
    }
    if (pkg.toLowerCase().includes("platinum")) {
      return true;
    }
    return false;
  };

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  //   useEffect(() => {
  //     document.body.style.backgroundImage = `url(${innerpages1})`;
  //     document.body.style.backgroundSize = "cover";
  //     document.body.style.backgroundPosition = "center";
  //     document.body.style.minHeight = "100vh";

  //     return () => {
  //       document.body.style.backgroundImage = "";
  //     };
  //   }, []);

  //   if (isLoading) return <p className="text-center">Loading...</p>;
  //   if (isError)
  //     return <p className="text-center text-danger">Failed to load members.</p>;

  return (
    <>
      <Header />

      <section className="profile_sec" data-aos="fade-up">
        <div className="container">
          <ProfileNavbartwo />
        </div>
      </section>

      <section className="videos_sec" data-aos="fade-right">
        <div className="container">
          {isLoading ? (
            <div className="row">
              <Spinner />
            </div>
          ) : (
            <div className="row">
              {members.map((member) => {
                const badge = member.package?.slug
                  ? member.package.slug.replace("-package", "").toUpperCase()
                  : "N/A";

                return (
                  <div key={member.id} className="col-lg-4 col-md-6 mb-4">
                    <div className="profile-card">
                      <span className={`card-badge ${badge.toLowerCase()}`}>
                        {badge}
                      </span>

                      <div className="card-icons">
                        {/* Chat */}
                        <div
                          className={`icon-circle ${
                            !checkFeatureAccess("chat") ? "disabled" : ""
                          }`}
                        >
                          <Link to={checkFeatureAccess("chat") ? "/chat" : "#"}>
                            <img src={mchat} alt="chat" />
                          </Link>
                        </div>

                        {/* Video */}
                        <div
                          className={`icon-circle ${
                            !checkFeatureAccess("video") ? "disabled" : ""
                          }`}
                        >
                          <Link
                            to="#"
                            onClick={(e) => {
                              e.preventDefault();
                              if (checkFeatureAccess("video")) {
                                setShowVideoChatModal(true);
                              }
                            }}
                          >
                            <i className="fa-solid fa-video"></i>
                          </Link>
                        </div>

                        {/* Offer */}
                        <div
                          className={`icon-circle ${
                            !checkFeatureAccess("offer") ? "disabled" : ""
                          }`}
                        >
                          <Link
                            to="#"
                            onClick={(e) => {
                              e.preventDefault();
                              if (checkFeatureAccess("offer")) {
                                handleofferShow();
                              }
                            }}
                          >
                            <i className="fa-solid fa-heart-circle-plus"></i>
                          </Link>
                        </div>
                      </div>

                      <img
                        src={member.profile_image_url}
                        alt="profile"
                        className="card-image"
                      />

                      <div className="card-footer">
                        <h4>{member.name}</h4>
                        <p>{member.nationality || member.address}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
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
        handleThankClose={() => setShowThankModal(false)}
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

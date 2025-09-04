import React, { useEffect, useState } from "react";
import "../../assets/Css/matchprofile.css";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer";
import {
  bid_one,
  edit,
  massagewrapper,
  matchprofile,
  matchprofile1,
  matchprofile2,
  matchprofile3,
  matchprofile4,
  matchprofile5,
  matchprofile6,
  matchprofile7,
  matchprofile8,
  matchprofile9,
  message,
  notification,
  mchat,
  manproimage3,
  manproimage2,
  innerpages, // ✅ Added mchat import
} from "../../Constant/Index";
import AOS from "aos";
import { Link } from "react-router-dom";
import ProfileNavbartwo from "../../Components/ProfileNavbartwo";
import VideoChatModal from "../../Components/ChatModals/videoChatModal";
import ThankYouModal from "../../Components/ChatModals/ThankYouModal";
import PayNowModal from "../../Components/ChatModals/PayNowModal";
import PricingModal from "../../Components/ChatModals/PricingModal";
import ProfileHeader from "../../Components/ProfileHeader";
import MatchedProfileCard from "../../Components/MatchedProfileCard";
import { useGetMatchedProfilesQuery } from "../../network/services/ManAuth";
import Spinner from "../../Components/Spinner";

function MatchedProfiles() {
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [profiles, setProfiles] = useState([]);

  const { data, isLoading, refetch } = useGetMatchedProfilesQuery(currentPage);

  useEffect(() => {
    if (data?.response?.data?.matchedProfiles?.data) {
      setProfiles((prev) =>
        currentPage === 1
          ? data.response.data.matchedProfiles.data
          : [...prev, ...data.response.data.matchedProfiles.data]
      );
      setCurrentPage(data.response.data.matchedProfiles?.current_page);
      setLastPage(data.response.data.matchedProfiles?.last_page);
    }
  }, [data, currentPage]);

  useEffect(() => {
    refetch();
  }, [currentPage]);

  // const profiles =
  //   matchedProfiles?.response?.data?.matchedProfiles?.data ?? [];
  const [showPricingModal, setShowPricingModal] = useState(false);
  const handlePricingClose = () => setShowPricingModal(false);
  const handlePricingShow = () => setShowPricingModal(true);

  const [showPayModal, setShowPayModal] = useState(false);
  const handlePayClose = () => setShowPayModal(false);
  const handlePayShow = () => setShowPayModal(true);

  const [showThankModal, setShowThankModal] = useState(false);
  const handleThankClose = () => setShowThankModal(false);
  const handleThankShow = () => setShowThankModal(true);

  const [showVideoChatModal, setShowVideoChatModal] = useState(false);
  const handleVideoChatClose = () => setShowVideoChatModal(false);
  const handleVideoChatShow = () => setShowVideoChatModal(true);

  const [showVideoModal, setShowVideoModal] = useState(false);
  const handleVideoClose = () => setShowVideoModal(false);
  const handleVideoShow = () => setShowVideoModal(true);

  return (
    <>
      <Header />

      <section className="profile_sec mt-5" data-aos="fade-up">
        <div className="container">
          <div className="row">
            <ProfileHeader />

            <div className="col-md-12 pt-5 pb-4 mt-4 for-extra-space1 mt-4">
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
              {profiles.map((profile, index) => (
                <MatchedProfileCard card={profile} index={index} />
              ))}
            </div>
          )}
          {!isLoading && lastPage > currentPage && (
            <div className="row">
              <div className="col-lg-2 mx-auto">
                <button
                  className="btn-write secondary-medium-font load-more-wrapper rounded-0 d-flex align-items-center justify-content-center extra-bg-1 border-none"
                  onClick={() => setCurrentPage(page++)}
                >
                  Load More
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      <PricingModal
        showPricingModal={showPricingModal}
        handlePricingClose={handlePricingClose}
        setShowPricingModal={setShowPricingModal}
        setShowPayModal={setShowPayModal}
      />
      <PayNowModal
        showPayModal={showPayModal}
        handlePayClose={handlePayClose}
        setShowThankModal={setShowThankModal}
        setShowPayModal={setShowPayModal}
      />
      <ThankYouModal
        showThankModal={showThankModal}
        handleThankClose={handleThankClose}
        setShowThankModal={setShowThankModal}
        setShowVideoChatModal={setShowVideoChatModal}
      />
      <VideoChatModal
        handleVideoChatClose={handleVideoChatClose}
        showVideoChatModal={showVideoChatModal}
      />
      <Footer />
    </>
  );
}

export default MatchedProfiles;

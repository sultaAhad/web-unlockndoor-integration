import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap"; // Import GSAP
import Modal from "react-bootstrap/Modal";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer";
import { motion } from "framer-motion";
import {
	chatimg1,
	searchchat,
	chatimg2,
	chatimg3,
	chatimg4,
	chatimg5,
	camerachat,
	chatimgg,
	chatimgg1,
	paperclip,
	innerpages2,
} from "../../Constant/Index";
import PricingModal from "../../Components/ChatModals/PricingModal";
import PayNowModal from "../../Components/ChatModals/PayNowModal";
import ThankYouModal from "../../Components/ChatModals/ThankYouModal";
import VideoChatModal from "../../Components/ChatModals/videoChatModal";
import ChatComponent from "../../Components/ChatComponent";

const Chat = () => {
  // Pricing Modal States
  const [showPricingModal, setShowPricingModal] = useState(false);
  const handlePricingClose = () => setShowPricingModal(false);

  // Pay Now Modal States
  const [showPayModal, setShowPayModal] = useState(false);
  const handlePayClose = () => setShowPayModal(false);

  // Thank you Modal States
  const [showThankModal, setShowThankModal] = useState(false);
  const handleThankClose = () => setShowThankModal(false);

  // Video chat Modal States
  const [showVideoChatModal, setShowVideoChatModal] = useState(false);
  const handleVideoChatClose = () => setShowVideoChatModal(false);

  useEffect(() => {
    document.body.style.backgroundImage = `url(${innerpages2})`;
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
      <section className="chat pt-5 mt-4 mb-4 pb-5">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 ">
              <ChatComponent type={"men"} />
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Modal */}
      <PricingModal
        showPricingModal={showPricingModal}
        handlePricingClose={handlePricingClose}
        setShowPricingModal={setShowPricingModal}
        setShowPayModal={setShowPayModal}
      />
      {/* Pricing Modal */}

      {/* Pay Now Modal */}
      <PayNowModal
        showPayModal={showPayModal}
        handlePayClose={handlePayClose}
        setShowThankModal={setShowThankModal}
        setShowPayModal={setShowPayModal}
      />
      {/* Pay Now Modal */}

      {/* Thank You Now Modal */}
      <ThankYouModal
        showThankModal={showThankModal}
        handleThankClose={handleThankClose}
        setShowThankModal={setShowThankModal}
        setShowVideoChatModal={setShowVideoChatModal}
      />
      {/* Thank You Now Modal */}

      {/* video chat Modal  */}
      <VideoChatModal
        handleVideoChatClose={handleVideoChatClose}
        showVideoChatModal={showVideoChatModal}
      />
      {/* video chat Modal  */}
      <Footer />
    </>
  );
};

export default Chat;

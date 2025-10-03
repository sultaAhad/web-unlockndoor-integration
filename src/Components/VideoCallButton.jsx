import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { handleVideoCallModal } from "../network/reducers/AuthReducer";
import PricingModal from "./ChatModals/PricingModal";
import PayNowModal from "./ChatModals/PayNowModal";
import ThankYouModal from "./ChatModals/ThankYouModal";

/**
 * Helper function to always generate the same channel name
 * no matter who starts the call (caller/receiver).
 */
const getCallChannel = (id1, id2) => {
  return `call_${Math.min(id1, id2)}_${Math.max(id1, id2)}`;
};

/**
 * VideoCallButton
 * - props:
 *    member        : the member object you want to call
 *    type          : "icon" | "button" (default: "icon")
 *    refetchManData: function to re-fetch manData after payment
 *    manData       : object from API containing can_call, minutes, etc (for the caller)
 */
function VideoCallButton({ member, type = "icon" }) {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [showPricingModal, setShowPricingModal] = useState(false);
  const [showPayModal, setShowPayModal] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [selectedMember, setSelectedMember] = useState(member);

  // ---- Start Video Call ----
  // const StartVideoCall = () => {
  // 	// member ke andar nested minutes object
  // 	const availableMinutes = selectedMember?.minutes?.minutes ?? 0;

  // 	if (availableMinutes > 0) {
  // 		connectCall();
  // 		return;
  // 	}

  // 	setShowPricingModal(true);
  // };
  // ---- Start Video Call ----
  const StartVideoCall = () => {
    // const availableMinutes = Number(
    //   selectedMember?.minutes?.transaction?.minutes_left ?? 0
    // );

    if (selectedMember?.minutes > 0) {
      connectCall();
      return;
    }
    setShowPricingModal(true);
  };

  const connectCall = () => {
    const channelName = getCallChannel(user?.id, selectedMember?.id);

    dispatch(
      handleVideoCallModal({
        status: true,
        data: {
          member,
          channel: channelName,
          type: "isCalling",
          start_call: new Date().toISOString(),
          remark: "Video call initiated by caller",
        },
      })
    );
  };

  const handleThankYouClose = async () => {
    setShowThankYou(false);
    // if (typeof videoCallButtonResponse === "function") {
    //   try {
    //     await videoCallButtonResponse(selectedMember?.id);
    //   } catch (err) {
    //   }
    // }

    // const refreshedMinutes = Number(
    //   selectedMember?.minutes?.transaction?.minutes_left ?? 0
    // );

    // if (refreshedMinutes > 0) {
    //   connectCall();
    // }
  };

  return (
    <>
      {/* Button Type */}
      {type === "button" && (
        <button
          id={`video-call-btn-${selectedMember?.id}`}
          onClick={StartVideoCall}
          className="wrapper-bg-good btn rounded-pill text-white px-4 d-flex align-items-center gap-2"
          style={{ backgroundColor: "transparent" }}
        >
          <i className="fas fa-video" /> Video Call
        </button>
      )}

      {/* Icon Type */}
      {type === "icon" && (
        <div className="icon-circle iconwra2">
          <Link
            to="#"
            id={`video-call-btn-${selectedMember?.id}`}
            onClick={StartVideoCall}
          >
            <i className="fa-solid fa-video video-icon" />
          </Link>
        </div>
      )}

      {/* Pricing Modal */}
      <PricingModal
        showPricingModal={showPricingModal}
        handlePricingClose={() => setShowPricingModal(false)}
        setShowPricingModal={setShowPricingModal}
        setShowPayModal={setShowPayModal}
        setSelectedPlan={setSelectedPlan}
      />

      {/* PayNow Modal */}
      <PayNowModal
        show={showPayModal}
        onHide={() => setShowPayModal(false)}
        checkedPlan={selectedPlan}
        showSuccessModal={showThankYou}
        setShowSuccessModal={setShowThankYou}
        memberId={selectedMember?.id}
        stripeWrapperResponse={(response) => {
          setSelectedMember((prev) => ({
            ...prev,
            minutes: response,
          }));
          setShowPayModal(false);
        }}
      />

      <ThankYouModal
        showThankModal={showThankYou}
        setShowThankModal={(value) => {
          setShowThankYou(value);
          StartVideoCall();
        }}
        onClose={handleThankYouClose}
      />
    </>
  );
}

export default VideoCallButton;

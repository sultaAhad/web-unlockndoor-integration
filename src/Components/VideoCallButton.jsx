// import React, { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Link } from "react-router-dom";
// import { handleVideoCallModal } from "../network/reducers/AuthReducer";
// import PricingModal from "./ChatModals/PricingModal";
// import PayNowModal from "./ChatModals/PayNowModal";
// import ThankYouModal from "./ChatModals/ThankYouModal";

// /**
//  * VideoCallButton
//  * - props:
//  *    member        : the member object you want to call
//  *    type          : "icon" | "button" (default: "icon")
//  *    refetchManData: function to re-fetch manData after payment
//  *    manData       : object from API containing can_call, minutes, etc (for the caller)
//  */
// function VideoCallButton({ member, type = "icon", refetchManData, manData }) {
// 	const { user } = useSelector((state) => state.auth);
// 	const dispatch = useDispatch();

// 	const [showPricingModal, setShowPricingModal] = useState(false);
// 	const [showPayModal, setShowPayModal] = useState(false);
// 	const [showThankYou, setShowThankYou] = useState(false);
// 	const [selectedPlan, setSelectedPlan] = useState(null);

// 	const StartVideoCall = () => {
// 		// Check permission/minutes from manData (we're reading manData provided to this component)
// 		// allow call if can_call true and minutes > 0
// 		if (manData?.can_call && Number(manData?.minutes) > 0) {
// 			connectCall();
// 			return;
// 		}

// 		// Otherwise, open pricing modal
// 		setShowPricingModal(true);
// 	};

// 	// Dispatch to open video modal (Redux)
// 	const connectCall = () => {
// 		const channelName = `channel_${member?.id}_${user?.id}`;
// 		dispatch(
// 			handleVideoCallModal({
// 				status: true,
// 				data: {
// 					member,
// 					channel: channelName,
// 					type: "isCalling",
// 					start_call: new Date().toISOString(),
// 					remark: "Video call initiated by caller",
// 				},
// 			}),
// 		);
// 	};

// 	// After Thank You modal closes, re-fetch manData and attempt to call if minutes are enough
// 	const handleThankYouClose = async () => {
// 		setShowThankYou(false);
// 		if (typeof refetchManData === "function") {
// 			try {
// 				await refetchManData(); // let parent refresh manData
// 			} catch (err) {
// 				// ignore - user may still want to continue
// 			}
// 		}
// 		// If new manData allows calling, connect
// 		if (manData?.can_call && Number(manData?.minutes) > 0) {
// 			connectCall();
// 		}
// 	};

// 	return (
// 		<>
// 			{/* Button Type */}
// 			{type === "button" && (
// 				<button
// 					id={`video-call-btn-${member?.id}`}
// 					onClick={StartVideoCall}
// 					className="wrapper-bg-good btn rounded-pill text-white px-4 d-flex align-items-center gap-2"
// 					style={{ backgroundColor: "transparent" }}
// 				>
// 					<i className="fas fa-video" /> Video Call
// 				</button>
// 			)}

// 			{/* Icon Type */}
// 			{type === "icon" && (
// 				<div className="icon-circle iconwra2">
// 					<Link
// 						to="#"
// 						id={`video-call-btn-${member?.id}`}
// 						onClick={StartVideoCall}
// 					>
// 						<i className="fa-solid fa-video video-icon" />
// 					</Link>
// 				</div>
// 			)}

// 			{/* Pricing Modal */}
// 			<PricingModal
// 				showPricingModal={showPricingModal}
// 				handlePricingClose={() => setShowPricingModal(false)}
// 				setShowPricingModal={setShowPricingModal}
// 				setShowPayModal={setShowPayModal}
// 				setSelectedPlan={setSelectedPlan}
// 			/>

// 			{/* PayNow Modal */}
// 			<PayNowModal
// 				show={showPayModal}
// 				onHide={() => setShowPayModal(false)}
// 				checkedPlan={selectedPlan}
// 				showSuccessModal={showThankYou}
// 				setShowSuccessModal={setShowThankYou}
// 			/>

// 			{/* Thank You Modal */}
// 			<ThankYouModal
// 				showThankModal={showThankYou}
// 				setShowThankModal={setShowThankYou}
// 				// keep compatibility with existing props in your version of ThankYouModal
// 				setShowVideoButton={() => {}}
// 				refetchManData={refetchManData}
// 				onClose={handleThankYouClose}
// 			/>
// 		</>
// 	);
// }

// export default VideoCallButton;

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { handleVideoCallModal } from "../network/reducers/AuthReducer";
import PricingModal from "./ChatModals/PricingModal";
import PayNowModal from "./ChatModals/PayNowModal";
import ThankYouModal from "./ChatModals/ThankYouModal";

function VideoCallButton({ member, type = "icon", refetchManData, manData }) {
	const { user } = useSelector((state) => state.auth);
	const dispatch = useDispatch();

	const [showPricingModal, setShowPricingModal] = useState(false);
	const [showPayModal, setShowPayModal] = useState(false);
	const [showThankYou, setShowThankYou] = useState(false);
	const [selectedPlan, setSelectedPlan] = useState(null);

	const StartVideoCall = () => {
		if (manData?.can_call && Number(manData?.minutes) > 0) {
			connectCall();
			return;
		}
		setShowPricingModal(true);
	};

	const connectCall = () => {
		const startTime = new Date();
		const channelName = `channel_${member?.id}_${user?.id}`;

		dispatch(
			handleVideoCallModal({
				status: true,
				data: {
					member,
					channel: channelName,
					type: "isCalling",
					start_call: startTime.toISOString(),
					remark: "Video call started",
				},
			}),
		);
	};

	const handleThankYouClose = () => {
		setShowThankYou(false);
		if (manData?.can_call && Number(manData?.minutes) >= 30) {
			connectCall();
		}
	};

	return (
		<>
			{type === "button" && (
				<button
					id={`video-call-btn-${member?.id}`}
					onClick={StartVideoCall}
					className="wrapper-bg-good btn rounded-pill text-white px-4 d-flex align-items-center gap-2"
					style={{ backgroundColor: "transparent" }}
				>
					<i className="fas fa-video"></i> Video Call
				</button>
			)}

			{type === "icon" && (
				<div className="icon-circle iconwra2">
					<Link
						to="#"
						id={`video-call-btn-${member?.id}`}
						onClick={StartVideoCall}
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
				setSelectedPlan={setSelectedPlan}
			/>

			<PayNowModal
				show={showPayModal}
				onHide={() => setShowPayModal(false)}
				checkedPlan={selectedPlan}
				showSuccessModal={showThankYou}
				setShowSuccessModal={setShowThankYou}
			/>

			<ThankYouModal
				show={showThankYou}
				handleClose={handleThankYouClose}
				refetchManData={refetchManData}
			/>
		</>
	);
}

export default VideoCallButton;

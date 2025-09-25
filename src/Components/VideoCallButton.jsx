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
		console.log("✅ API Can Call:", manData?.can_call);
		console.log("✅ API Minutes:", manData?.minutes);

		// ✅ check manData, not female member
		if (manData?.can_call && Number(manData?.minutes) > 0) {
			connectCall();
			return;
		}

		// Otherwise open pricing modal
		setShowPricingModal(true);
	};

	// ✅ Redux dispatch to open video modal
	const connectCall = () => {
		dispatch(
			handleVideoCallModal({
				status: true,
				data: {
					member,
					channel: `channel_${member?.id}_${user?.id}`,
					type: "isCalling",
				},
			}),
		);
	};

	// ✅ After payment -> ThankYou modal closes -> check condition -> open call
	const handleThankYouClose = () => {
		setShowThankYou(false);

		if (manData?.can_call && Number(manData?.minutes) >= 30) {
			connectCall();
		}
	};

	return (
		<>
			{/* Button Type */}
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

			{/* Icon Type */}
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
			/>

			{/* Thank You Modal */}
			<ThankYouModal
				showThankModal={showThankYou}
				setShowThankModal={setShowThankYou}
				setShowVideoButton={() => {}}
				refetchManData={refetchManData}
				onClose={handleThankYouClose}
			/>
		</>
	);
}

export default VideoCallButton;

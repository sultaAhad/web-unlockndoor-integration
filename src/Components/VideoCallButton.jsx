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
function VideoCallButton({ member, type = "icon", refetchMemberData }) {
	const { user } = useSelector((state) => state.auth);
	const dispatch = useDispatch();

	const [showPricingModal, setShowPricingModal] = useState(false);
	const [showPayModal, setShowPayModal] = useState(false);
	const [showThankYou, setShowThankYou] = useState(false);
	const [selectedPlan, setSelectedPlan] = useState(null);

	// ---- Start Video Call ----
	// const StartVideoCall = () => {
	// 	// member ke andar nested minutes object
	// 	const availableMinutes = member?.minutes?.minutes ?? 0;

	// 	if (availableMinutes > 0) {
	// 		connectCall();
	// 		return;
	// 	}

	// 	setShowPricingModal(true);
	// };
	// ---- Start Video Call ----
	const StartVideoCall = () => {
		// ✅ transaction ke andar se minutes_left lo
		const availableMinutes = Number(
			member?.minutes?.transaction?.minutes_left ?? 0,
		);

		if (availableMinutes > 0) {
			connectCall();
			return;
		}

		// Agar 0 ho gaye to pricing modal khulega
		setShowPricingModal(true);
	};

	// ---- Connect Call ----
	const connectCall = () => {
		const channelName = getCallChannel(user?.id, member?.id);

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
			}),
		);
	};

	// ---- After Thank You modal closes ----
	// ---- After Thank You modal closes ----
	const handleThankYouClose = async () => {
		setShowThankYou(false);

		// ✅ Refresh member data from backend
		if (typeof refetchMemberData === "function") {
			try {
				await refetchMemberData(member?.id);
			} catch (err) {
				// ignore errors
			}
		}

		// ✅ Dobara fresh minutes_left check karo
		const refreshedMinutes = Number(
			member?.minutes?.transaction?.minutes_left ?? 0,
		);

		if (refreshedMinutes > 0) {
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
					<i className="fas fa-video" /> Video Call
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
				memberId={member?.id}
				refetchMemberData={refetchMemberData} // ✅ add this
			/>

			{/* Thank You Modal */}
			<ThankYouModal
				showThankModal={showThankYou}
				setShowThankModal={setShowThankYou}
				refetchMemberData={refetchMemberData}
				onClose={handleThankYouClose}
			/>
		</>
	);
}

export default VideoCallButton;

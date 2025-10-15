import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { handleVideoCallModal } from "../network/reducers/AuthReducer";
import PayNowModal from "./ChatModals/PayNowModal";
import ThankYouModal from "./ChatModals/ThankYouModal";

function VideoCallButton({ member, gender, type = "icon" }) {
	const { user } = useSelector((state) => state.auth);
	const dispatch = useDispatch();

	const [showPayModal, setShowPayModal] = useState(false);
	const [showThankYou, setShowThankYou] = useState(false);
	const [selectedPlan, setSelectedPlan] = useState(null);
	const [selectedMember, setSelectedMember] = useState(member);

	const isPaid = Number(user?.package?.is_paid) === 1;

	// ❌ Hide button if not paid
	if (!isPaid) return null;

	const StartVideoCall = () => {
		if (selectedMember?.minutes > 0) {
			connectCall();
			return;
		}
		setShowPayModal(true);
	};

	const connectCall = () => {
		dispatch(
			handleVideoCallModal({
				status: true,
				data: {
					calling_user: {
						id: selectedMember?.id,
						name: selectedMember?.name,
						profile_image_url: selectedMember?.profile_image_url,
						type: selectedMember?.gender,
					},
					type: "isCalling",
				},
			}),
		);
	};

	const handleThankYouClose = async () => {
		setShowThankYou(false);
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
						minutes: response?.minutes,
						transaction_id: response?.transaction_id,
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

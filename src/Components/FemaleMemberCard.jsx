// ✅ FemaleMemberCard.jsx
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useGetManDataQuery } from "../network/services/ManAuth";

import PricingModal from "./ChatModals/PricingModal";
import PayNowModal from "./ChatModals/PayNowModal";
import ThankYouModal from "./ChatModals/ThankYouModal";

import LikeSwapButtons from "./LikeSwapButtons";
import MakeOfferButton from "./MakeOfferButton";
import VideoCallButton from "./VideoCallButton";
import { mchat } from "../Constant/Index";

const FemaleMemberCard = ({ member, memberId }) => {
	const packageTitle = member?.package?.slug
		?.replace("-package", "")
		.toUpperCase();
	const [femaleMember, setFemaleMember] = useState(member);

	// --- Modal states ---
	const [showPricingModal, setShowPricingModal] = useState(false);
	const [showPayModal, setShowPayModal] = useState(false);
	const [showThankModal, setShowThankModal] = useState(false);
	const [selectedPlan, setSelectedPlan] = useState(null);

	// --- Video call button visibility ---
	const [showVideoButton, setShowVideoButton] = useState(false);

	const navigate = useNavigate();

	// --- Fetch men data ---
	const { data: manData, isLoading, refetch } = useGetManDataQuery();

	// --- Feature access check ---
	const checkFeatureAccess = (member, feature) => {
		const pkg = member?.package?.slug || "";
		if (!pkg) return false;
		if (pkg.includes("silver")) return feature === "chat";
		if (pkg.includes("gold")) return feature === "chat" || feature === "video";
		if (pkg.includes("platinum")) return true;
		return false;
	};

	const handleClick = (member) => {
		navigate(`/women-details/${member.id}`, { state: { member } });
	};

	// --- Check video call access ---
	const handleVideoCheck = () => {
		if (isLoading) return;

		const minutes = Number(manData?.minutes || 0);

		if (manData?.can_call && minutes > 0) {
			setShowVideoButton(true); // ✅ Direct video button dikhao
		} else {
			setShowPricingModal(true); // ❌ Pricing modal dikhao
		}
	};

	return (
		<>
			<div key={memberId} className="col-lg-4 col-md-6 mb-4">
				<div className="profile-card">
					<span className={`card-badge ${packageTitle.toLowerCase()}`}>
						{packageTitle}
					</span>

					<div className="card-icons">
						{checkFeatureAccess(femaleMember, "chat") && (
							<div className="icon-circle iconwra1">
								<Link to={`/chat`} state={femaleMember}>
									<img src={mchat} alt="chat" />
								</Link>
							</div>
						)}

						{checkFeatureAccess(femaleMember, "video") && (
							<div className="icon-circle iconwra2">
								{!showVideoButton ? (
									<button
										className="btn p-0 border-0 bg-transparent"
										onClick={handleVideoCheck}
									>
										<i className="fa-solid fa-video"></i>
									</button>
								) : (
									<VideoCallButton member={femaleMember} />
								)}
							</div>
						)}

						{checkFeatureAccess(femaleMember, "offer") && (
							<MakeOfferButton member={femaleMember} />
						)}
					</div>

					<img
						src={femaleMember.profile_image_url}
						alt="profile"
						className="card-image"
					/>

					<div className="play-button">
						<i className="fa-solid fa-play"></i>
					</div>

					<div
						className="card-footer"
						onClick={() => handleClick(femaleMember)}
						style={{ cursor: "pointer" }}
					>
						<h4>{femaleMember.name}</h4>
						<p>{femaleMember.nationality || femaleMember.address}</p>
					</div>

					<div className="card-actions">
						<div>
							<span className="like-count me-0 ms-1">
								{femaleMember.likes_count ?? 0}
							</span>
							<div className="wrapper-dash">
								<LikeSwapButtons
									type={"like"}
									femaleMember={femaleMember}
									responseAction={(response) => {
										setFemaleMember((prev) => ({
											...prev,
											likes_count: response.likes_count,
											is_liked: response.is_liked,
										}));
									}}
								/>
							</div>
						</div>
						<div className="wrapper-dash">
							<LikeSwapButtons
								type={"swap"}
								femaleMember={femaleMember}
								responseAction={(response) => {
									setFemaleMember((prev) => ({
										...prev,
										likes_count: response.likes_count,
										is_liked: response.is_liked,
									}));
								}}
							/>
						</div>
					</div>
				</div>
			</div>

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
				showSuccessModal={showThankModal}
				setShowSuccessModal={setShowThankModal}
			/>

			{/* ThankYou Modal */}
			<ThankYouModal
				showThankModal={showThankModal}
				setShowThankModal={setShowThankModal}
				setShowVideoButton={setShowVideoButton}
				refetchManData={refetch}
			/>
		</>
	);
};

export default FemaleMemberCard;

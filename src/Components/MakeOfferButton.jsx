import { useEffect, useState } from "react";

import "react-loading-skeleton/dist/skeleton.css";
import PricingModal from "./ChatModals/PricingModal";
import PayNowModal from "./ChatModals/PayNowModal";
import { Link } from "react-router-dom";
// import ThankYouModal from "./ChatModals/ThankYouModal";
// import VideoChatModal from "./ChatModals/videoChatModal";
import OfferModal from "../Pages/ManProfile/OfferModal";
import { Button } from "react-bootstrap";

function MakeOfferButton({ member, type = "icon" }) {
	const handleofferClose = () => setShowofferModal(false);
	const handleofferShow = () => setShowofferModal(true);
	const [showofferModal, setShowofferModal] = useState(false);

	return (
		<>
			{type == "button" && (
				<Button
					onClick={(e) => {
						e.preventDefault();
						handleofferShow();
					}}
					className="data-offer bg-transparent border-0"
				>
					<h5 className="secondary-regular-font">Create Date Offer</h5>
				</Button>
			)}
			{type == "icon" && (
				<div className="icon-circle iconwra2">
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

			{/* Modals */}
			<OfferModal
				showofferModal={showofferModal}
				handleofferClose={handleofferClose}
				womenId={member?.id}
			/>
		</>
	);
}

export default MakeOfferButton;

import { useState } from "react";
import { Link } from "react-router-dom";
import OfferModal from "../Pages/ManProfile/OfferModal";
import { Button } from "react-bootstrap";
import { useSelector } from "react-redux";

function MakeOfferButton({ member, type = "icon" }) {
	const [showofferModal, setShowofferModal] = useState(false);
	const { user } = useSelector((state) => state.auth);

	// Convert to number just in case API sends string
	const isPaid = Number(user?.package?.is_paid) === 1;

	const handleofferClose = () => setShowofferModal(false);
	const handleofferShow = () => setShowofferModal(true);

	// ❌ Hide if not paid
	if (!isPaid) return null;

	return (
		<>
			{type === "button" && (
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

			{type === "icon" && (
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

			{/* Offer Modal */}
			<OfferModal
				showofferModal={showofferModal}
				handleofferClose={handleofferClose}
				womenId={member?.id}
			/>
		</>
	);
}

export default MakeOfferButton;

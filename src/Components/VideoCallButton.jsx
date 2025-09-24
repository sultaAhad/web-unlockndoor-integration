import { useEffect, useState } from "react";

import "react-loading-skeleton/dist/skeleton.css";
import PricingModal from "./ChatModals/PricingModal";
import PayNowModal from "./ChatModals/PayNowModal";
import { Link } from "react-router-dom";
import ThankYouModal from "./ChatModals/ThankYouModal";
// import VideoChatModal from "./ChatModals/videoChatModal";
import { useDispatch, useSelector } from "react-redux";
import { handleVideoCallModal } from "../network/reducers/AuthReducer";

function VideoCallButton({ member, type = "icon" }) {
	const { user } = useSelector((state) => state.auth);
	const dispatch = useDispatch();

	const StartVideoCall = () => {
		dispatch(
			handleVideoCallModal({
				status: true,
				data: {
					member: member,
					channel: `channel_${member?.id}_${user?.id}`,
					type: "isCalling",
				},
			}),
		);
	};

	return (
		<>
			{type === "button" && (
				<button
					id={`video-call-btn-${member?.id}`} // ✅ unique id
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
		</>
	);
}

export default VideoCallButton;

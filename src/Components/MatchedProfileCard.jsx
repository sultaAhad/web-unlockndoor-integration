import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Aos from "aos";
import {
	useFaqsContentQuery,
	useHomeContentQuery,
} from "../network/services/HelpServices";

// ✅ Skeleton loader
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Link } from "react-router-dom";
import { mchat } from "../Constant/Index";
import VideoCallButton from "./VideoCallButton";

function MatchedProfileCard({ card, index }) {
	return (
		<div className="col-lg-4 col-md-6 mb-4" key={index}>
			<div className="profile-card">
				<img
					src={card.profile_image_url}
					alt="profile"
					className="card-image"
				/>

				<div className="card-bottom d-flex justify-content-between align-items-end">
					<div className="card-left-icons d-flex align-items-center gap-2">
						<div className="icon-circle iconwra1">
							<Link to={`/chat`} state={card}>
								<img src={mchat} alt="chat" />
							</Link>
						</div>
						<VideoCallButton member={card} />
					</div>

					<div className="card-right-actions text-end">
						<Link
							to={`/matched-Profiles/${card.id}`}
							state={{ card }} // 👈 object me wrap karo, direct card nahi
							className="view-profile-btn secondary-secondmedium-font"
						>
							View Profile
						</Link>
						<img
							src={card.profile_image_url}
							alt="thumb"
							className="profile-thumb"
						/>
					</div>
				</div>
			</div>
		</div>
	);
}

export default MatchedProfileCard;

import React from "react";
import { Link } from "react-router-dom";
import { mchat } from "../Constant/Index";
import VideoCallButton from "./VideoCallButton";

function MatchedProfileCard({ card, index }) {
	// ✅ Extract the slug safely
	const pkgSlug = card?.has_women_package?.slug?.toLowerCase() || "";

	// ✅ Determine access
	const canChat =
		pkgSlug.includes("silver") ||
		pkgSlug.includes("gold") ||
		pkgSlug.includes("platinum");

	const canVideoCall = pkgSlug.includes("gold") || pkgSlug.includes("platinum");

	return (
		<div className="col-lg-4 col-md-6 mb-4" key={index}>
			<div className="profile-card">
				<p className="bg-massage ms-3 mt-3 position-absolute ps-3 rounded-0 w-75 text-capitalize">
					{card.name}
				</p>
				<img
					src={card.profile_image_url}
					alt="profile"
					className="card-image"
				/>

				<div className="card-bottom d-flex justify-content-between align-items-end">
					<div className="card-left-icons d-flex align-items-center gap-2">
						{/* ✅ Chat button — always visible if allowed */}
						{canChat && (
							<div className="icon-circle iconwra1">
								<Link to={`/chat`} state={card}>
									<img src={mchat} alt="chat" />
								</Link>
							</div>
						)}

						{/* ✅ Video call button — only visible for Gold or Platinum */}
						{canVideoCall && <VideoCallButton member={card} />}
					</div>

					<div className="card-right-actions text-end">
						<Link
							to={`/women-details/${card.id}`}
							state={{ member: card }}
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

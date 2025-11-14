import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useGetManDataQuery } from "../network/services/ManAuth";

import LikeSwapButtons from "./LikeSwapButtons";
import MakeOfferButton from "./MakeOfferButton";
import VideoCallButton from "./VideoCallButton";
import { mchat } from "../Constant/Index";

const FemaleMemberCard = ({ member }) => {
	const [femaleMember, setFemaleMember] = useState(member);
	const navigate = useNavigate();
	const { user } = useSelector((state) => state.auth);

	// --- Fetch man data (minutes, can_call, etc.) ---
	const { data: manData, isLoading, refetch } = useGetManDataQuery();

	useEffect(() => {
		setFemaleMember(member);
	}, [member]);

	// ✅ Feature access logic
	const checkFeatureAccess = (feature) => {
		// 1️⃣ Check if man has free-tier → no features allowed
		const manPkg = user?.has_men_package?.slug || "";
		if (manPkg === "free-tier") return false;

		// 2️⃣ Check woman’s package for allowed features
		const womanPkg = femaleMember?.has_women_package?.slug || "";
		if (!womanPkg) return false;

		if (womanPkg.includes("silver")) return feature === "chat";
		if (womanPkg.includes("gold"))
			return feature === "chat" || feature === "video";
		if (womanPkg.includes("platinum")) return true;

		return false;
	};

	const packageTitle =
		femaleMember?.has_women_package?.slug
			?.replace("-package", "")
			.toUpperCase() || "";

	const responseAction = (updated) => {
		setFemaleMember((prev) => ({
			...prev,
			...updated,
		}));
	};

	return (
		<div className="col-lg-4 col-md-6 mb-4">
			<div className="profile-card">
				{packageTitle && (
					<span className={`card-badge ${packageTitle.toLowerCase()}`}>
						{packageTitle}
					</span>
				)}

				{/* --- Feature Icons (Only show if user’s package allows it) --- */}
				<div className="card-icons">
					{checkFeatureAccess("chat") && (
						<Link to={`/chat`} state={femaleMember} className="icon-circle">
							<img src={mchat} alt="chat" />
						</Link>
					)}

					{checkFeatureAccess("video") && (
						<VideoCallButton
							member={femaleMember}
							manData={{ ...manData, gender: "women" }}
						/>
					)}

					{checkFeatureAccess("offer") && (
						<MakeOfferButton member={femaleMember} />
					)}
				</div>

				{/* --- Profile Image --- */}
				<img
					src={femaleMember.profile_image_url}
					alt="profile"
					className="card-image"
				/>

				<div
					className="card-footer"
					onClick={() =>
						navigate(`/women-details/${femaleMember.id}`, {
							state: { member: femaleMember },
						})
					}
					style={{ cursor: "pointer" }}
				>
					<h4>{femaleMember.name}</h4>
					<p>{femaleMember.nationality || femaleMember.address}</p>
				</div>

				{/* --- Like & Swap Buttons --- */}
				<div className="card-actions">
					<div>
						<span className="like-count me-0 ms-1">
							{femaleMember.likes_count ?? 0}
						</span>

						<LikeSwapButtons
							type="like"
							femaleMember={femaleMember}
							responseAction={responseAction}
						/>
					</div>

					<LikeSwapButtons
						type="swap"
						femaleMember={femaleMember}
						responseAction={responseAction}
					/>
				</div>
			</div>
		</div>
	);
};

export default FemaleMemberCard;

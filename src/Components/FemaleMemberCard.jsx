import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useGetManDataQuery } from "../network/services/ManAuth";

import LikeSwapButtons from "./LikeSwapButtons";
import MakeOfferButton from "./MakeOfferButton";
import VideoCallButton from "./VideoCallButton";
import { mchat } from "../Constant/Index";

const FemaleMemberCard = ({ member, memberId }) => {
	const packageTitle = member?.package?.slug
		?.replace("-package", "")
		.toUpperCase();
	const [femaleMember, setFemaleMember] = useState(member);

	const navigate = useNavigate();

	// --- Fetch man data (minutes, can_call) ---
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
							<VideoCallButton
								member={femaleMember}
								manData={{ ...manData, gender: "female" }}
							/>
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
		</>
	);
};

export default FemaleMemberCard;

// import { Link, useNavigate } from "react-router-dom";
// import { useState } from "react";
// import LikeSwapButtons from "./LikeSwapButtons";
// import MakeOfferButton from "./MakeOfferButton";
// import VideoCallButton from "./VideoCallButton";
// import { mchat } from "../Constant/Index";

// const FemaleMemberCard = ({ member }) => {
// 	const [femaleMember, setFemaleMember] = useState(member);
// 	const navigate = useNavigate();

// 	// ✅ Hide the card if profile is swapped
// 	if (femaleMember?.is_swapped) return null;

// 	const packageTitle = member?.package?.slug
// 		?.replace("-package", "")
// 		.toUpperCase();

// 	const responseAction = (updated) => {
// 		setFemaleMember((prev) => ({
// 			...prev,
// 			...updated,
// 		}));
// 	};

// 	return (
// 		<div className="col-lg-4 col-md-6 mb-4">
// 			<div className="profile-card">
// 				<span className={`card-badge ${packageTitle.toLowerCase()}`}>
// 					{packageTitle}
// 				</span>

// 				<div className="card-icons">
// 					<Link to={`/chat`} state={femaleMember} className="icon-circle">
// 						<img src={mchat} alt="chat" />
// 					</Link>

// 					<VideoCallButton member={femaleMember} />
// 					<MakeOfferButton member={femaleMember} />
// 				</div>

// 				<img
// 					src={femaleMember.profile_image_url}
// 					alt="profile"
// 					className="card-image"
// 				/>

// 				<div
// 					className="card-footer"
// 					onClick={() =>
// 						navigate(`/women-details/${femaleMember.id}`, {
// 							state: { member: femaleMember },
// 						})
// 					}
// 					style={{ cursor: "pointer" }}
// 				>
// 					<h4>{femaleMember.name}</h4>
// 					<p>{femaleMember.nationality || femaleMember.address}</p>
// 				</div>

// 				<div className="card-actions">
// 					<div>
// 						<span className="like-count me-0 ms-1">
// 							{femaleMember.likes_count ?? 0}
// 						</span>

// 						<LikeSwapButtons
// 							type={"like"}
// 							femaleMember={femaleMember}
// 							responseAction={responseAction}
// 						/>
// 					</div>

// 					<LikeSwapButtons
// 						type={"swap"}
// 						femaleMember={femaleMember}
// 						responseAction={responseAction}
// 					/>
// 				</div>
// 			</div>
// 		</div>
// 	);
// };

// export default FemaleMemberCard;

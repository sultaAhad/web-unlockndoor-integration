import { Link } from "react-router-dom";
import VideoCallButton from "./VideoCallButton";
import { mchat } from "../Constant/Index";
import { useLikeManProfileMutation } from "../network/services/WomanAuth";
import { toast } from "react-toastify";
import { Spinner } from "react-bootstrap";
import { useSelector } from "react-redux";

const LikeMatchCard = ({ card, type, index, responseAction, gender }) => {
	const [likeManProfile, { isLoading: isProcessing }] =
		useLikeManProfileMutation();
	const { user, userToken } = useSelector((state) => state.auth);

	console.log("Logged-in user:", user);

	// ✅ Extract package slug safely
	const pkgSlug = user?.has_women_package?.slug?.toLowerCase() || "";
	console.log("📦 Card Data:", card);

	// ✅ Access logic
	const canChat =
		pkgSlug.includes("silver") ||
		pkgSlug.includes("gold") ||
		pkgSlug.includes("platinum");

	const canVideoCall = pkgSlug.includes("gold") || pkgSlug.includes("platinum");

	const likeMan = async () => {
		try {
			const response = await likeManProfile({ liked_id: card?.id }).unwrap();
			if (response.status) {
				toast.success(response?.message);
				responseAction("matched"); // 🔥 trigger parent update
			}
		} catch (error) {
			toast.error(error?.data?.message || "Something went wrong.");
		}
	};

	const MatchedAction = () => (
		<div className="card-left-icons">
			{/* ✅ Chat visible for Silver, Gold, Platinum */}
			{canChat && (
				<div className="icon-circle iconwra1">
					<Link to={`/chat-women`} state={card}>
						<img src={mchat} alt="chat" />
					</Link>
				</div>
			)}

			{/* ✅ Video Call only for Gold & Platinum */}
			{canVideoCall && (
				<VideoCallButton member={card} gender={gender} type="icon" />
			)}
		</div>
	);

	const UnmatchedAction = () => (
		<div className="card-left-icons">
			<a
				href="javascript:void(0);"
				onClick={likeMan}
				rel="noopener noreferrer"
				className="border only_for_img wrapper-anchor"
			>
				{isProcessing ? <Spinner animation="border" size="sm" /> : "Match Now"}
			</a>
		</div>
	);

	return (
		<div className="col-lg-4 col-md-6 mb-4" key={index}>
			<div className="profile-card">
				<img
					src={card?.profile_image_url}
					alt="profile"
					className="card-image"
				/>

				<div className="card-bottom d-flex justify-content-between align-items-end">
					{type === "matched" && <MatchedAction />}
					{type === "liked" && <UnmatchedAction />}
					<div className="card-right-actions text-end">
						<Link
							to={`/woman/profile-man/${card?.id}`}
							state={card}
							className="view-profile-btn secondary-secondmedium-font"
						>
							View Profile
						</Link>
						<img
							src={card?.profile_image_url}
							alt="thumb"
							className="profile-thumb"
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default LikeMatchCard;

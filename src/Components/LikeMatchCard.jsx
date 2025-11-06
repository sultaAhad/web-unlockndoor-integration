import { Link } from "react-router-dom";
import VideoCallButton from "./VideoCallButton";
import { mchat } from "../Constant/Index";
import { useLikeManProfileMutation } from "../network/services/WomanAuth";
import { toast } from "react-toastify";
import { Spinner } from "react-bootstrap";

const LikeMatchCard = ({ card, type, index, responseAction, gender }) => {
	const [likeManProfile, { isLoading: isProcessing }] =
		useLikeManProfileMutation();

	const likeMan = async () => {
		try {
			const response = await likeManProfile({
				liked_id: card?.id,
			}).unwrap();
			if (response.status) {
				toast.success(response?.message);
				responseAction(true);
			}
		} catch (error) {
			toast.error(error?.data?.message);
		}
	};
	const MatchedAction = () => (
		<div className="card-left-icons">
			<div className="icon-circle iconwra1">
				<Link to={`/chat-women`} state={card}>
					<img src={mchat} alt="chat" />
				</Link>
			</div>
			<VideoCallButton member={card} gender={gender} type="icon" />
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
				{isProcessing ? <Spinner /> : "Match Now"}
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

				{/* <div className="card-footer">
          <h4>{card?.name}</h4>
          <p>{card?.location}</p>
        </div> */}

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

import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { edit, massagewrapper, notification } from "../Constant/Index";
import { useEffect, useState } from "react";
import Pusher from "pusher-js";

function ProfileHeader({ showButtons = true, visibility = true }) {
	const { user, unread_messages_count, unread_notification_count } =
		useSelector((state) => state.auth);

	const gender = localStorage.getItem("gender");

	// useEffect(() => {
	//   const savedCounts = localStorage.getItem("user_counts");
	//   if (savedCounts) {
	//     setCounts(JSON.parse(savedCounts));
	//   }
	// }, []);

	// useEffect(() => {
	//   localStorage.setItem("user_counts", JSON.stringify(counts));
	// }, [counts]);

	return (
		<div className="col-md-12 pb-5">
			<div className="profile_banner_img">
				<img
					src={user?.cover_image_url || user?.cover_images_url}
					className="img-fluid banner_img"
					alt="cover"
				/>
				<div className="profile_img_div11">
					<img
						src={user?.profile_image_url}
						className="img-fluid profile_imgg11"
						alt="profile"
					/>
					<h5
						className="text-white secondary-secondmedium-font"
						title={user?.name}
					>
						{user?.name
							? user.name.length > 20
								? user.name.slice(0, 20) + "..."
								: user.name
							: ""}
					</h5>
				</div>

				{showButtons && (
					<div className="account_access_dv">
						<div className="notify_edit_dv">
							<ul>
								{user?.package?.slug != "free-tier" && (
									<Link
										className="text-decoration-none text-white secondary-secondregular-font"
										to={`${gender === "men" ? "/chat" : "/chat-women"}`}
									>
										<li className="wrapper-navigate-main position-relative">
											<img src={massagewrapper} alt="msg" />{" "}
											<span>Message</span>
											{unread_messages_count > 0 && (
												<span className="number_move_dv">
													{unread_messages_count}
												</span>
											)}
										</li>
									</Link>
								)}

								<Link
									to={`${
										gender === "men"
											? "/men-notifications"
											: "/women-notification"
									}`}
								>
									<li className="position-relative">
										<img src={notification} alt="notification" />
										{unread_notification_count > 0 && (
											<span className="number_move_dv">
												{unread_notification_count}
											</span>
										)}
									</li>
								</Link>

								{/* Edit Button */}
								<Link to={`/${gender === "men" ? "man" : "women"}-settings`}>
									<li>
										<img src={edit} alt="edit" />
									</li>
								</Link>
							</ul>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}

export default ProfileHeader;

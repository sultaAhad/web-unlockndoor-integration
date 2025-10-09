import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { edit, massagewrapper, message, notification } from "../Constant/Index";
import { useState } from "react";

function ProfileHeader({ showButtons = true }) {
	const { user } = useSelector((state) => state.auth);
	let gender = localStorage.getItem("gender");

	const [counts, setCounts] = useState({
		message: 0,
		notification: 0,
	});

	return (
		<div className="col-md-12 pb-5">
			<div className="profile_banner_img">
				<img
					src={user?.cover_image_url || user?.cover_images_url}
					className="img-fluid banner_img"
				/>
				<div className="profile_img_div11">
					<img
						src={user?.profile_image_url}
						className="img-fluid profile_imgg11"
					/>
					<h5 className="text-white secondary-secondmedium-font">
						{user?.name}
					</h5>
				</div>
				{showButtons ? (
					<div className="account_access_dv">
						<div className="notify_edit_dv">
							<ul>
								<Link
									className="text-decoration-none text-white secondary-secondregular-font"
									to={`${gender === "male" ? "/chat" : "/chat-women"}`}
								>
									<li className="wrapper-navigate-main position-relative">
										<img src={massagewrapper} /> <span>Message</span>
										{counts.message > 0 && (
											<span className="number_move_dv">{counts.message}</span>
										)}
									</li>
								</Link>
								<Link
									to={`${
										gender === "men"
											? "/men-notifications"
											: "/women-notification"
									}`}
								>
									{" "}
									<li className="position-relative">
										<img src={notification} />
										{counts.notification > 0 && (
											<span className="number_move_dv">
												{counts.notification}
											</span>
										)}
									</li>
								</Link>
								<Link to={`/${gender === "male" ? "man" : "women"}-settings`}>
									<li>
										<img src={edit} />
									</li>
								</Link>
							</ul>
						</div>
					</div>
				) : (
					""
				)}
			</div>
		</div>
	);
}

export default ProfileHeader;

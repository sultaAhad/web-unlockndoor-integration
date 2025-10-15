import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { edit, massagewrapper, notification } from "../Constant/Index";
import { useEffect, useState } from "react";
import Pusher from "pusher-js";

function ProfileHeader({ showButtons = true }) {
	const { user } = useSelector((state) => state.auth);
	const gender = localStorage.getItem("gender");

	const [counts, setCounts] = useState({
		message: 0,
		notification: 0,
	});
	// ✅ Load saved counts from localStorage on mount
	useEffect(() => {
		const savedCounts = localStorage.getItem("user_counts");
		if (savedCounts) {
			setCounts(JSON.parse(savedCounts));
		}
	}, []);

	// ✅ Whenever counts change, save to localStorage
	useEffect(() => {
		localStorage.setItem("user_counts", JSON.stringify(counts));
	}, [counts]);
	useEffect(() => {
		// ✅ if user not available, do nothing
		if (!user?.id) return;

		// ✅ prevent duplicate connections
		if (window.__PROFILE_PUSHER_CONNECTED__) {
			console.log("⚠️ ProfileHeader: Pusher already connected, skipping...");
			return;
		}
		window.__PROFILE_PUSHER_CONNECTED__ = true;

		// ✅ Pusher setup
		const pusher = new Pusher(import.meta.env.VITE_APP_PUSHER_APP_KEY, {
			cluster: import.meta.env.VITE_APP_PUSHER_APP_CLUSTER,
			forceTLS: true,
		});

		// ✅ dynamic channel name
		const genderChannelName =
			user.gender === "women"
				? `women-unread_count-${user.id}`
				: `men-unread_count-${user.id}`;

		console.log("📡 Subscribing to channel:", genderChannelName);

		const channel = pusher.subscribe(genderChannelName);

		// ✅ unified event listener
		channel.bind(genderChannelName, (data) => {
			console.log("📩 Pusher event received:", data);

			setCounts((prev) => ({
				...prev,
				notification:
					data.unread_notification_count !== undefined
						? data.unread_notification_count
						: prev.notification,
				message:
					data.unread_messages_count !== undefined
						? data.unread_messages_count
						: prev.message,
			}));
		});

		// ✅ cleanup
		return () => {
			try {
				console.log("🧹 Cleaning up Pusher connection...");
				channel.unsubscribe();
				pusher.disconnect();
				window.__PROFILE_PUSHER_CONNECTED__ = false;
			} catch (err) {
				console.warn("⚠️ Cleanup failed:", err);
			}
		};
	}, [user?.id]);

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
					<h5 className="text-white secondary-secondmedium-font">
						{user?.name}
					</h5>
				</div>

				{showButtons && (
					<div className="account_access_dv">
						<div className="notify_edit_dv">
							<ul>
								{/* Message Button */}
								<Link
									className="text-decoration-none text-white secondary-secondregular-font"
									to={`${gender === "men" ? "/chat" : "/chat-women"}`}
								>
									<li className="wrapper-navigate-main position-relative">
										<img src={massagewrapper} alt="msg" /> <span>Message</span>
										{counts.message > 0 && (
											<span className="number_move_dv">{counts.message}</span>
										)}
									</li>
								</Link>

								{/* Notification Button */}
								<Link
									to={`${
										gender === "men"
											? "/men-notifications"
											: "/women-notification"
									}`}
								>
									<li className="position-relative">
										<img src={notification} alt="notification" />
										{counts.notification > 0 && (
											<span className="number_move_dv">
												{counts.notification}
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

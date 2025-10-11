import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { edit, massagewrapper, message, notification } from "../Constant/Index";
import { useEffect, useState } from "react";
import Pusher from "pusher-js";

function ProfileHeader({ showButtons = true }) {
	const { user } = useSelector((state) => state.auth);
	let gender = localStorage.getItem("gender");

	const [counts, setCounts] = useState({
		message: 0,
		notification: 0,
	});

	useEffect(() => {
		// ✅ agar user available nahi to kuch mat karo
		if (!user?.id) return;

		// ✅ prevent duplicate Pusher connection
		if (window.__PROFILE_PUSHER_CONNECTED__) {
			console.log("⚠️ ProfileHeader: Pusher already connected, skipping...");
			return;
		}
		window.__PROFILE_PUSHER_CONNECTED__ = true;

		// ✅ Pusher secure connection (no encrypted:false)
		const pusher = new Pusher(import.meta.env.VITE_APP_PUSHER_APP_KEY, {
			cluster: import.meta.env.VITE_APP_PUSHER_APP_CLUSTER,
			forceTLS: true, // use secure wss:// connection
		});

		// ✅ dynamic channel name
		const genderChannelName =
			user.gender === "women"
				? `women-notifications-${user.id}`
				: `men-notifications-${user.id}`;

		console.log("📡 Subscribing to channel:", genderChannelName);

		const channel = pusher.subscribe(genderChannelName);

		// ✅ event listener
		channel.bind(genderChannelName, (data) => {
			console.log("📩 Pusher event received:", data);

			// Example handling: update notification count
			if (data.type === "unread_notifications_count") {
				setCounts((prev) => ({
					...prev,
					notification: data.unread_notification_count,
				}));
			}

			if (data.type === "unread_messages_count") {
				setCounts((prev) => ({
					...prev,
					message: data.unread_message_count,
				}));
			}
		});

		// ✅ Cleanup on unmount
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

				{showButtons ? (
					<div className="account_access_dv">
						<div className="notify_edit_dv">
							<ul>
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

								<Link to={`/${gender === "men" ? "man" : "women"}-settings`}>
									<li>
										<img src={edit} alt="edit" />
									</li>
								</Link>
							</ul>
						</div>
					</div>
				) : null}
			</div>
		</div>
	);
}

export default ProfileHeader;

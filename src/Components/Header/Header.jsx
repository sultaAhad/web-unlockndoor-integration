import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
	web_new_logo,
	outline1,
	outline2,
	person_img,
	men_profile,
	massagewrapper,
	notification,
} from "../../Constant/Index";
import RoleSelectionModal from "./RoleSelectionModal";
import LoginModal from "./LoginModal";
import ForgotPasswordModal from "./ForgotPasswordModal";
import OtpModal from "./OtpModal";
import NewPasswordModal from "./NewPasswordModal";
import CategoryModal from "./CategoryModal";
import VideoChatModal from "../ChatModals/VideoChatModal";
import Swal from "sweetalert2";
import {
	handleVideoCallModal,
	resetStore,
	setCount,
	setLogoutUser,
	setUserToken,
	triggerNotificationRefresh,
} from "../../network/reducers/AuthReducer";
import Pusher from "pusher-js";
import { useCallActionMutation } from "../../network/services/Chat";
import { formatDateTime } from "../../Constant/HelperFunction";
import { toast } from "react-toastify";
import { useCheckAuthQuery } from "../../network/services/AuthServices";

function Header() {
	const [showModal1, setShowModal1] = useState(false); // Role selection
	const [showModal2, setShowModal2] = useState(false); // Login
	const [showModal3, setShowModal3] = useState(false); // Forgot Password
	const [showModal4, setShowModal4] = useState(false); // OTP
	const [showModal5, setShowModal5] = useState(false); // New Password

	const [showCategoryModal, setShowCategoryModal] = useState(false);
	const [selectedGender, setSelectedGender] = useState("");
	const [userEmail, setUserEmail] = useState("");

	const { user, videoCallData, unread_messages_count, unread_notification_count } = useSelector((state) => state.auth);
	const [showVideoChatModal, setShowVideoChatModal] = useState(false);
	const [pageLoaded, setPageLoaded] = useState(false);
	const { data: checkAuthData } = useCheckAuthQuery();
	const [callAction] = useCallActionMutation();
	const dispatch = useDispatch();
	const gender = localStorage.getItem("gender");

	// useEffect(() => {
	// 	if (!user) return;
	// 	const pusher = new Pusher(import.meta.env.VITE_APP_PUSHER_APP_KEY, {
	// 		cluster: import.meta.env.VITE_APP_PUSHER_APP_CLUSTER,
	// 		encrypted: false,
	// 	});
	// 	const genderChannelName = `${user?.gender}_unread_count_${user?.id}`;
	// 	console.log(genderChannelName);
		
	// 	const countPusher = pusher.subscribe(genderChannelName);
	// 	countPusher.bind('unread-count.updated', (data) => {
	// 		console.log('Notification_date',data);
	// 		dispatch(
	// 			setCount({
	// 				unread_messages_count: data?.unread_messages_count,
	// 				unread_notification_count: data.unread_notification_count,
	// 			}),
	// 		);
	// 	});
	// 	return () => {
	// 		countPusher.unbind_all();
	// 		countPusher.unsubscribe();
	// 		countPusher.disconnect();
	// 	};
	// }, []);

	useEffect(() => {
		if (!user) return;

		const pusher = new Pusher(import.meta.env.VITE_APP_PUSHER_APP_KEY, {
			cluster: import.meta.env.VITE_APP_PUSHER_APP_CLUSTER,
			encrypted: false,
		});

		const genderChannelName = `${user?.gender}_unread_count_${user?.id}`;
		const countPusher = pusher.subscribe(genderChannelName);
		countPusher.bind('unread-count.updated', (data) => {
			console.log('notification_data', data);
			dispatch(
				setCount({
					unread_messages_count: data?.unread_messages_count,
					unread_notification_count: data.unread_notification_count,
				}),
			);
		});

		// Also listen for connection errors
		countPusher.bind('pusher:subscription_error', (status) => {
			console.error('Pusher subscription error:', status);
		});

		countPusher.bind('pusher:subscription_succeeded', () => {
			console.log('Successfully subscribed to channel:', genderChannelName);
		});

		return () => {
			countPusher.unbind_all();
			countPusher.unsubscribe();
			// Don't disconnect here as it might affect other channels
			// pusher.disconnect(); // Only if this is the only channel
		};
	}, [user]); // Add user as dependency
	// ✅ Reject call function ko update karein
	const rejectCallAction = async (user_id) => {
		const formData = {
			channel_name: `reject_call_${user_id}`,
			action: "reject-call",
			data: {},
		};
		try {
			let response = await callAction(formData);
			if (response?.data?.success) {
				console.log("✅ Call rejected successfully");

				// ✅ Immediately close any open Swal
				Swal.close();

				// ✅ Stop any playing audio
				const audioElements = document.querySelectorAll("audio");
				audioElements.forEach((audio) => {
					audio.pause();
					audio.currentTime = 0;
				});
			}
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		if (pageLoaded) {
			setShowVideoChatModal(videoCallData?.status);
		} else {
			setPageLoaded(true);
		}
	}, [videoCallData]);

	useEffect(() => {
		if (!user) return;

		const pusher = new Pusher(import.meta.env.VITE_APP_PUSHER_APP_KEY, {
			cluster: import.meta.env.VITE_APP_PUSHER_APP_CLUSTER,
			encrypted: false,
		});

		// 🟣 Dynamic gender-based notification channel
		const genderChannelName =
			user.gender === "women"
				? `women-notifications-${user?.id}`
				: `men-notifications-${user?.id}`;

		const genderNotificationChannel = pusher.subscribe(genderChannelName);
		const videoChannel = pusher.subscribe(`channel_${user?.id}`);
		const notificationChannel = pusher.subscribe(`channel_${user?.id}`);

		let audio = null;
		let swalInstance = null; // ✅ Store Swal instance

		videoChannel.bind("call.action", (data) => {
			audio = new Audio("/ring.mp3");
			audio.loop = true;
			audio.play();

			// ✅ Store Swal instance in variable
			swalInstance = Swal.fire({
				title: "Incoming Video Call",
				html: `
        <div style="display: flex; flex-direction: column; align-items: center; padding: 20px 10px;">
          <div style="margin-bottom: 16px;">
          <img
            src="${data?.data?.caller_user?.profile_image_url}"
            alt="Caller"
            style="height: 70px; width: 70px; border-radius: 50%; object-fit: cover; box-shadow: 0 2px 8px rgba(0,0,0,0.12);"
          />
          </div>
          <div style="font-size: 1.15em; font-weight: 500; margin-bottom: 8px;">
          ${data?.data?.caller_user?.name} is calling you...
          </div>
          <div style="font-size: 0.95em; color: #666; margin-bottom: 18px;">
          Please choose to accept or reject the call.
          </div>
        </div>
        `,
				showDenyButton: true,
				position: "top-end",
				animation: true,
				confirmButtonText: "Receive Call",
				denyButtonText: `Reject`,
				customClass: {
					popup: "swal2-calling-popup",
				},
				showCloseButton: false,
				showCancelButton: false,
				showConfirmButton: true,
				allowOutsideClick: false,
				allowEscapeKey: false,
				allowEnterKey: false,
				backdrop: false,
			}).then((result) => {
				if (audio) {
					audio.pause();
					audio.currentTime = 0;
				}
				if (result.isConfirmed) {
					const { date: start_date, time: start_time } = formatDateTime();
					dispatch(
						handleVideoCallModal({
							status: true,
							data: {
								...data?.data,
								type: "IsReceiving",
								start_date: start_date,
								start_time: start_time,
							},
						}),
					);
				} else if (result.isDenied) {
					rejectCallAction(data.data?.caller_user?.id);
				}
			});
		});

		// ✅ Listen for call rejection/end events
		const rejectCallChannel = pusher.subscribe(`reject_call_${user?.id}`);
		rejectCallChannel.bind("call.action", (data) => {
			console.log("🔕 Call rejection received:", data);

			// ✅ Close Swal if it's open
			if (swalInstance) {
				Swal.close();
				swalInstance = null;
			}

			// ✅ Stop audio if playing
			if (audio) {
				audio.pause();
				audio.currentTime = 0;
			}

			// ✅ Show notification
			if (data?.data?.action === "reject-call") {
				toast.info("Call was rejected");
			} else if (data?.data?.action === "end-call") {
				toast.info("Call has ended");
			}
		});

		genderNotificationChannel.bind(genderChannelName, (data) => {
			console.log("🔔 Gender Notification:", data);
			toast(data?.message || "You have a new notification!", {
				theme: "dark",
			});
			dispatch(triggerNotificationRefresh());
		});

		notificationChannel.bind("user.notifications", (data) => {
			console.log("📩 User Notification:", data);
		});

		return () => {
			// ✅ Cleanup: Close Swal and stop audio on unmount
			if (swalInstance) {
				Swal.close();
			}
			if (audio) {
				audio.pause();
				audio.currentTime = 0;
			}

			videoChannel.unbind_all();
			notificationChannel.unbind_all();
			genderNotificationChannel.unbind_all();
			rejectCallChannel.unbind_all(); // ✅ Clean reject channel

			videoChannel.unsubscribe();
			notificationChannel.unsubscribe();
			genderNotificationChannel.unsubscribe();
			rejectCallChannel.unsubscribe(); // ✅ Unsubscribe reject channel

			// pusher.disconnect();
		};
	}, [user]);

	const handleCategoryShow = (gender) => {
		setSelectedGender(gender); // "men" or "women"
		setShowCategoryModal(true);
	};

	const handleCategoryClose = () => {
		setShowCategoryModal(false);
		setSelectedGender("");
	};

	const [menuOpen, setMenuOpen] = useState(false);

	useEffect(() => {
		if (!checkAuthData) return;
		if (
			checkAuthData?.status === false ||
			checkAuthData?.message?.toLowerCase().includes("unauthenticated") ||
			checkAuthData?.message?.toLowerCase().includes("token not provided")
		) {
			console.warn("🚨 Token expired or missing — clearing session");
			localStorage.clear();
			dispatch(setLogoutUser());
			dispatch(resetStore());
			return;
		}

		// ✅ CASE 2: Authenticated user (men or women)
		if (
			checkAuthData?.status === true &&
			checkAuthData?.message?.toLowerCase().includes("authenticated as")
		) {
			const userType = checkAuthData?.response?.type; // "men" or "women"
			const userData =
				userType === "men"
					? checkAuthData?.response?.men
					: checkAuthData?.response?.women;

			if (userData && userType) {
				dispatch(
					setUserToken({
						user: userData,
						token: checkAuthData?.response?.token,
						gender: userType,
					}),
				);
			} else {
				// If backend returns empty response
				console.warn("⚠️ Missing user data in response — logging out");
				localStorage.clear();
				dispatch(setLogoutUser());
				dispatch(resetStore());
			}
		}
	}, [checkAuthData]);


	return (
		<>
			<style>{`
				
			.header_links {
				height: 100%;
				background: transparent;
				padding: 12px 13px;
				border-radius: 27px;
				border: 1px solid #9c1648;
			}
				.header_links img {
				height: 20px;
				width: 21px;
			}

			` }</style>
			<section className="header_sec pt-2">
				<div className="container">
					<div className="row align-items-center">
						<div className="col-lg-2">
							<div className="wrapper d-flex align-items-center justify-content-between">
								<div className="img_wrapper">
									<Link to="/">
										<img
											src={web_new_logo}
											className="img-fluid site__logo"
											alt="logo"
										/>
									</Link>
								</div>
								<button
									className="btn border-0 d-lg-none d-block"
									onClick={() => setMenuOpen(!menuOpen)}
								>
									<i className="fas fa-bars fs-3"></i>
								</button>
							</div>
						</div>
						<div className="col-lg-6 d-lg-block d-none">
							<div className="nav_wrapper">
								<ul>
									<li>
										<Link to="/">Home</Link>
									</li>
									<li>
										<Link to="/#about-section">About Us</Link>
									</li>
									<li>
										<Link to="/#realitysec">Testimonials</Link>
									</li>
									<li>
										<Link to="/#contactus">Contact Us</Link>
									</li>
								</ul>
							</div>
						</div>
						<div className="col-lg-4 d-lg-block d-none">
							<div className="header_button_wrapper d-flex gap-2">



								{!user ? (
									<>
										<button
											onClick={() => handleCategoryShow("men")}
											className="btn-bgtransparent under-line"
										>
											<img src={outline1} alt="Men" className="img-fluid pe-2" />
											Men
										</button>

										<button
											onClick={() => handleCategoryShow("women")}
											className="border wrapper-anchor"
										>
											<img src={outline2} alt="Women" className="img-fluid pe-2" />
											Women
										</button>
										< Link
											className="border only_for_img wrapper-anchor"
											onClick={() => setShowModal1(true)}
										>
											<span>
												<img src={person_img} alt="Profile" />
											</span>
										</Link>
									</>


								) : (
									<>
										{user?.package?.slug != "free-tier" && (
											<Link
												className="header_links"
												to={`${gender === "men" ? "/chat" : "/chat-women"}`}
											>
												<span className="position-relative">
													<img src={massagewrapper} alt="msg" />{" "}
													<span className="number_move_dv">
														{unread_messages_count ?? 0}
													</span>
												</span>
											</Link>
										)}
										<Link
											to={`${gender === "men"
													? "/men-notifications"
													: "/women-notification"
												}`}
											className="header_links"
										>
											<span className="position-relative">
												<img src={notification} alt="notification" />
												<span className="number_move_dv">
													{unread_notification_count ?? 0}
												</span>
											</span>
										</Link>
										<Link
											className="only_for_img"
											to={user.gender === "men" ? "/profile" : "/women-profiles"}
										>
											<span>
												<img
													src={user.profile_image_url || men_profile}
													alt="Profile"
													className="wrapper-bug"
												/>
											</span>
										</Link>
									</>
								)}
							</div>
						</div>
					</div>
				</div>

				{menuOpen && (
					<div className="mobile-nav d-lg-none pt-5">
						<div className="nav_wrapper">
							<ul className="flex-column align-items-center gap-4">
								<li>
									<Link to="/">Home</Link>
								</li>
								<li>
									<Link to="/#about-section">About Us</Link>
								</li>
								<li>
									<Link to="/#realitysec">Testimonials</Link>
								</li>
								<li>
									<Link to="/#contactus">Contact Us</Link>
								</li>
							</ul>
							<div className="d-flex justify-content-center gap-2 pt-4">
								<button
									onClick={() => handleCategoryShow("men")}
									className="btn-bgtransparent w-25 under-line"
								>
									<img src={outline1} alt="Men" className="img-fluid pe-2" />
									Men
								</button>

								<button
									onClick={() => handleCategoryShow("women")}
									className="border w-25 wrapper-anchor"
								>
									<img src={outline2} alt="Women" className="img-fluid pe-2" />
									Women
								</button>

								{!user && (
									<Link
										className="border only_for_img wrapper-anchor"
										onClick={() => setShowModal1(true)}
									>
										<span>
											<img src={person_img} alt="Profile" />
										</span>
									</Link>
								)}
							</div>

								{user && (<>
								<div className="d-flex gap-3 justify-content-center mb-2 mt-4">
										{user?.package?.slug != "free-tier" && (
											<Link
												className="header_links"
												to={`${gender === "men" ? "/chat" : "/chat-women"}`}
											>
												<span className="position-relative">
													<img src={massagewrapper} alt="msg" />{" "}
													<span className="number_move_dv">
														{unread_messages_count ?? 0}
													</span>
												</span>
											</Link>
										)}
										<Link
											to={`${gender === "men"
												? "/men-notifications"
												: "/women-notification"
												}`}
											className="header_links"
										>
											<span className="position-relative">
												<img src={notification} alt="notification" />
												<span className="number_move_dv">
													{unread_notification_count ?? 0}
												</span>
											</span>
										</Link>
										<Link
											className="only_for_img"
											to={user.gender === "men" ? "/profile" : "/women-profiles"}
										>
											<span>
												<img
													src={user.profile_image_url || men_profile}
													alt="Profile"
													className="wrapper-bug"
												/>
											</span>
										</Link>
									</div>
								</>)}
							
						</div>
					</div>
				)}
			</section>

			{/* Modals */}
			<RoleSelectionModal
				show={showModal1}
				onClose={() => setShowModal1(false)}
				onLoginClick={() => {
					setShowModal1(false);
					setShowModal2(true);
				}}
			/>
			<LoginModal
				show={showModal2}
				onClose={() => setShowModal2(false)}
				onForgotPassword={(gender) => {
					setSelectedGender(gender);
					setShowModal2(false);
					setShowModal3(true);
				}}
			/>

			<ForgotPasswordModal
				show={showModal3}
				onClose={() => setShowModal3(false)}
				gender={selectedGender} // "men" or "women"
				onContinue={(email) => {
					setUserEmail(email);
					setShowModal3(false);
					setShowModal4(true);
				}}
			/>

			<OtpModal
				show={showModal4}
				onClose={() => setShowModal4(false)}
				onContinue={() => {
					setShowModal4(false);
					setShowModal5(true);
				}}
				gender={selectedGender} // "men" or "women"
				email={userEmail}
			/>

			<NewPasswordModal
				show={showModal5}
				onClose={() => setShowModal5(false)}
				role={selectedGender} // "men" or "women"
				email={userEmail}
			/>

			<CategoryModal
				showcategoryModal={showCategoryModal}
				handlecategoryClose={handleCategoryClose}
				defaultGender={selectedGender}
			/>

			<VideoChatModal
				showVideoChatModal={showVideoChatModal}
				handleVideoChatClose={() => setShowVideoChatModal(false)}
			/>
		</>
	);
}

export default Header;

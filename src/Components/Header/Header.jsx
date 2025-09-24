import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
	web_new_logo,
	outline1,
	outline2,
	person_img,
	men_profile,
} from "../../Constant/Index";
import RoleSelectionModal from "./RoleSelectionModal";
import LoginModal from "./LoginModal";
import ForgotPasswordModal from "./ForgotPasswordModal";
import OtpModal from "./OtpModal";
import NewPasswordModal from "./NewPasswordModal";
import CategoryModal from "./CategoryModal";
import VideoChatModal from "../ChatModals/VideoChatModal";
import Swal from "sweetalert2";
import { handleVideoCallModal } from "../../network/reducers/AuthReducer";
import Pusher from "pusher-js";
import { useCallActionMutation } from "../../network/services/Chat";

function Header() {
	const [showModal1, setShowModal1] = useState(false); // Role selection
	const [showModal2, setShowModal2] = useState(false); // Login
	const [showModal3, setShowModal3] = useState(false); // Forgot Password
	const [showModal4, setShowModal4] = useState(false); // OTP
	const [showModal5, setShowModal5] = useState(false); // New Password

	const [showCategoryModal, setShowCategoryModal] = useState(false);
	const [selectedGender, setSelectedGender] = useState("");
	const [userEmail, setUserEmail] = useState("");

	const { user, videoCallData } = useSelector((state) => state.auth);
	const [showVideoChatModal, setShowVideoChatModal] = useState(false);
	const [pageLoaded, setPageLoaded] = useState(false);
	const [callAction] = useCallActionMutation();
	const dispatch = useDispatch();
	const member = useRef(null);

	const rejectCallAction = async (user_id, channel) => {
		const formData = {
			channel_name: `reject_call_${user_id}`,
			action: "reject-call",
			data: { channel: channel },
		};
		try {
			let response = await callAction(formData);
			if (response?.data?.success) {
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
		const pusher = new Pusher(import.meta.env.VITE_APP_PUSHER_APP_KEY, {
			cluster: import.meta.env.VITE_APP_PUSHER_APP_CLUSTER,
			encrypted: false,
		});
		const videoChannel = pusher.subscribe(`channel_${user?.id}`);
		let audio = null;

		videoChannel.bind("call.action", (data) => {
			audio = new Audio("/ring.mp3");
			audio.loop = true;
			audio.play();

			Swal.fire({
				title: "Incoming Video Call",
				html: `
      <div style="display: flex; flex-direction: column; align-items: center; padding: 20px 10px;">
        <div style="margin-bottom: 16px;">
        <img
          src="${data.data?.data?.from_user_profile_image_url || men_profile}"
          alt="Caller"
          style="height: 70px; width: 70px; border-radius: 50%; object-fit: cover; box-shadow: 0 2px 8px rgba(0,0,0,0.12);"
        />
        </div>
        <div style="font-size: 1.15em; font-weight: 500; margin-bottom: 8px;">
        ${data.data?.data?.from_user_name || "Unknown User"} is calling you...
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
					dispatch(
						handleVideoCallModal({
							status: true,
							data: {
								member: data?.data?.data,
								channel: data?.data?.data?.channel,
								type: "IsReceiving",
							},
						}),
					);
				} else if (result.isDenied) {
					rejectCallAction(data.data?.data?.from_id, data?.data?.data?.channel);
				}
			});
		});

		return () => {
			if (audio) {
				audio.pause();
				audio.currentTime = 0;
			}
			videoChannel.unbind_all();
			videoChannel.unsubscribe();
			pusher.disconnect();
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

	return (
		<>
			{/* Header Section */}
			<section className="header_sec pt-2">
				<div className="container">
					<div className="row align-items-center">
						<div className="col-lg-2 col-md-2">
							<div className="wrapper">
								<div className="img_wrapper">
									<Link to="/">
										<img src={web_new_logo} className="img-fluid" alt="logo" />
									</Link>
								</div>
							</div>
						</div>
						<div className="col-lg-6 col-md-6">
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
						<div className="col-lg-4 col-md-5">
							<div className="header_button_wrapper d-flex gap-2">
								{/* Men Button */}
								<button
									onClick={() => handleCategoryShow("men")}
									className="btn-bgtransparent under-line"
								>
									<img src={outline1} alt="Men" className="img-fluid pe-2" />
									Men
								</button>

								{/* Women Button */}
								<button
									onClick={() => handleCategoryShow("women")}
									className="border wrapper-anchor"
								>
									<img src={outline2} alt="Women" className="img-fluid pe-2" />
									Women
								</button>

								{/* Profile / Login */}
								{!user ? (
									<Link
										className="border only_for_img wrapper-anchor"
										onClick={() => setShowModal1(true)}
									>
										<span>
											<img src={person_img} alt="Profile" />
										</span>
									</Link>
								) : (
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
								)}
							</div>
						</div>
					</div>
				</div>
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

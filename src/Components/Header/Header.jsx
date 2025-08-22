import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
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

function Header() {
	const [showModal1, setShowModal1] = useState(false); // Role selection
	const [showModal2, setShowModal2] = useState(false); // Login
	const [showModal3, setShowModal3] = useState(false); // Forgot Password
	const [showModal4, setShowModal4] = useState(false); // OTP
	const [showModal5, setShowModal5] = useState(false); // New Password

	const location = useLocation();
	const currentPath = location.pathname.toLowerCase();

	const profilePages = new Set([
		"/profile",
		"/followers",
		"/editprofile",
		"/following",
		"/mygroups",
		"/creategroup",
		"/editgroup",
		"/my-events",
		"/create-event",
		"/event-detail",
		"/event-registered",
		"/event-editdetail",
		"/member-profile",
		"/event-group-detail",
		"/event-edit-group",
		"/joined-groups",
		"/join-group-detail",
		"/my-orders",
		"/my-order-details",
		"/my-membership",
		"/my-address",
		"/add-new-address",
		"/edit-address",
		"/become-squard-leader",
		"/chat-profile",
		"/setting",
		"/setting-payment",
		"/setting-payment-detail",
		"/setting-password",
		"/setting-notification",
	]);

	const isProfilePage = profilePages.has(currentPath);

	// Category Modal state
	const [showCategoryModal, setShowCategoryModal] = useState(false);
	const [selectedGender, setSelectedGender] = useState("");

	const handleCategoryShow = (gender) => {
		setSelectedGender(gender); // "male" or "female"
		setShowCategoryModal(true);
	};

	const handleCategoryClose = () => {
		setShowCategoryModal(false);
		setSelectedGender("");
	};

	return (
		<>
			{/* Header Section  */}
			<section className="header_sec pt-2">
				<div className="container">
					<div className="row align-items-center">
						<div className="col-lg-2 col-md-2">
							<div className="wrapper">
								<div className="img_wrapper">
									<Link to="/">
										<img
											src={web_new_logo}
											className="img-fluid"
											alt="logo"
										/>
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
									onClick={() => handleCategoryShow("male")}
									className="btn-bgtransparent under-line"
								>
									<img
										src={outline1}
										alt="Men"
										className="img-fluid pe-2"
									/>
									Men
								</button>

								{/* Women Button */}
								<button
									onClick={() => handleCategoryShow("female")}
									className="border wrapper-anchor"
								>
									<img
										src={outline2}
										alt="Women"
										className="img-fluid pe-2"
									/>
									Women
								</button>

								{/* Profile / Login */}
								{!isProfilePage ? (
									<Link
										className="border only_for_img wrapper-anchor"
										onClick={() => setShowModal1(true)}
									>
										<span>
											<img src={person_img} alt="Profile" />
										</span>
									</Link>
								) : (
									<Link className="only_for_img ">
										<span>
											<img
												src={men_profile}
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
				onForgotPassword={() => {
					setShowModal2(false);
					setShowModal3(true);
				}}
			/>
			<ForgotPasswordModal
				show={showModal3}
				onClose={() => setShowModal3(false)}
				onContinue={() => {
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
			/>
			<NewPasswordModal
				show={showModal5}
				onClose={() => setShowModal5(false)}
			/>

			{/* Category Modal */}
			<CategoryModal
				showcategoryModal={showCategoryModal}
				handlecategoryClose={handleCategoryClose}
				defaultGender={selectedGender}
			/>
		</>
	);
}

export default Header;

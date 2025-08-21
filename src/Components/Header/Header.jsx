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
import { Button } from "react-bootstrap";
import { useSettingContentQuery } from "../../network/services/HelpServices";

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

	const [showcategoryModal, setShowcategoryModal] = useState(false);
	const handlecategoryClose = () => setShowcategoryModal(false);
	const handlecategoryShow = () => setShowcategoryModal(true);

	const isProfilePage = profilePages.has(currentPath);

	const { data: SettingpageContent, isLoading } = useSettingContentQuery();
		const settingPageData = SettingpageContent?.response?.data;
	
		if (isLoading) {
			return <div>Loading...</div>;
		}

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
										<img src={settingPageData?.logo_url} className="img-fluid" />
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
										<Link to="/#realitysec">Testimonials </Link>
									</li>
									<li>
										<Link to="/#contactus">Contact Us</Link>
									</li>
								</ul>
							</div>
						</div>
						<div className="col-lg-4 col-md-5">
							<div className="header_button_wrapper">
								<Button
									onClick={handlecategoryShow}
									to="#"
									className=" btn-bgtransparent under-line"
									// data-bs-toggle="modal"
									// data-bs-target="#exampleModal"
								>
									<span>
										<img
											src={outline1}
											alt="outline1"
											className="img-fluid pe-2"
										/>
									</span>{" "}
									Men
								</Button>
								<Button
									onClick={handlecategoryShow}
									to="#"
									className="border wrapper-anchor"
									// data-bs-toggle="modal"
									// data-bs-target="#exampleModal"
								>
									<span>
										<img src={outline2} alt="outline2" />
									</span>
									women
								</Button>
								{!isProfilePage ? (
									<Link
										className="border only_for_img wrapper-anchor"
										onClick={() => setShowModal1(true)}
									>
										<span>
											<img src={person_img} alt="outline2" />
										</span>
									</Link>
								) : (
									<Link className="only_for_img ">
										<span>
											<img
												src={men_profile}
												alt="outline2"
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

			<CategoryModal
				showcategoryModal={showcategoryModal}
				handlecategoryClose={handlecategoryClose}
				setShowcategoryModal={setShowcategoryModal}
			/>
		</>
	);
}

export default Header;

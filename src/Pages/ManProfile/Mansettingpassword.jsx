import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer";
import {
	edit,
	innerpages1,
	manproimage2,
	manproimage3,
	massagewrapper,
	notification,
	profilebanner,
	profileimg,
	womenproimg,
	womenproimg1,
} from "../../Constant/Index";
import Aos from "aos";
import ProfileNavbartwo from "../../Components/ProfileNavbartwo";

const Mansettingpassword = () => {
	useEffect(() => {
		document.body.classList.add("body-background");

		// Cleanup to remove the class when the component unmounts
		return () => {
			document.body.classList.remove("body-background");
		};
	}, []);
	const [showOldPassword, setShowOldPassword] = useState(false);
	const [showNewPassword, setShowNewPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);

	const togglePasswordVisibility = (setFunction, currentState) => {
		setFunction(!currentState);
	};
	useEffect(() => {
		Aos.init({ duration: 1000, once: true }); // Initialize AOS with options
	}, []);
	useEffect(() => {
		document.body.style.backgroundImage = `url(${innerpages1})`;
		document.body.style.backgroundSize = "cover";
		document.body.style.backgroundPosition = "center";
		document.body.style.minHeight = "100vh";

		return () => {
			document.body.style.backgroundImage = "";
		};
	}, []);
	return (
		<>
			{/* Header and page heading */}
			{/* <Innerpagesheading pagename="Settings" /> */}
			<Header />
			<section className="profile_sec mt-5" data-aos="fade-up">
				<div className="container">
					<div className="row">
						<div className="col-md-12 pb-5 mb-5">
							<div className="profile_banner_img">
								<img src={manproimage3} className="img-fluid banner_img" />
								<div className="profile_img_div">
									<img src={manproimage2} className="img-fluid profile_imgg" />
									<h5>John Smith</h5>
								</div>
								<div className="account_access_dv">
									<div className="notify_edit_dv">
										<ul>
											<Link
												className="text-decoration-none text-white secondary-secondregular-font"
												to="/chat"
											>
												<li className="wrapper-navigate-main position-relative">
													<img src={massagewrapper} alt="message" />
													<span>Message</span>
													<span className="number_move_dv">21</span>
												</li>
											</Link>
											<Link to="/men-notifications">
												<li className="position-relative">
													<img src={notification} alt="Notification" />
													<span className="number_move_dv">19</span>
												</li>
											</Link>
											<Link to="/man-settings">
												<li>
													<img src={edit} alt="Edit" />
												</li>
											</Link>
										</ul>
									</div>
								</div>
							</div>
						</div>

						<div className="col-md-12 pt-5 pb-4 mt-4 for-extra-space1 mt-4">
							<ProfileNavbartwo />
						</div>
					</div>
				</div>
			</section>
			{/* Profile settings and navbar */}
			<section className="pt-5 pb-5">
				<div className="container">
					<div className="row">
						<div className="col-lg-11 mx-auto">
							<div className="row address-section mt-5 pt-3 pb-5">
								<div className="col-lg-5">
									<div className="col-lg-12">
										<div className="row">
											<div className="col-lg-12">
												<div className="form-group password_input position-relative mb-3">
													<input
														type={showOldPassword ? "text" : "password"}
														className="form-control pe-5 w-100"
														placeholder="Current Password"
													/>
													<i
														className={`fa ${
															showOldPassword ? "fa-eye-slash" : "fa-eye"
														} position-absolute text-white`}
														style={{
															top: "50%",
															right: "15px",
															transform: "translateY(-50%)",
															cursor: "pointer",
														}}
														onClick={() =>
															togglePasswordVisibility(
																setShowOldPassword,
																showOldPassword,
															)
														}
													></i>
												</div>
											</div>
											<div className="col-lg-12">
												<div className="form-group password_input position-relative mb-3">
													<input
														type={showNewPassword ? "text" : "password"}
														className="form-control pe-5 w-100"
														placeholder="New Password"
													/>
													<i
														className={`fa ${
															showNewPassword ? "fa-eye-slash" : "fa-eye"
														} position-absolute text-white`}
														style={{
															top: "50%",
															right: "15px",
															transform: "translateY(-50%)",
															cursor: "pointer",
														}}
														onClick={() =>
															togglePasswordVisibility(
																setShowNewPassword,
																showNewPassword,
															)
														}
													></i>
												</div>
											</div>
											<div className="col-lg-12">
												<div className="form-group password_input position-relative mb-3">
													<input
														type={showConfirmPassword ? "text" : "password"}
														className="form-control pe-5 w-100"
														placeholder="Confirm New Password"
													/>
													<i
														className={`fa ${
															showConfirmPassword ? "fa-eye-slash" : "fa-eye"
														} position-absolute text-white`}
														style={{
															top: "50%",
															right: "15px",
															transform: "translateY(-50%)",
															cursor: "pointer",
														}}
														onClick={() =>
															togglePasswordVisibility(
																setShowConfirmPassword,
																showConfirmPassword,
															)
														}
													></i>
												</div>
											</div>
											<div className="col-lg-12">
												<div>
													<Link
														to="/profile"
														className="border text-white btn mt-2 w-100 main_bg white_color text-capitalize pt-2 pb-2"
														type="button"
														style={{
															borderRadius: "10px",
														}}
													>
														Update
													</Link>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
			{/* Footer */}
			<Footer />
		</>
	);
};

export default Mansettingpassword;

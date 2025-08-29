import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
	edit,
	innerpages1,
	logout,
	manproimage2,
	manproimage3,
	massagewrapper,
	notification,
} from "../../Constant/Index";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer";
import Aos from "aos";
import ProfileNavbartwo from "../../Components/ProfileNavbartwo";

// ✅ Redux
import { useDispatch } from "react-redux";
import { setLogoutUser } from "../../network/reducers/AuthReducer";

const Mansetting = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		document.body.classList.add("body-background");
		return () => {
			document.body.classList.remove("body-background");
		};
	}, []);

	const [isToggled, setIsToggled] = useState(false);
	const handleToggle = () => setIsToggled((prev) => !prev);

	useEffect(() => {
		Aos.init({ duration: 1000, once: true });
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

	// ✅ Logout Handler with SweetAlert
	const handleLogout = () => {
		Swal.fire({
			title: "Are you sure?",
			text: "You will be logged out!",
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33",
			confirmButtonText: "Yes, Logout!",
		}).then((result) => {
			if (result.isConfirmed) {
				dispatch(setLogoutUser());
				Swal.fire(
					"Logged Out!",
					"You have been logged out successfully.",
					"success",
				).then(() => {
					navigate("/");
				});
			}
		});
	};

	return (
		<>
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

			{/* Profile settings */}
			<section className="pt-5 pb-5">
				<div className="container">
					<div className="row">
						<div className="col-lg-11 mx-auto">
							<div className="row address-section mt-5 pt-3 pb-5">
								<div className="col-lg-5">
									<div className="col-lg-12">
										<div className="row">
											<div className="col-lg-12 mb-2">
												<Link
													className="btn bg-wra-bg secondary-medium-font text-white input_style"
													to="/man-change-password"
												>
													Change Password
												</Link>
											</div>

											<div className="col-lg-12">
												<div>
													<button
														className="border btn logout-wrapper mt-2 w-100 main_bg text-white secondary-medium-font text-start"
														onClick={handleLogout}
														style={{
															borderRadius: "10px",
															padding: "12px",
														}}
													>
														<img
															src={logout}
															className="img-fluid me-3"
															alt=""
														/>
														Logout
													</button>
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

			<Footer />
		</>
	);
};

export default Mansetting;

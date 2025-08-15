import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
	edit,
	innerpages1,
	logout,
	massagewrapper,
	message,
	notification,
	profilebanner,
	profileimg,
	womenproimg,
	womenproimg1,
} from "../../Constant/Index";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer";
import Aos from "aos";

const Setting = () => {
	useEffect(() => {
		document.body.classList.add("body-background");

		return () => {
			document.body.classList.remove("body-background");
		};
	}, []);
	const [isToggled, setIsToggled] = useState(false);

	const handleToggle = () => {
		setIsToggled((prev) => !prev);
	};
	const [showDelete, setShowDelete] = useState(false); // Modal for deleting groups
	const handleCloseDelete = () => setShowDelete(false);
	const handleShowDelete = () => setShowDelete(true);

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
	return (
		<>
			<Header />

			<section className="profile_sec" data-aos="fade-up">
				<div className="container">
					<div className="row">
						<div className="col-md-12 pb-5">
							<div className="profile_banner_img">
								<img src={womenproimg} className="img-fluid banner_img" />
								<div className="profile_img_div">
									<img src={womenproimg1} className="img-fluid profile_imgg" />
									<h5>John Smith</h5>
								</div>

								<div className="account_access_dv">
									<div className="notify_edit_dv">
										<ul>
											<Link
												className="text-decoration-none text-white secondary-secondregular-font"
												to="/chat-women"
											>
												<li className="wrapper-navigate-main position-relative">
													<img src={massagewrapper} /> <span>Message</span>
													<span className="number_move_dv">21</span>
												</li>
											</Link>
											<Link to="/women-notification">
												{" "}
												<li className="position-relative">
													<img src={notification} />
													<span className="number_move_dv">19</span>
												</li>
											</Link>
											<Link to="/women-settings">
												<li>
													<img src={edit} />
												</li>
											</Link>
										</ul>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
			{/* Profile settings and navbar */}
			<section className="pt-5 pb-5">
				<div className="container">
					<div className="row">
						<div className="col-lg-11 mx-auto">
							{/* <Userprofilesetting />
                            <ProfileNavbar /> */}
							<div className="row address-section mt-5 pt-3 pb-5">
								<div className="col-lg-5">
									{/* <h4 class="mb-4 secondary-bold-font text-white level-5 ">
                    Settings
                  </h4> */}
									<div className="col-lg-12">
										<div className="row">
											<div className="col-lg-12 mb-2">
												<Link
													className="btn bg-wra-bg secondary-medium-font text-white input_style"
													to="/women-change-password"
												>
													Change Password{" "}
												</Link>
											</div>

											<div className="col-lg-12">
												<div>
													<Link
														to=""
														className="border btn logout-wrapper mt-2 w-100 main_bg text-white secondary-medium-font text-start"
														onClick={handleShowDelete}
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

export default Setting;

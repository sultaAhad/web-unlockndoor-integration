import React, { useEffect } from "react";
import Footer from "../../Components/Footer";
import Header from "../../Components/Header/Header";
import {
	edit,
	innerpages1,
	manproimage2,
	manproimage3,
	massagewrapper,
	men_img,
	men_profile,
	message,
	notification,
	notify_img,
} from "../../Constant/Index";
import { Link } from "react-router-dom";
import Aos from "aos";
import ProfileNavbartwo from "../../Components/ProfileNavbartwo";

function Mennotification() {
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
			<Header />

			<section className="profile_sec" data-aos="fade-up">
				<div className="container">
					<div className="row">
						<div className="col-md-12 pb-5">
							<div className="profile_banner_img">
								<img
									src={manproimage3}
									className="img-fluid wrapper-fluid-notification banner_img"
								/>
								<div className="profile_img_div">
									<img
										src={manproimage2}
										className="img-fluid wrapper-fluid-notification profile_imgg"
									/>
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
											<Link to="/men-notifications">
												{" "}
												<li className="position-relative">
													<img src={notification} />
													<span className="number_move_dv">19</span>
												</li>
											</Link>
											<Link to="/man-settings">
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

			<section className="notification-wrapper">
				<div className="container">
					<div className="row">
						<div className="col-lg-11 mx-auto">
							{/* <Userprofilesetting />
							<ProfileNavbar /> */}
							<div className="row mt-5 pt-5 mb-5 pb-4">
								<div className="col-lg-12">
									<div className="row">
										<div className="col-lg-8  mx-auto">
											<div className="main-membership-plane comment-wrapper ">
												<div className="row border-bottom-color pb-3 mt-3">
													<div className="col-lg-12">
														<h4 className="mb-4 secondary-bold-font text-center text-white level-5 ">
															Notifications
														</h4>
													</div>
												</div>
												<div className="group-wrapper-main-list1">
													<div>
														<div className="row align-items-center border-bottom-color  position-relative ">
															<div className="col-lg-12 border-top border-bottom pt-4 pb-4">
																<div className="d-flex align-items-center gap-2">
																	<div className="row align-items-center">
																		<div className="col-lg-2">
																			{" "}
																			<img
																				src={notify_img}
																				className="img-fluid wrapper-fluid-notification wrapper-fluid-notification"
																				alt=""
																			/>
																		</div>
																		<div className="col-lg-10">
																			<div className="row">
																				<div className="col-lg-12 ">
																					<h4 class="secondary-medium-font mb-0 text-white level-8">
																						Jan Tschichold
																					</h4>
																					<p className="mb-0 text-white secondary-regular-font">
																						Someone followed them back
																					</p>
																				</div>
																			</div>
																		</div>
																	</div>
																</div>
																<div className="notify_para">
																	<p className="mb-3 text-end level-9 text-white">
																		{" "}
																		(4:20 pm | 22-Jun-2023)
																	</p>
																	<Link
																		to=""
																		className="view-detail-wrapper secondary-regular-font"
																	>
																		View Details
																	</Link>
																</div>
															</div>
														</div>

														<div className="row align-items-center border-bottom-color  position-relative ">
															<div className="col-lg-12 border-top border-bottom pt-4 pb-4">
																<div className="d-flex align-items-center gap-2">
																	<div className="row align-items-center">
																		<div className="col-lg-2">
																			{" "}
																			<img
																				src={notify_img}
																				className="img-fluid wrapper-fluid-notification"
																				alt=""
																			/>
																		</div>
																		<div className="col-lg-10">
																			<div className="row">
																				<div className="col-lg-12">
																					<h4 class="secondary-medium-font mb-0 text-white level-8">
																						Jan Tschichold
																					</h4>
																					<p className="mb-0  text-white secondary-regular-font">
																						Someone followed them back
																					</p>
																				</div>
																			</div>
																		</div>
																	</div>
																</div>
																<div className="notify_para">
																	<p className="mb-0 text-end level-9 text-white">
																		{" "}
																		(4:20 pm | 22-Jun-2023)
																	</p>
																</div>
															</div>
														</div>

														<div className="row align-items-center border-bottom-color  position-relative ">
															<div className="col-lg-12 border-top border-bottom pt-4 pb-4">
																<div className="d-flex align-items-center gap-2">
																	<div className="row align-items-center">
																		<div className="col-lg-2">
																			{" "}
																			<img
																				src={notify_img}
																				className="img-fluid wrapper-fluid-notification"
																				alt=""
																			/>
																		</div>
																		<div className="col-lg-10">
																			<div className="row">
																				<div className="col-lg-12">
																					<h4 class="secondary-medium-font mb-0 text-white level-8">
																						Jan Tschichold
																					</h4>
																					<p className="mb-0 text-white secondary-regular-font">
																						Someone followed them back
																					</p>
																				</div>
																			</div>
																		</div>
																	</div>
																</div>
																<div className="notify_para text-white">
																	<p className="mb-2 text-end level-9">
																		{" "}
																		(4:20 pm | 22-Jun-2023)
																	</p>
																	<div className="d-flex align-items-center gap-2">
																		<Link
																			to=""
																			className="view-detail-wrapper secondary-regular-font"
																		>
																			Accept
																		</Link>
																		<Link
																			to=""
																			className="view-detail-wrapper reject secondary-regular-font text-white"
																		>
																			Reject
																		</Link>
																	</div>
																</div>
															</div>
														</div>

														<div className="row align-items-center border-bottom-color  position-relative ">
															<div className="col-lg-12 border-top border-bottom pt-4 pb-4">
																<div className="d-flex align-items-center gap-2">
																	<div className="row align-items-center">
																		<div className="col-lg-2">
																			{" "}
																			<img
																				src={notify_img}
																				className="img-fluid wrapper-fluid-notification"
																				alt=""
																			/>
																		</div>
																		<div className="col-lg-10">
																			<div className="row">
																				<div className="col-lg-12">
																					<h4 class="secondary-medium-font mb-0 text-white level-8">
																						Jan Tschichold
																					</h4>
																					<p className="mb-0 extra-color-10 secondary-regular-font">
																						Someone followed them back
																					</p>
																				</div>
																			</div>
																		</div>
																	</div>
																</div>
																<div className="notify_para">
																	<p className="mb-0 text-end  level-9 text-white">
																		{" "}
																		(4:20 pm | 22-Jun-2023)
																	</p>
																</div>
															</div>
														</div>

														<div className="row align-items-center border-bottom-color  position-relative ">
															<div className="col-lg-12 border-top border-bottom pt-4 pb-4">
																<div className="d-flex align-items-center gap-2">
																	<div className="row align-items-center">
																		<div className="col-lg-2">
																			{" "}
																			<img
																				src={notify_img}
																				className="img-fluid wrapper-fluid-notification"
																				alt=""
																			/>
																		</div>
																		<div className="col-lg-10">
																			<div className="row">
																				<div className="col-lg-12">
																					<h4 class="secondary-medium-font mb-0 text-white level-8">
																						Jan Tschichold
																					</h4>
																					<p className="mb-0 extra-color-4 secondary-regular-font">
																						Someone followed them back
																					</p>
																				</div>
																			</div>
																		</div>
																	</div>
																</div>
																<div className="notify_para">
																	<p className="mb-0 text-end level-9 text-white">
																		{" "}
																		(4:20 pm | 22-Jun-2023)
																	</p>
																</div>
															</div>
														</div>

														<div className="row align-items-center border-bottom-color  position-relative ">
															<div className="col-lg-12 border-top border-bottom pt-4 pb-4">
																<div className="d-flex align-items-center gap-2">
																	<div className="row align-items-center">
																		<div className="col-lg-2">
																			{" "}
																			<img
																				src={notify_img}
																				className="img-fluid wrapper-fluid-notification"
																				alt=""
																			/>
																		</div>
																		<div className="col-lg-10">
																			<div className="row">
																				<div className="col-lg-12 ">
																					<h4 class="secondary-medium-font mb-0 text-white level-8">
																						Jan Tschichold
																					</h4>
																					<p className="mb-0  extra-color-10 secondary-regular-font">
																						Someone followed them back
																					</p>
																				</div>
																			</div>
																		</div>
																	</div>
																</div>
																<div className="notify_para">
																	<p className="mb-0 text-end level-9 text-white">
																		{" "}
																		(4:20 pm | 22-Jun-2023)
																	</p>
																</div>
															</div>
														</div>
													</div>
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
}

export default Mennotification;

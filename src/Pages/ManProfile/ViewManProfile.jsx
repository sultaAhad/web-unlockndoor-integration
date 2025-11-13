import React, { useRef } from "react";
import "../../assets/Css/style.css";
import {
	massagewrapper,
	p1,
	p2,
	p4,
	p5,
	p8,
	mdi_dollar,
	skillimg,
} from "../../Constant/Index";
import { Link, useLocation } from "react-router-dom";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer";
import { section } from "framer-motion/client";

function ViewManProfile() {
	const location = useLocation();
	const user = useRef(location?.state);
	console.log("👤 ViewManProfile Data:", user?.current);

	if (!user?.current) {
		return (
			<div className="text-center text-white py-5">
				<h4>No profile data found.</h4>
				<Link to="/" className="btn btn-primary mt-3">
					Go Back
				</Link>
			</div>
		);
	}

	return (
		<>
			<Header />

			<section className="profile_sec">
				<div className="container">
					<div className="row">
						{/* ---- Profile Banner ---- */}
						<div className="col-md-12 pb-sm-5 pb-3">
							<div className="profile_banner_img">
								<img
									src={user?.current?.cover_image_url}
									className="img-fluid banner_img"
									alt="cover"
								/>
								<div className="profile_img_div">
									<img
										src={user?.current?.profile_image_url}
										className="img-fluid profile_imgg"
										alt="profile"
									/>
									<h5>{user?.current?.name}</h5>
								</div>

								<div className="account_access_dv">
									<div className="notify_edit_dv">
										<ul>
											<Link
												to="/chat-women"
												className="text-decoration-none text-white secondary-secondregular-font"
											>
												<li className="wrapper-navigate-main position-relative">
													<img src={massagewrapper} alt="message" />
													<span>Message</span>
													<span className="number_move_dv">21</span>
												</li>
											</Link>
										</ul>
									</div>
								</div>
							</div>
						</div>

						{/* ---- Profile Info ---- */}
						<div className="col-md-12 pt-5 for-extra-space">
							<div className="profile_info_dv">
								<div className="row">
									{/* Column 1 */}
									<div className="col-lg-3 col-md-6 mb-lg-0 mb-4">
										<div className="info_ul">
											<ul>
												<li>
													<div className="dv_for_flex">
														<div className="img_dv">
															<img src={p1} alt="Name" />
														</div>
														<div className="text_dv">
															<h5>
																<span className="blod_area">Name:</span>{" "}
																{user?.current?.name}
															</h5>
														</div>
													</div>
												</li>

												<li>
													<div className="dv_for_flex">
														<div className="img_dv">
															<img src={p2} alt="DOB" />
														</div>
														<div className="text_dv">
															<h5>
																<span className="blod_area">DOB:</span>{" "}
																{user?.current?.date_of_birth}
															</h5>
														</div>
													</div>
												</li>

												<li>
													<div className="dv_for_flex">
														<div className="img_dv">
															<img src={mdi_dollar} alt="Income" />
														</div>
														<div className="text_dv">
															<h5>
																<span className="blod_area">Income:</span> ${" "}
																{user?.current?.income}
															</h5>
														</div>
													</div>
												</li>
											</ul>
										</div>
									</div>

									{/* Column 2 */}
									<div className="col-lg-3 col-md-6 mb-lg-0 mb-4">
										<div className="info_ul">
											<ul>
												<li>
													<div className="dv_for_flex">
														<div className="img_dv">
															<img src={p5} alt="Email" />
														</div>
														<div className="text_dv">
															<h5>
																<span className="blod_area">Email:</span>{" "}
																{user?.current?.email}
															</h5>
														</div>
													</div>
												</li>

												<li>
													<div className="dv_for_flex">
														<div className="img_dv">
															<img src={skillimg} alt="Skills" />
														</div>
														<div className="text_dv">
															<h5>
																<span className="blod_area">Skills:</span>{" "}
																{user?.current?.skills}
															</h5>
														</div>
													</div>
												</li>
											</ul>
										</div>
									</div>

									{/* Column 3 */}
									<div className="col-lg-3 col-md-6 mb-lg-0 mb-4">
										<div className="info_ul">
											<ul>
												<li>
													<div className="dv_for_flex">
														<div className="img_dv">
															<img src={p8} alt="Phone" />
														</div>
														<div className="text_dv">
															<h5>
																<span className="blod_area">Phone:</span>{" "}
																{user?.current?.phone}
															</h5>
														</div>
													</div>
												</li>

												<li>
													<div className="dv_for_flex">
														<div className="img_dv">
															<img src={p4} alt="Occupation" />
														</div>
														<div className="text_dv">
															<h5>
																<span className="blod_area">Occupation:</span>{" "}
																{user?.current?.occupation}
															</h5>
														</div>
													</div>
												</li>
											</ul>
										</div>
									</div>

									{/* Message */}
									<div className="col-lg-12">
										<p className="text-white secondary-semibold-font p-2">
											Message:{" "}
											<span className="secondary-regular-font">
												{user?.current?.message}
											</span>
										</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
			{/* ---- Images Section ---- */}
			{user?.current?.images_urls?.length > 0 && (
				<section className="pictures_sec">
					<div className="container">
						<div className="pic_head d-flex justify-content-between">
							<h3>Pictures</h3>
						</div>
						<div className="row mt-3">
							{user.current.images_urls.map((image, idx) => (
								<div key={idx} className="col-md-6 mb-3">
									<div className="pic_dv">
										<img src={image} alt="user" className="img-fluid" />
									</div>
								</div>
							))}
						</div>
					</div>
				</section>
			)}

			{/* ---- Videos Section ---- */}
			<section className="videos_sec">
				<div className="container">
					{user?.current?.videos_urls?.length > 0 && (
						<div className="col-md-12 mt-lg-5 mt-3">
							<div className="pic_head d-flex justify-content-between">
								<h3>Videos</h3>
							</div>
							<div className="row mt-3">
								{user.current.videos_urls.map((video, idx) => (
									<div key={idx} className="col-md-6 mb-3">
										<div className="pic_dv">
											<video controls width="100%" className="w-100">
												<source src={video} type="video/mp4" />
											</video>
										</div>
									</div>
								))}
							</div>
						</div>
					)}
				</div>
			</section>

			<Footer />
		</>
	);
}

export default ViewManProfile;

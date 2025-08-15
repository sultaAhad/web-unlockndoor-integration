import React, { useEffect } from "react";
import "../../assets/Css/profile.css";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer";
import {
	deletetrash,
	edit,
	editimg,
	innerpages,
	manproimage,
	manproimage1,
	manproimage2,
	manproimage3,
	manproimage4,
	manproimage5,
	manproimage6,
	manproimage7,
	massagewrapper,
	mdi_dollar,
	message,
	notification,
	p1,
	p2,
	p4,
	p5,
	p8,
	skillimg,
	solar_upload,
} from "../../Constant/Index";
import AOS from "aos";
import { Link } from "react-router-dom";
import ProfileNavbartwo from "../../Components/ProfileNavbartwo";
function Profile() {
	useEffect(() => {
		AOS.init({ duration: 1000, once: true }); // Initialize AOS with options
	}, []);
	useEffect(() => {
		document.body.style.backgroundImage = `url(${innerpages})`;
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
								<img src={manproimage3} className="img-fluid banner_img" />
								<div className="profile_img_div">
									<img src={manproimage2} className="img-fluid profile_imgg" />
									<h5>John Smith</h5>
								</div>

								<div className="account_access_dv">
									{/* <div className="create_btn">
										<button
											data-bs-toggle="modal"
											data-bs-target="#exampleModal"
											className="border"
										>
											Create a new Bid request{" "}
										</button>
									</div> */}

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

						<div className="col-md-12 pt-5 for-extra-space">
							<ProfileNavbartwo />

							<div className="profile_info_dv">
								<div className="row">
									<div className="col-md-3">
										<div className="info_ul">
											<ul>
												<li>
													<div className="dv_for_flex">
														<div className="img_dv">
															<img src={p1} />
														</div>
														<div className="text_dv">
															<h5>
																<span className="blod_area">Name : </span>
																John Smith
															</h5>
														</div>
													</div>
												</li>
												<li>
													<div className="dv_for_flex">
														<div className="img_dv">
															<img src={p2} />
														</div>
														<div className="text_dv">
															<h5>
																<span className="blod_area"> DOB : </span>
																14/02/2001
															</h5>
														</div>
													</div>
												</li>
												<li>
													<div className="dv_for_flex">
														<div className="img_dv">
															<img src={mdi_dollar} />
														</div>
														<div className="text_dv">
															<h5>
																<span className="blod_area">
																	{" "}
																	Annual Income :{" "}
																</span>
																$25k
															</h5>
														</div>
													</div>
												</li>
											</ul>
										</div>
									</div>

									<div className="col-md-3">
										<div className="info_ul">
											<ul>
												<li>
													<div className="dv_for_flex">
														<div className="img_dv">
															<img src={p5} />
														</div>
														<div className="text_dv">
															<h5>
																<span className="blod_area">Email : </span>
																Info@lorem.com
															</h5>
														</div>
													</div>
												</li>

												<li>
													<div className="dv_for_flex">
														<div className="img_dv">
															<img src={skillimg} />
														</div>
														<div className="text_dv">
															<h5>
																<span className="blod_area"> Skills : </span>
																Gaming , Movie ,
															</h5>
														</div>
													</div>
												</li>
											</ul>
										</div>
									</div>

									<div className="col-md-3">
										<div className="info_ul">
											<ul>
												<li>
													<div className="dv_for_flex">
														<div className="img_dv">
															<img src={p8} />
														</div>
														<div className="text_dv">
															<h5>
																<span className="blod_area">
																	Phone Number :{" "}
																</span>
																+1 234 567 890
															</h5>
														</div>
													</div>
												</li>
												<li>
													<div className="dv_for_flex">
														<div className="img_dv">
															<img src={p4} />
														</div>
														<div className="text_dv">
															<h5>
																<span className="blod_area">Occupation :</span>
																Job
															</h5>
														</div>
													</div>
												</li>
											</ul>
										</div>
									</div>

									<div className="col-md-3">
										<div className="edit_btn text-end">
											<Link to="/edit-men-profile">
												<button>
													<span className="d-flex gap-3 align-content-center justify-content-center">
														<img
															src={editimg}
															alt="Edit image"
															className="edit_img me-2"
														/>
														Edit Details
													</span>
												</button>
											</Link>
										</div>
									</div>
									<div className="col-lg-12">
										<p className="text-white secondary-medium-font">
											Message:{" "}
											<span className="secondary-regular-font">
												{" "}
												Lorem ipsum dolor sit amet, consectetur adipiscing elit,
												sed do eiusmod tempor incididunt ut labore et dolore
												magna aliqua. Ut enim ad minim veniam, quis nostrud{" "}
											</span>
										</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Pictures section  */}
			<section className="pictures_sec" data-aos="fade-left">
				<div className="container">
					<div className="pic_head">
						<div className="d-flex justify-content-between">
							<h3>Pictures</h3>
						</div>
					</div>
					<div className="row mt-3">
						<div className="col-md-6">
							<div className="pictures_dv">
								<div className="pic_dv">
									<div className="del_icon d-flex align-items-center justify-content-center  ">
										<Link className="cursor-pointer">
											{/* <i class="fa fa-trash  " aria-hidden="true"></i> */}
											<img
												src={deletetrash}
												className="img-fluid wrapper-deletetrash"
											/>
										</Link>
									</div>
									<img src={manproimage} />
								</div>
							</div>
						</div>

						<div className="col-md-6">
							<div className="pictures_dv">
								<div className="pic_dv">
									<div className="del_icon d-flex align-items-center justify-content-center  ">
										<Link className="cursor-pointer">
											{/* <i class="fa fa-trash  " aria-hidden="true"></i> */}
											<img
												src={deletetrash}
												className="img-fluid wrapper-deletetrash"
											/>
										</Link>
									</div>
									<img src={manproimage1} />
								</div>
							</div>
						</div>

						<div className="col-md-6">
							<div className="pictures_dv">
								<div className="pic_dv">
									<div className="del_icon d-flex align-items-center justify-content-center  ">
										<Link className="cursor-pointer">
											{/* <i class="fa fa-trash  " aria-hidden="true"></i> */}
											<img
												src={deletetrash}
												className="img-fluid wrapper-deletetrash"
											/>
										</Link>
									</div>
									<img src={manproimage4} />
								</div>
							</div>
						</div>

						<div className="col-md-6">
							<div className="pictures_dv">
								<div className="pic_dv">
									<div className="del_icon d-flex align-items-center justify-content-center  ">
										<Link className="cursor-pointer">
											{/* <i class="fa fa-trash  " aria-hidden="true"></i> */}
											<img
												src={deletetrash}
												className="img-fluid wrapper-deletetrash"
											/>
										</Link>
									</div>
									<img src={manproimage7} />
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
			{/* ======================= */}

			{/* Video Seciton  */}
			<section className="videos_sec" data-aos="fade-right">
				<div className="container">
					<div className="pic_head">
						<div className=" d-flex  justify-content-between">
							<h3>Videos</h3>
						</div>
					</div>
					<div className="row mt-3">
						<div className="col-md-6">
							<div className="pictures_dv">
								<div className="pic_dv">
									<div className="del_icon d-flex align-items-center justify-content-center  ">
										<Link className="cursor-pointer">
											{/* <i class="fa fa-trash  " aria-hidden="true"></i> */}
											<img
												src={deletetrash}
												className="img-fluid wrapper-deletetrash"
											/>
										</Link>
									</div>
									<img src={manproimage5} />
									<div className="pic_icon">
										<i class="fa fa-play" aria-hidden="true"></i>
									</div>
								</div>
							</div>
						</div>

						<div className="col-md-6">
							<div className="pictures_dv">
								<div className="pic_dv">
									<div className="del_icon d-flex align-items-center justify-content-center  ">
										<Link className="cursor-pointer">
											{/* <i class="fa fa-trash  " aria-hidden="true"></i> */}
											<img
												src={deletetrash}
												className="img-fluid wrapper-deletetrash"
											/>
										</Link>
									</div>
									<img src={manproimage6} />
									<div className="pic_icon">
										<i class="fa fa-play" aria-hidden="true"></i>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
			{/* ============================ */}

			<Footer />
		</>
	);
}

export default Profile;

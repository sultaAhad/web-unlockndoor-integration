import React, { useEffect } from "react";
import "../../assets/Css/profile.css";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer";
import {
	edit,
	editimg,
	manproimage,
	manproimage1,
	manproimage2,
	manproimage3,
	manproimage4,
	manproimage5,
	manproimage6,
	manproimage7,
	mdi_dollar,
	message,
	notification,
	p1,
	p10,
	p2,
	p3,
	p4,
	p5,
	p7,
	p6,
	p8,
	p9,
	skillimg,
	solar_upload,
	womenproimg5,
	womenproimg6,
	womenproimg7,
	womenproimg2,
	womenproimg3,
	womenproimg4,
	womenproimg,
	womenproimg1,
	deletetrash,
	massagewrapper,
	innerpages,
} from "../../Constant/Index";
import AOS from "aos";
import { Link } from "react-router-dom";
import ProfileNavbar from "../../Components/ProfileNavbar";
import { checkMiddleware } from "../../middleware/checkMiddleware";
import { useSelector } from "react-redux";
import ImageVideo from "../../Components/ImageVideo";
import ProfileHeader from "../../Components/ProfileHeader";
function WomenProfile() {
	useEffect(() => {
		AOS.init({ duration: 1000, once: true }); // Initialize AOS with options
	}, []);
	// useEffect(() => {
	//   document.body.style.backgroundImage = `url(${innerpages})`;
	//   document.body.style.backgroundSize = "cover";
	//   document.body.style.backgroundPosition = "center";
	//   document.body.style.minHeight = "100vh";

	//   return () => {
	//     document.body.style.backgroundImage = "";
	//   };
	// }, []);

	const { user } = useSelector((state) => state.auth);
	console.log(user, "user");

	return (
		<>
			<Header />

			<section className="profile_sec" data-aos="fade-up">
				<div className="container">
					<div className="row">
						<ProfileHeader />
						<div className="col-md-12 pt-5 for-extra-space">
							<ProfileNavbar />
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
																{user?.data?.name}
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
																{user?.data?.date_of_birth}
															</h5>
														</div>
													</div>
												</li>

												<li>
													<div className="dv_for_flex">
														<div className="img_dv">
															<img src={p7} />
														</div>
														<div className="text_dv">
															<h5>
																<span className="blod_area">
																	{" "}
																	Nationality :{" "}
																</span>
																{user?.data?.nationality}
															</h5>
														</div>
													</div>
												</li>
												<li>
													<div className="dv_for_flex">
														<div className="text_dv ms-0">
															<h5>
																<span className="blod_area">
																	{" "}
																	Relationship Status:{" "}
																</span>
																{user?.data?.relationship_status}
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
																{user?.data?.email}
															</h5>
														</div>
													</div>
												</li>

												<li>
													<div className="dv_for_flex">
														<div className="img_dv">
															<img src={p6} />
														</div>
														<div className="text_dv">
															<h5>
																<span className="blod_area"> Height : </span>
																{user?.data?.height}
															</h5>
														</div>
													</div>
												</li>
												<li>
													<div className="dv_for_flex">
														<div className="text_dv ms-1 mt-1">
															<h5>
																<span className="blod_area"> Skills : </span>
																{user?.data?.skills}
															</h5>
														</div>
													</div>
												</li>
												<li>
													<div className="dv_for_flex mt-1 pt-1">
														<div className="text_dv">
															<h5>
																<span className="blod_area"> Purpose : </span>
																{user?.data?.purpose}
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
																{user?.data?.phone}
															</h5>
														</div>
													</div>
												</li>

												<li>
													<div className="dv_for_flex">
														<div className="img_dv">
															<img src={p9} />
														</div>
														<div className="text_dv">
															<h5>
																<span className="blod_area">
																	{" "}
																	Hair Color :{" "}
																</span>
																{user?.data?.hair_color}
															</h5>
														</div>
													</div>
												</li>
											</ul>
										</div>
									</div>
									<div className="col-md-3">
										<div className="edit_btn text-end">
											<Link to="/women-edit-profiles">
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
						{user?.data?.images_urls?.map((image, index) => (
							<ImageVideo key={index} file={image} type="image" />
						))}
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
						{user?.data?.videos_urls?.map((video, index) => (
							<ImageVideo key={index} file={video} type="video" />
						))}
					</div>
				</div>
			</section>
			{/* ============================ */}

			<Footer />
		</>
	);
}

export default checkMiddleware(WomenProfile, true, true);

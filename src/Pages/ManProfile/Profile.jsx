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
import { checkMiddleware } from "../../middleware/checkMiddleware";
import { useSelector } from "react-redux";
import ImageVideo from "../../Components/ImageVideo";
import ProfileHeader from "../../Components/ProfileHeader";
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

	const { user } = useSelector((state) => state.auth);

	return (
		<>
			<Header />

			<section className="profile_sec" data-aos="fade-up">
				<div className="container">
					<div className="row">
						<ProfileHeader />
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
																{user?.name}
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
																{user?.date_of_birth}
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
																{user?.income}
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
																{user?.email}
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
																{user?.skills}
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
																{user?.phone}
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
																{user?.occupation}
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
												{user?.message}
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
						{user?.images_urls.map((image, index) => (
							<ImageVideo key={index} file={image} type="image" />
						))}
					</div>
				</div>
			</section>
			<section className="videos_sec" data-aos="fade-right">
				<div className="container">
					<div className="pic_head">
						<div className=" d-flex  justify-content-between">
							<h3>Videos</h3>
						</div>
					</div>
					<div className="row mt-3">
						{user?.videos_urls.map((video, index) => (
							<ImageVideo key={index} file={video} type="video" />
						))}
					</div>
				</div>
			</section>

			<Footer />
		</>
	);
}

export default checkMiddleware(Profile, true, true);

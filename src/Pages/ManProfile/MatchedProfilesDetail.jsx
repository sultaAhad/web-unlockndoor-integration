import React, { useEffect, useState } from "react";
import "../../assets/Css/profile.css";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer";
import {
	chatimg,
	chatimg1,
	chatimg2,
	chatimg3,
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
	p10,
	p2,
	p3,
	p4,
	p5,
	p6,
	p8,
	p9,
	skillimg,
	solar_upload,
	womenproimg,
	womenproimg1,
	womenproimg2,
	womenproimg3,
	womenproimg4,
	womenproimg5,
	womenproimg6,
	womenproimg7,
} from "../../Constant/Index";
import AOS from "aos";
import { Link } from "react-router-dom";
import ThankYouModal from "../../Components/ChatModals/ThankYouModal";
import PayNowModal from "../../Components/ChatModals/PayNowModal";
import PricingModal from "../../Components/ChatModals/PricingModal";
import OfferModal from "./OfferModal";
import VideoChatModal from "../../Components/ChatModals/VideoChatModal";
function MatchedProfilesDetail() {
	// Modals
	const [showPricingModal, setShowPricingModal] = useState(false);
	const [showPayModal, setShowPayModal] = useState(false);
	const [showThankModal, setShowThankModal] = useState(false);
	const [showVideoChatModal, setShowVideoChatModal] = useState(false);

	// Offer Modal States
	const [showofferModal, setShowofferModal] = useState(false);
	const handleofferClose = () => setShowofferModal(false);
	const handleofferShow = () => setShowofferModal(true);
	const group = {
		membersCount: "1.2k",
		avatars: [chatimg, chatimg1, chatimg2, chatimg3],
	};

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
	const StartVideoCall = () => {
		if (user.gender === "men") {
			if (selectedMember?.minutes > 0) {
				connectCall();
				return;
			}
			setShowPricingModal(true);
		} else {
			connectCall();
		}
	};
	return (
		<>
			<Header />

			<section className="profile_sec" data-aos="fade-up">
				<div className="container">
					<div className="row">
						<div className="col-md-12 pb-5">
							<div className="profile_banner_img woman-profile-wrap">
								<div className="position-relative">
									<img src={womenproimg} className="img-fluid banner_img" />
									<div className="platinum-wra position-absolute right-0 top-0 p-3">
										<h5>Platinium</h5>
									</div>
								</div>
								<div className="profile_img_div">
									<img src={womenproimg1} className="img-fluid profile_imgg" />
									<h5>Tina Smith</h5>
								</div>

								<div className="account_access_dv gap-3">
									{/* Member avatars */}
									<div className="d-flex align-items-center justify-content-between pe-3">
										<div className="avatar-wrapper">
											<ul className="avatar-list d-flex align-items-center list-unstyled m-0">
												{group.avatars.map((avatar, index) => (
													<li key={index} className="me-1">
														<img
															src={avatar}
															className="img-fluid rounded-circle"
															alt={`Avatar ${index + 1}`}
															width="40"
															height="40"
														/>
													</li>
												))}
												{/* Member count */}
												<li>
													<div
														className="avaternumber bg-danger rounded-circle d-flex justify-content-center align-items-center text-white fw-bold"
														style={{ width: "40px", height: "40px" }}
													>
														{group.membersCount}
													</div>
												</li>
											</ul>
										</div>
									</div>
									<div className="data-offer">
										<Link
											className="text-decoration-none"
											onClick={handleofferShow}
										>
											<h5 className="secondary-regular-font">
												Create Date Offer
											</h5>
										</Link>
									</div>
									{/* Video Call */}
									<button
										onClick={StartVideoCall}
										className="wrapper-bg-good btn rounded-pill text-white  px-4 d-flex align-items-center gap-2"
										style={{ backgroundColor: "transparent" }}
									>
										<i className="fas fa-video"></i> Video Call
									</button>

									{/* Message */}
									<Link
										to="/chat"
										className="wrapper-bg-good btn rounded-pill text-white  px-4 d-flex align-items-center gap-2"
										style={{ backgroundColor: "transparent" }}
									>
										<img src={massagewrapper} className="img-fluid" alt="" />{" "}
										Message
									</Link>
								</div>
							</div>
						</div>

						<div className="col-md-12 pt-5 for-extra-space">
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
														<div className="text_dv">
															<h5>
																<span className="blod_area">
																	{" "}
																	Relationship Status:{" "}
																</span>
																Single
															</h5>
														</div>
													</div>
												</li>
												<li>
													<div className="dv_for_flex">
														<div className="text_dv">
															<h5>
																<span className="blod_area"> Purpose : </span>
																Multiple Man
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
															<img src={p6} />
														</div>
														<div className="text_dv">
															<h5>
																<span className="blod_area"> Height : </span>
																5.7
															</h5>
														</div>
													</div>
												</li>
												<li>
													<div className="dv_for_flex">
														<div className="text_dv">
															<h5>
																<span className="blod_area"> Skills : </span>
																Gaming , Movie , Online
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
															<img src={p9} />
														</div>
														<div className="text_dv">
															<h5>
																<span className="blod_area">
																	{" "}
																	Hair Color :{" "}
																</span>
																Black
															</h5>
														</div>
													</div>
												</li>
											</ul>
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
						<div className="col-md-6">
							<div className="pictures_dv">
								<div className="pic_dv">
									<img src={womenproimg2} />
								</div>
							</div>
						</div>

						<div className="col-md-6">
							<div className="pictures_dv">
								<div className="pic_dv">
									<img src={womenproimg3} />
								</div>
							</div>
						</div>

						<div className="col-md-6">
							<div className="pictures_dv">
								<div className="pic_dv">
									<img src={womenproimg4} />
								</div>
							</div>
						</div>

						<div className="col-md-6">
							<div className="pictures_dv request-private mt-2">
								<div className="pic_dv">
									<img src={womenproimg5} className="img-fluid mb-0 mt-0" />
									<Link to="" className="text-udderline-none">
										<div className="data-offer request-position">
											<h5>Request a private photos</h5>
										</div>
									</Link>
								</div>
								<div className="layout"></div>
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
							<div className="pictures_dv request-private mt-2">
								<div className="pic_dv">
									<img src={womenproimg6} className="img-fluid mb-0 mt-0" />
									<div className="pic_icon">
										<i class="fa fa-play" aria-hidden="true"></i>
									</div>
									<Link to="" className="text-udderline-none">
										<div className="data-offer request-position">
											<h5>Request a private photos</h5>
										</div>
									</Link>
								</div>
								<div className="layout"></div>
							</div>
						</div>

						<div className="col-md-6">
							<div className="pictures_dv">
								<div className="pic_dv">
									<img src={womenproimg7} />
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

			{/* Offer Modal  */}
			<OfferModal
				showofferModal={showofferModal}
				handleofferClose={handleofferClose}
				setShowofferModal={setShowofferModal}
			/>
			{/* Offer Modal  */}

			<PricingModal
				showPricingModal={showPricingModal}
				handlePricingClose={() => setShowPricingModal(false)}
				setShowPricingModal={setShowPricingModal}
				setShowPayModal={setShowPayModal}
			/>

			<PayNowModal
				showPayModal={showPayModal}
				handlePayClose={() => setShowPayModal(false)}
				setShowPayModal={setShowPayModal}
				setShowThankModal={setShowThankModal}
			/>

			<ThankYouModal
				showThankModal={showThankModal}
				handleThankClose={() => setShowThankModal(false)}
				setShowThankModal={setShowThankModal}
				setShowVideoChatModal={setShowVideoChatModal}
			/>

			<VideoChatModal
				showVideoChatModal={showVideoChatModal}
				handleVideoChatClose={() => setShowVideoChatModal(false)}
			/>
		</>
	);
}

export default MatchedProfilesDetail;

// import React, { useEffect, useState } from "react";
// import "../../assets/Css/profile.css";
// import Header from "../../Components/Header/Header";
// import Footer from "../../Components/Footer";
// import {
// 	chatimg,
// 	chatimg1,
// 	chatimg2,
// 	chatimg3,
// 	womenproimg,
// 	womenproimg1,
// 	womenproimg2,
// 	womenproimg3,
// 	womenproimg4,
// 	womenproimg5,
// 	womenproimg6,
// 	womenproimg7,
// 	massagewrapper,
// 	innerpages,
// 	p1,
// 	p2,
// 	p5,
// 	p6,
// 	p8,
// 	p9,
// } from "../../Constant/Index";
// import AOS from "aos";
// import { Link, useLocation, useParams } from "react-router-dom";
// import ThankYouModal from "../../Components/ChatModals/ThankYouModal";
// import PayNowModal from "../../Components/ChatModals/PayNowModal";
// import PricingModal from "../../Components/ChatModals/PricingModal";
// import OfferModal from "./OfferModal";
// import VideoChatModal from "../../Components/ChatModals/VideoChatModal";

// function MatchedProfilesDetail() {
// 	const [showPricingModal, setShowPricingModal] = useState(false);
// 	const [showPayModal, setShowPayModal] = useState(false);
// 	const [showThankModal, setShowThankModal] = useState(false);
// 	const [showVideoChatModal, setShowVideoChatModal] = useState(false);
// 	const [showofferModal, setShowofferModal] = useState(false);
// 	const { state } = useLocation();
// 	const { id } = useParams();
// 	const selectedMember = state?.card || {}; // agar refresh ho gaya to empty object
// 	console.log("🟢 Selected Member Data:", selectedMember);
// 	const user = { gender: localStorage.getItem("gender") };

// 	const isLocked = !selectedMember?.minutes || selectedMember?.minutes === 0;

// 	useEffect(() => {
// 		AOS.init({ duration: 1000, once: true });
// 		document.body.style.backgroundImage = `url(${innerpages})`;
// 		document.body.style.backgroundSize = "cover";
// 		document.body.style.backgroundPosition = "center";
// 		document.body.style.minHeight = "100vh";

// 		console.log("🟢 Selected Member Data:", selectedMember);

// 		return () => {
// 			document.body.style.backgroundImage = "";
// 		};
// 	}, [selectedMember]);

// 	// ✅ Offer Modal
// 	const handleofferClose = () => setShowofferModal(false);
// 	const handleofferShow = () => setShowofferModal(true);

// 	// ✅ Video Call Logic
// 	const StartVideoCall = () => {
// 		if (user.gender === "men") {
// 			if (selectedMember?.minutes > 0) {
// 				connectCall();
// 				return;
// 			}
// 			setShowPricingModal(true);
// 		} else {
// 			connectCall();
// 		}
// 	};

// 	const connectCall = () => {
// 		alert("Starting Video Call..."); // Replace with your real logic
// 	};

// 	const group = {
// 		membersCount: "1.2k",
// 		avatars: [chatimg, chatimg1, chatimg2, chatimg3],
// 	};

// 	return (
// 		<>
// 			<Header />

// 			<section className="profile_sec" data-aos="fade-up">
// 				<div className="container">
// 					<div className="row">
// 						<div className="col-md-12 pb-5">
// 							<div className="profile_banner_img woman-profile-wrap">
// 								<div className="position-relative">
// 									<img src={womenproimg} className="img-fluid banner_img" />
// 									<div className="platinum-wra position-absolute right-0 top-0 p-3">
// 										<h5>Platinum</h5>
// 									</div>
// 								</div>
// 								<div className="profile_img_div">
// 									<img src={womenproimg1} className="img-fluid profile_imgg" />
// 									<h5>{selectedMember?.name || "Tina Smith"}</h5>
// 								</div>

// 								<div className="account_access_dv gap-3">
// 									<div className="d-flex align-items-center justify-content-between pe-3">
// 										<div className="avatar-wrapper">
// 											<ul className="avatar-list d-flex align-items-center list-unstyled m-0">
// 												{group.avatars.map((avatar, index) => (
// 													<li key={index} className="me-1">
// 														<img
// 															src={avatar}
// 															className="img-fluid rounded-circle"
// 															alt={`Avatar ${index + 1}`}
// 															width="40"
// 															height="40"
// 														/>
// 													</li>
// 												))}
// 												<li>
// 													<div
// 														className="avaternumber bg-danger rounded-circle d-flex justify-content-center align-items-center text-white fw-bold"
// 														style={{ width: "40px", height: "40px" }}
// 													>
// 														{group.membersCount}
// 													</div>
// 												</li>
// 											</ul>
// 										</div>
// 									</div>

// 									<div className="data-offer">
// 										<Link
// 											className="text-decoration-none"
// 											onClick={handleofferShow}
// 										>
// 											<h5 className="secondary-regular-font">
// 												Create Date Offer
// 											</h5>
// 										</Link>
// 									</div>

// 									{/* ✅ Video Call */}
// 									<button
// 										onClick={StartVideoCall}
// 										className="wrapper-bg-good btn rounded-pill text-white px-4 d-flex align-items-center gap-2"
// 										style={{ backgroundColor: "transparent" }}
// 									>
// 										<i className="fas fa-video"></i> Video Call
// 									</button>

// 									{/* Message */}
// 									<Link
// 										to="/chat"
// 										className="wrapper-bg-good btn rounded-pill text-white px-4 d-flex align-items-center gap-2"
// 										style={{ backgroundColor: "transparent" }}
// 									>
// 										<img src={massagewrapper} className="img-fluid" alt="" />{" "}
// 										Message
// 									</Link>
// 								</div>
// 							</div>
// 						</div>

// 						{/* Profile Info */}
// 						<div className="col-md-12 pt-5 for-extra-space">
// 							<div className="profile_info_dv">
// 								<div className="row">
// 									<div className="col-md-3">
// 										<div className="info_ul">
// 											<ul>
// 												<li>
// 													<div className="dv_for_flex">
// 														<div className="img_dv">
// 															<img src={p1} />
// 														</div>
// 														<div className="text_dv">
// 															<h5>
// 																<span className="blod_area">Name: </span>
// 																{selectedMember?.name || "John Smith"}
// 															</h5>
// 														</div>
// 													</div>
// 												</li>
// 												<li>
// 													<div className="dv_for_flex">
// 														<div className="img_dv">
// 															<img src={p2} />
// 														</div>
// 														<div className="text_dv">
// 															<h5>
// 																<span className="blod_area">DOB: </span>
// 																14/02/2001
// 															</h5>
// 														</div>
// 													</div>
// 												</li>
// 												<li>
// 													<div className="dv_for_flex">
// 														<div className="text_dv">
// 															<h5>
// 																<span className="blod_area">
// 																	Relationship Status:
// 																</span>{" "}
// 																Single
// 															</h5>
// 														</div>
// 													</div>
// 												</li>
// 												<li>
// 													<div className="dv_for_flex">
// 														<div className="text_dv">
// 															<h5>
// 																<span className="blod_area">Purpose: </span>
// 																Multiple Man
// 															</h5>
// 														</div>
// 													</div>
// 												</li>
// 											</ul>
// 										</div>
// 									</div>

// 									<div className="col-md-3">
// 										<div className="info_ul">
// 											<ul>
// 												<li>
// 													<div className="dv_for_flex">
// 														<div className="img_dv">
// 															<img src={p5} />
// 														</div>
// 														<div className="text_dv">
// 															<h5>
// 																<span className="blod_area">Email: </span>
// 																Info@lorem.com
// 															</h5>
// 														</div>
// 													</div>
// 												</li>

// 												<li>
// 													<div className="dv_for_flex">
// 														<div className="img_dv">
// 															<img src={p6} />
// 														</div>
// 														<div className="text_dv">
// 															<h5>
// 																<span className="blod_area">Height: </span>
// 																5.7
// 															</h5>
// 														</div>
// 													</div>
// 												</li>

// 												<li>
// 													<div className="dv_for_flex">
// 														<div className="text_dv">
// 															<h5>
// 																<span className="blod_area">Skills: </span>
// 																Gaming, Movie, Online
// 															</h5>
// 														</div>
// 													</div>
// 												</li>
// 											</ul>
// 										</div>
// 									</div>

// 									<div className="col-md-3">
// 										<div className="info_ul">
// 											<ul>
// 												<li>
// 													<div className="dv_for_flex">
// 														<div className="img_dv">
// 															<img src={p8} />
// 														</div>
// 														<div className="text_dv">
// 															<h5>
// 																<span className="blod_area">Phone: </span>
// 																+1 234 567 890
// 															</h5>
// 														</div>
// 													</div>
// 												</li>

// 												<li>
// 													<div className="dv_for_flex">
// 														<div className="img_dv">
// 															<img src={p9} />
// 														</div>
// 														<div className="text_dv">
// 															<h5>
// 																<span className="blod_area">Hair Color: </span>
// 																Black
// 															</h5>
// 														</div>
// 													</div>
// 												</li>
// 											</ul>
// 										</div>
// 									</div>
// 								</div>
// 							</div>
// 						</div>
// 					</div>
// 				</div>
// 			</section>

// 			{/* ✅ Pictures Section */}
// 			<section className="pictures_sec" data-aos="fade-left">
// 				<div className="container">
// 					<div className="pic_head">
// 						<div className="d-flex justify-content-between">
// 							<h3>Pictures</h3>
// 						</div>
// 					</div>
// 					<div className="row mt-3">
// 						{isLocked ? (
// 							<div className="text-center">
// 								<h5 className="text-muted">
// 									🔒 Locked — Buy minutes to view photos
// 								</h5>
// 							</div>
// 						) : (
// 							<>
// 								<div className="col-md-6">
// 									<div className="pictures_dv">
// 										<div className="pic_dv">
// 											<img src={womenproimg2} />
// 										</div>
// 									</div>
// 								</div>

// 								<div className="col-md-6 opacity-25">
// 									<div className="pictures_dv">
// 										<div className="pic_dv">
// 											<img src={womenproimg3} />
// 										</div>
// 									</div>
// 								</div>
// 							</>
// 						)}

// 						{/* Request a private photos */}
// 						<div className="col-md-12 text-center mt-3">
// 							<Link
// 								to="#"
// 								className="btn btn-outline-primary"
// 								onClick={() => setShowPricingModal(true)}
// 							>
// 								Request Private Photos
// 							</Link>
// 						</div>
// 					</div>
// 				</div>
// 			</section>

// 			{/* ✅ Videos Section */}
// 			<section className="videos_sec" data-aos="fade-right">
// 				<div className="container">
// 					<div className="pic_head">
// 						<div className="d-flex justify-content-between">
// 							<h3>Videos</h3>
// 						</div>
// 					</div>
// 					<div className="row mt-3">
// 						{isLocked ? (
// 							<div className="text-center">
// 								<h5 className="text-muted">
// 									🔒 Locked — Buy minutes to view videos
// 								</h5>
// 							</div>
// 						) : (
// 							<>
// 								<div className="col-md-6">
// 									<div className="pictures_dv">
// 										<div className="pic_dv position-relative">
// 											<img src={womenproimg6} className="img-fluid" />
// 											<div className="pic_icon">
// 												<i className="fa fa-play" aria-hidden="true"></i>
// 											</div>
// 										</div>
// 									</div>
// 								</div>

// 								<div className="col-md-6 opacity-25">
// 									<div className="pictures_dv">
// 										<div className="pic_dv position-relative">
// 											<img src={womenproimg7} className="img-fluid" />
// 											<div className="pic_icon">
// 												<i className="fa fa-play" aria-hidden="true"></i>
// 											</div>
// 										</div>
// 									</div>
// 								</div>
// 							</>
// 						)}

// 						<div className="col-md-12 text-center mt-3">
// 							<Link
// 								to="#"
// 								className="btn btn-outline-primary"
// 								onClick={() => setShowPricingModal(true)}
// 							>
// 								Request Private Videos
// 							</Link>
// 						</div>
// 					</div>
// 				</div>
// 			</section>

// 			<Footer />

// 			{/* ✅ Modals */}
// 			<OfferModal
// 				showofferModal={showofferModal}
// 				handleofferClose={handleofferClose}
// 				setShowofferModal={setShowofferModal}
// 				womenId={selectedMember?.id} // ✅ ADD THIS
// 			/>

// 			<PricingModal
// 				showPricingModal={showPricingModal}
// 				handlePricingClose={() => setShowPricingModal(false)}
// 				setShowPricingModal={setShowPricingModal}
// 				setShowPayModal={setShowPayModal}
// 			/>

// 			<PayNowModal
// 				showPayModal={showPayModal}
// 				handlePayClose={() => setShowPayModal(false)}
// 				setShowPayModal={setShowPayModal}
// 				setShowThankModal={setShowThankModal}
// 			/>

// 			<ThankYouModal
// 				showThankModal={showThankModal}
// 				handleThankClose={() => setShowThankModal(false)}
// 				setShowThankModal={setShowThankModal}
// 				setShowVideoChatModal={setShowVideoChatModal}
// 			/>

// 			<VideoChatModal
// 				showVideoChatModal={showVideoChatModal}
// 				handleVideoChatClose={() => setShowVideoChatModal(false)}
// 			/>
// 		</>
// 	);
// }

// export default MatchedProfilesDetail;

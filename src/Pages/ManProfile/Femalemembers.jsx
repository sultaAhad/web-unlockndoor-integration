import React, { useEffect, useState } from "react";
import "../../assets/Css/profile.css";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer";
import {
	bid_five,
	bid_four,
	bid_one,
	bid_six,
	bid_three,
	bid_two,
	edit,
	innerpages1,
	massagewrapper,
	matchprofile1,
	matchprofile2,
	matchprofile3,
	matchprofile4,
	matchprofile5,
	matchprofile6,
	matchprofile7,
	mchat,
	message,
	notification,
} from "../../Constant/Index";
import AOS from "aos";
import { Link } from "react-router-dom";
import ProfileNavbartwo from "../../Components/ProfileNavbartwo";
import VideoChatModal from "../../Components/ChatModals/videoChatModal";
import ThankYouModal from "../../Components/ChatModals/ThankYouModal";
import PayNowModal from "../../Components/ChatModals/PayNowModal";
import PricingModal from "../../Components/ChatModals/PricingModal";
import OfferModal from "./OfferModal";

function Femalemembers() {
	// Modals
	const [showPricingModal, setShowPricingModal] = useState(false);
	const [showPayModal, setShowPayModal] = useState(false);
	const [showThankModal, setShowThankModal] = useState(false);
	const [showVideoChatModal, setShowVideoChatModal] = useState(false);
	// Reoffer Modal States
	// Reoffer Modal
	const [showofferModal, setShowofferModal] = useState(false);

	const handleofferClose = () => setShowofferModal(false);
	const handleofferShow = () => setShowofferModal(true);

	useEffect(() => {
		AOS.init({ duration: 1000, once: true });
	}, []);

	const handleModal = (type) => {
		if (type === "video") {
			setShowVideoChatModal(true);
		} else {
			setShowPricingModal(true);
		}
	};
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
								<div className="account_access_dv">
									<div className="notify_edit_dv">
										<ul>
											<Link
												className="text-decoration-none text-white secondary-secondregular-font"
												to="/chat"
											>
												<li className="wrapper-navigate-main position-relative">
													<img src={massagewrapper} /> <span>Message</span>
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

						<div className="col-md-12 pt-5 for-extra-space1 mt-4">
							<ProfileNavbartwo />
						</div>
					</div>
				</div>
			</section>

			<section className="videos_sec" data-aos="fade-right">
				<div className="container">
					<div className="row">
						<div className="col-lg-4 col-md-6 mb-4">
							<div className="profile-card">
								<span className="card-badge silver">Silver</span>
								<div className="card-icons">
									<div className="icon-circle iconwra1">
										<Link to="/chat">
											<img
												src={mchat}
												className="img-fluid d-widht-wr"
												alt=""
											/>
										</Link>
									</div>
								</div>
								<img src={bid_one} alt="profile" className="card-image" />
								<div className="play-button">
									<i className="fa-solid fa-play"></i>
								</div>
								<Link to="/woman-details">
									<div className="card-footer text-white text-decoration-none">
										<h4>Tina Smith</h4>
										<p>California, USA</p>
									</div>
								</Link>
								<div className="card-actions">
									<div>
										<span className="like-count me-0 ms-1">200</span>
										<div className="wrapper-dash">
											<div className="icon-circle linear-bg">
												<i className="fa-solid fa-heart"></i>
											</div>
										</div>
									</div>
									<div className="wrapper-dash">
										<div className="icon-circle">
											<i className="fa-solid fa-xmark close-icon"></i>
										</div>
									</div>
								</div>
							</div>
						</div>

						<div className="col-lg-4 col-md-6 mb-4">
							<div className="profile-card">
								<span className="card-badge gold">Gold</span>
								<div className="card-icons">
									<div className="icon-circle iconwra1">
										<Link to="/chat">
											<img
												src={mchat}
												className="img-fluid d-widht-wr"
												alt=""
											/>
										</Link>
									</div>
									<div className="icon-circle iconwra2">
										<Link
											to="#"
											onClick={(e) => {
												e.preventDefault();
												handleModal("pricing");
											}}
										>
											<i className="fa-solid fa-video video-icon"></i>
										</Link>
									</div>
								</div>
								<img src={bid_two} alt="profile" className="card-image" />
								<div className="play-button">
									<i className="fa-solid fa-play"></i>
								</div>
								<div className="card-footer">
									<h4>Lisa Brown</h4>
									<p>New York, USA</p>
								</div>
								<div className="card-actions">
									<div>
										<span className="like-count me-0 ms-1">200</span>
										<div className="wrapper-dash">
											<div className="icon-circle linear-bg">
												<i className="fa-solid fa-heart"></i>
											</div>
										</div>
									</div>
									<div className="wrapper-dash">
										<div className="icon-circle">
											<i className="fa-solid fa-xmark close-icon"></i>
										</div>
									</div>
								</div>
							</div>
						</div>

						<div className="col-lg-4 col-md-6 mb-4">
							<div className="profile-card">
								<span className="card-badge platinum">Platinum</span>
								<div className="card-icons">
									<div className="icon-circle iconwra1">
										<Link
											to="#"
											onClick={(e) => {
												e.preventDefault();
												handleModal("pricing");
											}}
										>
											<img
												src={mchat}
												className="img-fluid d-widht-wr"
												alt=""
											/>
										</Link>
									</div>
									<div className="icon-circle iconwra2">
										<Link
											to="#"
											onClick={(e) => {
												e.preventDefault();
												handleModal("video");
											}}
										>
											<i className="fa-solid fa-video video-icon"></i>
										</Link>
									</div>
									<div className="icon-circle iconwra3">
										<Link
											to="#"
											onClick={(e) => {
												e.preventDefault();
												handleofferShow(); // NOT reoffer
											}}
										>
											<i className="fa-solid fa-heart-circle-plus heart-icon"></i>
										</Link>
									</div>
								</div>
								<img src={bid_three} alt="profile" className="card-image" />
								<div className="play-button">
									<i className="fa-solid fa-play"></i>
								</div>
								<div className="card-footer">
									<h4>Emily Davis</h4>
									<p>Texas, USA</p>
								</div>
								<div className="card-actions">
									<div>
										<span className="like-count me-0 ms-1">200</span>
										<Link className="wrapper-dash" to="/woman-details">
											<div className="icon-circle linear-bg">
												<i className="fa-solid fa-heart"></i>
											</div>
										</Link>
									</div>
									<Link className="wrapper-dash">
										<div className="icon-circle">
											<i className="fa-solid fa-xmark close-icon"></i>
										</div>
									</Link>
								</div>
							</div>
						</div>
						<div className="col-lg-4 col-md-6 mb-4">
							<div className="profile-card">
								<span className="card-badge silver">Silver</span>
								<div className="card-icons">
									<div className="icon-circle iconwra1">
										<Link to="/chat">
											<img
												src={mchat}
												className="img-fluid d-widht-wr"
												alt=""
											/>
										</Link>
									</div>
								</div>
								<img src={bid_four} alt="profile" className="card-image" />
								<div className="play-button">
									<i className="fa-solid fa-play"></i>
								</div>
								<div className="card-footer">
									<h4>Tina Smith</h4>
									<p>California, USA</p>
								</div>
								<div className="card-actions">
									<div>
										<span className="like-count me-0 ms-1">200</span>
										<Link className="wrapper-dash" to="/woman-details">
											<div className="icon-circle linear-bg">
												<i className="fa-solid fa-heart"></i>
											</div>
										</Link>
									</div>
									<Link className="wrapper-dash">
										<div className="icon-circle">
											<i className="fa-solid fa-xmark close-icon"></i>
										</div>
									</Link>
								</div>
							</div>
						</div>

						<div className="col-lg-4 col-md-6 mb-4">
							<div className="profile-card">
								<span className="card-badge gold">Gold</span>
								<div className="card-icons">
									<div className="icon-circle iconwra1">
										<Link to="/chat">
											<img
												src={mchat}
												className="img-fluid d-widht-wr"
												alt=""
											/>
										</Link>
									</div>
									<div className="icon-circle iconwra2">
										<Link
											to="#"
											onClick={(e) => {
												e.preventDefault();
												handleModal("pricing");
											}}
										>
											<i className="fa-solid fa-video video-icon"></i>
										</Link>
									</div>
								</div>
								<img src={bid_five} alt="profile" className="card-image" />
								<div className="play-button">
									<i className="fa-solid fa-play"></i>
								</div>
								<div className="card-footer">
									<h4>Lisa Brown</h4>
									<p>New York, USA</p>
								</div>
								<div className="card-actions">
									<div>
										<span className="like-count me-0 ms-1">200</span>
										<Link className="wrapper-dash" to="/woman-details">
											<div className="icon-circle linear-bg">
												<i className="fa-solid fa-heart"></i>
											</div>
										</Link>
									</div>
									<Link className="wrapper-dash">
										<div className="icon-circle">
											<i className="fa-solid fa-xmark close-icon"></i>
										</div>
									</Link>
								</div>
							</div>
						</div>

						<div className="col-lg-4 col-md-6 mb-4">
							<div className="profile-card">
								<span className="card-badge platinum">Platinum</span>
								<div className="card-icons">
									<div className="icon-circle iconwra1">
										<Link
											to="#"
											onClick={(e) => {
												e.preventDefault();
												handleModal("pricing");
											}}
										>
											<img
												src={mchat}
												className="img-fluid d-widht-wr"
												alt=""
											/>
										</Link>
									</div>
									<div className="icon-circle iconwra2">
										<Link
											to="#"
											onClick={(e) => {
												e.preventDefault();
												handleModal("video");
											}}
										>
											<i className="fa-solid fa-video video-icon"></i>
										</Link>
									</div>
									<div className="icon-circle iconwra3">
										<Link
											to="#"
											onClick={(e) => {
												e.preventDefault();
												handleofferShow(); // NOT reoffer
											}}
										>
											<i className="fa-solid fa-heart-circle-plus heart-icon"></i>
										</Link>
									</div>
								</div>
								<img src={matchprofile2} alt="profile" className="card-image" />
								<div className="play-button">
									<i className="fa-solid fa-play"></i>
								</div>
								<div className="card-footer">
									<h4>Emily Davis</h4>
									<p>Texas, USA</p>
								</div>
								<div className="card-actions">
									<div>
										<span className="like-count me-0 ms-1">200</span>
										<Link className="wrapper-dash" to="/woman-details">
											<div className="icon-circle linear-bg">
												<i className="fa-solid fa-heart"></i>
											</div>
										</Link>
									</div>
									<Link className="wrapper-dash">
										<div className="icon-circle">
											<i className="fa-solid fa-xmark close-icon"></i>
										</div>
									</Link>
								</div>
							</div>
						</div>
						<div className="col-lg-4 col-md-6 mb-4">
							<div className="profile-card">
								<span className="card-badge silver">Silver</span>
								<div className="card-icons">
									<div className="icon-circle iconwra1">
										<Link to="/chat">
											<img
												src={mchat}
												className="img-fluid d-widht-wr"
												alt=""
											/>
										</Link>
									</div>
								</div>
								<img src={matchprofile4} alt="profile" className="card-image" />
								<div className="play-button">
									<i className="fa-solid fa-play"></i>
								</div>
								<div className="card-footer">
									<h4>Tina Smith</h4>
									<p>California, USA</p>
								</div>
								<div className="card-actions">
									<div>
										<span className="like-count me-0 ms-1">200</span>
										<Link className="wrapper-dash" to="/woman-details">
											<div className="icon-circle linear-bg">
												<i className="fa-solid fa-heart"></i>
											</div>
										</Link>
									</div>
									<Link className="wrapper-dash">
										<div className="icon-circle">
											<i className="fa-solid fa-xmark close-icon"></i>
										</div>
									</Link>
								</div>
							</div>
						</div>

						<div className="col-lg-4 col-md-6 mb-4">
							<div className="profile-card">
								<span className="card-badge gold">Gold</span>
								<div className="card-icons">
									<div className="icon-circle iconwra1">
										<Link to="/chat">
											<img
												src={mchat}
												className="img-fluid d-widht-wr"
												alt=""
											/>
										</Link>
									</div>
									<div className="icon-circle iconwra2">
										<Link
											to="#"
											onClick={(e) => {
												e.preventDefault();
												handleModal("pricing");
											}}
										>
											<i className="fa-solid fa-video video-icon"></i>
										</Link>
									</div>
								</div>
								<img src={matchprofile3} alt="profile" className="card-image" />
								<div className="play-button">
									<i className="fa-solid fa-play"></i>
								</div>
								<div className="card-footer">
									<h4>Lisa Brown</h4>
									<p>New York, USA</p>
								</div>
								<div className="card-actions">
									<div>
										<span className="like-count me-0 ms-1">200</span>
										<Link className="wrapper-dash" to="/woman-details">
											<div className="icon-circle linear-bg">
												<i className="fa-solid fa-heart"></i>
											</div>
										</Link>
									</div>
									<Link className="wrapper-dash">
										<div className="icon-circle">
											<i className="fa-solid fa-xmark close-icon"></i>
										</div>
									</Link>
								</div>
							</div>
						</div>

						<div className="col-lg-4 col-md-6 mb-4">
							<div className="profile-card">
								<span className="card-badge platinum">Platinum</span>
								<div className="card-icons">
									<div className="icon-circle iconwra1">
										<Link
											to="#"
											onClick={(e) => {
												e.preventDefault();
												handleModal("pricing");
											}}
										>
											<img
												src={mchat}
												className="img-fluid d-widht-wr"
												alt=""
											/>
										</Link>
									</div>
									<div className="icon-circle iconwra2">
										<Link
											to="#"
											onClick={(e) => {
												e.preventDefault();
												handleModal("video");
											}}
										>
											<i className="fa-solid fa-video video-icon"></i>
										</Link>
									</div>
									<div className="icon-circle iconwra3">
										<Link
											to="#"
											onClick={(e) => {
												e.preventDefault();
												handleofferShow(); // NOT reoffer
											}}
										>
											<i className="fa-solid fa-heart-circle-plus heart-icon"></i>
										</Link>
									</div>
								</div>
								<img src={matchprofile3} alt="profile" className="card-image" />
								<div className="play-button">
									<i className="fa-solid fa-play"></i>
								</div>
								<div className="card-footer">
									<h4>Emily Davis</h4>
									<p>Texas, USA</p>
								</div>
								<div className="card-actions">
									<div>
										<span className="like-count me-0 ms-1">200</span>
										<Link className="wrapper-dash" to="/woman-details">
											<div className="icon-circle linear-bg">
												<i className="fa-solid fa-heart"></i>
											</div>
										</Link>
									</div>
									<Link className="wrapper-dash">
										<div className="icon-circle">
											<i className="fa-solid fa-xmark close-icon"></i>
										</div>
									</Link>
								</div>
							</div>
						</div>
						<div className="col-lg-4 col-md-6 mb-4">
							<div className="profile-card">
								<span className="card-badge silver">Silver</span>
								<div className="card-icons">
									<div className="icon-circle iconwra1">
										<Link to="/chat">
											<img
												src={mchat}
												className="img-fluid d-widht-wr"
												alt=""
											/>
										</Link>
									</div>
								</div>
								<img src={matchprofile5} alt="profile" className="card-image" />
								<div className="play-button">
									<i className="fa-solid fa-play"></i>
								</div>
								<div className="card-footer">
									<h4>Tina Smith</h4>
									<p>California, USA</p>
								</div>
								<div className="card-actions">
									<div>
										<span className="like-count me-0 ms-1">200</span>
										<Link className="wrapper-dash" to="/woman-details">
											<div className="icon-circle linear-bg">
												<i className="fa-solid fa-heart"></i>
											</div>
										</Link>
									</div>
									<Link className="wrapper-dash">
										<div className="icon-circle">
											<i className="fa-solid fa-xmark close-icon"></i>
										</div>
									</Link>
								</div>
							</div>
						</div>

						<div className="col-lg-4 col-md-6 mb-4">
							<div className="profile-card">
								<span className="card-badge gold">Gold</span>
								<div className="card-icons">
									<div className="icon-circle iconwra1">
										<Link to="/chat">
											<img
												src={mchat}
												className="img-fluid d-widht-wr"
												alt=""
											/>
										</Link>
									</div>
									<div className="icon-circle iconwra2">
										<Link
											to="#"
											onClick={(e) => {
												e.preventDefault();
												handleModal("pricing");
											}}
										>
											<i className="fa-solid fa-video video-icon"></i>
										</Link>
									</div>
								</div>
								<img src={matchprofile6} alt="profile" className="card-image" />
								<div className="play-button">
									<i className="fa-solid fa-play"></i>
								</div>
								<div className="card-footer">
									<h4>Lisa Brown</h4>
									<p>New York, USA</p>
								</div>
								<div className="card-actions">
									<div>
										<span className="like-count me-0 ms-1">200</span>
										<Link className="wrapper-dash" to="/woman-details">
											<div className="icon-circle linear-bg">
												<i className="fa-solid fa-heart"></i>
											</div>
										</Link>
									</div>
									<Link className="wrapper-dash">
										<div className="icon-circle">
											<i className="fa-solid fa-xmark close-icon"></i>
										</div>
									</Link>
								</div>
							</div>
						</div>

						<div className="col-lg-4 col-md-6 mb-4">
							<div className="profile-card">
								<span className="card-badge platinum">Platinum</span>
								<div className="card-icons">
									<div className="icon-circle iconwra1">
										<Link
											to="#"
											onClick={(e) => {
												e.preventDefault();
												handleModal("pricing");
											}}
										>
											<img
												src={mchat}
												className="img-fluid d-widht-wr"
												alt=""
											/>
										</Link>
									</div>
									<div className="icon-circle iconwra2">
										<Link
											to="#"
											onClick={(e) => {
												e.preventDefault();
												handleModal("video");
											}}
										>
											<i className="fa-solid fa-video video-icon"></i>
										</Link>
									</div>
									<div className="icon-circle iconwra3">
										<Link
											to="#"
											onClick={(e) => {
												e.preventDefault();
												handleofferShow(); // NOT reoffer
											}}
										>
											<i className="fa-solid fa-heart-circle-plus heart-icon"></i>
										</Link>
									</div>
								</div>
								<img src={matchprofile7} alt="profile" className="card-image" />
								<div className="play-button">
									<i className="fa-solid fa-play"></i>
								</div>
								<div className="card-footer">
									<h4>Emily Davis</h4>
									<p>Texas, USA</p>
								</div>
								<div className="card-actions">
									<div>
										<span className="like-count me-0 ms-1">200</span>
										<Link className="wrapper-dash" to="/woman-details">
											<div className="icon-circle linear-bg">
												<i className="fa-solid fa-heart"></i>
											</div>
										</Link>
									</div>
									<Link className="wrapper-dash">
										<div className="icon-circle">
											<i className="fa-solid fa-xmark close-icon"></i>
										</div>
									</Link>
								</div>
							</div>
						</div>
					</div>

					<div className="row">
						<div className="col-lg-2 mx-auto">
							<button className="btn-write secondary-medium-font load-more-wrapper rounded-0 d-flex align-items-center justify-content-center extra-bg-1 border-none">
								Load More
							</button>
						</div>
					</div>
				</div>
			</section>

			{/* Modals */}
			<OfferModal
				showofferModal={showofferModal}
				handleofferClose={handleofferClose}
			/>

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

			<Footer />
		</>
	);
}

export default Femalemembers;

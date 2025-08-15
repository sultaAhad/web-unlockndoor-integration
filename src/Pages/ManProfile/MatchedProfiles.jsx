import React, { useEffect, useState } from "react";
import "../../assets/Css/matchprofile.css";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer";
import {
	bid_one,
	edit,
	massagewrapper,
	matchprofile,
	matchprofile1,
	matchprofile2,
	matchprofile3,
	matchprofile4,
	matchprofile5,
	matchprofile6,
	matchprofile7,
	matchprofile8,
	matchprofile9,
	message,
	notification,
	mchat,
	manproimage3,
	manproimage2,
	innerpages, // ✅ Added mchat import
} from "../../Constant/Index";
import AOS from "aos";
import { Link } from "react-router-dom";
import ProfileNavbartwo from "../../Components/ProfileNavbartwo";
import VideoChatModal from "../../Components/ChatModals/videoChatModal";
import ThankYouModal from "../../Components/ChatModals/ThankYouModal";
import PayNowModal from "../../Components/ChatModals/PayNowModal";
import PricingModal from "../../Components/ChatModals/PricingModal";

function MatchedProfiles() {
	const [showPricingModal, setShowPricingModal] = useState(false);
	const handlePricingClose = () => setShowPricingModal(false);
	const handlePricingShow = () => setShowPricingModal(true);

	const [showPayModal, setShowPayModal] = useState(false);
	const handlePayClose = () => setShowPayModal(false);
	const handlePayShow = () => setShowPayModal(true);

	const [showThankModal, setShowThankModal] = useState(false);
	const handleThankClose = () => setShowThankModal(false);
	const handleThankShow = () => setShowThankModal(true);

	const [showVideoChatModal, setShowVideoChatModal] = useState(false);
	const handleVideoChatClose = () => setShowVideoChatModal(false);
	const handleVideoChatShow = () => setShowVideoChatModal(true);

	const [showVideoModal, setShowVideoModal] = useState(false);
	const handleVideoClose = () => setShowVideoModal(false);
	const handleVideoShow = () => setShowVideoModal(true);

	const cards = [
		{ image: matchprofile },
		{ image: matchprofile1 },
		{ image: matchprofile2 },
		{ image: matchprofile3 },
		{ image: matchprofile4 },
		{ image: matchprofile5 },
		{ image: matchprofile6 },
		{ image: matchprofile7 },
		{ image: matchprofile8 },
		{ image: matchprofile9 },
		{ image: matchprofile6 },
		{ image: matchprofile7 },
	];

	useEffect(() => {
		AOS.init({ duration: 1000, once: true });
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

			<section className="videos_sec" data-aos="fade-right">
				<div className="container">
					<div className="row">
						{cards.map((card, index) => (
							<div className="col-lg-4 col-md-6 mb-4" key={index}>
								<div className="profile-card">
									<img src={card.image} alt="profile" className="card-image" />

									<div className="card-bottom d-flex justify-content-between align-items-end">
										{/* Left: Icons */}
										<div className="card-left-icons d-flex align-items-center gap-2">
											<Link to="/chat" className="bottom-icon comment-icon">
												<img
													src={mchat}
													alt="chat"
													className="chat-image-icon"
												/>
											</Link>
											<Link
												to="#"
												className="bottom-icon video-icon"
												onClick={(e) => {
													e.preventDefault();
													handlePricingShow();
												}}
											>
												<i className="fa-solid fa-video"></i>
											</Link>
										</div>

										{/* Right: View Profile */}
										<div className="card-right-actions text-end">
											<Link
												to="/matched-Profiles-detail"
												className="view-profile-btn secondary-secondmedium-font"
											>
												View Profile
											</Link>
											<img
												src={card.image}
												alt="thumb"
												className="profile-thumb"
											/>
										</div>
									</div>
								</div>
							</div>
						))}
					</div>

					<div className="row">
						<div className="col-lg-2 mx-auto">
							<div className="btn-wrapper">
								<Link
									to=""
									className="btn-write secondary-medium-font rounded-0 d-flex align-items-center justify-content-center extra-bg-1"
								>
									Load More
								</Link>
							</div>
						</div>
					</div>
				</div>
			</section>

			<PricingModal
				showPricingModal={showPricingModal}
				handlePricingClose={handlePricingClose}
				setShowPricingModal={setShowPricingModal}
				setShowPayModal={setShowPayModal}
			/>
			<PayNowModal
				showPayModal={showPayModal}
				handlePayClose={handlePayClose}
				setShowThankModal={setShowThankModal}
				setShowPayModal={setShowPayModal}
			/>
			<ThankYouModal
				showThankModal={showThankModal}
				handleThankClose={handleThankClose}
				setShowThankModal={setShowThankModal}
				setShowVideoChatModal={setShowVideoChatModal}
			/>
			<VideoChatModal
				handleVideoChatClose={handleVideoChatClose}
				showVideoChatModal={showVideoChatModal}
			/>
			<Footer />
		</>
	);
}

export default MatchedProfiles;

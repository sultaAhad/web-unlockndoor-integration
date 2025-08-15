import React, { useEffect } from "react";
import "../../assets/Css/matchprofile.css";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer";
import {
	edit,
	innerpages1,
	like,
	like1,
	like2,
	like3,
	like4,
	massagewrapper,
	message,
	notification,
	womenproimg,
	womenproimg1,
} from "../../Constant/Index";
import AOS from "aos";
import { Link } from "react-router-dom";
import ProfileNavbar from "../../Components/ProfileNavbar";
import Pagination from "../../Components/Pagination";
import LikeMatchNavigation from "../../Components/LikeMatchNavigation";

function LikeMatchMatched() {
	const cards = [
		{
			image: like,
			icons: [
				{
					iconClass: "fa-comments",
					url: "/chat-women",
					customClass: "comment-icon",
				},
				{
					iconClass: "fa-video",
					url: "/chat-women",
					customClass: "video-icon",
				},
			],
		},
		{
			image: like1,
			icons: [
				{
					iconClass: "fa-comments",
					url: "/chat-women",
					customClass: "comment-icon",
				},
				{
					iconClass: "fa-video",
					url: "/chat-women",
					customClass: "video-icon",
				},
			],
		},
		{
			image: like2,
			icons: [
				{
					iconClass: "fa-comments",
					url: "/chat-women",
					customClass: "comment-icon",
				},
				{
					iconClass: "fa-video",
					url: "/chat-women",
					customClass: "video-icon",
				},
			],
		},
		{
			image: like3,
			icons: [
				{
					iconClass: "fa-comments",
					url: "/chat-women",
					customClass: "comment-icon",
				},
				{
					iconClass: "fa-video",
					url: "/chat-women",
					customClass: "video-icon",
				},
			],
		},
		{
			image: like4,
			icons: [
				{
					iconClass: "fa-comments",
					url: "/chat-women",
					customClass: "comment-icon",
				},
				{
					iconClass: "fa-video",
					url: "/chat-women",
					customClass: "video-icon",
				},
			],
		},
		{
			image: like3,
			icons: [
				{
					iconClass: "fa-comments",
					url: "/chat-women",
					customClass: "comment-icon",
				},
				{
					iconClass: "fa-video",
					url: "/chat-women",
					customClass: "video-icon",
				},
			],
		},
	];

	useEffect(() => {
		AOS.init({ duration: 1000, once: true });
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

						<div className="col-md-12 pt-5 for-extra-space mt-5">
							<ProfileNavbar />
						</div>
					</div>
				</div>
			</section>

			<section className="videos_sec" data-aos="fade-right">
				<div className="container">
					<div className="row">
						<div className="col-lg-12">
							<LikeMatchNavigation />
						</div>
					</div>
					<div className="row">
						{cards.map((card, index) => (
							<div className="col-lg-4 col-md-6 mb-4" key={index}>
								<div className="profile-card">
									{/* Top Image */}
									<img src={card.image} alt="profile" className="card-image" />

									{/* Name and Location */}
									<div className="card-footer">
										<h4>{card.name}</h4>
										<p>{card.location}</p>
									</div>

									{/* Bottom Section */}
									<div className="card-bottom d-flex justify-content-between align-items-end">
										{/* Left Bottom Icons */}
										<div className="card-left-icons">
											{card.icons.map((iconObj, i) => (
												<Link
													to={iconObj.url}
													key={i}
													rel="noopener noreferrer"
													className={`bottom-icon ${iconObj.customClass}`}
												>
													<i className={`fa-solid ${iconObj.iconClass}`}></i>
												</Link>
											))}
										</div>

										{/* Right Bottom: View Profile + Small Image */}
										<div className="card-right-actions text-end">
											<Link to="/profile-man" className="view-profile-btn secondary-secondmedium-font">
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
					<div className="row mt-5 pt-4">
						<div className="col-lg-2 mx-auto">
							<div className="btn-wrapper">
								<Pagination />
							</div>
						</div>
					</div>
				</div>
			</section>

			<Footer />
		</>
	);
}

export default LikeMatchMatched;

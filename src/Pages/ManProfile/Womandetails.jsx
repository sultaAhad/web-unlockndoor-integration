import React, { useEffect, useRef, useState } from "react";
import "../../assets/Css/profile.css";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer";
import {
	chatimg,
	chatimg1,
	chatimg2,
	chatimg3,
	innerpages,
	massagewrapper,
	p1,
	p2,
	p5,
	p6,
	p8,
	p9,
} from "../../Constant/Index";
import AOS from "aos";
import { Link, useLocation, useParams } from "react-router-dom";
import { Button, Modal } from "react-bootstrap";
import OfferModal from "./OfferModal";
// import VideoChatModal from "../../Components/ChatModals/videoChatModal";
// import ThankYouModal from "../../Components/ChatModals/ThankYouModal";
// import PayNowModal from "../../Components/ChatModals/PayNowModal";
// import PricingModal from "../../Components/ChatModals/PricingModal";
import LikeSwapButtons from "../../Components/LikeSwapButtons";
import VideoCallButton from "../../Components/VideoCallButton";
import MakeOfferButton from "../../Components/MakeOfferButton";
import { useViewMemberProfileMutation } from "../../network/services/ManAuth";

const normalizeMember = (data) => {
	return {
		id: data.id,
		name: data.name,
		email: data.email,
		phone: data.phone,
		height: data.height,
		dob: data.date_of_birth,
		hairColor: data.hair_color,
		nationality: data.nationality,
		relationshipStatus: data.relationship_status ?? "N/A",
		purpose: data.purpose ?? "N/A",
		occupation: data.occupation,
		membershipType: data.package?.slug || "Free",

		profileImage: data.profile_image_url,
		bannerImage: data.cover_images_url,
		likes_count: data.likes_count,
		is_liked: data.is_liked,
		received_likes: data.received_likes,

		skills: data.skills ? data.skills.split(",") : [],
		pictures: data.images_urls || [],

		// 👇 videos with fallback thumbnail
		videos: (data.videos_urls || []).map((url, i) => ({
			url,
			thumbnail: data.images_urls?.[i] || "/assets/video-placeholder.jpg",
		})),
	};
};

function Womandetails() {
	const [showofferModal, setShowofferModal] = useState(false);
	const handleofferClose = () => setShowofferModal(false);
	const handleofferShow = () => setShowofferModal(true);

	const { id } = useParams();
	const location = useLocation();
	const rawMember = location.state?.member;
	const [member, setMember] = useState(
		rawMember ? normalizeMember(rawMember) : null,
	);

	const [viewMemberProfile] = useViewMemberProfileMutation();
	const hasViewedRef = useRef(false);

	useEffect(() => {
		if (!id || hasViewedRef.current) return;
		hasViewedRef.current = true;

		const sendViewRequest = async () => {
			try {
				const response = await viewMemberProfile({ women_id: id }).unwrap();
				console.log("✅ View Profile API Response:", response);
			} catch (error) {
				console.error("❌ Error viewing profile:", error);
			}
		};

		sendViewRequest();
	}, [id]);

	// Group avatars (demo)
	const group = {
		membersCount: "1.2k",
		avatars: [chatimg, chatimg1, chatimg2, chatimg3],
	};

	// Video Player modal
	const [videoModal, setVideoModal] = useState({ show: false, url: "" });
	const handleVideoOpen = (url) => setVideoModal({ show: true, url });
	const handleVideoClose = () => setVideoModal({ show: false, url: "" });

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

	const ChatLink = () => (
		<Link
			to="/chat"
			state={member}
			className="wrapper-bg-good btn rounded-pill text-white px-4 d-flex align-items-center gap-2"
			style={{ backgroundColor: "transparent" }}
		>
			<img src={massagewrapper} className="img-fluid" alt="" /> Message
		</Link>
	);

	return (
		<>
			<Header />

			<section className="profile_sec" data-aos="fade-up">
				<div className="container">
					<div className="row">
						{/* Banner + Profile */}
						<div className="col-md-12 pb-5">
							<div className="profile_banner_img woman-profile-wrap">
								<div className="position-relative">
									<img
										src={member?.bannerImage}
										className="img-fluid banner_img"
										alt="Banner"
									/>
									<div className="platinum-wra position-absolute right-0 top-0 p-3 rounded">
										<h5
											className="mb-0 text-capitalize"
											style={{
												background:
													member?.membershipType === "gold-package"
														? "gold"
														: member?.membershipType === "platinum-package"
														? "#00bfff"
														: member?.membershipType === "silver-package"
														? "#7a7a7a"
														: "black", // fallback
												fontWeight: "bold",
											}}
										>
											{member?.membershipType?.replace("-package", "")}
										</h5>
									</div>
								</div>

								<div className="profile_img_div">
									<img
										src={member?.profileImage}
										className="img-fluid profile_imgg"
										alt="Profile"
									/>
									<h5>{member?.name}</h5>
								</div>

								{/* Actions */}
								{/* Actions */}
								<div className="account_access_dv gap-3">
									<div className="d-flex align-items-center justify-content-between pe-3">
										<div className="avatar-wrapper">
											<ul className="avatar-list d-flex align-items-center list-unstyled m-0">
												{member.received_likes.map((avatar, index) => (
													<li key={index} className="me-1">
														<img
															src={avatar?.liker?.profile_image_url}
															className="img-fluid rounded-circle"
															alt={`Avatar ${index + 1}`}
															width="40"
															height="40"
														/>
													</li>
												))}
												<li>
													<div
														className="avaternumber bg-danger rounded-circle d-flex justify-content-center align-items-center text-white fw-bold"
														style={{ width: "40px", height: "40px" }}
													>
														{member.likes_count}
													</div>
												</li>
											</ul>
										</div>
									</div>

									<div className="card-actions1 d-flex align-items-center gap-2">
										<LikeSwapButtons
											type={"like"}
											femaleMember={member}
											responseAction={(response) => {
												setMember((pre) => ({
													...pre,
													likes_count: response.likes_count,
													is_liked: response.is_liked,
												}));
											}}
										/>
										<LikeSwapButtons
											type={"swap"}
											femaleMember={member}
											responseAction={(response) => {
												setMember((pre) => ({
													...pre,
													likes_count: response.likes_count,
													is_liked: response.is_liked,
												}));
											}}
										/>
									</div>

									{member?.membershipType === "silver-package" && <ChatLink />}

									{member?.membershipType === "platinum-package" && (
										<>
											<MakeOfferButton member={member} type="button" />
											<VideoCallButton member={member} type="button" />
											<ChatLink />
										</>
									)}

									{member?.membershipType === "gold-package" && (
										<>
											<VideoCallButton member={member} type="button" />
											<ChatLink />
										</>
									)}
								</div>
							</div>
						</div>

						{/* Info Section */}
						<div className="col-md-12 pt-5 for-extra-space">
							<div className="profile_info_dv">
								<div className="row">
									<div className="col-md-3">
										<div className="info_ul">
											<ul>
												<li>
													<div className="dv_for_flex">
														<div className="img_dv">
															<img src={p1} alt="" />
														</div>
														<div className="text_dv">
															<h5>
																<span className="blod_area">Name: </span>
																{member?.name}
															</h5>
														</div>
													</div>
												</li>
												<li>
													<div className="dv_for_flex">
														<div className="img_dv">
															<img src={p2} alt="" />
														</div>
														<div className="text_dv">
															<h5>
																<span className="blod_area">DOB: </span>
																{member?.dob}
															</h5>
														</div>
													</div>
												</li>
												<li>
													<div className="dv_for_flex">
														<div className="text_dv">
															<h5>
																<span className="blod_area">
																	Relationship Status:{" "}
																</span>
																{member?.relationshipStatus}
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
															<img src={p5} alt="" />
														</div>
														<div className="text_dv">
															<h5>
																<span className="blod_area">Email: </span>
																{member?.email}
															</h5>
														</div>
													</div>
												</li>
												<li>
													<div className="dv_for_flex">
														<div className="img_dv">
															<img src={p6} alt="" />
														</div>
														<div className="text_dv">
															<h5>
																<span className="blod_area">Height: </span>
																{member?.height}
															</h5>
														</div>
													</div>
												</li>
												<li>
													<div className="dv_for_flex">
														<div className="text_dv">
															<h5>
																<span className="blod_area">Skills: </span>
																{member?.skills?.join(", ")}
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
															<img src={p8} alt="" />
														</div>
														<div className="text_dv">
															<h5>
																<span className="blod_area">Phone: </span>
																{member?.phone}
															</h5>
														</div>
													</div>
												</li>
												<li>
													<div className="dv_for_flex">
														<div className="img_dv">
															<img src={p9} alt="" />
														</div>
														<div className="text_dv">
															<h5>
																<span className="blod_area">Hair Color: </span>
																{member?.hairColor}
															</h5>
														</div>
													</div>
												</li>
												<li>
													<div className="dv_for_flex">
														<div className="text_dv">
															<h5>
																<span className="blod_area">Purpose: </span>
																{member?.purpose}
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

			{/* Pictures */}
			<section className="pictures_sec" data-aos="fade-left">
				<div className="container">
					<div className="pic_head d-flex justify-content-between">
						<h3>Pictures</h3>
					</div>
					<div className="row mt-3">
						{member?.pictures?.map((pic, index) => (
							<div className="col-md-6" key={index}>
								<div className="pictures_dv">
									<div className="pic_dv">
										<img src={pic} alt={`pic-${index}`} />
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* Videos */}
			<section className="videos_sec" data-aos="fade-right">
				<div className="container">
					<div className="pic_head d-flex justify-content-between">
						<h3>Videos</h3>
					</div>
					<div className="row mt-3">
						{member?.videos?.map((video, index) => (
							<div className="col-md-6" key={index}>
								<div
									className="pictures_dv"
									onClick={() => handleVideoOpen(video.url)}
									style={{ cursor: "pointer" }}
								>
									<div className="pic_dv position-relative">
										<img src={video.thumbnail} alt={`video-${index}`} />
										<div className="pic_icon position-absolute top-50 start-50 translate-middle">
											<i className="fa fa-play" aria-hidden="true"></i>
										</div>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</section>

			<Footer />

			{/* Modals */}
			<OfferModal
				showofferModal={showofferModal}
				handleofferClose={handleofferClose}
				setShowofferModal={setShowofferModal}
			/>
		</>
	);
}

export default Womandetails;

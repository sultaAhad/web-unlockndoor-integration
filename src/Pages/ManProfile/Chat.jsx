import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap"; // Import GSAP
import Modal from "react-bootstrap/Modal";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer";
import { motion } from "framer-motion";
import {
	chatimg1,
	searchchat,
	chatimg2,
	chatimg3,
	chatimg4,
	chatimg5,
	camerachat,
	chatimgg,
	chatimgg1,
	paperclip,
	innerpages2,
} from "../../Constant/Index";
import { Link } from "react-router-dom";
import { Button, Col, Row } from "react-bootstrap";
import { AnimatePresence } from "framer-motion";
import VideoPlayModal from "../../Components/ChatModals/VidePlayModal";
import PricingModal from "../../Components/ChatModals/PricingModal";
import PayNowModal from "../../Components/ChatModals/PayNowModal";
import ThankYouModal from "../../Components/ChatModals/ThankYouModal";
import VideoChatModal from "../../Components/ChatModals/videoChatModal";

const Chat = () => {
	// Pricing Modal States
	const [showPricingModal, setShowPricingModal] = useState(false);
	const handlePricingClose = () => setShowPricingModal(false);
	const handlePricingShow = () => setShowPricingModal(true);

	// Pay Now Modal States
	const [showPayModal, setShowPayModal] = useState(false);
	const handlePayClose = () => setShowPayModal(false);
	const handlePayShow = () => setShowPayModal(true);

	// Thank you Modal States
	const [showThankModal, setShowThankModal] = useState(false);
	const handleThankClose = () => setShowThankModal(false);
	const handleThankShow = () => setShowThankModal(true);

	// Video chat Modal States
	const [showVideoChatModal, setShowVideoChatModal] = useState(false);
	const handleVideoChatClose = () => setShowVideoChatModal(false);
	const handleVideoChatShow = () => setShowVideoChatModal(true);

	// Video Play Modal States
	const [showVideoModal, setShowVideoModal] = useState(false);
	const handleVideoClose = () => setShowVideoModal(false);
	const handleVideoShow = () => setShowVideoModal(true);

	const [dropdownOpen, setDropdownOpen] = useState(false);

	const fileInputRef = useRef(null);
	const [files, setFiles] = useState([]);

	const handleUploadClick = () => {
		fileInputRef.current.click();
	};

	const handleFileChange = (e) => {
		const selectedFiles = Array.from(e.target.files);
		const mapped = selectedFiles.map((file) => ({
			file,
			preview: URL.createObjectURL(file),
			type: file.type.startsWith("video") ? "video" : "image",
		}));
		setFiles((prev) => [...prev, ...mapped]);
	};

	const removeFile = (index) => {
		setFiles((prev) => prev.filter((_, i) => i !== index));
	};

	const toggleDropdown1 = () => {
		setDropdownOpen(!dropdownOpen);
	};

	// GSAP hover effect on dots
	const handleDotHover = () => {
		gsap.to(".dot-drop-down i", {
			scale: 1.5,
			rotation: 45,
			duration: 0.3,
			stagger: 0.1,
		});
	};

	const handleDotLeave = () => {
		gsap.to(".dot-drop-down i", {
			scale: 1,
			rotation: 0,
			duration: 0.3,
			stagger: 0.1,
		});
	};
	// chat user
	const users = [
		{
			id: 1,
			name: "Jan Tschichold",
			message: "Lorem Ipsum sit amet",
			time: "23h",
			img: chatimg1,
			active: true,
		},
		{
			id: 2,
			name: "Jan Tschichold",
			message: "Lorem Ipsum sit amet",
			time: "24h",
			img: chatimg2,
			active: false,
		},
		{
			id: 3,
			name: "Jan Tschichold",
			message: "Lorem Ipsum sit amet",
			time: "12/10",
			img: chatimg3,
			active: false,
		},
		{
			id: 4,
			name: "Jan Tschichold",
			message: "Lorem Ipsum sit amet",
			time: "",
			img: chatimg4,
			active: false,
		},
		{
			id: 5,
			name: "Jan Tschichold",
			message: "Lorem Ipsum sit amet",
			time: "",
			img: chatimg5,
			active: false,
		},
		{
			id: 6,
			name: "Jan Tschichold",
			message: "Lorem Ipsum sit amet",
			time: "12/10",
			img: chatimg1,
			active: false,
		},
		{
			id: 7,
			name: "Jan Tschichold",
			message: "Lorem Ipsum sit amet",
			time: "",
			img: chatimg2,
			active: false,
		},
		{
			id: 8,
			name: "Jan Tschichold",
			message: "Lorem Ipsum sit amet",
			time: "",
			img: chatimg4,
			active: false,
		},
	];

	const messages = [
		{
			id: 1,
			type: "outgoing", // Message type: "incoming" or "outgoing"
			user: "Jan Tschichold",
			time: "3:57 AM",
			date: "02/12/24",
			content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
			img: chatimg1,
		},
		{
			id: 2,
			type: "incoming",
			user: "Jan Tschichold",
			time: "3:57 AM",
			date: "Today",
			content: "Ut felis eros, blandit sed mattis sit.",
			img: chatimg1,
		},
		{
			id: 3,
			type: "outgoing",
			user: "Jan Tschichold",
			time: "3:57 AM",
			date: "Today",
			content: "Mauris sit amet ligula quis arcu efficitur laoreet.",
			img: chatimg1,
		},
		{
			id: 4,
			type: "incoming",
			content: "",
			img: chatimg1,
			attachment: chatimgg1, // Example for image content
			newclass: "bgtranspp",
		},
	];
	useEffect(() => {
		document.body.style.backgroundImage = `url(${innerpages2})`;
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
			<section className="chat pt-5 mt-4 mb-4 pb-5">
				<div className="container">
					<div className="row">
						<div className="col-lg-12 ">
							<div className="chat-wrapper">
								<div className="row">
									<div className="col-lg-4">
										<div className="wrapper-member-pp wrapper-chat-input d-flex align-items-center gap-2">
											<img src={searchchat} className="img-fluid" alt="" />
											<div className="input-group ">
												<input
													type="text"
													className="form-control"
													placeholder="Search here...."
													aria-label="Search here...."
												/>
											</div>
										</div>
									</div>
									<div className="col-lg-8">
										<div className="row align-items-center justify-content-between">
											<div className="col-lg-6">
												<div className="d-flex align-items-center gap-3">
													<img
														src={chatimg1}
														className="img-fluid border-golder"
														alt="User"
													/>
													<h4 className="secondary-regular-font mb-0 text-white level-7">
														Jan Tschichold{" "}
													</h4>
												</div>
											</div>
											<div className="col-lg-3">
												<div className="dot-drop-down chat-dot">
													<div className="camera-link-ww">
														<Button
															className="bg-transparent border-0"
															onClick={handlePricingShow}
														>
															<img
																src={camerachat}
																className="img-fluid"
																alt=""
															/>
														</Button>
													</div>
													<div
														className=" wrapper-dot d-flex align-items-center gap-1"
														type="button"
														onClick={toggleDropdown1}
														style={{ cursor: "pointer" }}
														onMouseEnter={handleDotHover} // GSAP hover animation
														onMouseLeave={handleDotLeave} // GSAP hover animation
													>
														<i className="fa-solid fa-circle-dot extra-color-8 level-12"></i>
														<i className="fa-solid fa-circle-dot extra-color-8 level-12"></i>
														<i className="fa-solid fa-circle-dot extra-color-8 level-12"></i>
													</div>
													{dropdownOpen && (
														<div className="dot-dropdown-menu chat-dropdown">
															<ul className="bg-dropdown-ul mt-3">
																<li
																	className="d-flex p-2 gap-3 align-items-center"
																	style={{ cursor: "pointer" }}
																>
																	<i className="fas fa-trash-alt level-8 extra-color-10"></i>{" "}
																	{/* Font Awesome trash icon */}
																	<h4 className="secondary-regular-font mb-0 level-8 extra-color-10">
																		Delete
																	</h4>
																</li>
															</ul>
														</div>
													)}
												</div>
											</div>
										</div>
									</div>
								</div>
								<div className="row">
									<div className="col-lg-4">
										<div className="chat-user">
											<ul className="p-0 wrapper-chat-b">
												{users.map((user) => (
													<li
														key={user.id}
														className="d-flex align-items-start border-bottom justify-content-between py-3 px-3"
													>
														<div className="d-flex align-items-center gap-3">
															<img
																src={user.img}
																className="img-fluid chat-users"
																alt={user.name}
															/>
															<div>
																<div className="d-flex align-items-start gap-2">
																	<h4 className="secondary-semibold-font mb-1 text-white level-8">
																		{user.name}
																	</h4>
																	<span
																		className={
																			user.active ? "green active" : "green"
																		}
																	></span>
																</div>
																<p className="mb-0 level-8 extra-color-13 secondary-light-font">
																	{user.message}
																</p>
															</div>
														</div>
														{user.time && (
															<h4 className="secondary-medium-font text-white level-8">
																{user.time}
															</h4>
														)}
													</li>
												))}
											</ul>
										</div>
									</div>
									<div className="col-lg-8 mt-4">
										<div className="multichat1">
											<div className="multichat ">
												{/* Reverse messages array */}
												{[...messages].reverse().map((message, index) => (
													<div key={message.id}>
														{/* Main Message Block */}
														<div
															className={`${message.type}-massage d-flex align-items-center gap-3 mt-3 mb-3`}
														>
															{/* Conditional Rendering for Alignment */}
															{message.type === "incoming" && (
																<img
																	src={message.img}
																	className="img-fluid chat-users"
																	alt={`User ${index + 1}`}
																/>
															)}

															<div
																className={`bg-massage bg-${message.type} ${
																	message.newclass || ""
																}`}
															>
																<div className="d-flex align-items-center justify-content-between">
																	<h5 className="secondary-medium-font mb-2 mt-2 text-white level-8">
																		{message.user}
																	</h5>
																	<h4 className="secondary-regular-font mb-0 extra-color-13 level-8">
																		{message.time}
																	</h4>
																</div>

																{/* Render content or attachment */}
																{message.content && (
																	<p className="mb-0 extra-color-13 secondary-light-font">
																		{message.content}
																	</p>
																)}
																{message.attachment && (
																	<img
																		src={message.attachment}
																		alt="Attachment"
																		className="img-fluid mt-2"
																	/>
																)}
															</div>

															{message.type === "outgoing" && (
																<img
																	src={message.img}
																	className="img-fluid chat-users"
																	alt={`User ${index + 1}`}
																/>
															)}
														</div>

														{/* Date Section (conditionally rendered) */}
														{message.date && (
															<div className="row">
																<div className="col-lg-5 mx-auto position-relative">
																	<h5 className="wrapper-dash-gg dash-date level-8 extra-color-16 secondary-regular-font text-center">
																		{message.date}
																	</h5>
																</div>
															</div>
														)}
													</div>
												))}
											</div>
											<div className="wrapper-member-pp wrapper-upload-chat">
												{/* Preview Area */}
												{files.length > 0 && (
													<div className="d-flex align-items-center gap-2 mb-2">
														{files.map((item, index) => (
															<div className="position-relative" key={index}>
																{item.type === "image" ? (
																	<img
																		src={item.preview}
																		className="img-fluid"
																		style={{
																			width: "60px",
																			height: "60px",
																			borderRadius: "8px",
																			objectFit: "cover",
																			padding: "2px",
																		}}
																		alt=""
																	/>
																) : (
																	<div style={{ position: "relative" }}>
																		<img
																			src={chatimgg}
																			className="img-fluid"
																			style={{
																				width: "80px",
																				height: "80px",
																				borderRadius: "8px",
																				objectFit: "cover",
																			}}
																			alt="Video Preview"
																		/>
																		<i
																			className="fa-solid fa-play"
																			style={{
																				position: "absolute",
																				top: "50%",
																				left: "50%",
																				transform: "translate(-50%, -50%)",
																				fontSize: "1rem",
																				color: "#fff",
																			}}
																		></i>
																	</div>
																)}
																{/* Remove Icon */}
																<div
																	className="wrapper-x-mark-cancl"
																	style={{
																		cursor: "pointer",
																		borderRadius: "50%",
																	}}
																	onClick={() => removeFile(index)}
																>
																	<i
																		className="fa-solid fa-xmark"
																		style={{
																			color: "#fff",
																			fontSize: "0.8rem",
																		}}
																	></i>
																</div>
															</div>
														))}
													</div>
												)}

												{/* Chat input & buttons */}
												<div className="d-flex align-items-center mt-1">
													<div className="input-group">
														<input
															type="text"
															className="form-control secondary-regular-font"
															placeholder="Type your Message"
															aria-label="Message"
														/>
													</div>

													{/* Upload Icon */}
													<img
														src={paperclip}
														alt="Upload"
														className="img-fluid me-4"
														style={{
															width: "24px",
															height: "24px",
															cursor: "pointer",
														}}
														onClick={handleUploadClick}
													/>

													{/* Hidden File Input */}
													<input
														type="file"
														ref={fileInputRef}
														style={{ display: "none" }}
														accept="image/*,video/*"
														multiple
														onChange={handleFileChange}
													/>

													<button
														className="border text-center px-3 gradient-button"
														type="button"
													>
														Send
													</button>
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

			{/* Pricing Modal */}
			<PricingModal
				showPricingModal={showPricingModal}
				handlePricingClose={handlePricingClose}
				setShowPricingModal={setShowPricingModal}
				setShowPayModal={setShowPayModal}
			/>
			{/* Pricing Modal */}

			{/* Pay Now Modal */}
			<PayNowModal
				showPayModal={showPayModal}
				handlePayClose={handlePayClose}
				setShowThankModal={setShowThankModal}
				setShowPayModal={setShowPayModal}
			/>
			{/* Pay Now Modal */}

			{/* Thank You Now Modal */}
			<ThankYouModal
				showThankModal={showThankModal}
				handleThankClose={handleThankClose}
				setShowThankModal={setShowThankModal}
				setShowVideoChatModal={setShowVideoChatModal}
			/>
			{/* Thank You Now Modal */}

			{/* video chat Modal  */}
			<VideoChatModal
				handleVideoChatClose={handleVideoChatClose}
				showVideoChatModal={showVideoChatModal}
			/>
			{/* video chat Modal  */}
			<Footer />
		</>
	);
};

export default Chat;

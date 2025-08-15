import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
	blacktick,
	outline1,
	outline2,
	tick,
	tick_circle,
} from "../Constant/Index";
import { Link } from "react-router-dom";

const PackageTabs = () => {
	const [activeTab, setActiveTab] = useState("women");
	const [selectedPackage, setSelectedPackage] = useState(null);
	const [showSuccessModal, setShowSuccessModal] = useState(false);
	const [showPackageModal, setShowPackageModal] = useState(false);

	const packagesData = {
		men: [
			{
				title: " Free Tier",
				price: "No Payment Required",
				benefits: [
					"Swipe/Like up to 10 Profiles per Day",
					"View Pictures of Women",
					"View Videos for the first 10 Seconds",
				],
			},
			{
				title: "One-Time Payment",
				price: "$29.95",
				benefits: [
					"Sponsor Date Feature – Send offers for sponsored dates to women",
					"Access to Female Videos – View videos uploaded by all female users",
				],
			},
		],
		women: [
			{
				title: "Silver Package – ",
				price: "$29.95",
				duration: "1 Month",
				benefits: ["Upload Pictures", "Upload Videos", "Chat Messaging"],
				firstclass: "firstclass",
			},
			{
				title: "Gold Package – ",
				price: "$195",
				duration: "90 days",
				benefits: [
					"Upload Pictures",
					"Upload Videos",
					"Chat Messaging",
					"Video Calling",
				],
				secondclass: "secondclass",
			},
			{
				title: "Platinum Package – ",
				price: "$275",
				duration: "30 Days",
				benefits: [
					"15 Sponsored Dates (Women can choose a fixed amount to be paid for the date, or receive offers from interested men. Amounts range from $200 to $2,000.)",
					"Upload Pictures",
					"Upload Videos",
					"Chat Messaging",
					"Video Calling",
				],
				thirdclass: "thirdclass",
			},
		],
	};

	const cardVariants = {
		hidden: { opacity: 0, y: 50 },
		visible: (i) => ({
			opacity: 1,
			y: 0,
			transition: { delay: i * 0.2, duration: 0.5 },
		}),
	};

	return (
		<section className="pack_sec py-5">
			<div className="container">
				<div className="row">
					<div className="col-md-6">
						<h2 className="main-heading">Packages</h2>
					</div>
					<div className="col-md-6">
						<div className="bid_display">
							<div className="header_button_wrapper package_header_button pack_tab_btn">
								<Link
									to="#"
									className={`border wrapper-mmm btn-bgtransparent ${
										activeTab === "women" ? "active" : ""
									}`}
									onClick={(e) => {
										e.preventDefault();
										setActiveTab("women");
									}}
								>
									<span className="pe-2">
										<img src={outline2} alt="Women Outline" />
									</span>
									Women
								</Link>
								<Link
									to="#"
									className={`border wrapper-mmm btn-bgtransparent ${
										activeTab === "men" ? "active" : ""
									}`}
									onClick={(e) => {
										e.preventDefault();
										setActiveTab("men");
									}}
								>
									<span className="pe-2">
										<img src={outline1} alt="Men Outline" />
									</span>
									Men
								</Link>
							</div>
						</div>
					</div>
				</div>

				<div className="row mt-3 justify-content-center">
					<AnimatePresence mode="wait">
						{packagesData[activeTab].map((packageData, index) => (
							<motion.div
								className="col-md-4"
								key={index}
								variants={cardVariants}
								initial="hidden"
								animate="visible"
								custom={index}
								exit={{ opacity: 0, y: 30 }}
							>
								<div
									className={`package_card height-wrapper px-3 py-4 main_bg rounded ${
										packageData.firstclass ??
										packageData.secondclass ??
										packageData.thirdclass ??
										""
									}`}
								>
									<div className="pack_heading  text-center px-3  py-3  border-bottom3">
										{activeTab === "men" ? (
											<>
												<h3 className="text-white font_semibold font_level3">
													{packageData.title}
												</h3>
												<p className="text-white font_reg font_level4 mb-0">
													{packageData.price}
												</p>
											</>
										) : (
											<>
												<h3 className="text-white font_semibold font_level3">
													{packageData.title} {packageData.price}
												</h3>
												<p className="text-white font_reg font_level4 mb-0">
													{packageData.duration}
												</p>
											</>
										)}
									</div>
									<div className="pack_bullets">
										<ul className="ps-0 py-3">
											{packageData.benefits.map((benefit, i) => (
												<li
													key={i}
													className="bullet_Wrapper wrapper-bullet align-items-baseline  py-2"
												>
													<div className="row">
														<div className="col-lg-2">
															<div className="bullet_img">
																<img
																	src={activeTab === "men" ? tick : blacktick}
																	alt=""
																	className="img-fluid"
																/>
															</div>
														</div>
														<div className="col-lg-10 ps-0">
															<div className="bullet_point text-white font_reg font_level4">
																{benefit}
															</div>
														</div>
													</div>
												</li>
											))}
										</ul>
									</div>
									<div className="pack_btn d-flex justify-content-center">
										<button
											className={`btn get-started-btn rounded-pill py-3 px-4 bg-white font_reg text-capitalize font_level4 ${
												activeTab === "men" ? "man-btn" : ""
											}`}
											onClick={() => {
												setSelectedPackage(packageData);
												setShowPackageModal(true);
											}}
										>
											Get Started
										</button>
									</div>
								</div>
							</motion.div>
						))}
					</AnimatePresence>
				</div>
			</div>

			{/* Modal for Subscription Details */}
			<AnimatePresence>
				{showPackageModal && selectedPackage && (
					<motion.div
						className="modal fade show"
						tabIndex="-1"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						style={{ display: "block" }}
					>
						<div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
							<motion.div
								className="modal-content center"
								initial={{ scale: 0.8, opacity: 0 }}
								animate={{ scale: 1, opacity: 1 }}
								exit={{ scale: 0.8, opacity: 0 }}
								transition={{ duration: 0.3 }}
							>
								<div className="modal-body">
									{/* Cancel icon top-right */}
									<button
										type="button"
										className="btn-close position-absolute top-0 end-0 m-3"
										aria-label="Close"
										onClick={() => setShowPackageModal(false)}
									></button>
									<div className="women_bid_body">
										<div className="main_modal_detail">
											<div className="heading_modal">
												<h3 className="font_semibold font_level3 text-black">
													Subscription Detail
												</h3>
											</div>
											<div className="modal_detail border-bottom py-2 d-flex justify-content-between">
												<h4 className="font_semibold font_level4 text-black">
													{selectedPackage.title}
												</h4>
												<h4 className="font_semibold font_level4 text-black">
													{selectedPackage.price}
												</h4>
											</div>
											<div className="modal_detail border-bottom">
												<div className="border-bottom py-2">
													<h4 className="font_semibold font_level4 text-black">
														Recurring (from Next Month)
													</h4>
												</div>
												<div className="text-end py-2">
													<h4 className="font_semibold font_level4 text-black">
														{selectedPackage.price} /Month
													</h4>
												</div>
											</div>
										</div>

										<div className="remo_time_input offer_modal ">
											<label htmlFor="bidAmount">Card Details</label>
											<div className="form-group">
												<input
													type="text"
													className="my-2 form-control"
													placeholder="Name On Card"
												/>
												<input
													type="text"
													className="my-2 form-control"
													placeholder="Card Number"
												/>
												<div className="form_group row">
													<div className="col-md-6">
														<input
															type="text"
															className="my-2 form-control"
															placeholder="CVC"
														/>
													</div>
													<div className="col-md-6">
														<input
															type="text"
															className="my-2 form-control"
															placeholder="MM/YY"
														/>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
								<div className="mss py-3">
									<div className="wome_modal_fooetr_button">
										<button
											type="button"
											className="btn btn-secondary border w-100"
											onClick={() => {
												setShowPackageModal(false);
												setShowSuccessModal(true);
											}}
										>
											Pay Now
										</button>
									</div>
								</div>
							</motion.div>
						</div>
					</motion.div>
				)}
			</AnimatePresence>

			{/* Success Modal */}
			<AnimatePresence>
				{showSuccessModal && (
					<motion.div
						className="modal fade show"
						tabIndex="-1"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						style={{ display: "block" }}
					>
						<div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
							<div className="modal-content bg-transparent border-none">
								<div className="modal-head d-flex border-none justify-content-center">
									{/* Close Button Top Right */}
									<button
										type="button"
										className="btn-close position-absolute top-0 end-0 m-2 z-1"
										aria-label="Close"
										onClick={() => setShowSuccessModal(false)}
									></button>{" "}
									<div className="congrat_img position-relative top-0">
										<img src={tick_circle} alt="" className="img-fluid" />
									</div>
								</div>
								<motion.div
									className="modal-body congrat-body text-center py-4 bg-white position-relative"
									initial={{ y: 30, opacity: 0 }}
									animate={{ y: 0, opacity: 1 }}
									exit={{ y: 30, opacity: 0 }}
								>
									<h3 className="font_semibold font_level3 text-black mt-3">
										Congratulation
									</h3>
									<p className="font_reg font_level4 text-dark">
										Payment has been successfully Completed
									</p>
									<button
										type="button"
										className="btn btn-success mt-3 btn btn-secondary border w-100"
										onClick={() => setShowSuccessModal(false)}
									>
										Go Back
									</button>
								</motion.div>
							</div>
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</section>
	);
};

export default PackageTabs;

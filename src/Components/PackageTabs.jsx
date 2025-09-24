import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Swal from "sweetalert2"; // <-- Added Swal
import { useSelector } from "react-redux"; // <-- Added Redux selector
import {
	blacktick,
	outline1,
	outline2,
	tick,
	tick_circle,
} from "../Constant/Index";
import { Link } from "react-router-dom";
import { useGetMenPackagesQuery } from "../network/services/ManAuth";
import PlaceOrderstripe from "./PlaceOrderstripe";

const PackageTabs = () => {
	const [activeTab, setActiveTab] = useState("women");
	const [selectedPackage, setSelectedPackage] = useState(null);
	const [showPackageModal, setShowPackageModal] = useState(false);
	const [showSuccessModal, setShowSuccessModal] = useState(false);

	// ✅ Redux selector to check login
	const userToken = useSelector((state) => state.auth.userToken);

	const { data, isLoading, error } = useGetMenPackagesQuery();
	const packages = data?.response?.data?.women || [];
	const packagesman = data?.response?.data?.men || [];

	const packagesData = {
		women: packages.map((pkg) => ({
			...pkg,
			benefits: JSON.parse(pkg.description || "[]"),
		})),
		men: packagesman.map((pkg) => ({
			...pkg,
			benefits: JSON.parse(pkg.description || "[]"),
		})),
	};

	if (isLoading) return <p>Loading packages...</p>;
	if (error) return <p>Error loading packages</p>;

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
				{/* Tabs Header */}
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

				{/* Packages Cards */}
				<div className="row mt-3 justify-content-center">
					<AnimatePresence mode="wait">
						{packagesData[activeTab].map((packageData, index) => {
							const cssClasses = ["firstclass", "secondclass", "thirdclass"];
							const cssClass = cssClasses[index % cssClasses.length];

							return (
								<motion.div
									className="col-lg-4 col-md-6 mb-lg-0 mb-4"
									key={index}
									variants={cardVariants}
									initial="hidden"
									animate="visible"
									custom={index}
									exit={{ opacity: 0, y: 30 }}
								>
									{/* Card */}
									<div
										className={`package_card ${
											activeTab === "women" ? "women-card" : "men-card"
										} text-white p-3 rounded ${cssClass}`}
									>
										<div className="pack_heading text-center px-3 py-3 border-bottom3">
											<h3 className="text-white font_semibold font_level3">
												{packageData.title}{" "}
												{activeTab === "women" ? `- $${packageData.price}` : ""}
											</h3>
											<p className="text-white font_reg font_level4 mb-0">
												{activeTab === "women"
													? `${packageData.duration} Days`
													: packageData.price
													? `$${packageData.price}`
													: "Free"}
											</p>
										</div>

										<div className="pack_bullets">
											<ul className="ps-0 py-3">
												{packageData.benefits.map((benefit, i) => (
													<li
														key={i}
														className="bullet_Wrapper wrapper-bullet align-items-baseline py-2"
													>
														<div className="row">
															<div className="col-md-2 col-3">
																<div className="bullet_img">
																	<img
																		src={
																			activeTab === "women" ? blacktick : tick
																		}
																		alt=""
																		className="img-fluid"
																	/>
																</div>
															</div>
															<div className="col-md-10 col-9 ps-0">
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
											{/* ✅ Updated onClick with login check */}
											<button
												className="btn get-started-btn rounded-pill py-3 px-4 bg-white font_reg text-capitalize font_level4"
												onClick={() => {
													if (userToken) {
                            setSelectedPackage(packageData);
                            setShowPackageModal(true);
                          } else {
                            // User not logged in
                            Swal.fire({
                              icon: "error",
                              title: "Login Required",
                              text: "Please login to continue with the payment.",
                              confirmButtonText: "OK",
                            });
                          }
												}}
											>
												Get Started
											</button>
										</div>
									</div>
								</motion.div>
							);
						})}
					</AnimatePresence>
				</div>
			</div>

			{/* Package Modal with Stripe */}
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
									<button
										type="button"
										className="btn-close position-absolute top-0 end-0 m-3"
										aria-label="Close"
										onClick={() => setShowPackageModal(false)}
									></button>

									<div
										className={`modal_body_stripe ${
											activeTab === "women" ? "women-modal" : "men-modal"
										}`}
									>
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
												{selectedPackage.price
													? `$${selectedPackage.price}`
													: "Free"}
											</h4>
										</div>
										{selectedPackage.price && (
											<div className="modal_detail border-bottom">
												<div className="border-bottom py-2">
													<h4 className="font_semibold font_level4 text-black">
														Recurring (from Next Month)
													</h4>
												</div>
												<div className="text-end py-2">
													<h4 className="font_semibold font_level4 text-black">
														${selectedPackage.price} /Month
													</h4>
												</div>
											</div>
										)}

										{selectedPackage.price && (
											<PlaceOrderstripe
												checkedTerm={selectedPackage}
												showSuccessModal={showSuccessModal}
												setShowSuccessModal={setShowSuccessModal}
												redirectPath={
													activeTab === "women" ? "/women-profiles" : "/profile"
												}
											/>
										)}
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
									<button
										type="button"
										className="btn-close position-absolute top-0 end-0 m-2 z-1"
										aria-label="Close"
										onClick={() => setShowSuccessModal(false)}
									></button>
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
										Congratulations
									</h3>
									<p className="font_reg font_level4 text-dark">
										Payment has been successfully completed
									</p>
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

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";
import {
	blacktick,
	outline1,
	outline2,
	tick,
	tick_circle,
} from "../Constant/Index";
import { Link, useNavigate } from "react-router-dom";
import {
	useGetMenPackagesQuery,
	useUpgradePackageMutation,
} from "../network/services/ManAuth";
import PlaceOrderstripe from "./PlaceOrderstripe";
import WomenPlaceOrderStrip from "./WomenPlaceOrderStrip";
import { useUpgradeWomenPackageMutation } from "../network/services/WomanAuth";

const PackageTabs = () => {
	const [activeTab, setActiveTab] = useState("women");
	const [selectedPackage, setSelectedPackage] = useState(null);
	const [showPackageModal, setShowPackageModal] = useState(false);
	const [showSuccessModal, setShowSuccessModal] = useState(false);

	const navigate = useNavigate();
	const { user, userToken } = useSelector((state) => state.auth);

	const { data, isLoading, error } = useGetMenPackagesQuery();
	const [upgradeWomenPackage, { isLoading: isUpgrading }] =
		useUpgradeWomenPackageMutation();
	const [upgradeManPackage, { isLoading: isUpgradingMen }] =
		useUpgradePackageMutation();

	const packages = data?.response?.data?.women || [];
	const packagesman = data?.response?.data?.men || [];

	const upgradePackage = async (id) => {
		try {
			let res;

			// ✅ Use correct API depending on active tab
			if (activeTab === "women") {
				res = await upgradeWomenPackage({ package_id: id }).unwrap();
			} else {
				res = await upgradeManPackage({ package_id: id }).unwrap();
			}

			// ✅ Success Alert
			Swal.fire({
				icon: "success",
				title: "Upgraded!",
				text: "Your package has been successfully upgraded.",
				confirmButtonColor: "#3085d6",
			});

			// ✅ Redirect based on active tab
			navigate(activeTab === "women" ? "/women-profiles" : "/men-profiles");
		} catch (error) {
			console.log("Upgrade Error:", error);

			// ✅ Extract readable message
			const msg =
				error?.data?.message || "Something went wrong. Please try again.";

			// ✅ Handle known responses gracefully
			if (
				msg === "You already have an active package." ||
				msg === "You already have the most upgraded package."
			) {
				Swal.fire({
					icon: "info",
					title: "Notice",
					text: msg,
					confirmButtonColor: "#3085d6",
				});
			} else {
				Swal.fire({
					icon: "error",
					title: "Error",
					text: msg,
					confirmButtonColor: "#d33",
				});
			}
		}
	};

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
						{packagesData[activeTab].map((pkg, index) => {
							const cssClasses = ["firstclass", "secondclass", "thirdclass"];
							const cssClass = cssClasses[index % cssClasses.length];
							const benefits = pkg.benefits || [];

							const isCurrentPackage =
								activeTab === "women" &&
								user?.package?.id &&
								user?.package?.id === pkg.id;

							return (
								<motion.div
									className="col-lg-4 col-md-6 mb-lg-0 mb-4"
									key={pkg.id || index}
									variants={cardVariants}
									initial="hidden"
									animate="visible"
									custom={index}
									exit={{ opacity: 0, y: 30 }}
								>
									<div
										className={`package_card text-white p-3 rounded main_bg ${
											activeTab === "women"
												? `women-card ${cssClass}`
												: "men-card"
										}`}
									>
										<div className="text-center border-bottom1 mb-2 pb-2">
											<h4 className="text-white font_semibold font_level3">
												{pkg.title} - ${pkg.price}
											</h4>
											<p className="text-white font_reg font_level4 mb-0">
												{pkg.duration} Days
											</p>
											<p className="text-warning font_reg font_level5 mb-0">
												Type: {pkg.type}
											</p>
										</div>

										<ul className="ps-1 list-ssss">
											{benefits.map((benefit, i) => (
												<li
													key={i}
													className="bullet_Wrapper wrapper-bullet align-items-baseline py-2"
												>
													<div className="row">
														<div className="col-lg-2">
															<img
																src={blacktick}
																alt=""
																className="img-fluid"
															/>
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

										{/* ✅ Button Logic Same As PackageSelectionModal */}
										<div className="pack_btn d-flex justify-content-center">
											{isCurrentPackage ? (
												<button className="btn rounded-pill text-white py-2 px-4 mb-3 bg-success font_reg text-capitalize font_level wrapper-bg-eere">
													Current Package
												</button>
											) : (
												<>
													{/* If user already has a package */}
													{user?.package ? (
														/* If this is the same package → disable Upgrade */
														user?.package?.id === pkg.id ? (
															<button
																className="btn rounded-pill text-white py-2 px-4 mb-3 bg-secondary font_reg text-capitalize font_level wrapper-bg-eere"
																disabled
															>
																Active Package
															</button>
														) : (
															/* Different package → show Upgrade button */
															<button
																className="btn rounded-pill text-white py-2 px-4 mb-3 dark-bg font_reg text-capitalize font_level wrapper-bg-eere"
																onClick={() => upgradePackage(pkg?.id)}
																disabled={isUpgrading}
															>
																{isUpgrading
																	? "Upgrading..."
																	: "Upgrade Package"}
															</button>
														)
													) : (
														/* If user has no active package → allow Get Started */
														<button
															className="btn rounded-pill text-white py-2 px-4 mb-3 dark-bg font_reg text-capitalize font_level wrapper-bg-eere"
															onClick={() => {
																if (!userToken) {
																	return Swal.fire({
																		icon: "error",
																		title: "Login Required",
																		text: "Please login to continue.",
																	});
																}
																setSelectedPackage(pkg);
																setShowPackageModal(true);
															}}
														>
															Get Started
														</button>
													)}
												</>
											)}
										</div>
									</div>
								</motion.div>
							);
						})}
					</AnimatePresence>
				</div>
			</div>

			{/* Stripe Payment Modal */}
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
											<>
												{activeTab === "women" ? (
													<WomenPlaceOrderStrip
														checkedTerm={selectedPackage}
														showSuccessModal={showSuccessModal}
														setShowSuccessModal={setShowSuccessModal}
													/>
												) : (
													<PlaceOrderstripe
														checkedTerm={selectedPackage}
														showSuccessModal={showSuccessModal}
														setShowSuccessModal={setShowSuccessModal}
													/>
												)}
											</>
										)}
									</div>
								</div>
							</motion.div>
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</section>
	);
};

export default PackageTabs;

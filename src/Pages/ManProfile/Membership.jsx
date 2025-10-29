import React, { useEffect, useState } from "react";
import { alert_icon, innerpages1, tick } from "../../Constant/Index";
import { useSelector } from "react-redux";
import Aos from "aos";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer";
import ProfileNavbartwo from "../../Components/ProfileNavbartwo";
import ProfileHeader from "../../Components/ProfileHeader";
import PlaceOrderstripe from "../../Components/PlaceOrderstripe";
import { useGetMenPackagesQuery } from "../../network/services/ManAuth";

function Membership() {
	const { user } = useSelector((state) => state.auth);
	const [subscriptionPackage, setSubscriptionPackage] = useState(user?.package);
	const [checkedTerm, setCheckedTerm] = useState(null);
	const [showStripeForm, setShowStripeForm] = useState(false);
	const [showSuccessModal, setShowSuccessModal] = useState(false);

	const descriptions = JSON.parse(subscriptionPackage?.description || "[]");

	// ✅ Fetch all Men Packages
	const { data, isLoading } = useGetMenPackagesQuery();
	const packagesman = data?.response?.data?.men || [];

	useEffect(() => {
		Aos.init({ duration: 1000, once: true });
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

	// ✅ Open Stripe Modal for Upgrade
	const handleSelectPackage = (pkg) => {
		console.log("🎯 Selected Package:", pkg);
		if (pkg?.id === subscriptionPackage?.id) {
			console.warn("⚠️ Same package selected — upgrade not allowed!");
			return;
		}
		setCheckedTerm(pkg);
		setShowStripeForm(true);
	};

	return (
		<>
			<Header />

			<section className="profile_sec mb-5" data-aos="fade-up">
				<div className="container">
					<div className="row">
						<ProfileHeader />
						<div className="col-md-12 pt-5 for-extra-space">
							<ProfileNavbartwo />
						</div>

						<section className="pack_sec p-0 py-5">
							<div className="container">
								<div className="row mt-3">
									{/* ✅ Current Active Package */}
									<div className="col-md-4">
										<div className="package_card card-hri-er px-3 py-4 main_bg rounded text-center mb-md-0 mb-4">
											<div className="pack_heading px-3 border-bottom py-3 border-white">
												<h3 className="text-white font_semibold font_level3">
													{subscriptionPackage?.title || "No Active Plan"}
												</h3>
												<p className="text-white font_reg font_level4 mb-0">
													${subscriptionPackage?.price || 0}
												</p>
											</div>

											<div className="pack_bullets mt-3">
												<ul className="ps-0">
													{descriptions.length > 0 ? (
														descriptions.map((benefit, i) => (
															<li
																key={i}
																className="bullet_Wrapper d-flex align-items-baseline py-2 text-start"
															>
																<div className="bullet_img me-2">
																	<img
																		src={tick}
																		alt=""
																		className="img-fluid"
																	/>
																</div>
																<div className="bullet_point text-white font_reg font_level4">
																	{benefit}
																</div>
															</li>
														))
													) : (
														<li className="text-white">
															No features available.
														</li>
													)}
												</ul>
											</div>

											<div className="pack_buttons mt-4">
												<button
													className="btn rounded-pill py-3 px-4 bg-white text-dark font_reg text-capitalize w-100 my-2"
													data-bs-toggle="modal"
													data-bs-target="#membershipcancelmodal"
												>
													Cancel Subscription
												</button>
											</div>
										</div>
									</div>

									{/* ✅ Available Packages to Upgrade (same UI style) */}
									<div className="col-md-8">
										<div className="row">
											{isLoading ? (
												<p className="text-white">Loading packages...</p>
											) : (
												packagesman
													.filter((pkg) => pkg.id !== subscriptionPackage?.id)
													.map((pkg, i) => (
														<div className="col-md-6 mb-4" key={i}>
															<div className="package_card card-hri-er px-3 py-4 bg-white rounded text-center shadow">
																<div className="pack_heading px-3 border-bottom py-3 border-dark">
																	<h3 className="text-dark font_semibold font_level3">
																		{pkg.title}
																	</h3>
																	<p className="text-dark font_reg font_level4 mb-0">
																		${pkg.price}
																	</p>
																</div>

																<div className="pack_bullets mt-3">
																	<ul className="ps-0">
																		{JSON.parse(pkg.description || "[]").map(
																			(b, j) => (
																				<li
																					key={j}
																					className="bullet_Wrapper d-flex align-items-baseline py-2 text-start"
																				>
																					<div className="bullet_img me-2">
																						<img
																							src={tick}
																							alt=""
																							className="img-fluid"
																						/>
																					</div>
																					<div className="bullet_point text-dark font_reg font_level4">
																						{b}
																					</div>
																				</li>
																			),
																		)}
																	</ul>
																</div>

																<div className="pack_buttons mt-4">
																	<button
																		className="btn rounded-pill py-3 px-4 bg-warning text-white font_reg text-capitalize w-100 my-2"
																		onClick={() => handleSelectPackage(pkg)}
																	>
																		Upgrade with Stripe
																	</button>
																</div>
															</div>
														</div>
													))
											)}
										</div>
									</div>
								</div>
							</div>
						</section>
					</div>
				</div>
			</section>

			{/* ✅ Stripe Payment Modal */}
			{showStripeForm && (
				<div
					className="modal fade show"
					style={{ display: "block", background: "rgba(0,0,0,0.6)" }}
				>
					<div className="modal-dialog modal-dialog-centered modal-md">
						<div className="modal-content bg-dark text-white">
							<div className="modal-header border-0">
								<h5 className="modal-title">Complete Payment</h5>
								<button
									type="button"
									className="btn-close btn-close-white"
									onClick={() => setShowStripeForm(false)}
								></button>
							</div>
							<div className="modal-body">
								<PlaceOrderstripe
									checkedTerm={checkedTerm}
									showSuccessModal={showSuccessModal}
									setShowSuccessModal={setShowSuccessModal}
								/>
							</div>
						</div>
					</div>
				</div>
			)}

			<Footer />
		</>
	);
}

export default Membership;

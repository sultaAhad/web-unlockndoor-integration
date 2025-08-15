import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer";
import {
	innerpages1,
	tick,
	tick_circle,
	web_new_logo,
} from "../../Constant/Index";
import { Link } from "react-router-dom";

const Subscriptionwomen = () => {
	const [showSuccessModal, setShowSuccessModal] = useState(false);
	const navigate = useNavigate();
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
			<section className="sub-sec py-5 pt-1">
				<div className="container">
					<div className="terms_head text-center pt-1">
						<h2>Subscription</h2>
					</div>
					<div className="row">
						<div className="col-lg-11 mx-auto">
							<div className="sub_dv p-lg-4 p-3 ">
								<div className="row align-items-center">
									<div className="col-md-6  sub-border  pe-lg-3">
										<div className="sub_form d-flex justify-content-center">
											<div className="sub_wrapper">
												<div className="sub_img d-flex justify-content-center">
													<Link to="/">
														{" "}
														<img
															src={web_new_logo}
															alt=""
															className="img-fluid"
														/>
													</Link>
												</div>
												<div className="sub__pricing my-2">
													<div className="sub_form_wrapper mt-3">
														<form className="row">
															<div className="col-md-12 ">
																<div className="form-group">
																	<input
																		type="text"
																		className="form-control"
																		placeholder="Name on Card"
																	/>
																</div>
															</div>
															<div className="col-md-12 ">
																<div className="form-group">
																	<input
																		type="number"
																		className="form-control"
																		placeholder="Card Number"
																	/>
																</div>
															</div>
															<div className="col-md-6 ">
																<div className="form-group">
																	<input
																		type="number"
																		className="form-control"
																		placeholder="MM / YY"
																	/>
																</div>
															</div>
															<div className="col-md-6 ">
																<div className="form-group">
																	<input
																		type="number"
																		className="form-control text-uppercase"
																		placeholder="CVC"
																	/>
																</div>
															</div>

															<div className="col-md-12 ">
																<div className="form-group">
																	<input
																		type="number"
																		className="form-control"
																		placeholder="Zip Code"
																	/>
																</div>
															</div>
															<div className="col-md-12 ">
																<div className="form-group">
																	<div className="subs_btn">
																		<Link
																			onClick={() => {
																				setShowSuccessModal(true);
																			}}
																		>
																			<button
																				style={{
																					width: "100%",
																				}}
																				className="border"
																			>
																				Pay Now
																			</button>
																		</Link>
																	</div>
																</div>
															</div>
														</form>
													</div>
												</div>
											</div>
										</div>
									</div>
									<div className="col-md-6 px-lg-2">
										<div className="sub_pack d-flex justify-content-center">
											<div className="sub_pack_wrapper">
												<div className="pack_heading text-center px-3 border-bottom py-3 border-white">
													<h3 className="text-white font_semibold font_level3">
														Platinum Package – $275
													</h3>
													<p className="text-white font_reg font_level4 mb-0">
														30 Days
													</p>
												</div>
												<div className="pack_bullets">
													<ul className="ps-0 py-3 ">
														<li className="bullet_Wrapper d-flex justify-content-center align-items-baseline gap-2 py-2">
															<div className="bullet_img">
																<img src={tick} alt="" className="img-fluid" />
															</div>
															<div className="bullet_point text-white font_reg ">
																15 Sponsored Dates (Women can choose a fixed
																amount to be paid for the date, or receive
																offers from interested men. Amounts range from
																$200 to $2,000.)
															</div>
														</li>
														<li className="bullet_Wrapper d-flex justify-content-center align-items-baseline gap-2 py-2">
															<div className="bullet_img">
																<img src={tick} alt="" className="img-fluid" />
															</div>
															<div className="bullet_point text-white font_reg ">
																Upload Pictures
															</div>
														</li>
														<li className="bullet_Wrapper d-flex justify-content-center align-items-baseline gap-2 py-2">
															<div className="bullet_img">
																<img src={tick} alt="" className="img-fluid" />
															</div>
															<div className="bullet_point text-white font_reg ">
																Upload Videos
															</div>
														</li>
														<li className="bullet_Wrapper d-flex justify-content-center align-items-baseline gap-2 py-2">
															<div className="bullet_img">
																<img src={tick} alt="" className="img-fluid" />
															</div>
															<div className="bullet_point text-white font_reg ">
																Chat Messaging
															</div>
														</li>
														<li className="bullet_Wrapper d-flex justify-content-center align-items-baseline gap-2 py-2">
															<div className="bullet_img">
																<img src={tick} alt="" className="img-fluid" />
															</div>
															<div className="bullet_point text-white font_reg ">
																Video Calling
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
					</div>
				</div>
			</section>
			{showSuccessModal && (
				<div
					className="modal wrapper-congru fade show d-flex justify-content-center align-items-center"
					id="successModal"
					tabIndex="-1"
					aria-hidden="true"
					style={{ display: "flex", backgroundColor: "rgba(0,0,0,0.5)" }}
				>
					<div className="modal-dialog bg-transparent border-0 success__dialog">
						<div className="modal-content bg-transparent border-0 position-relative">
							<div className="modal-head d-flex justify-content-center">
								<div className="congrat_img position-relative top-0">
									<img src={tick_circle} alt="" className="img-fluid" />
								</div>
							</div>

							<div className="modal-body modal__body radius-8 congrat-body text-center pt-5 bg-white position-relative arrowcolor">
								{/* Cancel Button */}
								<button
									type="button"
									className="btn position-absolute"
									style={{
										top: "10px",
										right: "10px",
										background: "none",
										border: "none",
										fontSize: "1.5rem",
										zIndex: 10,
									}}
									onClick={() => {
										setShowSuccessModal(false);
										navigate("/women-profiles");
									}}
								>
									<i class="fa-solid fa-xmark arrowcolor"></i>
								</button>
								<h3 className="font_semibold font_level3 text-black mt-5 mb-2">
									Congratulation
								</h3>
								<p className="font_reg text-dark my-2">
									Payment has been successfully Completed
								</p>
							</div>
						</div>
					</div>
				</div>
			)}

			<Footer />
		</>
	);
};

export default Subscriptionwomen;

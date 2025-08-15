// PackageSelectionModal.jsx
import React from "react";
import Modal from "react-modal";
import { Link } from "react-router-dom";
import { blacktick } from "../Constant/Index"; // adjust path if needed

const packageData = [
	{
		title: "Silver Package",
		price: "$29.95",
		duration: "1 Month",
		benefits: ["Upload Pictures", "Upload Videos", "Chat Messaging"],
		cssClass: "firstclass",
	},
	{
		title: "Gold Package",
		price: "$195",
		duration: "90 Days",
		benefits: [
			"Upload Pictures",
			"Upload Videos",
			"Chat Messaging",
			"Video Calling",
		],
		cssClass: "secondclass",
	},
	{
		title: "Platinum Package",
		price: "$275",
		duration: "30 Days",
		benefits: [
			"15 Sponsored Dates (Women can choose a fixed amount to be paid  for the date, or receive offers from interested men. Amounts range  from $200 to $2,000.)",
			"Upload Pictures",
			"Upload Videos",
			"Chat Messaging",
			"Video Calling",
		],
		cssClass: "thirdclass",
	},
];

const PackageSelectionModal = ({ isOpen, onRequestClose }) => {
	return (
		<Modal
			isOpen={isOpen}
			onRequestClose={onRequestClose}
			className="modal-content wrapper-model-dd"
			overlayClassName="modal-overlay"
		>
			<div className="container py-4">
					<div className="row">
					{packageData.map((pkg, index) => (
						<div key={index} className="col-md-4 mb-4">
							<div
								className={`package_card text-white p-3 rounded ${pkg.cssClass}`}
							>
								<div className="text-center border-bottom1 mb-2 pb-2">
									<h4 className="text-white font_semibold font_level3">{pkg.title} - {pkg.price}</h4>
									<p className="text-white font_reg font_level4 mb-0">
										  {pkg.duration}
									</p>
								</div>
								<ul className="ps-1 list-ssss">
									{pkg.benefits.map((benefit, i) => (
										<li
											key={i}
											className="bullet_Wrapper wrapper-bullet align-items-baseline  py-2"
										>
											<div className="row">
												<div className="col-lg-2">
													<img src={blacktick} alt=""  className="img-fluid" />
												</div>
												<div className="col-lg-10">
													<div className="col-lg-10 ps-0">
														<div className="bullet_point text-white font_reg font_level4">
															{benefit}
														</div>
													</div>
												</div>
											</div>
										</li>
									))}
								</ul>
								<div className="pack_btn d-flex justify-content-center">
									<Link
										to="/subscription-women"
										className="btn rounded-pill text-white py-2 px-4 mb-3 dark-bg font_reg text-capitalize font_level wrapper-bg-eere"
									>
										Get Started
									</Link>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</Modal>
	);
};

export default PackageSelectionModal;

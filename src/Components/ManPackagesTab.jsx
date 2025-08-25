import React from "react";
import Modal from "react-modal";
import { Link } from "react-router-dom";
import { tick } from "../Constant/Index";

const ManPackagesTab = ({ isOpen, onClose }) => {
	const packages = [
		{
			title: "Free Tier",
			price: "No Payment Required",
			features: [
				"Swipe/Like up to 10 Profiles per Day",
				"View Pictures of Women",
				"View Videos for the first 10 Seconds",
			],
		},
		{
			title: "One-Time Payment",
			price: "$49.95",
			features: [
				"Sponsor Date Feature – Send offers for sponsored dates to women",
				"Access to Female Videos – View videos uploaded by all female users",
			],
		},
	];

	return (
		<Modal
			isOpen={isOpen}
			onRequestClose={onClose}
			className="modal-content wrapper-model-dd"
			overlayClassName="modal-overlay"
		>
			<section className="pack_sec py-5">
				<div className="container">
					<div className="row justify-content-center">
						{packages.map((pack, idx) => (
							<div className="col-md-4" key={idx}>
								<div className="package_card px-3 py-4 main_bg rounded">
									<div className="pack_heading text-center px-3 border-bottom py-3 border-white">
										<h3 className="text-white font_semibold font_level3">
											{pack.title}
										</h3>
										<p className="text-white secondary-secondregular-font">
											{pack.price}
										</p>
									</div>
									<ul className="ps-0 py-3">
										{pack.features.map((feature, i) => (
											<li
												key={i}
												className="bullet_Wrapper wrapper-bullet py-2"
											>
												<div className="d-flex align-items-start gap-2 text-white">
													<img src={tick} alt="tick" style={{ width: 20 }} />
													<span>{feature}</span>
												</div>
											</li>
										))}
									</ul>
									<div className="pack_btn d-flex justify-content-center">
										<Link to="/man-subscription">
											<button className="btn rounded-pill py-3 px-4 bg-white font_reg text-capitalize font_level4">
												Get Started
											</button>
										</Link>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</section>
		</Modal>
	);
};

export default ManPackagesTab;

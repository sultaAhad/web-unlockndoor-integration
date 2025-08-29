import React from "react";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
import { tick } from "../Constant/Index";
import { useGetMenPackagesQuery } from "../network/services/ManAuth";

const ManPackagesTab = ({ isOpen, onClose }) => {
	const navigate = useNavigate();
	const { data, isLoading, error } = useGetMenPackagesQuery();
	const packages = data?.response?.data?.men || [];

	if (isLoading) return <p>Loading packages...</p>;
	if (error) return <p>Error loading packages</p>;

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
						{packages.map((pack) => (
							<div className="col-md-4" key={pack.id}>
								<div className="package_card px-3 py-4 main_bg rounded">
									<div className="pack_heading text-center px-3 border-bottom py-3 border-white">
										<h3 className="text-white font_semibold font_level3">
											{pack.title}
										</h3>
										<p className="text-white secondary-secondregular-font">
											{pack.is_paid ? `$${pack.price}` : "Free"}
										</p>
									</div>
									<ul className="ps-0 py-3">
										{JSON.parse(pack.description).map((feature, i) => (
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
										<button
											className="btn rounded-pill py-3 px-4 bg-white font_reg text-capitalize font_level4"
											onClick={() => {
												console.log("👉 Package Selected:", pack);
												onClose();
												navigate("/man-subscription", {
													state: { selected: pack },
												});
											}}
										>
											Get Started
										</button>
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

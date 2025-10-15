import React from "react";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
import { blacktick } from "../Constant/Index";
import { useGetMenPackagesQuery } from "../network/services/ManAuth";
import { useSelector } from "react-redux";
import { useUpgradeWomenPackageMutation } from "../network/services/WomanAuth";
import Swal from "sweetalert2";

const PackageSelectionModal = ({
	isOpen,
	closeModal,
	onRequestClose,
	showCloseBtn = false,
	action = "purchase",
}) => {
	const { user } = useSelector((state) => state.auth);
	console.log(user);

	const navigate = useNavigate();
	const { data, isLoading, error } = useGetMenPackagesQuery();
	const [upgradeWomenPackage, { isLoading: isUpgrading }] =
		useUpgradeWomenPackageMutation();

	// women packages from API
	const packages = data?.response?.data?.women || [];

	// ✅ Upgrade logic with success alert
	const upgradePackage = async (id) => {
		try {
			const res = await upgradeWomenPackage({ package_id: id }).unwrap();

			// ✅ Show success SweetAlert
			Swal.fire({
				title: "Success!",
				text: "Your package has been upgraded successfully.",
				icon: "success",
				confirmButtonText: "OK",
				confirmButtonColor: "#3085d6",
			}).then(() => {
				navigate("/women-profiles");
			});
		} catch (error) {
			console.log(error);

			// ✅ Show error SweetAlert
			Swal.fire({
				title: "Error",
				text: error?.data?.message || "Something went wrong during upgrade.",
				icon: "error",
				confirmButtonText: "OK",
				confirmButtonColor: "#d33",
			});
		}
	};

	if (isLoading) return <p>Loading packages...</p>;
	if (error) return <p>Error loading packages</p>;

	return (
		<Modal
			isOpen={isOpen}
			onRequestClose={onRequestClose}
			className="modal-content wrapper-model-dd"
			overlayClassName="modal-overlay"
		>
			<div className="container py-4">
				{showCloseBtn && (
					<div className="d-flex justify-content-end mb-3">
						<button
							type="button"
							className="btn btn-close"
							aria-label="Close"
							onClick={() => onRequestClose()}
							style={{ fontSize: "1.5rem", background: "none", border: "none" }}
						>
							&times;
						</button>
					</div>
				)}

				<div className="row">
					{packages.map((pkg, index) => {
						let benefits = [];
						try {
							benefits = JSON.parse(pkg.description);
						} catch {
							benefits = [];
						}

						const cssClasses = ["firstclass", "secondclass", "thirdclass"];
						const cssClass = cssClasses[index % cssClasses.length];

						return (
							<div key={pkg.id || index} className="col-lg-4 col-md-6 mb-4">
								<div
									className={`package_card text-white p-3 rounded ${cssClass}`}
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
													<div className="col-2">
														<img src={blacktick} alt="" className="img-fluid" />
													</div>
													<div className="col-10 ps-0">
														<div className="bullet_point text-white font_reg font_level4">
															{benefit}
														</div>
													</div>
												</div>
											</li>
										))}
									</ul>

									{/* Get Started button */}
									<div className="pack_btn d-flex justify-content-center">
										{user?.package?.id == pkg.id ? (
											<button className="btn rounded-pill text-white py-2 px-4 mb-sm-3 bg-success font_reg text-capitalize font_level wrapper-bg-eere">
												Current Package
											</button>
										) : (
											<>
												{action == "upgrade" ? (
													<button
														className="btn rounded-pill text-white py-2 px-4 mb-3 dark-bg font_reg text-capitalize font_level wrapper-bg-eere"
														onClick={() => upgradePackage(pkg?.id)}
														disabled={isUpgrading}
													>
														{isUpgrading ? "Upgrading" : "Upgrade Package"}
													</button>
												) : (
													<button
														className="btn rounded-pill text-white py-2 px-4 mb-3 dark-bg font_reg text-capitalize font_level wrapper-bg-eere"
														onClick={() => {
															if (typeof closeModal === "function") {
																closeModal();
															}
															navigate("/subscription-women", {
																state: { selected: pkg },
															});
														}}
													>
														Get Started
													</button>
												)}
											</>
										)}
									</div>
								</div>
							</div>
						);
					})}
				</div>
			</div>
		</Modal>
	);
};

export default PackageSelectionModal;

import React, { useEffect, useState } from "react";
import "../../assets/Css/profile.css";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer";
import {
	chatimg1,
	chatimg3,
	chatimg4,
	edit,
	innerpages1,
	manproimage2,
	manproimage3,
	massagewrapper,
	message,
	notification,
	notify_img,
	womenproimg,
	womenproimg1,
} from "../../Constant/Index";
import AOS from "aos";
import { Link } from "react-router-dom";
import Pagination from "../../Components/Pagination";
import ProfileNavbar from "../../Components/ProfileNavbar";
import RejectModal from "../../Components/RejectModal";

function DatesTab() {
	const [showRejectModal, setShowRejectModal] = useState(false);

	const handleRejectSubmit = (data) => {
		console.log("Rejected with data:", data);
		// Handle API submission here
	};
	useEffect(() => {
		AOS.init({ duration: 1000, once: true }); // Initialize AOS with options
	}, []);
	// Sample data for orders

	const sponsoredData = [
		{
			name: "Jan Tschichold",
			date: "23/04/2025",
			offer: "$700",
			img: chatimg4,
			btnLabel: "Accepted",
			btnClass: "extra-bg-4",
			statusClass: "extra-color-4",
			para: "Lorem Ipsum sit amet",
			btnLabel1: "",
			btnClass1: "",
		},
		{
			name: "Jan Tschichold",
			date: "2-Mar-24",
			offer: "$700",
			status: "Pending",
			img: notify_img,
			btnLabel: "Accept",
			btnClass: "extra-bg-12",
			statusClass: "extra-color-1",
			btnLabel1: "Reject",
			btnClass1: "extra-bg-1",
		},
		{
			name: "Jan Tschichold",
			date: "2-Mar-24",
			offer: "$700",
			status: "Pending",
			img: notify_img,
			btnLabel: "Accept",
			btnClass: "extra-bg-12",
			statusClass: "extra-color-1",
			btnLabel1: "Reject",
			btnClass1: "extra-bg-1",
		},
		{
			name: "Jan Tschichold",
			date: "2-Mar-24",
			offer: "$700",
			status: "Pending",
			img: notify_img,
			btnLabel: "Accept",
			btnClass: "extra-bg-12",
			statusClass: "extra-color-1",
			btnLabel1: "Reject",
			btnClass1: "extra-bg-1",
		},
		{
			name: "Jan Tschichold",
			date: "2-Mar-24",
			offer: "$700",
			status: "Pending",
			img: notify_img,
			btnLabel: "Accept",
			btnClass: "extra-bg-12",
			statusClass: "extra-color-1",
			btnLabel1: "Reject",
			btnClass1: "extra-bg-1",
		},
	];
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

			<section className="profile_sec" data-aos="fade-up">
				<div className="container">
					<div className="row">
						<div className="col-md-12 pb-5">
							<div className="profile_banner_img">
								<img src={womenproimg} className="img-fluid banner_img" />
								<div className="profile_img_div">
									<img src={womenproimg1} className="img-fluid profile_imgg" />
									<h5>John Smith</h5>
								</div>

								<div className="account_access_dv">
									<div className="notify_edit_dv">
										<ul>
											<Link
												className="text-decoration-none text-white secondary-secondregular-font"
												to="/chat-women"
											>
												<li className="wrapper-navigate-main position-relative">
													<img src={massagewrapper} /> <span>Message</span>
													<span className="number_move_dv">21</span>
												</li>
											</Link>
											<Link to="/women-notification">
												{" "}
												<li className="position-relative">
													<img src={notification} />
													<span className="number_move_dv">19</span>
												</li>
											</Link>
											<Link to="/women-settings">
												<li>
													<img src={edit} />
												</li>
											</Link>
										</ul>
									</div>
								</div>
							</div>
						</div>

						<div className="col-md-12 pt-5 for-extra-space">
							<ProfileNavbar />
						</div>
					</div>
				</div>
			</section>
			<section className="cart-section order-wrapper pt-5 mb-5 pb-5">
				<div className="container">
					<div className="row">
						<div className="col-lg-12 ">
							<div className="row">
								<div className="col-lg-12 ps-lg-0 pe-lg-0">
									<div className="cart-table-wrapper">
										<div className="table-responsive">
											<table className="table">
												<thead className="bg-transparent">
													<tr>
														<th className="position-relative text-start">
															<h4 className="secondary-medium-font text-white level-8 mb-0">
																Name
															</h4>
														</th>
														<th className="position-relative">
															<h4 className="secondary-medium-font text-white level-8 mb-0">
																Date
															</h4>
														</th>
														<th className="position-relative">
															<h4 className="secondary-medium-font text-white level-8 mb-0">
																Offer
															</h4>
														</th>
														<th className="position-relative">
															<h4 className="secondary-medium-font text-white level-8 mb-0">
																Action
															</h4>
														</th>
														<th className="position-relative">
															<h4 className="secondary-medium-font text-white level-7"></h4>
														</th>
													</tr>
												</thead>
												<tbody>
													{sponsoredData.map((item, index) => (
														<tr key={index}>
															<td className="secondary-medium-font  level-8 ">
																<div className="d-flex align-items-center gap-3">
																	<div className="">
																		{" "}
																		<img
																			src={item.img}
																			className="img-fluid wrapper-fluid-notification"
																			alt=""
																		/>
																	</div>
																	<div className="">
																		<h4 class="secondary-medium-font mb-1 text-white text-start level-8 ">
																			{item.name}
																		</h4>
																		<p className="mb-0 text-white ">
																			{item.para}
																		</p>
																	</div>
																</div>
															</td>
															<td className="secondary-medium-font text-white level-8 text-center">
																{item.date}
															</td>
															<td className="secondary-medium-font text-white level-8 text-center">
																{item.offer}
															</td>
															<td className="secondary-medium-font text-white level-8 text-center">
																<div className="btn-wrapper">
																	<Link
																		to=""
																		className={`btn-write rounded-0 d-flex align-items-center justify-content-center ${item.btnClass}`}
																	>
																		{item.btnLabel}
																	</Link>
																</div>
															</td>
															<td className="secondary-medium-font level-8 text-center">
																<div className="btn-wrapper">
																	<Link
																		onClick={() => setShowRejectModal(true)}
																		className={`btn-write rounded-0 d-flex align-items-center justify-content-center ${item.btnClass1}`}
																	>
																		{item.btnLabel1}
																	</Link>
																</div>
															</td>
														</tr>
													))}
												</tbody>
											</table>
										</div>
										<div className="row">
											<div className="col-lg-12">
												<div className="container mt-5">
													<Pagination />
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
			<RejectModal
				show={showRejectModal}
				onClose={() => setShowRejectModal(false)}
				onSubmit={handleRejectSubmit}
			/>
			<Footer />
		</>
	);
}

export default DatesTab;

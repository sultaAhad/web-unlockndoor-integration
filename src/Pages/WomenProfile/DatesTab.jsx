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
import ProfileHeader from "../../Components/ProfileHeader";
import {
	useGetWomanSponsoredDatesQuery,
	useRejectDateRequestMutation,
} from "../../network/services/woman/SponsoredDates";
import Spinner from "../../Components/Spinner";

function DatesTab() {
	const [showRejectModal, setShowRejectModal] = useState(false);

	const [currentPage, setCurrentPage] = useState(1);
	const [lastPage, setLastPage] = useState(1);
	const [sponsoredDates, setSponsoredDates] = useState([]);

	const { data, isLoading, refetch } =
		useGetWomanSponsoredDatesQuery(currentPage);
	const [rejectDateRequest, { isLoading: rejectingRequest }] =
		useRejectDateRequestMutation();

	useEffect(() => {
		if (data?.response?.data?.sponsoredDates?.data) {
			setSponsoredDates(data.response.data.sponsoredDates?.data);
			setCurrentPage(data.response.data.sponsoredDates?.current_page);
			setLastPage(data.response.data.sponsoredDates?.last_page);
		} else {
			setSponsoredDates(data?.response?.data?.sponsoredDates);
		}
	}, [data, currentPage]);

	useEffect(() => {
		refetch();
	}, [currentPage]);

	const handleRejectSubmit = async (data) => {
		try {
			let response = await rejectDateRequest({
				...data,
				source: "Date_tab", // ✅ Added here
			}).unwrap();
		} catch (error) {
			console.log(error);
		} finally {
			refetch();
		}
	};
	const acceptOfferHandle = async (date_id) => {
		try {
			let response = rejectDateRequest({
				date_id: date_id,
				status: "accepted",
				source: "Date_tab",
			}).unwrap();
		} catch (error) {
			console.log(error);
		} finally {
			refetch();
		}
	};
	useEffect(() => {
		AOS.init({ duration: 1000, once: true }); // Initialize AOS with options
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

	const getStatusClass = (status) => {
		switch (status) {
			case "accepted":
				return "extra-color-4";
			case "pending":
				return "extra-color-1";
			case "rejected":
				return "extra-color-3";
			case "countered":
				return "extra-color-4";
			default:
				return "";
		}
	};

	const Actions = (sponsor) => {
		if (sponsor?.status == "pending" || sponsor?.status == "countered") {
			return (
				<>
					<Link
						onClick={() => acceptOfferHandle(sponsor?.id)}
						className={`btn-write rounded-0 w-100 ms-2 d-flex align-items-center justify-content-center extra-bg-12`}
					>
						Accept
					</Link>
					<Link
						className={`btn-write rounded-0 w-100 ms-2 d-flex align-items-center justify-content-center extra-bg-1`}
						onClick={() => setShowRejectModal(true)}
					>
						Reject
					</Link>
					<RejectModal
						show={showRejectModal}
						dateId={sponsor?.id}
						onClose={() => setShowRejectModal(false)}
						onSubmit={handleRejectSubmit}
					/>
				</>
			);
		}
		if (sponsor?.status == "accepted") {
			return (
				<Link
					to={"/chat"}
					className={`btn-write rounded-0 d-flex align-items-center justify-content-center extra-bg-4`}
				>
					Chat
				</Link>
			);
		}
		return (
			<span className="badge bg-body fs-5 rounded-pill text-capitalize w-100 text-dark">
				{sponsor?.status}
			</span>
		);
	};

	return (
		<>
			<Header />

			<section className="profile_sec" data-aos="fade-up">
				<div className="container">
					<div className="row">
						<ProfileHeader />

						<div className="col-md-12 pt-5 for-extra-space">
							<ProfileNavbar />
						</div>
					</div>
				</div>
			</section>
			<section className="cart-section order-wrapper pt-5 mb-5 pb-5">
				<div className="container">
					{isLoading ? (
						<div className="row justify-content-center">
							<Spinner />
						</div>
					) : (
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
															{/* <th className="position-relative">
                                <h4 className="secondary-medium-font text-white level-8 mb-0">
                                  Action
                                </h4>
                              </th> */}
															<th className="position-relative">
																<h4 className="secondary-medium-font text-white level-8 mb-0">
																	Action
																</h4>
															</th>
															<th className="position-relative">
																<h4 className="secondary-medium-font text-white level-8 mb-0"></h4>
															</th>
														</tr>
													</thead>
													<tbody>
														{sponsoredDates &&
															sponsoredDates.map((sponsorDate, index) => (
																<tr className="wrapper-table-d" key={index}>
																	<td className="secondary-medium-font  level-8 ">
																		<Link to={"/chat"} className="text-decoration-none">
																			<div className="d-flex align-items-center gap-3">
																				<div className="">
																					{" "}
																					<img
																						src={
																							sponsorDate.men?.profile_image_url
																						}
																						className="img-fluid wrapper-fluid-notification w-25"
																						alt=""
																					/>
																				</div>
																				<div className="">
																					<h4 className="secondary-medium-font mb-1 text-white text-start level-8 ">
																						{sponsorDate.men?.name}
																					</h4>
																					<p className="mb-0 text-white text-start">
																						{sponsorDate.comment}
																					</p>
																				</div>
																			</div>
																		</Link>
																	</td>
																	<td className="secondary-medium-font text-white level-8 text-center">
																		{sponsorDate.date}
																	</td>
																	<td className="secondary-medium-font text-white level-8 text-center">
																		${sponsorDate.offer_price}
																	</td>
																	<td className="secondary-medium-font text-white level-8 text-center">
																		<h4
																			className={`${getStatusClass(
																				sponsorDate.status,
																			)} mb-0 secondary-medium-font level-8 text-capitalize`}
																		>
																			{sponsorDate.status}
																		</h4>
																	</td>
																	<td className="secondary-medium-font level-8 text-center">
																		<div className="d-flex align-items-center justify-content-end">
																			{Actions(sponsorDate)}
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
														<Pagination
															currentPage={currentPage}
															lastPage={lastPage}
															onPageChange={(page) => setCurrentPage(page)}
														/>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					)}
				</div>
			</section>

			<Footer />
		</>
	);
}

export default DatesTab;

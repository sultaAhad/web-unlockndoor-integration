import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { notify_img } from "../Constant/Index";
import { useAuthNotificationsQuery } from "../network/services/AuthServices";
import { useSelector } from "react-redux";
import { Pagination } from "react-bootstrap";
import Spinner from "./Spinner";

const Notifications = ({ type }) => {
	const { user, userToken } = useSelector((state) => state.auth);
	const [notifications, setNotifications] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
	const { data, isLoading, isError, refetch } = useAuthNotificationsQuery({
		type,
		currentPage,
	});

	const [lastPage, setLastPage] = useState(1);

	useEffect(() => {
		console.log("data", data);

		if (data?.response?.data?.notifications) {
			setNotifications(data?.response?.data?.notifications);
			// 	// setCurrentPage(data.response.data.notifications?.current_page);
			// 	// setLastPage(data.response.data.notifications?.last_page);
			// } else {
			// 	setNotifications(data?.response?.data?.notifications);
		}
	}, [data, currentPage]);

	useEffect(() => {
		refetch();
	}, [currentPage]);

	if (isError) return <p>Error loading notifications.</p>;

	return (
		<div className="group-wrapper-main-list1">
			{isLoading ? (
				<Spinner />
			) : notifications.length > 0 ? (
				notifications.map((item, index) => (
					<div
						key={index}
						className="row align-items-center border-bottom-color position-relative"
					>
						<div className="col-lg-12 border-top border-bottom pt-4 pb-4">
							<div className="d-flex align-items-center gap-2">
								<div className="row align-items-center">
									<div className="col-lg-2">
										<img
											src={item.image || notify_img}
											className="img-fluid wrapper-fluid-notification"
											alt={item.title}
										/>
									</div>
									<div className="col-lg-10">
										<div className="row">
											<div className="col-lg-12">
												<h4 className="secondary-medium-font mb-0 text-white level-8">
													{item.title}
												</h4>
												<p className="mb-0 text-white secondary-regular-font">
													{item.message}
												</p>
											</div>
										</div>
									</div>
								</div>
							</div>

							<div className="notify_para">
								<p className="mb-3 text-end level-9 text-white">
									({new Date(item.created_at).toLocaleTimeString()} |{" "}
									{new Date(item.created_at).toLocaleDateString()})
								</p>

								{item?.action == "true" && (
									<>
										{item?.type == "type1" && (
											<Link
												to=""
												className="view-detail-wrapper secondary-regular-font"
											>
												View Details
											</Link>
										)}
										{item?.type == "type2" && (
											<div className="d-flex align-items-center gap-2">
												<Link
													onClick={() => acceptOfferHandle(sponsor?.id)}
													className="view-detail-wrapper secondary-regular-font"
												>
													Accept
												</Link>
												<Link
													onClick={() => setShowRejectModal(true)}
													className="view-detail-wrapper reject secondary-regular-font text-white"
												>
													Reject
												</Link>
											</div>
										)}
									</>
								)}
							</div>
						</div>
					</div>
				))
			) : (
				<p className="text-white">No notifications found.</p>
			)}
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
	);
};

export default Notifications;

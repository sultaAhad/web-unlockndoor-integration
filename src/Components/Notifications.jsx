import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { notify_img } from "../Constant/Index";
import { useAuthNotificationsQuery } from "../network/services/AuthServices";
import Spinner from "./Spinner";
import SponsoredDates from "./SponsoredDates";
import { BASE_URL } from "../utils/base_url";
import { NOTIFICATIONS_API } from "../utils/endpoints";

const Notifications = ({ type }) => {
	const { user } = useSelector((state) => state.auth);

	const [notifications, setNotifications] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [lastPage, setLastPage] = useState(1);

	const { data, isLoading, isError, refetch, isFetching } =
		useAuthNotificationsQuery(
			{
				type,
				currentPage,
			},
			{
				refetchOnMountOrArgChange: true,
				refetchOnReconnect: true,
				refetchOnFocus: true,
				pollingInterval: 0,
			},
		);

	const getNotifications = async () => {
		try {
			const token = localStorage.getItem("token");
			const response = await fetch(
				`${BASE_URL}${NOTIFICATIONS_API({
					type: type,
					currentPage: currentPage,
				})}`,
				{
					method: "GET",
					headers: {
						Authorization: `Bearer ${token}`,
						"Content-Type": "application/json",
					},
				},
			);

			const data = await response.json();

			if (data?.response?.data?.notifications) {
				const newNotifications = data.response.data.notifications;
				const pagination = data.response.data.pagination;
				setLastPage(pagination?.last_page || 1);
				setNotifications((prev) => {
					if (currentPage === 1) {
						return newNotifications;
					} else {
						const merged = [...prev, ...newNotifications];
						const unique = [...new Map(merged.map((n) => [n.id, n])).values()];
						return unique;
					}
				});
			}
		} catch (error) {
			console.error("Error fetching notifications:", error);
		}
	};

	useEffect(() => {
		getNotifications();
	}, [currentPage]);

	// useEffect(() => {
	//   if (data?.response?.data?.notifications) {
	//     const newNotifications = data.response.data.notifications;
	//     const pagination = data.response.data.pagination;
	//     setLastPage(pagination?.last_page || 1);
	//     setNotifications((prev) => {
	//       if (currentPage === 1) {
	//         return newNotifications;
	//       } else {
	//         const merged = [...prev, ...newNotifications];
	//         const unique = [...new Map(merged.map((n) => [n.id, n])).values()];
	//         return unique;
	//       }
	//     });
	//   }
	// }, [data]);

	// useEffect(() => {
	//   if (currentPage > 1) {
	//     refetch();
	//   }
	// }, [currentPage]);

	// useEffect(() => {
	//   setCurrentPage(1);
	//   refetch();
	// }, []);

	// const handleLoadMore = () => {
	//   if (currentPage < lastPage) {
	//     setCurrentPage((prev) => prev + 1);
	//   }
	// };

	if (isError) return <p>Error loading notifications.</p>;

	return (
		<div className="group-wrapper-main-list1">
			{isLoading && currentPage === 1 ? (
				<Spinner />
			) : notifications.length > 0 ? (
				<>
					{notifications.map((item, index) => (
						<div
							key={index}
							className="row align-items-center border-bottom-color position-relative"
						>
							<div className="col-lg-12 border-top border-bottom pt-4 pb-4">
								{/* <div className="d-flex align-items-center gap-2"> */}
								<div className="row align-items-center">
									<div className="col-md-2">
										<div className="notification____image">
											<Link to={`/view-profile/${item?.ref_id}`} className="text-decoration-none">
												<img
													src={
														item?.ref?.profile_image_url ||
														item?.sender?.profile_image_url ||
														notify_img
													}
													className="img-fluid wrapper-fluid-notification"
													alt={item.title}
												/>
											</Link>
										</div>
									</div>
									<div className="col-lg-7 col-md-6 mt-md-0 mt-3">
										<div className="notification___content">
											<Link to={`/view-profile/${item?.ref_id}`} className="text-decoration-none">
												<h4 className="secondary-medium-font mb-0 text-white level-8">
													{item.title}
												</h4>
												<p className="mb-0 text-white secondary-regular-font">
													{item.message}
												</p>
											</Link>
										</div>
									</div>
									<div className="col-lg-3 col-md-4">
										{/* ✅ Date-Time + Buttons */}
										<div className="notify_para">
											<p className="mb-3 text-sm-end level-9 text-white">
												({new Date(item.created_at).toLocaleTimeString()} |{" "}
												{new Date(item.created_at).toLocaleDateString()})
											</p>

											{/* ✅ Buttons only when action is true */}
											{item?.action === "true" && (
												<>
													{/* View Profile */}
													{item?.type === "visit_profile" && (
														<Link
															to={`/view-profile/${item?.ref_id}`}
															state={item?.ref} // ✅ send the visitor's (ref) full data
															className="view-detail-wrapper secondary-regular-font"
														>
															View Profile
														</Link>
													)}

													{/* Offer Date */}
													{item?.type === "offer_date" && (
														<div className="d-flex align-items-center justify-content-sm-end justify-content-center gap-2">
															<SponsoredDates
																selectedDateId={item.ref_id} // ✅ actual date id
																notificationId={item.id} // ✅ this is the notification.id
																notificationType={item.type} // ✅ e.g. "offer_date"
															/>{" "}
														</div>
													)}
												</>
											)}
										</div>
									</div>
								</div>
								{/* </div> */}
							</div>
						</div>
					))}

					{/* ✅ Load More */}
					{currentPage < lastPage && (
						<div className="text-center mt-4 mb-4">
							<button
								className="btn-write secondary-medium-font load-more-wrapper rounded-0 extra-bg-1 border-none"
								onClick={() => setCurrentPage((pre) => pre + 1)}
								disabled={isFetching}
							>
								{isFetching ? "Loading..." : "Load More"}
							</button>
						</div>
					)}
				</>
			) : (
				<p className="text-white">No notifications found.</p>
			)}
		</div>
	);
};

export default Notifications;

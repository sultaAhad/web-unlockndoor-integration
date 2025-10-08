import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { notify_img } from "../Constant/Index";
import { useAuthNotificationsQuery } from "../network/services/AuthServices";
import Spinner from "./Spinner";

const Notifications = ({ type }) => {
	const { user, refreshNotifications } = useSelector((state) => state.auth);
	const [notifications, setNotifications] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [lastPage, setLastPage] = useState(1);

	const { data, isLoading, isError, refetch, isFetching } =
		useAuthNotificationsQuery({
			type,
			currentPage,
		});

	// ✅ Debug log: show raw API data when fetched
	useEffect(() => {
		if (data) {
			console.log("📦 API response:", data);
			console.log("📄 Current Page:", currentPage);
			console.log("🔢 Last Page:", data?.response?.data?.pagination?.last_page);
		}
	}, [data]);

	// ✅ Update notifications and pagination info when data changes
	useEffect(() => {
		if (data?.response?.data?.notifications) {
			const newNotifications = data.response.data.notifications;
			const pagination = data.response.data.pagination;

			console.log("🧩 New Notifications (fetched):", newNotifications);
			console.log("📑 Pagination Object:", pagination);

			setLastPage(pagination?.last_page || 1);

			// ✅ If it's the first page, replace data; otherwise append
			if (currentPage === 1) {
				setNotifications(newNotifications);
				console.log("🆕 Replaced notifications for page 1");
			} else {
				setNotifications((prev) => {
					const merged = [...prev, ...newNotifications];
					console.log("➕ Appended new notifications:", merged);
					return merged;
				});
			}
		}
	}, [data]);

	// ✅ Trigger refetch when page changes (after first)
	useEffect(() => {
		if (currentPage > 1) {
			console.log("🔁 Fetching next page:", currentPage);
			refetch();
		}
	}, [currentPage]);
	useEffect(() => {
		if (refreshNotifications) {
			console.log("🔁 Refetching notifications due to real-time event...");
			refetch();
		}
	}, [refreshNotifications]);

	// ✅ Handle Load More click
	const handleLoadMore = () => {
		if (currentPage < lastPage) {
			console.log("👉 Load More clicked — Next Page:", currentPage + 1);
			setCurrentPage((prev) => prev + 1);
		} else {
			console.log("✅ No more pages to load");
		}
	};

	if (isError) return <p>Error loading notifications.</p>;
	useEffect(() => {
		refetch(); // refetch your notifications API
	}, [refreshNotifications]);

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
											<h4 className="secondary-medium-font mb-0 text-white level-8">
												{item.title}
											</h4>
											<p className="mb-0 text-white secondary-regular-font">
												{item.message}
											</p>
										</div>
									</div>
								</div>

								<div className="notify_para">
									<p className="mb-3 text-end level-9 text-white">
										({new Date(item.created_at).toLocaleTimeString()} |{" "}
										{new Date(item.created_at).toLocaleDateString()})
									</p>

									{item?.action === "true" && (
										<>
											{item?.type === "type1" && (
												<Link
													to=""
													className="view-detail-wrapper secondary-regular-font"
												>
													View Details
												</Link>
											)}
											{item?.type === "type2" && (
												<div className="d-flex align-items-center gap-2">
													<Link
														onClick={() => acceptOfferHandle(item.ref_id)}
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
					))}

					{/* ✅ Load More Button */}
					{currentPage < lastPage && (
						<div className="text-center mt-4 mb-4">
							<button
								className="btn btn-primary px-4 py-2 rounded-pill"
								onClick={handleLoadMore}
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

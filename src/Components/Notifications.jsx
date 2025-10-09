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

	// ✅ Full API response log
	useEffect(() => {
		if (data) {
			console.group("📦 API Full Response");
			console.log("✅ Status:", data?.status);
			console.log("✅ Status Code:", data?.statusCode);
			console.log("✅ Message:", data?.message);
			console.log("📄 User Type:", data?.response?.data?.user_type);
			console.log("📊 Pagination:", data?.response?.data?.pagination);
			console.log(
				"🔔 Notifications Array:",
				data?.response?.data?.notifications,
			);
			console.groupEnd();
		}
	}, [data]);

	// ✅ Detailed per-notification logging (color-coded)
	useEffect(() => {
		if (data?.response?.data?.notifications?.length) {
			console.group("🔔 Notifications Received");
			data.response.data.notifications.forEach((n, i) => {
				const color = n.is_read === 0 ? "color: red" : "color: green";
				console.groupCollapsed(`%c#${i + 1} ${n.title} — ${n.message}`, color);
				console.log("🧾 ref_id (sender):", n.ref_id);
				console.log("👤 reciever_id (receiver):", n.reciever_id);
				console.log("📌 title:", n.title);
				console.log("💬 message:", n.message);
				console.log("🏷️ type:", n.type);
				console.log("🎬 action:", n.action);
				console.log("📅 notify_date_time:", n.notify_date_time);
				console.log("📖 is_read:", n.is_read);
				console.groupEnd();
			});
			console.groupEnd();
		}
	}, [data]);

	// ✅ Update local state
	useEffect(() => {
		if (data?.response?.data?.notifications) {
			const newNotifications = data.response.data.notifications;
			const pagination = data.response.data.pagination;

			setLastPage(pagination?.last_page || 1);

			if (currentPage === 1) {
				setNotifications(newNotifications);
				console.log("🆕 Notifications replaced for page 1");
			} else {
				setNotifications((prev) => [...prev, ...newNotifications]);
				console.log("➕ Appended new notifications to existing list");
			}
		}
	}, [data]);

	// ✅ Page change trigger refetch
	useEffect(() => {
		if (currentPage > 1) {
			console.log("🔁 Refetching page:", currentPage);
			refetch();
		}
	}, [currentPage]);

	// ✅ Real-time refetch trigger
	useEffect(() => {
		if (refreshNotifications) {
			console.log("🛰 Real-time event → Refetching notifications...");
			refetch();
		}
	}, [refreshNotifications]);

	// ✅ Load More Button
	const handleLoadMore = () => {
		if (currentPage < lastPage) {
			console.log("⏭ Load More clicked → next page:", currentPage + 1);
			setCurrentPage((prev) => prev + 1);
		} else {
			console.log("🚫 No more pages to load.");
		}
	};

	// ✅ Dummy handlers
	const acceptOfferHandle = (id) => {
		console.log("✅ Accepted offer ID:", id);
	};

	const rejectOfferHandle = (id) => {
		console.log("❌ Rejected offer ID:", id);
	};

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

								{/* ✅ Date-Time + Buttons */}
								<div className="notify_para">
									<p className="mb-3 text-end level-9 text-white">
										({new Date(item.notify_date_time).toLocaleTimeString()} |{" "}
										{new Date(item.notify_date_time).toLocaleDateString()})
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
												<div className="d-flex align-items-center gap-2">
													<Link
														onClick={() => acceptOfferHandle(item.ref_id)}
														className="view-detail-wrapper secondary-regular-font"
													>
														Accept
													</Link>
													<Link
														onClick={() => rejectOfferHandle(item.ref_id)}
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

					{/* ✅ Load More */}
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

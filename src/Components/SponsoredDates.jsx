import React, { useEffect, useState } from "react";
import RejectModal from "./RejectModal";
import Spinner from "./Spinner";
import {
	useGetWomanSponsoredDatesQuery,
	useRejectDateRequestMutation,
} from "../network/services/woman/SponsoredDates";

const SponsoredDates = ({
	selectedDateId,
	notificationId,
	notificationType,
}) => {
	const [singleDate, setSingleDate] = useState(null);
	const [showRejectModal, setShowRejectModal] = useState(false);

	const { data, isLoading, refetch, isFetching } =
		useGetWomanSponsoredDatesQuery();
	const [rejectDateRequest, { isLoading: rejectingRequest }] =
		useRejectDateRequestMutation();

	useEffect(() => {
		if (data?.response?.data?.sponsoredDates?.length > 0) {
			const found = data.response.data.sponsoredDates.find(
				(item) => String(item.men.id) === String(selectedDateId),
			);
			setSingleDate(found || null);
		} else if (data?.response?.data?.sponsoredDates?.data) {
			const found = data.response.data.sponsoredDates.data.find(
				(item) => String(item.men.id) === String(selectedDateId),
			);
			setSingleDate(found || null);
		}
	}, [data, selectedDateId]);

	useEffect(() => {
		refetch();
	}, []);

	// ✅ Accept Offer
	const acceptOfferHandle = async (date_id) => {
		try {
			const response = await rejectDateRequest({
				date_id,
				status: "accepted",
				source: "notification",
				notification_id: notificationId, // 👈 This is the notification.id
				notification_type: notificationType || "offer_date",
			}).unwrap();
			setSingleDate((prev) => ({ ...prev, status: "accepted" }));
		} catch (error) {
			console.error("❌ Accept Error:", error);
		}
	};

	// ✅ Reject Offer
	const handleRejectSubmit = async (
		date_id,
		reason = "Not interested",
		counter_price = "0",
	) => {
		try {
			const response = await rejectDateRequest({
				date_id,
				status: "rejected",
				reason,
				counter_price,
				source: "notification",
				notification_id: notificationId, // 👈 This is the notification.id
				notification_type: notificationType || "offer_date",
			}).unwrap();

			setSingleDate((prev) => ({ ...prev, status: "rejected" }));
		} catch (error) {
			console.error("❌ Reject Error:", error);
		} finally {
			setShowRejectModal(false);
		}
	};

	// ✅ Show centered spinner if loading
	if (isLoading || isFetching || rejectingRequest) {
		return (
			<div
				className="d-flex justify-content-center align-items-center"
				style={{ minHeight: "150px" }}
			>
				<Spinner />
			</div>
		);
	}

	if (!singleDate) return <p>No sponsored date found for this ID.</p>;

	return (
		<div className="">
			{singleDate.status === "pending" || singleDate.status === "countered" ? (
				<div className="d-flex gap-2">
					<button
						className="btn btn-success btn-sm"
						onClick={() => acceptOfferHandle(singleDate.id)}
					>
						Accept
					</button>
					<button
						className="btn btn-danger btn-sm"
						onClick={() => setShowRejectModal(true)}
					>
						Reject
					</button>
				</div>
			) : singleDate.status === "accepted" ? (
				<a className="view-detail-wrapper">Accepted</a>
			) : singleDate.status === "rejected" ? (
				<div className="d-flex justify-content-end align-item-center text-end">
					<span className="view-detail-wrapper1 text-white text-end">
						Rejected
					</span>
				</div>
			) : null}

			{/* Reject Modal */}
			<RejectModal
				show={showRejectModal}
				dateId={singleDate.id}
				onClose={() => setShowRejectModal(false)}
				onSubmit={(reason, counter_price) =>
					handleRejectSubmit(singleDate.id, reason, counter_price)
				}
			/>
		</div>
	);
};

export default SponsoredDates;

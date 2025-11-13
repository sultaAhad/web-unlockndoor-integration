import { toast } from "react-toastify";
import {
	useDeletePaymentMethodsMutation,
	useMakePaymentMethodDefaultMutation,
} from "../network/services/WomanAuth";

const PaymentMethodCard = ({ card, defaultCardId, onAction }) => {
	const [makePaymentMethodDefault, { isLoading: isDefaultLoading }] =
		useMakePaymentMethodDefaultMutation();
	const [deletePaymentMethods, { isLoading: isDeleteLoading }] =
		useDeletePaymentMethodsMutation();

	const handleDefaultCard = (id) => {
		const formData = new FormData();
		formData.set("payment_method_id", id);
		makePaymentMethodDefault(formData).then(() => {
			toast.success("Default card updated successfully");
			onAction();
		});
	};

	const handleRemoveCard = (id) => {
		deletePaymentMethods(id).then(() => {
			toast.success("Card removed successfully");
			onAction();
		});
	};

	return (
		<div key={card.id} className="col-lg-6 col-xl-4">
			<div
				className={`card shadow-sm h-100 hover-shadow transition-all ${
					card.id == defaultCardId ? "border-white" : ""
				}`}
				style={{
					background:
						"linear-gradient(135deg, rgb(80 23 75) 0%, rgb(86 24 74) 100%)",
					color: "white",
					position: "relative",
					overflow: "hidden",
				}}
			>
				{/* Vibrating Circle */}
				<div className="animated-circle">
					<img
						src={
							card?.card?.brand === "mastercard"
								? "https://upload.wikimedia.org/wikipedia/commons/0/04/Mastercard-logo.png"
								: card?.card?.brand === "visa"
								? "https://upload.wikimedia.org/wikipedia/commons/4/41/Visa_Logo.png"
								: "https://upload.wikimedia.org/wikipedia/commons/5/5e/Credit-card.png"
						}
						alt={card?.card?.brand}
						className="brand-logo"
					/>
				</div>

				<div className="card-body d-flex flex-column">
					<div className="d-flex justify-content-between align-items-start mb-3">
						<div className="d-flex align-items-center">
							<span className="text-uppercase fw-bold">
								{card?.card?.brand}
							</span>
						</div>
						<span className="position-absolute right-0 top-0 m-1">
							{card.id == defaultCardId ? (
								<button className="btn btn-light btn-sm">Default</button>
							) : (
								<button
									onClick={() => handleDefaultCard(card.id)}
									className="btn btn-outline-light btn-sm"
								>
									{isDefaultLoading ? "Processing..." : "Set as Default"}
								</button>
							)}
							<button
								onClick={() => handleRemoveCard(card.id)}
								className="btn btn-light btn-sm ms-2"
							>
								{isDeleteLoading ? (
									"Processing..."
								) : (
									<i className="fas fa-trash text-danger"></i>
								)}
							</button>
						</span>
					</div>

					<div className="d-flex justify-content-between mt-3">
						<div className="">
							<div className="d-flex align-items-center">
								<span className="fs-5 fw-bold me-2">••••</span>
								<span className="fs-5 fw-bold">{card?.card?.last4 ?? 0}</span>
							</div>
							<small className="opacity-75">Card Number</small>
						</div>

						<div className="d-flex justify-content-end w-50">
							<div>
								<div className="fw-bold">
									{card?.card?.exp_month}/{card?.card?.exp_year}
								</div>
								<small className="opacity-75">Expires</small>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default PaymentMethodCard;

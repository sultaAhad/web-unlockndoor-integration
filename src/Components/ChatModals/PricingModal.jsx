import { Button, Modal } from "react-bootstrap";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useGetManVideoChargesQuery } from "../../network/services/ManAuth";

const PricingModal = ({
	showPricingModal,
	handlePricingClose,
	setShowPricingModal,
	setShowPayModal,
	setSelectedPlan,
}) => {
	const { user } = useSelector((state) => state.auth);
	const { data, isLoading } = useGetManVideoChargesQuery();
	const [selectedId, setSelectedId] = useState(null);

	// ✅ FIXED: Convert is_paid to number before comparing
	const isPaid = Number(user?.package?.is_paid) === 1;

	const handlePayNowOpen = () => {
		if (!selectedId) {
			alert("Please select a plan first");
			return;
		}

		const plan = data?.data?.find((p) => p.id === selectedId);
		if (plan) {
			setSelectedPlan(plan);
			setShowPricingModal(false);
			setShowPayModal(true);
		}
	};

	return (
		<Modal
			show={showPricingModal}
			onHide={handlePricingClose}
			centered
			className="pricing_modal"
			backdrop="static"
			keyboard={false}
		>
			<Modal.Header closeButton>
				<Modal.Title className="secondary-medium-font level-7 extra-color-1 mb-0">
					Video Call Pricing
				</Modal.Title>
			</Modal.Header>

			<Modal.Body>
				{isLoading ? (
					<p>Loading...</p>
				) : isPaid ? (
					<form>
						{data?.data?.map((plan) => (
							<div className="form-group pb-1" key={plan.id}>
								<label
									className="form-label d-flex align-items-center"
									htmlFor={`plan-${plan.id}`}
								>
									<input
										type="radio"
										id={`plan-${plan.id}`}
										name="main"
										hidden
										checked={selectedId === plan.id}
										onChange={() => setSelectedId(plan.id)}
									/>
									<span className="checkmark"></span>${plan.price} for{" "}
									{plan.minutes} minutes
								</label>
							</div>
						))}
					</form>
				) : (
					<p>Please upgrade your package to access video calls.</p>
				)}
			</Modal.Body>

			{isPaid && (
				<Modal.Footer className="border-0 pt-0">
					<Button
						variant="primary"
						className="w-100 border radius-8 py-3 w-100 secondary-regular-font btn btn-primary"
						onClick={handlePayNowOpen}
					>
						Pay Now
					</Button>
				</Modal.Footer>
			)}
		</Modal>
	);
};

export default PricingModal;

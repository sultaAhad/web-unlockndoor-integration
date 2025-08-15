import React from "react";
import { Button, Modal } from "react-bootstrap";

const PricingModal = ({
	showPricingModal,
	handlePricingClose,
	setShowPricingModal,
	setShowPayModal,
}) => {
	const handlePayNowOpen = () => {
		setShowPricingModal(false);
		setShowPayModal(true);
	};

	return (
		<>
			<Modal
				show={showPricingModal}
				className="pricing_modal"
				onHide={handlePricingClose}
				centered
			>
				<Modal.Header closeButton>
					<Modal.Title className="secondary-semibold-font level-7 dark-color">
						{" "}
						Video Call Pricing
					</Modal.Title>
				</Modal.Header>
				<Modal.Body className="pb-1">
					<form action="#">
						<div className="form-group pb-1">
							<label
								class="form-label signup-check d-flex align-items-center"
								for="11"
							>
								<input
									type="radio"
									id="11"
									name="main"
									checked="checked"
									hidden
								/>
								<span class="checkmark"></span>
								$50 for 15 minutes
							</label>
						</div>
						<div className="form-group pb-1">
							<label
								class="form-label signup-check d-flex align-items-center"
								for="12"
							>
								<input type="radio" id="12" name="main" hidden />
								<span class="checkmark"></span>
								$70 for 30 minutes
							</label>
						</div>
						<div className="form-group pb-1">
							<label
								class="form-label signup-check d-flex align-items-center"
								for="12"
							>
								<input type="radio" id="12" name="main" hidden />
								<span class="checkmark"></span>
								$100 for 60 minutes
							</label>
						</div>
					</form>
				</Modal.Body>
				<Modal.Footer className="border-0 pt-0">
					<Button
						variant="primary"
						className="border radius-8 py-3 w-100 secondary-regular-font"
						onClick={handlePayNowOpen}
					>
						Pay Now
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
};

export default PricingModal;

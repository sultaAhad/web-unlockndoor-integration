import React from "react";
import { Button, Col, Modal, Row } from "react-bootstrap";

const PayNowModal = ({
	showPayModal,
	handlePayClose,
	setShowThankModal,
	setShowPayModal,
}) => {
	const handlePayment = () => {
		setShowPayModal(false);
		setShowThankModal(true);
	};

	return (
		<>
			<Modal
				show={showPayModal}
				className="card_modal"
				onHide={handlePayClose}
				centered
			>
				<Modal.Header closeButton>
					<Modal.Title className="secondary-semibold-font   level-7 dark-color">
						{" "}
						Add Card Details
					</Modal.Title>
				</Modal.Header>
				<Modal.Body className="pb-1">
					<form action="#">
						<Row>
							<Col lg={12}>
								<div className="form-group">
									<input
										type="text"
										placeholder="Name on Card"
										className="form-control"
									/>
								</div>
							</Col>
							<Col lg={12}>
								<div className="form-group">
									<input
										type="number"
										placeholder="Card Number"
										className="form-control"
									/>
								</div>
							</Col>
							<Col lg={6}>
								<div className="form-group">
									<input
										type="text"
										placeholder="CVC"
										className="form-control"
									/>
								</div>
							</Col>
							<Col lg={6}>
								<div className="form-group">
									<input
										type="text"
										placeholder="MM / YY"
										className="form-control"
									/>
								</div>
							</Col>
						</Row>
					</form>
				</Modal.Body>
				<Modal.Footer className="border-0 pt-0">
					<Button
						variant="primary"
						className="border py-3 w-100 secondary-regular-font"
						onClick={handlePayment}
					>
						Pay Now
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
};

export default PayNowModal;

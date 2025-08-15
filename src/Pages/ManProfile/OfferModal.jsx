import React from "react";
import { Button, Col, Modal, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

const OfferModal = ({ showofferModal, handleofferClose }) => {
	return (
		<>
			<Modal
				show={showofferModal}
				className="offer_modal"
				onHide={handleofferClose}
				centered
			>
				<Modal.Header className="justify-content-center border-bottom-0">
					<Modal.Title className="secondary-medium-font level-7 extra-color-1">
						{" "}
						Create Offer
					</Modal.Title>
				</Modal.Header>
				<Modal.Body className="p-4">
					<form action="#">
						<Row>
							<Col lg={12}>
								<div className="form-group">
									<label htmlFor="" className="form-label secondary-secondmedium-font level-8">
										Enter Desired Amount
									</label>
									<input
										type="text"
										placeholder="$200 to $2,000e"
										className="form-control"
									/>
								</div>
							</Col>
							<Col lg={6}>
								<div className="form-group">
									<label htmlFor="" className="form-label secondary-secondmedium-font level-8">
										Date
									</label>
									<input
										type="date"
										placeholder="27/10/25"
										className="form-control"
									/>
								</div>
							</Col>
							<Col lg={6}>
								<div className="form-group">
									<label htmlFor="" className="form-label secondary-secondmedium-font level-8">
										Time
									</label>
									<input
										type="time"
										placeholder="02:00 AM"
										className="form-control"
									/>
								</div>
							</Col>
							<Col lg={12}>
								<div className="form-group">
									<label htmlFor="" className="form-label secondary-secondmedium-font level-8">
										Comment
									</label>
									<textarea
										name=""
										id=""
										cols="30"
										rows="3"
										className="form-control"
										placeholder="Write here"
									></textarea>
								</div>
							</Col>
						</Row>
						<div className="form-btn">
							<Link to="/sponsored-dates" variant="primary" className="btn-write1 offer-btn mt-0 w-100 radius-0 load-more-wrapper  d-flex align-items-center justify-content-center extra-bg-1 border-none text-decoration-none text-white">
								Offer Now
							</Link>
						</div>
					</form>
				</Modal.Body>
			</Modal>
		</>
	);
};

export default OfferModal;

import React from "react";
import { Button, Col, Modal, Row } from "react-bootstrap";

const ReofferModal = ({ showreofferModal, handlereofferClose }) => {
	return (
		<>
			<Modal
				show={showreofferModal}
				className="offer_modal"
				onHide={handlereofferClose}
				centered
			>
				<Modal.Header className="justify-content-center border-0 pb-0">
					<Modal.Title className="secondary-medium-font level-7 extra-color-1">
						{" "}
						Reoffer
					</Modal.Title>
				</Modal.Header>
				<Modal.Body className="p-4">
					<form action="#">
						<Row>
							<Col lg={12}>
								<div className="form-group position-relative">
									<label htmlFor="" className="form-label">
										Last Offer
									</label>
									<input
										type="text"
										placeholder="700"
										className="form-control pe-5"
										readOnly
									/>
									<span className="offer_span position-absolute level-8 secondary-secondmedium-font extra-color-1">
										Rejected
									</span>
								</div>
							</Col>
							<Col lg={12}>
								<div className="form-group">
									<label htmlFor="" className="form-label">
										Enter New Offer
									</label>
									<input
										type="text"
										placeholder="$200 to $2,000"
										className="form-control"
									/>
								</div>
							</Col>
							<Col lg={12}>
								<div className="form-group">
									<label htmlFor="" className="form-label">
										Comment
									</label>
									<textarea
										name=""
										id=""
										cols="30"
										rows="3"
										className="form-control"
										placeholder="Write here...."
									></textarea>
								</div>
							</Col>
						</Row>
						<div className="form-btn">
							<Button variant="primary" className="btn-write1 offer-btn mt-0 w-100 radius-0 load-more-wrapper  d-flex align-items-center justify-content-center extra-bg-1 border-none text-decoration-none text-white">
								Offer Now
							</Button>
						</div>
					</form>
				</Modal.Body>
			</Modal>
		</>
	);
};

export default ReofferModal;

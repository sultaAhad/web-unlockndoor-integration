import React from "react";
import { Button, Modal } from "react-bootstrap";

const CategoryModal = ({ showcategoryModal, handlecategoryClose }) => {
	return (
		<>
			<Modal
				show={showcategoryModal}
				className="category_modal"
				onHide={handlecategoryClose}
				centered
			>
				<Modal.Body className="text-center p-4">
					<form action="#"> 
						<div className="form-group">
							<input type="text" placeholder="Name" className="form-control" />
						</div>
						<div className="form-group">
							<input
								type="email"
								placeholder="Email Address"
								className="form-control"
							/>
						</div>
						<div className="form-group">
							<input
								type="number"
								placeholder="Contact Number"
								className="form-control"
							/>
						</div>
						<div className="form-group">
							<select name="" id="" className="form-select form-control custom-select-arrow">
								<option value="">Interested In?</option>
																<option value="">Male</option>
								<option value="">Female</option>

							</select>
						</div>
						<div className="form-btn">
							<Button variant="primary" className="border radius-8 py-3 w-100">
								Submit
							</Button>
						</div>
					</form>
				</Modal.Body>
			</Modal>
		</>
	);
};

export default CategoryModal;

import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const NewPasswordModal = ({ show, onClose }) => {
	const [showPassword, setShowPassword] = useState([false, false]);

	const togglePasswordVisibility = (index) => {
		const updated = [...showPassword];
		updated[index] = !updated[index];
		setShowPassword(updated);
	};

	return (
		<Modal
			show={show}
			centered
			onHide={onClose}
			className="border-radius-www"
		>
			<Modal.Header closeButton></Modal.Header>
			<Modal.Body className="p-4">
				<div className="login_head">
					<h3 className="secondary-semibold-font">New Password</h3>
					<h5>Enter Your New Password</h5>
				</div>

				<div className="login_modal_all">
					{["New Password", "Confirm New Password"].map((label, index) => (
						<div className="login_input" key={index}>
							<div className="login_password position-relative">
								<input
									type={showPassword[index] ? "text" : "password"}
									placeholder={label}
								/>
								<div
									className="login_icon_dv"
									style={{ cursor: "pointer" }}
									onClick={() => togglePasswordVisibility(index)}
								>
									<i
										className={`fa ${
											showPassword[index] ? "fa-eye" : "fa-eye-slash"
										}`}
									/>
								</div>
							</div>
						</div>
					))}
					<div className="login_btn">
						<Button className="border" onClick={onClose} variant="primary">
							Update
						</Button>
					</div>
				</div>
			</Modal.Body>
		</Modal>
	);
};

export default NewPasswordModal;

import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const ForgotPasswordModal = ({ show, onClose, onContinue }) => {
	return (
		<>
			<Modal
				show={show}
				centered
				onHide={onClose}
				className="border-radius-www"
			>
				<Modal.Header></Modal.Header>
				<Modal.Body className="p-4">
					<div className="login_input">
						<div className="login_head">
							<h3 className="secondary-semibold-font">Forgot Password</h3>
							<h5>Enter Your Email</h5>
						</div>

						<div className="login_email">
							<input type="text" placeholder="Email" />
							<div className="login_icon_dv">
								<i className="fa fa-envelope" />
							</div>
						</div>
						<div className="login_btn mt-3">
							<Button className="border" onClick={onContinue} variant="primary">
								Continue
							</Button>
						</div>
					</div>
				</Modal.Body>
			</Modal>
		</>
	);
};

export default ForgotPasswordModal;

import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import Swal from "sweetalert2";
import { useSendOtpMutation } from "../../network/services/ManAuth";
import { useWomenSendOtpMutation } from "../../network/services/WomanAuth";

const ForgotPasswordModal = ({ show, onClose, onContinue, gender }) => {
	const [email, setEmail] = useState("");
	const [loading, setLoading] = useState(false);

	const [sendManOtp] = useSendOtpMutation();
	const [sendWomenOtp] = useWomenSendOtpMutation();

	const handleContinue = async () => {
		if (!email?.trim()) {
			Swal.fire("Error", "Email is required", "error");
			return;
		}

		try {
			setLoading(true);
			const formData = new FormData();
			formData.append("email", email);

			let response;
			if (gender === "male") response = await sendManOtp(formData).unwrap();
			else response = await sendWomenOtp(formData).unwrap();

			Swal.fire(
				"Success",
				response?.message || "OTP sent successfully",
				"success",
			);
			onContinue(email); // send email to OTP modal
			setEmail("");
		} catch (err) {
			Swal.fire("Error", err?.data?.message || "Failed to send OTP", "error");
		} finally {
			setLoading(false);
		}
	};

	return (
		<Modal show={show} centered onHide={onClose} className="border-radius-www">
			<Modal.Header closeButton />
			<Modal.Body className="p-4">
				<div className="login_input">
					<div className="login_head">
						<h3 className="secondary-semibold-font">Forgot Password</h3>
						<h5>Enter Your Email ({gender})</h5>
					</div>

					<div className="login_email my-3">
						<input
							type="email"
							placeholder="Email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							disabled={loading}
							className="form-control"
						/>
					</div>

					<div className="login_btn text-center">
						<Button
							onClick={handleContinue}
							className="border"
							disabled={loading}
						>
							{loading ? (
								<>
									<Spinner
										as="span"
										animation="border"
										size="sm"
										className="me-2"
									/>
									Sending...
								</>
							) : (
								"Continue"
							)}
						</Button>
					</div>
				</div>
			</Modal.Body>
		</Modal>
	);
};

export default ForgotPasswordModal;

import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import Swal from "sweetalert2";
import { useSendOtpMutation } from "../../network/services/ManAuth";
import { useWomenSendOtpMutation } from "../../network/services/WomanAuth";
import { validateforget } from "../../Constant/HelperFunction";

const ForgotPasswordModal = ({ show, onClose, onContinue, gender }) => {
	const [email, setEmail] = useState("");
	const [errors, setErrors] = useState({});

	const [sendManOtp, { isLoading: isManLoading }] = useSendOtpMutation();
	const [sendWomenOtp, { isLoading: isWomenLoading }] =
		useWomenSendOtpMutation();

	const loading = isManLoading || isWomenLoading;

	const handleContinue = async () => {
		if (!validateforget(email, setErrors)) return;

		try {
			const payload = { email };
			if (gender === "male") await sendManOtp(payload).unwrap();
			else await sendWomenOtp(payload).unwrap();

			Swal.fire("Success", "OTP sent to your email", "success");
			onContinue(email); // ✅ Pass email to OTP modal
			setErrors({});
			setEmail("");
		} catch (err) {
			if (err?.data?.errors) setErrors(err.data.errors);
			else
				Swal.fire("Error", err?.data?.message || "Failed to send OTP", "error");
		}
	};

	return (
		<Modal show={show} centered onHide={onClose} className="border-radius-www">
			<Modal.Header closeButton></Modal.Header>
			<Modal.Body className="p-4">
				<div className="login_input">
					<div className="login_head">
						<h3 className="secondary-semibold-font">Forgot Password</h3>
						<h5>Enter Your Email ({gender})</h5>
					</div>

					<div className="login_email">
						<input
							type="email"
							placeholder="Email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							disabled={loading}
						/>
					</div>
					{errors.email && (
						<small className="text-danger">{errors.email[0]}</small>
					)}

					<div className="login_btn mt-3 text-center">
						<Button onClick={handleContinue} disabled={loading}>
							{loading ? (
								<>
									<Spinner
										as="span"
										animation="border"
										size="sm"
										role="status"
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

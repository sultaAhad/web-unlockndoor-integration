import { useEffect, useRef, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Swal from "sweetalert2";
import { useVerifyOtpMutation } from "../../network/services/ManAuth";
import { useWomenVerifyOtpMutation } from "../../network/services/WomanAuth";
import { useSendOtpMutation } from "../../network/services/ManAuth";
import { useWomenSendOtpMutation } from "../../network/services/WomanAuth";

const OtpModal = ({ show, onClose, onContinue, gender, email }) => {
	const [otp, setOtp] = useState(Array(6).fill(""));
	const inputRefs = useRef([]);
	const [timer, setTimer] = useState(30);
	const [loading, setLoading] = useState(false);
	const [resendLoading, setResendLoading] = useState(false);

	// OTP verification API
	const [verifyMenOtp] = useVerifyOtpMutation();
	const [verifyWomenOtp] = useWomenVerifyOtpMutation();

	// Send OTP API (for resend)
	const [sendMenOtp] = useSendOtpMutation();
	const [sendWomenOtp] = useWomenSendOtpMutation();

	// Countdown timer
	useEffect(() => {
		let countdown;
		if (show && timer > 0) {
			countdown = setInterval(() => setTimer((prev) => prev - 1), 1000);
		}
		return () => clearInterval(countdown);
	}, [show, timer]);

	// Reset OTP on modal open
	useEffect(() => {
		if (show) {
			setOtp(Array(6).fill(""));
			setTimer(30);
			setTimeout(() => inputRefs.current[0]?.focus(), 100);
		}
	}, [show]);

	const handleChange = (e, index) => {
		const value = e.target.value.replace(/\D/g, "");
		if (!value) return;
		const newOtp = [...otp];
		newOtp[index] = value[0];
		setOtp(newOtp);
		if (index < 5) inputRefs.current[index + 1]?.focus();
	};

	const handleKeyDown = (e, index) => {
		if (e.key === "Backspace") {
			if (otp[index]) {
				const newOtp = [...otp];
				newOtp[index] = "";
				setOtp(newOtp);
			} else if (index > 0) inputRefs.current[index - 1]?.focus();
		}
	};

	const handlePaste = (e) => {
		const pastedData = e.clipboardData.getData("text").replace(/\D/g, "");
		if (pastedData.length === 6) {
			setOtp(pastedData.split(""));
			inputRefs.current[5]?.focus();
		}
	};

	// Resend OTP
	const handleResend = async () => {
		try {
			setResendLoading(true);
			setOtp(Array(6).fill(""));
			setTimer(30);
			inputRefs.current[0]?.focus();

			const formData = new FormData();
			formData.append("email", email);

			let response;
			if (gender === "men") {
				response = await sendMenOtp(formData).unwrap();
			} else {
				response = await sendWomenOtp(formData).unwrap();
			}

			Swal.fire(
				"Success",
				response?.message || "OTP resent successfully",
				"success",
			);
		} catch (err) {
			Swal.fire("Error", err?.data?.message || "Failed to resend OTP", "error");
		} finally {
			setResendLoading(false);
		}
	};

	// Continue / verify OTP
	const handleContinue = async () => {
		const enteredOtp = otp.join("");
		if (!enteredOtp || enteredOtp.length < 6) {
			Swal.fire("Error", "Please enter a 6-digit OTP", "error");
			return;
		}

		try {
			setLoading(true);
			const payload = { email, otp: enteredOtp };
			let response;

			if (gender === "men") response = await verifyMenOtp(payload).unwrap();
			else response = await verifyWomenOtp(payload).unwrap();

			Swal.fire(
				"Success",
				response?.message || "OTP verified successfully",
				"success",
			);
			onContinue(); // proceed to next modal
		} catch (err) {
			Swal.fire("Error", err?.data?.message || "Invalid OTP", "error");
		} finally {
			setLoading(false);
		}
	};

	return (
		<Modal show={show} centered onHide={onClose} className="border-radius-www">
			<Modal.Header closeButton />
			<Modal.Body className="p-4">
				<h3 className="secondary-semibold-font">One Time Password</h3>
				<h5>Enter Your OTP</h5>
				<div className="login_input">
					<div className="row justify-content-center my-3">
						{otp.map((value, index) => (
							<div className="col-2 px-1" key={index}>
								<input
									ref={(el) => (inputRefs.current[index] = el)}
									type="text"
									maxLength="1"
									value={value}
									onChange={(e) => handleChange(e, index)}
									onKeyDown={(e) => handleKeyDown(e, index)}
									onPaste={index === 0 ? handlePaste : undefined}
									className="otp-input text-center"
									style={{ fontSize: "20px" }}
								/>
							</div>
						))}
					</div>
				</div>
				<div className="login_btn">
					<Button
						onClick={handleContinue}
						disabled={loading}
						className="border w-100 my-2"
					>
						{loading ? "Verifying..." : "Continue"}
					</Button>
				</div>
				<p className="text-center">
					0:{timer < 10 ? `0${timer}` : timer}{" "}
					<span
						style={{
							cursor: timer === 0 && !resendLoading ? "pointer" : "not-allowed",
							color: timer === 0 ? "gray" : "#000",
						}}
						onClick={timer === 0 && !resendLoading ? handleResend : null}
					>
						<b> {resendLoading ? "Resending..." : "Resend"}</b>
					</span>
				</p>
			</Modal.Body>
		</Modal>
	);
};

export default OtpModal;

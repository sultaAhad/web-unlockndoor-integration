import { useEffect, useRef, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Swal from "sweetalert2";
import { useVerifyOtpMutation } from "../../network/services/ManAuth";
import { useWomenVerifyOtpMutation } from "../../network/services/WomanAuth";
import { validateOtpData } from "../../Constant/HelperFunction";

const OtpModal = ({ show, onClose, onContinue, gender, email }) => {
	const [otp, setOtp] = useState(Array(6).fill(""));
	const inputRefs = useRef([]);
	const [timer, setTimer] = useState(30);
	const [loading, setLoading] = useState(false);
	const [errors, setErrors] = useState({});

	const [verifyManOtp] = useVerifyOtpMutation();
	const [verifyWomenOtp] = useWomenVerifyOtpMutation();

	// Timer countdown
	useEffect(() => {
		let countdown;
		if (show && timer > 0)
			countdown = setInterval(() => setTimer((prev) => prev - 1), 1000);
		return () => clearInterval(countdown);
	}, [show, timer]);

	// Reset OTP and timer when modal opens
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

	const handleResend = () => {
		setOtp(Array(6).fill(""));
		setTimer(30);
		inputRefs.current[0]?.focus();
		Swal.fire("Success", "OTP resent successfully", "success");
	};

	const handleContinue = async () => {
		const enteredOtp = otp.join("");
		if (!validateOtpData(email, enteredOtp, setErrors)) return;

		try {
			setLoading(true);
			const payload = { email, otp: enteredOtp };

			if (gender === "male") await verifyManOtp(payload).unwrap();
			else await verifyWomenOtp(payload).unwrap();

			Swal.fire("Success", "OTP verified successfully", "success");
			onContinue();
		} catch (err) {
			Swal.fire("Error", err?.data?.message || "Invalid OTP", "error");
		} finally {
			setLoading(false);
		}
	};

	return (
		<Modal show={show} centered onHide={onClose} className="border-radius-www">
			<Modal.Header closeButton></Modal.Header>
			<Modal.Body className="p-4">
				<div className="login_modal_all text-center">
					<h3 className="secondary-semibold-font">One Time Password</h3>
					<h5>Enter Your OTP</h5>

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
					{errors.otp && <p className="text-danger">{errors.otp[0]}</p>}

					<Button
						onClick={handleContinue}
						disabled={loading}
						className="w-100 my-2"
					>
						{loading ? "Verifying..." : "Continue"}
					</Button>

					<p>
						0:{timer < 10 ? `0${timer}` : timer}{" "}
						<span style={{ cursor: "pointer" }} onClick={handleResend}>
							Resend
						</span>
					</p>
				</div>
			</Modal.Body>
		</Modal>
	);
};

export default OtpModal;

import { useEffect, useRef, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const OtpModal = ({ show, onClose, onContinue }) => {
	const [otp, setOtp] = useState(Array(6).fill(""));
	const inputRefs = useRef([]);
	const [timer, setTimer] = useState(30);

	// ⏱ Timer logic
	useEffect(() => {
		let countdown;
		if (show && timer > 0) {
			countdown = setInterval(() => {
				setTimer((prev) => prev - 1);
			}, 1000);
		}
		return () => clearInterval(countdown);
	}, [show, timer]);

	// 🔁 Reset OTP and Timer when modal opens
	useEffect(() => {
		if (show) {
			setOtp(Array(6).fill(""));
			setTimer(30);
			setTimeout(() => inputRefs.current[0]?.focus(), 100);
		}
	}, [show]);

	const handleChange = (e, index) => {
		const value = e.target.value.replace(/\D/, ""); // Only digits
		if (!value) return;

		const newOtp = [...otp];
		newOtp[index] = value;
		setOtp(newOtp);

		// Move to next input
		if (index < 5) inputRefs.current[index + 1]?.focus();
	};

	const handleKeyDown = (e, index) => {
		if (e.key === "Backspace") {
			if (otp[index]) {
				const newOtp = [...otp];
				newOtp[index] = "";
				setOtp(newOtp);
			} else if (index > 0) {
				inputRefs.current[index - 1]?.focus();
			}
		}
	};

	const handleResend = () => {
		setOtp(Array(6).fill(""));
		setTimer(30);
		inputRefs.current[0]?.focus();
	};

	return (
		<Modal show={show} centered onHide={onClose} className="border-radius-www">
			<Modal.Header closeButton></Modal.Header>
			<Modal.Body className="p-4">
				<div className="login_modal_all">
					<div className="login_head">
						<h3 className="secondary-semibold-font">One Time Password</h3>
						<h5>Enter Your OTP</h5>
					</div>
					<div className="login_input">
						<div className="row justify-content-center">
							{[...Array(6)].map((_, index) => (
								<div className="col-2 px-1" key={index}>
									<input
										ref={(el) => (inputRefs.current[index] = el)}
										type="text"
										maxLength="1"
										value={otp[index]}
										onChange={(e) => handleChange(e, index)}
										onKeyDown={(e) => handleKeyDown(e, index)}
										className="otp-input text-center"
										style={{ fontSize: "20px" }}
									/>
								</div>
							))}
						</div>
					</div>
					<div className="login_btn text-center mt-3">
						<Button className="border " onClick={() => onContinue(otp.join(""))} variant="primary">
							Continue
						</Button>
					</div>
					<div className="otp_time text-center mt-3">
						<h4>0:{timer < 10 ? `0${timer}` : timer}</h4>
						<h5>
							Code didn’t receive?{" "}
							<span
								style={{  cursor: "pointer" }}
								onClick={handleResend}
							>
								Resend
							</span>
						</h5>
					</div>
				</div>
			</Modal.Body>
		</Modal>
	);
};

export default OtpModal;

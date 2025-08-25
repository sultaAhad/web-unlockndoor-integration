import React, { useRef, useState, useEffect } from "react";
import Webcam from "react-webcam";
import Swal from "sweetalert2";
import { useVerifySelfieMutation } from "../network/services/ManAuth";

const SelfieModal = ({ profileImage, isOpen, onClose, onVerified }) => {
	const webcamRef = useRef(null);
	const [preview, setPreview] = useState(null);
	const [verifySelfie, { isLoading }] = useVerifySelfieMutation();

	useEffect(() => {
		if (!isOpen) setPreview(null);
	}, [isOpen]);

	if (!isOpen) return null;

	const capture = () => {
		if (!webcamRef.current) {
			Swal.fire("Error", "Webcam not ready", "error");
			return;
		}
		const imageSrc = webcamRef.current.getScreenshot();
		if (!imageSrc) {
			Swal.fire("Error", "Failed to capture image", "error");
			return;
		}
		setPreview(imageSrc);
	};

	const base64ToFile = (base64, filename) => {
		const byteString = atob(base64.split(",")[1]);
		const mimeString = base64.split(",")[0].split(":")[1].split(";")[0];
		const ab = new ArrayBuffer(byteString.length);
		const ia = new Uint8Array(ab);
		for (let i = 0; i < byteString.length; i++)
			ia[i] = byteString.charCodeAt(i);
		return new File([ab], filename, { type: mimeString });
	};

	const handleVerify = async () => {
		if (!preview) {
			Swal.fire("Error", "Please capture your selfie first!", "error");
			return;
		}
		try {
			const selfieFile = base64ToFile(preview, "selfie.jpg");
			const formData = new FormData();
			formData.append("profile_image", profileImage);
			formData.append("selfie", selfieFile);

			const res = await verifySelfie(formData).unwrap();

			Swal.fire("Success", res.message, "success").then(() => {
				onVerified?.(); // ✅ call Stepper callback
				setPreview(null);
			});
		} catch (err) {
			Swal.fire("Error", err?.data?.message || "Verification failed", "error");
		}
	};

	return (
		<div className="modal-overlay">
			<div className="modal-box">
				<button
					className="modal-close"
					onClick={() => {
						onClose();
						setPreview(null);
					}}
				>
					&times;
				</button>
				<h2 className="modal-title">Take Your Selfie</h2>

				{!preview ? (
					<>
						<Webcam
							ref={webcamRef}
							screenshotFormat="image/jpeg"
							className="webcam"
							videoConstraints={{ facingMode: "user" }}
						/>
						<button className="btn btn-blue mt-3" onClick={capture}>
							Capture Selfie
						</button>
					</>
				) : (
					<>
						<img src={preview} alt="Selfie" className="webcam" />
						<div className="btn-group mt-3">
							<button className="btn btn-red" onClick={() => setPreview(null)}>
								Retake
							</button>
							<button
								className="btn btn-green"
								onClick={handleVerify}
								disabled={isLoading}
							>
								{isLoading ? "Verifying..." : "Verify"}
							</button>
						</div>
					</>
				)}
			</div>

			<style jsx>{`
				.modal-overlay {
					position: fixed;
					top: 0;
					left: 0;
					width: 100%;
					height: 100%;
					background: rgba(0, 0, 0, 0.5);
					display: flex;
					justify-content: center;
					align-items: center;
					z-index: 9999;
				}
				.modal-box {
					background: #fff;
					padding: 20px;
					border-radius: 10px;
					max-width: 500px;
					width: 90%;
					text-align: center;
					position: relative;
				}
				.modal-close {
					position: absolute;
					top: 10px;
					right: 15px;
					background: transparent;
					border: none;
					font-size: 24px;
					cursor: pointer;
				}
				.webcam {
					width: 100%;
					height: auto;
					border-radius: 10px;
				}
				.btn-group button {
					margin: 0 5px;
				}
			`}</style>
		</div>
	);
};

export default SelfieModal;

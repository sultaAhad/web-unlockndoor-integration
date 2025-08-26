import React, { useRef, useState, useEffect } from "react";
import Webcam from "react-webcam";
import Swal from "sweetalert2";
import { useVerifySelfieMutation } from "../network/services/ManAuth";

const SelfieModal = ({ isOpen, onClose, onVerified }) => {
	const webcamRef = useRef(null);
	const [preview, setPreview] = useState(null);
	const [verifySelfie, { isLoading }] = useVerifySelfieMutation();

	useEffect(() => {
		if (!isOpen) setPreview(null);
	}, [isOpen]);

	if (!isOpen) return null;

	const capture = () => {
		const imageSrc = webcamRef.current.getScreenshot();
		if (!imageSrc) return Swal.fire("Error", "Capture failed", "error");
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
		if (!preview) return Swal.fire("Error", "Capture selfie first", "error");

		try {
			const selfieFile = base64ToFile(preview, "selfie.jpg");
			const formData = new FormData();
			formData.append("selfie", selfieFile);

			const res = await verifySelfie(formData).unwrap();

			Swal.fire("Success", res.message, "success").then(() => {
				onVerified?.();
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

				<style jsx>{`
					.modal-overlay {
						position: fixed;
						top: 0;
						left: 0;
						width: 100%;
						height: 100%;
						background: rgba(0, 0, 0, 0.6);
						display: flex;
						justify-content: center;
						align-items: center;
						z-index: 9999;
					}
					.modal-box {
						background: #fff;
						padding: 25px;
						border-radius: 12px;
						max-width: 450px;
						width: 90%;
						text-align: center;
						position: relative;
						box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
					}
					.modal-close {
						position: absolute;
						top: 10px;
						right: 15px;
						background: transparent;
						border: none;
						font-size: 26px;
						cursor: pointer;
					}
					.webcam {
						width: 100%;
						height: auto;
						border-radius: 10px;
						border: 2px solid #ccc;
					}
					.btn-group button {
						margin: 0 5px;
						padding: 8px 16px;
						border: none;
						border-radius: 6px;
						cursor: pointer;
					}
					.btn-red {
						background: #f44336;
						color: #fff;
					}
					.btn-green {
						background: #4caf50;
						color: #fff;
					}
					.btn-blue {
						background: #2196f3;
						color: #fff;
					}
				`}</style>
			</div>
		</div>
	);
};

export default SelfieModal;

import React, { useEffect } from "react";
import Swal from "sweetalert2";
import FaceVerification from "./FaceVerification";
import { useNavigate } from "react-router-dom";
import { useGetManDataQuery } from "../network/services/ManAuth";
import { useWomanDataQuery } from "../network/services/WomanAuth";

const SelfieModal = ({ isOpen, onClose, onVerified }) => {
	const { data: manData } = useGetManDataQuery();
	const { data: womanData } = useWomanDataQuery();

	const gender = localStorage.getItem("gender"); // expect only "men" or "women"

	// ✅ user ko gender ke hisaab se set karo
	let user = null;
	if (gender === "men") {
		user = manData?.response?.data?.data;
	} else if (gender === "women") {
		user = womanData?.response?.data?.data;
	}

	const navigate = useNavigate();

	useEffect(() => {
		if (!isOpen) return;

		console.log("🟡 SelfieModal opened");
		console.log("🔹 gender:", gender);
		console.log("👨 manData:", manData);
		console.log("👩 womanData:", womanData);
		console.log("📌 user used:", user);
	}, [isOpen, gender, manData, womanData, user]);

	// ✅ agar already verified hai toh modal hi mat dikhao
	if (!isOpen || localStorage.getItem("selfieVerified") === "true") return null;

	return (
		<div className="modal-overlay">
			<div className="modal-box">
				<button className="modal-close" onClick={onClose}>
					&times;
				</button>

				<h2 className="modal-title">Selfie Verification</h2>

				{user?.profile_image_url ? (
					<FaceVerification
						profileImageUrl={user.profile_image_url}
						onVerified={(status) => {
							if (status) {
								Swal.fire("Success", "Selfie verified!", "success").then(() => {
									localStorage.setItem("selfieVerified", "true");

									// ✅ Navigate based on gender
									if (gender === "women") {
										navigate("/women-profiles");
									} else if (gender === "men") {
										navigate("/profile");
									}

									onVerified?.();
									onClose();
								});
							} else {
								Swal.fire("Error", "Face did not match!", "error");
							}
						}}
					/>
				) : (
					<p>No profile image found for user</p>
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
						z-index: 11;
					}
					.modal-box {
						background: #fff;
						padding: 25px;
						border-radius: 12px;
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
						font-size: 26px;
						cursor: pointer;
					}
					.modal-title {
						margin-bottom: 15px;
						font-size: 20px;
						font-weight: bold;
					}
				`}</style>
			</div>
		</div>
	);
};

export default SelfieModal;

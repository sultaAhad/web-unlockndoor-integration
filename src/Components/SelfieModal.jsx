import React, { useEffect } from "react";
import Swal from "sweetalert2";
import { useGetManDataQuery } from "../network/services/ManAuth";
import FaceVerification from "./FaceVerification";

const SelfieModal = ({ isOpen, onClose, onVerified }) => {
	const { data } = useGetManDataQuery();
	const user1 = data?.response?.data?.data;

	useEffect(() => {
		if (!isOpen) return;
		console.log("SelfieModal opened", user1);
	}, [isOpen, user1]);

	if (!isOpen) return null;

	return (
		<div className="modal-overlay">
			<div className="modal-box">
				<button className="modal-close" onClick={onClose}>
					&times;
				</button>

				<h2 className="modal-title">Selfie Verification</h2>

				{user1?.profile_image_url ? (
					<FaceVerification
						profileImageUrl={user1.profile_image_url}
						onVerified={(status) => {
							if (status) {
								Swal.fire("Success", "Selfie verified!", "success").then(() => {
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

import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useGetManDataQuery } from "../network/services/ManAuth";
import { useWomanDataQuery } from "../network/services/WomanAuth";
import FaceVerification from "./FaceVerification";

const SelfieModal = ({ isOpen, onClose, onVerified }) => {
	// const { user, userToken } = useSelector((state) => state.auth);
	const gender = localStorage.getItem("gender");
	const navigate = useNavigate();
	const [verificationStatus, setVerificationStatus] = useState(null);

	const { data: manData, refetch: manDataRefetch } = useGetManDataQuery(
		undefined,
		{ skip: gender !== "men" },
	);
	const { data: womanData, refetch: womanDataRefetch } = useWomanDataQuery(
		undefined,
		{ skip: gender !== "women" },
	);
	let user = null;
	if (gender === "men") user = manData?.response?.data?.data;
	else if (gender === "women") user = womanData?.response?.data?.women;

	const profileImageUrl =
		user?.profile_image_url || user?.profile_image || null;

	const isAlreadyVerified =
		user?.selfie_verified === 1 ||
		localStorage.getItem("selfieVerified") === "true";

	useEffect(() => {
		if (!isOpen) return;
		console.log("🟡 SelfieModal opened");
		console.log("📸 profileImageUrl:", profileImageUrl);
	}, [isOpen, profileImageUrl]);
	useEffect(() => {
		if (user?.selfie_verified === 1) {
			localStorage.setItem("selfieVerified", "true");
		}
	}, [user]);

	if (!isOpen || isAlreadyVerified) return null;

	const handleVerified = async (status) => {
		if (status) {
			setVerificationStatus("success");

			try {
				if (gender === "men") await manDataRefetch();
				else await womanDataRefetch();
			} catch (error) {
				console.error("❌ Error refetching data:", error);
			}

			Swal.fire({
				title: "Success! 🎉",
				text: "Selfie verified successfully!",
				icon: "success",
				timer: 2000,
				showConfirmButton: false,
				background: "#fff",
			}).then(() => {
				localStorage.setItem("selfieVerified", "true");
				onVerified?.(true);
				onClose();

				setTimeout(() => {
					if (gender === "women") navigate("/women-profiles");
					else navigate("/profile");
				}, 500);
			});
		} else {
			setVerificationStatus("failed");
			Swal.fire({
				title: "Verification Failed!",
				text: "Please try again with a clear face photo.",
				icon: "error",
				confirmButtonText: "Try Again",
			});
		}
	};

	const handleClose = () => {
		console.log("❌ Modal manually closed");
		onClose();
	};

	return (
		<div className="modal-overlay">
			<div className="modal-container">
				<div className="modal-header">
					<h2 className="modal-title">
						<i className="fas fa-fingerprint"></i> Identity Verification
						Required
					</h2>
					<button className="modal-close" onClick={handleClose}>
						<i className="fas fa-times"></i>
					</button>
				</div>

				<div className="modal-body">
					{verificationStatus === "success" ? (
						<div className="verification-success">
							<div className="success-icon">✅</div>
							<h3>Verification Complete!</h3>
							<p>Redirecting you to your profile...</p>
						</div>
					) : verificationStatus === "failed" ? (
						<div className="verification-failed">
							<div className="failed-icon">❌</div>
							<h3>Verification Failed</h3>
							<p>Please try again with better lighting and a clear face.</p>
							<button
								className="btn btn-primary"
								onClick={() => setVerificationStatus(null)}
							>
								Try Again
							</button>
						</div>
					) : profileImageUrl ? (
						<FaceVerification
							profileImageUrl={profileImageUrl}
							refetch={gender === "men" ? manDataRefetch : womanDataRefetch}
							onVerified={handleVerified}
						/>
					) : (
						<div className="loading-state">
							<div className="loading-spinner"></div>
							<p>Loading your profile information...</p>
							<small>If this takes too long, please refresh the page.</small>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default SelfieModal;

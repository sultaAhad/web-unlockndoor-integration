import React, { useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import * as faceapi from "face-api.js";
import Swal from "sweetalert2";

import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../network/reducers/AuthReducer";
import {
	useUpdateProfileImageMutation,
	useVerifySelfieMutation,
} from "../network/services/ManAuth";
import {
	useUpdateProfileImageWomenMutation,
	useVerifySelfieWomenMutation,
} from "../network/services/WomanAuth";

const FaceVerification = ({ profileImageUrl, onVerified, refetch }) => {
	const webcamRef = useRef(null);
	const profileInputRef = useRef(null);
	const dispatch = useDispatch();
	const { user } = useSelector((state) => state.auth);

	const gender = localStorage.getItem("gender"); // ✅ ab sirf "men" ya "women"

	// 🔹 Mutations: gender ke hisaab se
	const [verifySelfieMen, { isLoading: isMenLoading }] =
		useVerifySelfieMutation();
	const [updateProfileImageMen, { isLoading: isMenProfileLoading }] =
		useUpdateProfileImageMutation();

	const [verifySelfieWomen, { isLoading: isWomenLoading }] =
		useVerifySelfieWomenMutation();
	const [updateProfileImageWomen, { isLoading: isWomenProfileLoading }] =
		useUpdateProfileImageWomenMutation();

	// ✅ yahan female hata diya → ab sirf men/women
	const verifySelfie = gender === "women" ? verifySelfieWomen : verifySelfieMen;
	const updateProfileImage =
		gender === "women" ? updateProfileImageWomen : updateProfileImageMen;

	const isLoading = gender === "women" ? isWomenLoading : isMenLoading;
	const isProfileImageLoading =
		gender === "women" ? isWomenProfileLoading : isMenProfileLoading;

	const [selfie, setSelfie] = useState(null);
	const [modelsLoaded, setModelsLoaded] = useState(false);
	const [form, setForm] = useState({
		profileImage: user?.profile_image_url || profileImageUrl || null,
	});
	const [profileDescriptors, setProfileDescriptors] = useState([]);

	// 🔹 Load face-api models once
	useEffect(() => {
		const loadModels = async () => {
			try {
				await faceapi.nets.ssdMobilenetv1.loadFromUri(
					"./models/ssd_mobilenetv1",
				);
				await faceapi.nets.faceLandmark68Net.loadFromUri(
					"./models/face_landmark_68",
				);
				await faceapi.nets.faceRecognitionNet.loadFromUri(
					"./models/face_recognition",
				);

				setModelsLoaded(true);
				if (form.profileImage) generateProfileDescriptor(form.profileImage);
			} catch (err) {
				console.error("❌ Error loading models:", err);
			}
		};
		loadModels();
	}, [form.profileImage]);

	// 🔹 Generate profile descriptor
	const generateProfileDescriptor = async (imageUrl) => {
		try {
			const img = await faceapi.fetchImage(imageUrl);
			const desc = await faceapi
				.detectSingleFace(img)
				.withFaceLandmarks()
				.withFaceDescriptor();

			if (desc) {
				setProfileDescriptors([desc.descriptor]);
			} else {
				console.warn("⚠️ No face detected in profile image");
			}
		} catch (err) {
			console.error("❌ Error generating profile descriptor:", err);
		}
	};

	// 🔹 Upload & update profile image
	const handleProfileChange = async (e) => {
		const file = e.target.files[0];
		if (!file) return;

		const localPreview = URL.createObjectURL(file);
		setForm((prev) => ({ ...prev, profileImage: localPreview }));

		try {
			const formData = new FormData();
			formData.append("profile_image", file);

			const response = await updateProfileImage(formData).unwrap();

			if (response?.profile_image_url) {
				const newUrl =
					response.profile_image_url + "?t=" + new Date().getTime();
				setForm((prev) => ({ ...prev, profileImage: newUrl }));

				dispatch(
					setUser({
						...user,
						profile_image: response.profile_image,
						profile_image_url: newUrl,
					}),
				);

				refetch?.();
				generateProfileDescriptor(newUrl);

				Swal.fire({
					icon: "success",
					title: "Uploaded!",
					text: "Profile image updated successfully!",
					timer: 2000,
					showConfirmButton: false,
				});
			}
		} catch (error) {
			Swal.fire({
				icon: "error",
				title: "Upload Failed",
				text: error.data?.message || "Failed to update profile image.",
			});
		}
	};

	// 🔹 Capture selfie
	const captureSelfie = () => {
		const imageSrc = webcamRef.current.getScreenshot();
		if (!imageSrc) {
			Swal.fire("Error", "Selfie capture failed", "error");
			return;
		}
		setSelfie(imageSrc);
	};

	// 🔹 Verify faces
	const verifyFaces = async () => {
		if (profileDescriptors.length === 0 || !selfie) {
			Swal.fire("Error", "Profile or Selfie missing!", "error");
			return;
		}

		try {
			const selfieImg = await faceapi.fetchImage(selfie);
			const selfieDesc = await faceapi
				.detectSingleFace(selfieImg)
				.withFaceLandmarks()
				.withFaceDescriptor();

			if (!selfieDesc) {
				Swal.fire("Error", "Face not detected in selfie!", "error");
				return;
			}

			const matcher = new faceapi.FaceMatcher(
				profileDescriptors.map(
					(desc) => new faceapi.LabeledFaceDescriptors("user", [desc]),
				),
			);

			const bestMatch = matcher.findBestMatch(selfieDesc.descriptor);

			if (bestMatch.distance < 0.75) {
				await verifySelfie({ selfie_verified: 1 }).unwrap();
				Swal.fire("Success", "Selfie verified!", "success");
				onVerified?.(true);
			} else {
				Swal.fire("Failed", "Faces do not match ❌", "error");
			}
		} catch (err) {
			Swal.fire("Error", "Verification failed", "error");
		}
	};

	return (
		<div className="face-verification-container">
			<h3 className="section-title">Profile Image</h3>
			<div className="profile-img-container">
				<div className="profile-img-wrapper">
					<img
						src={form.profileImage || "/default-profile.png"}
						className="profile-img"
						alt="Profile"
					/>
					<div className="upload-btn">
						<button
							type="button"
							className="btn-custom btn-upload"
							onClick={() => profileInputRef.current.click()}
							disabled={isProfileImageLoading}
						>
							{isProfileImageLoading ? (
								<div className="spinner"></div>
							) : (
								<i className="fa-solid fa-camera"></i>
							)}
						</button>
						<input
							type="file"
							ref={profileInputRef}
							onChange={handleProfileChange}
							accept="image/*"
							hidden
						/>
					</div>
					<h5 className="profile-name">{user?.name || "John Smith"}</h5>
				</div>
			</div>

			<div className="submit-container">
				<button
					className="btn-custom btn-submit"
					type="button"
					onClick={() =>
						Swal.fire("Submitted!", "Profile changes saved.", "success")
					}
				>
					Submit
				</button>
			</div>

			<h3 className="section-title">Selfie Capture</h3>
			{!selfie ? (
				<>
					<Webcam
						ref={webcamRef}
						screenshotFormat="image/jpeg"
						width={300}
						videoConstraints={{ facingMode: "user" }}
						className="webcam-feed"
					/>
					<button
						className="btn-custom btn-capture"
						onClick={captureSelfie}
						disabled={!modelsLoaded}
					>
						{modelsLoaded ? "Capture Selfie" : "Loading Models..."}
					</button>
				</>
			) : (
				<div className="selfie-preview">
					<img src={selfie} alt="Selfie" className="captured-selfie" />
					<div className="action-buttons">
						<button
							className="btn-custom btn-retake"
							onClick={() => setSelfie(null)}
						>
							Retake
						</button>
						<button
							className="btn-custom btn-verify"
							type="button"
							onClick={verifyFaces}
							disabled={isLoading}
						>
							{isLoading ? "Verifying..." : "Verify"}
						</button>
					</div>
				</div>
			)}
		</div>
	);
};

export default FaceVerification;

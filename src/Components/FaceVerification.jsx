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
	const gender = localStorage.getItem("gender");

	// API mutations
	const [verifySelfieMen, { isLoading: isMenLoading }] =
		useVerifySelfieMutation();
	const [updateProfileImageMen, { isLoading: isMenProfileLoading }] =
		useUpdateProfileImageMutation();
	const [verifySelfieWomen, { isLoading: isWomenLoading }] =
		useVerifySelfieWomenMutation();
	const [updateProfileImageWomen, { isLoading: isWomenProfileLoading }] =
		useUpdateProfileImageWomenMutation();

	const isLoading = gender === "women" ? isWomenLoading : isMenLoading;
	const isProfileImageLoading =
		gender === "women" ? isWomenProfileLoading : isMenProfileLoading;

	// States
	const [selfie, setSelfie] = useState(null);
	const [modelsLoaded, setModelsLoaded] = useState(false);
	const [cameraReady, setCameraReady] = useState(false);
	const [profileDescriptors, setProfileDescriptors] = useState([]);
	const [form, setForm] = useState({
		profileImage: profileImageUrl || user?.profile_image_url || null,
	});

	// 🧠 Load face-api models
	useEffect(() => {
		const loadModels = async () => {
			try {
				await faceapi.nets.ssdMobilenetv1.loadFromUri(
					"/models/ssd_mobilenetv1",
				);
				await faceapi.nets.faceLandmark68Net.loadFromUri(
					"/models/face_landmark_68",
				);
				await faceapi.nets.faceRecognitionNet.loadFromUri(
					"/models/face_recognition",
				);
				setModelsLoaded(true);
				console.log("🟢 Face-api models loaded");
			} catch (err) {
				console.error("❌ Error loading models:", err);
				Swal.fire("Error", "Failed to load face detection models", "error");
			}
		};
		loadModels();
	}, []);

	// 🔁 Update profile image if parent sends new URL
	useEffect(() => {
		if (profileImageUrl && !form.profileImage) {
			setForm((prev) => ({ ...prev, profileImage: profileImageUrl }));
		}
	}, [profileImageUrl]);

	// 🧠 Generate face descriptor when image and models ready
	useEffect(() => {
		if (!modelsLoaded || !form.profileImage) return;
		const timer = setTimeout(() => {
			generateProfileDescriptor(form.profileImage);
		}, 800);
		return () => clearTimeout(timer);
	}, [form.profileImage, modelsLoaded]);

	// ✅ FIXED: CORS-safe image loading
	const generateProfileDescriptor = async (imageUrl) => {
		try {
			if (!imageUrl) return;

			// Convert remote image to blob safely
			let blob;
			if (imageUrl.startsWith("blob:") || imageUrl.startsWith("data:")) {
				// Already local
				const res = await fetch(imageUrl);
				blob = await res.blob();
			} else {
				const response = await fetch(imageUrl, { mode: "cors" }).catch(
					() => null,
				);
				if (!response || !response.ok) throw new Error("Image fetch failed");
				blob = await response.blob();
			}

			const img = await faceapi.bufferToImage(blob);

			const canvas = document.createElement("canvas");
			const scale = 0.5;
			canvas.width = img.width * scale;
			canvas.height = img.height * scale;
			const ctx = canvas.getContext("2d");
			ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

			const desc = await faceapi
				.detectSingleFace(canvas)
				.withFaceLandmarks()
				.withFaceDescriptor();

			if (desc) {
				setProfileDescriptors([desc.descriptor]);
				console.log("🟢 Face detected in profile image!");
			} else {
				setProfileDescriptors([]);
				console.warn("⚠️ No face detected in profile image!");
				Swal.fire("Error", "No face detected in profile image!", "error");
			}
		} catch (err) {
			console.error("❌ Error generating profile descriptor:", err);
			Swal.fire("Error", "Failed to process profile image", "error");
		}
	};

	// 📤 Handle profile image file selection
	const handleProfileChange = (e) => {
		const file = e.target.files[0];
		if (!file) return;
		const localPreview = URL.createObjectURL(file);
		setForm((prev) => ({
			...prev,
			profileImage: localPreview,
			profileFile: file,
		}));
	};

	// 📤 Submit (upload) new profile image
	const handleSubmit = async () => {
		if (!form.profileFile)
			return Swal.fire(
				"Error",
				"Please select a profile image first!",
				"error",
			);

		try {
			const formData = new FormData();
			formData.append("profile_image", form.profileFile);

			const updateProfileImage =
				gender === "women" ? updateProfileImageWomen : updateProfileImageMen;

			const response = await updateProfileImage(formData).unwrap();
			if (response?.status) {
				await refetch?.();
				if (response?.data) dispatch(setUser(response.data));
				Swal.fire({
					icon: "success",
					title: "Uploaded!",
					timer: 2000,
					showConfirmButton: false,
				});
				setForm((prev) => ({ ...prev, profileFile: null }));
			}
		} catch (error) {
			Swal.fire({
				icon: "error",
				title: "Upload Failed",
				text: error.data?.message || "Failed to update profile image.",
			});
		}
	};

	// 📸 Capture selfie
	const captureSelfie = () => {
		const imageSrc = webcamRef.current.getScreenshot();
		if (!imageSrc) return Swal.fire("Error", "Selfie capture failed", "error");
		setSelfie(imageSrc);
	};

	// 🗜️ Compress selfie image
	const compressImage = async (dataUrl) => {
		const img = new Image();
		img.src = dataUrl;
		await img.decode();

		const canvas = document.createElement("canvas");
		const scale = 0.5;
		canvas.width = img.width * scale;
		canvas.height = img.height * scale;
		const ctx = canvas.getContext("2d");
		ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
		return await new Promise((resolve) =>
			canvas.toBlob(resolve, "image/jpeg", 0.7),
		);
	};

	// ✅ Verify face match
	const verifyFaces = async () => {
		if (profileDescriptors.length === 0 || !selfie)
			return Swal.fire("Error", "Profile or Selfie missing!", "error");

		try {
			const selfieImg = await faceapi.fetchImage(selfie);
			const selfieDesc = await faceapi
				.detectSingleFace(selfieImg)
				.withFaceLandmarks()
				.withFaceDescriptor();

			if (!selfieDesc)
				return Swal.fire("Error", "Face not detected in selfie!", "error");

			const matcher = new faceapi.FaceMatcher(
				profileDescriptors.map(
					(desc) => new faceapi.LabeledFaceDescriptors("user", [desc]),
				),
			);
			const bestMatch = matcher.findBestMatch(selfieDesc.descriptor);

			if (bestMatch.distance < 0.65) {
				if (gender === "men") {
					await verifySelfieMen({ selfie_verified: 1 }).unwrap();
				} else {
					const formData = new FormData();
					formData.append("selfie_verified", 1);
					const selfieBlob = await compressImage(selfie);
					formData.append("selfie", selfieBlob, "selfie.jpg");
					await verifySelfieWomen(formData).unwrap();
				}

				Swal.fire("Success", "Selfie verified!", "success");
				onVerified?.(true);
			} else {
				Swal.fire("Failed", "Faces do not match ❌", "error");
			}
		} catch (err) {
			console.error("❌ verifyFaces error:", err);
			Swal.fire("Error", "Verification failed", "error");
		}
	};

	return (
		<div className="face-verification-container">
			<p>Please update your profile image</p>
			<div className="profile-img-container">
				<div className="profile-img-wrapper">
					{form.profileImage ? (
						<img
							src={form.profileImage}
							className="profile-img"
							alt="Profile"
						/>
					) : (
						<div>No profile image</div>
					)}
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
					onClick={handleSubmit}
					disabled={isProfileImageLoading}
				>
					{isProfileImageLoading ? "Uploading..." : "Submit"}
				</button>
			</div>

			<h3 className="section-title">Selfie Capture</h3>

			{!selfie ? (
				<>
					<Webcam
						ref={webcamRef}
						audio={false}
						screenshotFormat="image/jpeg"
						width={300}
						videoConstraints={{ facingMode: "user" }}
						onUserMedia={() => setCameraReady(true)}
						onUserMediaError={(err) => console.error("❌ Camera error:", err)}
					/>
					<button
						className="btn-custom btn-capture"
						onClick={captureSelfie}
						disabled={!modelsLoaded || !cameraReady}
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

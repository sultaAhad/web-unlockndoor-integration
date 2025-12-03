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

import "../assets/Css/camera.css";

const FaceVerification = ({ profileImageUrl, onVerified, refetch }) => {
	const webcamRef = useRef(null);
	const profileInputRef = useRef(null);
	const dispatch = useDispatch();
	const { user } = useSelector((state) => state.auth);
	const gender = localStorage.getItem("gender");

	// API
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

	const [selfie, setSelfie] = useState(null);
	const [modelsLoaded, setModelsLoaded] = useState(false);
	const [cameraReady, setCameraReady] = useState(false);
	const [profileDescriptors, setProfileDescriptors] = useState([]);
	const [isVerifying, setIsVerifying] = useState(false);
	const [verificationStatus, setVerificationStatus] = useState(null);

	const [form, setForm] = useState({
		profileImage: profileImageUrl || user?.profile_image_url || null,
	});

	const [pulseAnimation, setPulseAnimation] = useState(false);
	const [scanAnimation, setScanAnimation] = useState(false);
	const [usingFallback, setUsingFallback] = useState(false);

	// XHR-based image loader for better CORS handling
	const loadImageViaXHR = (url) => {
		return new Promise((resolve, reject) => {
			const xhr = new XMLHttpRequest();
			xhr.open("GET", url, true);
			xhr.responseType = "blob";
			xhr.onload = function () {
				if (this.status === 200) {
					resolve(this.response);
				} else {
					reject(new Error(`XHR failed: ${this.status}`));
				}
			};
			xhr.onerror = function () {
				reject(new Error("XHR network error"));
			};
			xhr.send();
		});
	};

	// Separate image processing logic
	const processImageWithFaceAPI = async (imageBlob) => {
		try {
			// Validate blob
			if (!imageBlob || imageBlob.size === 0) {
				throw new Error("Invalid image blob");
			}

			// Convert blob to image
			const img = await safeDecodeImage(imageBlob);

			// Create canvas for processing
			const canvas = document.createElement("canvas");
			const ctx = canvas.getContext("2d");

			// Set reasonable dimensions for face detection
			const maxDimension = 400;
			let { width, height } = img;

			// Maintain aspect ratio while resizing
			if (width > height && width > maxDimension) {
				height = (height * maxDimension) / width;
				width = maxDimension;
			} else if (height > maxDimension) {
				width = (width * maxDimension) / height;
				height = maxDimension;
			}

			canvas.width = width;
			canvas.height = height;

			// Draw image on canvas
			ctx.drawImage(img, 0, 0, width, height);

			console.log("🔍 Detecting face in profile image...");

			// Detect face with multiple attempts
			let desc = await faceapi
				.detectSingleFace(canvas)
				.withFaceLandmarks()
				.withFaceDescriptor();

			// If no face detected, try with different settings
			if (!desc) {
				console.log("🔄 Trying alternate face detection settings...");
				desc = await faceapi
					.detectSingleFace(
						canvas,
						new faceapi.SsdMobilenetv1Options({
							minConfidence: 0.5,
						}),
					)
					.withFaceLandmarks()
					.withFaceDescriptor();
			}

			if (desc) {
				setProfileDescriptors([desc.descriptor]);
				setUsingFallback(false);
				console.log("🟢 Face detected in profile image!");
			} else {
				setProfileDescriptors([]);
				console.warn("⚠️ No face detected in profile image");
				await Swal.fire({
					icon: "error",
					title: "No Face Detected",
					text: "We couldn't detect a face in your profile image. Please upload a clear photo where your face is visible.",
					confirmButtonText: "OK",
				});
			}
		} catch (error) {
			console.error("❌ Face detection processing error:", error);
			throw error;
		}
	};

	const generateProfileDescriptor = async (imageUrl) => {
		try {
			if (!imageUrl) return;

			console.log("🔄 Processing profile image:", imageUrl);

			let img = null;

			try {
				img = await faceapi.fetchImage(imageUrl);
				console.log("✅ Direct fetch successful");
			} catch (directError) {
				console.warn("⚠️ Direct fetch failed:", directError);

				try {
					const blob = await loadImageViaXHR(imageUrl);
					img = await faceapi.bufferToImage(blob);
					console.log("✅ XHR fallback successful");
				} catch (xhrError) {
					console.error("❌ XHR fallback failed:", xhrError);

					setUsingFallback(true);

					await Swal.fire({
						icon: "info",
						title: "Image Loading Issue",
						html: `
                        <p>Unable to load your profile image.</p>
                        <p><strong>Please upload a new one.</strong></p>
                    `,
						confirmButtonText: "Upload New Image",
					});

					setProfileDescriptors([]);
					return;
				}
			}

			// 🎯 FINAL: REAL WORKING FACE DETECTION (TinyFaceDetector)
			console.log("🔍 Detecting face with TinyFaceDetector...");
			const desc = await faceapi
				.detectSingleFace(
					img,
					new faceapi.TinyFaceDetectorOptions({
						inputSize: 256,
						scoreThreshold: 0.4,
					}),
				)
				.withFaceLandmarks()
				.withFaceDescriptor();

			if (desc) {
				console.log("🟢 FACE FOUND in profile image!");
				setProfileDescriptors([desc.descriptor]);
				setUsingFallback(false);
			} else {
				console.warn("❌ No face detected in this image!");
				setProfileDescriptors([]);

				await Swal.fire({
					icon: "error",
					title: "No Face Detected",
					text: "Please upload a clear image where your face is visible.",
				});
			}
		} catch (err) {
			console.error("❌ Error processing profile image:", err);

			setProfileDescriptors([]);
			setUsingFallback(true);

			await Swal.fire({
				icon: "warning",
				title: "Processing Failed",
				text: "Please upload your profile image again.",
			});
		}
	};

	// Load Models
	useEffect(() => {
		const loadModels = async () => {
			try {
				setPulseAnimation(true);
				await Promise.all([
					faceapi.nets.tinyFaceDetector.loadFromUri(
						"/models/tiny_face_detector",
					), // ✔ NEW & FAST
					faceapi.nets.faceLandmark68Net.loadFromUri(
						"/models/face_landmark_68",
					),
					faceapi.nets.faceRecognitionNet.loadFromUri(
						"/models/face_recognition",
					),
				]);

				setModelsLoaded(true);
				setPulseAnimation(false);
				console.log("🟢 Face-api models loaded");
			} catch (err) {
				setPulseAnimation(false);
				console.error("❌ Error loading models:", err);
				Swal.fire("Error", "Failed to load face detection models", "error");
			}
		};
		loadModels();
	}, []);

	// update image if passed from parent
	useEffect(() => {
		if (profileImageUrl && !form.profileImage) {
			setForm((p) => ({ ...p, profileImage: profileImageUrl }));
		}
	}, [profileImageUrl]);

	// Generate descriptor when image and models ready
	useEffect(() => {
		if (!modelsLoaded || !form.profileImage) return;
		const timer = setTimeout(() => {
			generateProfileDescriptor(form.profileImage);
		}, 800);
		return () => clearTimeout(timer);
	}, [form.profileImage, modelsLoaded]);

	// On profile image select
	const handleProfileChange = (e) => {
		const file = e.target.files[0];
		if (!file) return;

		if (!file.type.startsWith("image/")) {
			Swal.fire("Error", "Please select a valid image file", "error");
			return;
		}

		if (file.size > 5 * 1024 * 1024) {
			Swal.fire("Error", "Image size must be less than 5MB", "error");
			return;
		}

		const localPreview = URL.createObjectURL(file);

		setForm((p) => ({
			...p,
			profileImage: localPreview,
			profileFile: file,
		}));

		// Immediately process the new image for face detection
		if (modelsLoaded) {
			// Use a small delay to ensure state is updated
			setTimeout(() => {
				generateProfileDescriptor(localPreview);
			}, 100);
		}
	};

	// Upload profile image API
	const handleSubmit = async () => {
		if (!form.profileFile)
			return Swal.fire("Error", "Select a profile image first!", "error");

		try {
			const formData = new FormData();
			formData.append("profile_image", form.profileFile);

			const api =
				gender === "women" ? updateProfileImageWomen : updateProfileImageMen;

			const res = await api(formData).unwrap();

			if (res?.status) {
				await refetch?.();
				if (res?.data) dispatch(setUser(res.data));

				Swal.fire({
					icon: "success",
					title: "Uploaded!",
					timer: 1500,
					showConfirmButton: false,
				});

				setForm((p) => ({ ...p, profileFile: null }));
			}
		} catch (err) {
			Swal.fire("Error", err.data?.message || "Upload failed", "error");
		}
	};

	// Capture selfie
	const captureSelfie = () => {
		setScanAnimation(true);

		setTimeout(() => {
			const imageSrc = webcamRef.current.getScreenshot();
			if (!imageSrc) {
				Swal.fire("Error", "Selfie capture failed", "error");
				setScanAnimation(false);
				return;
			}

			setSelfie(imageSrc);
			setScanAnimation(false);
		}, 1500);
	};

	// Compress selfie
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

	// Verify faces
	const verifyFaces = async () => {
		if (profileDescriptors.length === 0 || !selfie) {
			Swal.fire("Error", "Profile or Selfie missing!", "error");
			return;
		}

		setIsVerifying(true);
		setVerificationStatus("scanning");

		try {
			const selfieImg = await faceapi.fetchImage(selfie);

			const selfieDesc = await faceapi
				.detectSingleFace(
					selfieImg,
					new faceapi.TinyFaceDetectorOptions({
						inputSize: 256,
						scoreThreshold: 0.4,
					}),
				)
				.withFaceLandmarks()
				.withFaceDescriptor();

			if (!selfieDesc) {
				setVerificationStatus("error");
				Swal.fire("Error", "Face not detected in selfie!", "error");
				setIsVerifying(false);
				return;
			}

			const matcher = new faceapi.FaceMatcher(
				profileDescriptors.map(
					(desc) => new faceapi.LabeledFaceDescriptors("user", [desc]),
				),
			);

			const bestMatch = matcher.findBestMatch(selfieDesc.descriptor);

			await new Promise((r) => setTimeout(r, 1500));

			if (bestMatch.distance < 0.65) {
				setVerificationStatus("success");

				if (gender === "men") {
					await verifySelfieMen({ selfie_verified: 1 }).unwrap();
				} else {
					const formData = new FormData();
					formData.append("selfie_verified", 1);
					const selfieBlob = await compressImage(selfie);
					formData.append("selfie", selfieBlob, "selfie.webp");
					await verifySelfieWomen(formData).unwrap();
				}

				Swal.fire({
					icon: "success",
					title: "Selfie Verified!",
					timer: 1500,
					showConfirmButton: false,
				}).then(() => onVerified?.(true));
			} else {
				setVerificationStatus("failed");
				Swal.fire("Error", "Face mismatch! Try again.", "error");
			}
		} catch (err) {
			setVerificationStatus("error");
			console.error("❌ verifyFaces error:", err);
			Swal.fire("Error", "Verification failed", "error");
		} finally {
			setIsVerifying(false);
		}
	};
	const safeDecodeImage = (blob) => {
		return new Promise((resolve, reject) => {
			const url = URL.createObjectURL(blob);
			const img = new Image();
			img.onload = () => {
				URL.revokeObjectURL(url);
				resolve(img);
			};
			img.onerror = (err) => {
				URL.revokeObjectURL(url);
				reject(new Error("Image decode failed — invalid blob"));
			};
			img.src = url;
		});
	};

	const handleRetake = () => {
		setSelfie(null);
		setVerificationStatus(null);
	};

	return (
		<div className="face-verification-container">
			{/* Profile Image Section */}
			<div className="profile-section">
				<div>
					<div className="section-title">
						<i className="fas fa-user-circle"></i>
						<div className="text-start using-flex">
							<span className="mb-0">Profile Image</span>
							{usingFallback && (
								<small className="text-warning level-10 ">
									⚠️ Using fallback mode please upload new image
								</small>
							)}
						</div>
					</div>
				</div>

				<div className="profile-container">
					<div className="profile-image-wrapper">
						<div
							className={`profile-image-frame ${pulseAnimation ? "pulse" : ""}`}
						>
							{form.profileImage ? (
								<img
									src={form.profileImage}
									className="profile-image"
									alt="Profile"
									onLoad={() => setPulseAnimation(false)}
									onError={(e) => {
										console.error("❌ Image load error");
										setUsingFallback(true);
									}}
								/>
							) : (
								<div className="profile-placeholder">
									<i className="fas fa-user"></i>
								</div>
							)}

							{/* Upload Button */}
							<div className="upload-overlay">
								<button
									type="button"
									className="upload-btn"
									onClick={() => profileInputRef.current.click()}
									disabled={isProfileImageLoading}
								>
									{isProfileImageLoading ? (
										<div className="spinner-small"></div>
									) : (
										<i className="fas fa-camera"></i>
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
						</div>

						<div className="profile-info">
							<h5 className="profile-name">{user?.name || "John Smith"}</h5>
							<p className="profile-status mb-1">
								{profileDescriptors.length > 0
									? "✅ Face detected"
									: "❌ No face detected"}
							</p>
							{/* Submit Button */}
							<button
								className={`btn-submit ${form.profileFile ? "btn-pulse" : ""}`}
								type="button"
								onClick={handleSubmit}
								disabled={isProfileImageLoading || !form.profileFile}
							>
								{isProfileImageLoading ? (
									<>
										<div className="spinner-small"></div>
										Uploading...
									</>
								) : (
									<>
										<i className="fas fa-cloud-upload-alt"></i>
										Upload Profile
									</>
								)}
							</button>
						</div>
					</div>
				</div>
			</div>

			{/* Selfie Capture Section */}
			<div className="selfie-section">
				<div className="section-title">
					<i className="fas fa-camera"></i>
					<span>Selfie Verification</span>
				</div>
				<div className="col-lg-12">
					{!selfie ? (
						<div className="camera-container">
							<div
								className={`camera-frame ${scanAnimation ? "scanning" : ""}`}
							>
								<Webcam
									ref={webcamRef}
									className="webcam-view"
									audio={false}
									screenshotFormat="image/jpeg"
									height={150}
									width={150}
									videoConstraints={{
										facingMode: "user",
										width: 150,
										height: 150,
									}}
									onUserMedia={() => setCameraReady(true)}
									onUserMediaError={(err) => {
										console.error("❌ Camera error:", err);
										Swal.fire("Error", "Camera access denied", "error");
									}}
								/>

								{/* Scanning Animation Overlay */}
								{scanAnimation && (
									<div className="scan-animation">
										<div className="scan-line"></div>
									</div>
								)}
							</div>
							<div className="row">
								<div className="col-lg-8 w-frame-s mx-auto">
									{/* Capture Button */}
									<button
										className={`btn-capture ${
											modelsLoaded && cameraReady ? "btn-glow" : ""
										}`}
										onClick={captureSelfie}
										disabled={!modelsLoaded || !cameraReady || scanAnimation}
									>
										{scanAnimation ? (
											<>
												<div className="spinner-small"></div>
												Capturing...
											</>
										) : modelsLoaded ? (
											<>
												<i className="fas fa-camera"></i>
												Capture Selfie
											</>
										) : (
											"Loading Models..."
										)}
									</button>
								</div>
							</div>
						</div>
					) : (
						<div className="selfie-preview">
							<div className={`preview-container ${verificationStatus}`}>
								<img src={selfie} alt="Selfie" className="captured-selfie" />

								{/* Verification Status Overlay */}
								{isVerifying && (
									<div className="verification-overlay">
										<div className="verification-spinner"></div>
										<p>Verifying your identity...</p>
									</div>
								)}

								{verificationStatus === "success" && (
									<div className="status-overlay success">
										<i className="fas fa-check-circle"></i>
										<p>Verification Successful!</p>
									</div>
								)}

								{verificationStatus === "failed" && (
									<div className="status-overlay error">
										<i className="fas fa-times-circle"></i>
										<p>Verification Failed</p>
									</div>
								)}
							</div>

							{/* Action Buttons */}
							<div className="action-buttons">
								<button
									className="btn-retake"
									onClick={handleRetake}
									disabled={isVerifying}
								>
									<i className="fas fa-redo"></i>
									Retake
								</button>

								{verificationStatus !== "success" && (
									<button
										className="btn-verify"
										onClick={verifyFaces}
										disabled={isVerifying}
									>
										{isVerifying ? (
											<>
												<div className="spinner-small"></div>
												Verifying...
											</>
										) : (
											<>
												<i className="fas fa-fingerprint"></i>
												Verify Identity
											</>
										)}
									</button>
								)}
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default FaceVerification;

import React, { useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import * as faceapi from "face-api.js";
import Swal from "sweetalert2";
import { useVerifySelfieMutation } from "../network/services/ManAuth";

const FaceVerification = ({ profileImageUrl, onVerified }) => {
	const webcamRef = useRef(null);
	const [selfie, setSelfie] = useState(null);
	const [modelsLoaded, setModelsLoaded] = useState(false);
	const [verifySelfie, { isLoading }] = useVerifySelfieMutation();

	// 🔹 Load FaceAPI models
	useEffect(() => {
		const loadModels = async () => {
			try {
				console.log("🟡 Loading FaceAPI models...");
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
				console.log("✅ All models loaded successfully");
			} catch (err) {
				console.error("❌ Error loading models:", err);
			}
		};
		loadModels();
	}, []);

	// 🔹 Capture Selfie
	const captureSelfie = () => {
		const imageSrc = webcamRef.current.getScreenshot();
		if (!imageSrc) {
			Swal.fire("Error", "Selfie capture failed", "error");
			return;
		}
		console.log("📸 Selfie captured");
		setSelfie(imageSrc);
	};

	// 🔹 Verify faces + API call
	const verifyFaces = async () => {
		if (!profileImageUrl || !selfie) {
			Swal.fire("Error", "Profile or Selfie missing!", "error");
			return;
		}

		try {
			console.log("🔍 Fetching images for comparison...");
			const profileImg = await faceapi.fetchImage(profileImageUrl);
			const selfieImg = await faceapi.fetchImage(selfie);

			console.log("➡️ Detecting faces...");
			const profileDesc = await faceapi
				.detectSingleFace(profileImg)
				.withFaceLandmarks()
				.withFaceDescriptor();

			const selfieDesc = await faceapi
				.detectSingleFace(selfieImg)
				.withFaceLandmarks()
				.withFaceDescriptor();

			if (!profileDesc || !selfieDesc) {
				Swal.fire("Error", "Face not detected!", "error");
				console.warn("⚠️ Could not detect face in one of the images");
				return;
			}

			const distance = faceapi.euclideanDistance(
				profileDesc.descriptor,
				selfieDesc.descriptor,
			);

			console.log("🧮 Face distance:", distance);

			if (distance < 0.6) {
				console.log("✅ Face matched locally, updating API selfie_verified...");

				try {
					// ✅ API ko sirf selfie_verified bhejna hai
					const res = await verifySelfie({ selfie_verified: 1 }).unwrap();
					console.log("📡 API Response:", res);

					Swal.fire("Success", "Selfie verified!", "success");
					onVerified?.(true);
				} catch (err) {
					console.error("❌ API error:", err);
					Swal.fire("Error", "Selfie verification update failed", "error");
				}
			} else {
				Swal.fire("Failed", "Faces do not match ❌", "error");
			}
		} catch (err) {
			console.error("❌ Error during verification:", err);
			Swal.fire("Error", "Verification failed", "error");
		}
	};

	return (
		<div>
			<h3>Profile Image</h3>
			{profileImageUrl && (
				<img src={profileImageUrl} alt="Profile" width="200" />
			)}

			<h3>Selfie Capture</h3>
			{!selfie ? (
				<>
					<Webcam
						ref={webcamRef}
						screenshotFormat="image/jpeg"
						width={300}
						videoConstraints={{ facingMode: "user" }}
					/>
					<button onClick={captureSelfie} disabled={!modelsLoaded}>
						{modelsLoaded ? "Capture Selfie" : "Loading Models..."}
					</button>
				</>
			) : (
				<>
					<img src={selfie} alt="Selfie" width="200" />
					<div>
						<button onClick={() => setSelfie(null)}>Retake</button>
						<button type="button" onClick={verifyFaces} disabled={isLoading}>
							{isLoading ? "Verifying..." : "Verify"}
						</button>
					</div>
				</>
			)}
		</div>
	);
};

export default FaceVerification;

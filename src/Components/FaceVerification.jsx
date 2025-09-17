// src/components/FaceVerification.jsx
import React, { useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import * as faceapi from "face-api.js";
import Swal from "sweetalert2";

const FaceVerification = ({ profileImageUrl, onVerified }) => {
	const webcamRef = useRef(null);
	const [selfie, setSelfie] = useState(null);
	const [modelsLoaded, setModelsLoaded] = useState(false);

	// 🔹 Load face-api models
	useEffect(() => {
		const loadModels = async () => {
			await faceapi.nets.ssdMobilenetv1.loadFromUri("/models");
			await faceapi.nets.faceLandmark68Net.loadFromUri("/models");
			await faceapi.nets.faceRecognitionNet.loadFromUri("/models");
			setModelsLoaded(true);
		};
		loadModels();
	}, []);

	// 🔹 Capture Selfie
	const captureSelfie = () => {
		const imageSrc = webcamRef.current.getScreenshot();
		if (!imageSrc) return Swal.fire("Error", "Selfie capture failed", "error");
		setSelfie(imageSrc);
	};

	// 🔹 Verify faces
	const verifyFaces = async () => {
		if (!profileImageUrl || !selfie) {
			return Swal.fire("Error", "Profile or Selfie missing!", "error");
		}

		const profileImg = await faceapi.fetchImage(profileImageUrl);
		const selfieImg = await faceapi.fetchImage(selfie);

		const profileDesc = await faceapi
			.detectSingleFace(profileImg)
			.withFaceLandmarks()
			.withFaceDescriptor();

		const selfieDesc = await faceapi
			.detectSingleFace(selfieImg)
			.withFaceLandmarks()
			.withFaceDescriptor();

		if (!profileDesc || !selfieDesc) {
			return Swal.fire("Error", "Face not detected!", "error");
		}

		const distance = faceapi.euclideanDistance(
			profileDesc.descriptor,
			selfieDesc.descriptor,
		);

		if (distance < 0.6) {
			Swal.fire("Success", "Faces Match! ✅", "success");
			onVerified?.(true);
		} else {
			Swal.fire("Failed", "Faces do not match ❌", "error");
			onVerified?.(false);
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
						Capture Selfie
					</button>
				</>
			) : (
				<>
					<img src={selfie} alt="Selfie" width="200" />
					<div>
						<button onClick={() => setSelfie(null)}>Retake</button>
						<button onClick={verifyFaces}>Verify</button>
					</div>
				</>
			)}
		</div>
	);
};

export default FaceVerification;

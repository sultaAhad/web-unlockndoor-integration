// components/StepperMale.js
import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { setUserToken } from "../../network/reducers/AuthReducer";
import { useManSignupMutation } from "../../network/services/ManAuth";
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import StepThree from "./StepThree";
import LoginModal from "../Header/LoginModal";
import SelfieModal from "../SelfieModal";
import { validateMenRegistration } from "../../Constant/HelperFunction";
import ForgotPasswordModal from "../Header/ForgotPasswordModal";
import OtpModal from "../Header/OtpModal";
import NewPasswordModal from "../Header/NewPasswordModal";

const StepperMale = () => {
	const steps = [1, 2, 3];
	const [step, setStep] = useState(0);
	const [formErrors, setFormErrors] = useState({});
	const [submitting, setSubmitting] = useState(false);
	const [showSelfie, setShowSelfie] = useState(false);
	const [showModal2, setShowModal2] = useState(false); // Login
	const [showModal3, setShowModal3] = useState(false); // Forgot Password
	const [showModal4, setShowModal4] = useState(false); // OTP
	const [showModal5, setShowModal5] = useState(false); // New Password
	const [selectedGender, setSelectedGender] = useState(""); // "men" or "women"
	const [userEmail, setUserEmail] = useState(""); // store email from Forgot Password
	const dispatch = useDispatch();

	const [registerMan, setRegisterMan] = useState({
		nationality: "",
		name: "",
		email: "",
		phone: "",
		date_of_birth: "",
		password: "",
		occupation: "",
		income: "",
		skills: [],
		profile_image: null,
		cover_image: null,
		images: [],
		videos: [],
		message: "",
	});

	const [manSignup, response] = useManSignupMutation();

	const next = () => setStep((prev) => Math.min(prev + 1, steps.length - 1));
	const prev = () => setStep((prev) => Math.max(prev - 1, 0));

	const handleNext = () => {
		const errors = validateMenRegistration(registerMan, step);
		if (Object.keys(errors).length) {
			setFormErrors(errors);
			return;
		}
		setFormErrors({});
		next();
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (submitting) return;
		setSubmitting(true);

		const errors = validateMenRegistration(registerMan, step);
		if (Object.keys(errors).length) {
			setFormErrors(errors);
			setSubmitting(false);
			return;
		}

		const data = new FormData();
		data.append("user_type", "men");
		Object.keys(registerMan).forEach((key) => {
			const value = registerMan[key];
			if (key === "images" || key === "videos")
				value.forEach((f) => data.append(`${key}[]`, f));
			else if (key === "skills") data.append("skills", value.join(","));
			else if (value instanceof File) data.append(key, value);
			else data.append(key, value ?? "");
		});

		try {
			await manSignup(data).unwrap();
		} catch (err) {
			console.error(err);
		} finally {
			setSubmitting(false);
		}
	};

	useEffect(() => {
		if (response?.isSuccess) {
			// const token = response?.data?.data?.token;

			// dispatch(
			// 	setUserToken({
			// 		user: response?.data,
			// 		token,
			// 		remember: true,
			// 		gender: "men",
			// 	}),
			// );

			Swal.fire({
				title: "Success",
				text: response?.data?.message || "Registration successful",
				icon: "success",
			}).then(() => {
				// ✅ Open Login Modal after successful registration
				setShowModal2(true);
			});
		}

		if (response?.isError) {
			const errData = response?.error?.data;
			let msg = errData?.message || "Error occurred";
			if (errData?.errors)
				msg = Object.values(errData.errors).flat().join("\n");
			Swal.fire({ title: "Error", text: msg, icon: "error" });
		}
	}, [response, dispatch]);

	const handleSelfieVerified = () => {
		setShowSelfie(false);
	};

	return (
		<>
			{/* Stepper Header */}
			<div className="stepper-container">
				{steps.map((s, i) => (
					<div key={i} className="step-wrapper">
						<div className="step-content">
							<div
								className={`step-circle ${step >= i ? "active" : "inactive"}`}
							>
								{s}
							</div>
							<span className={`step-label ${step >= i ? "active" : ""}`}>
								Step
							</span>
						</div>
						{i < steps.length - 1 && (
							<div className={`step-connector ${step > i ? "active" : ""}`} />
						)}
					</div>
				))}
			</div>

			{/* Step Forms */}
			{step === 0 && (
				<StepOne
					formData={registerMan}
					setFormData={setRegisterMan}
					next={handleNext}
					formErrors={formErrors}
				/>
			)}
			{step === 1 && (
				<StepTwo
					formData={registerMan}
					setFormData={setRegisterMan}
					next={handleNext}
					prev={prev}
					formErrors={formErrors}
				/>
			)}
			{step === 2 && (
				<StepThree
					formData={registerMan}
					setFormData={setRegisterMan}
					prev={prev}
					handleSubmit={handleSubmit}
					formErrors={formErrors}
					submitting={submitting}
				/>
			)}

			{/* ✅ Login & Password Flow */}
			<LoginModal
				show={showModal2}
				onClose={() => setShowModal2(false)}
				onForgotPassword={(gender) => {
					setSelectedGender(gender);
					setShowModal2(false);
					setShowModal3(true);
				}}
			/>

			<ForgotPasswordModal
				show={showModal3}
				onClose={() => setShowModal3(false)}
				gender={selectedGender}
				onContinue={(email) => {
					setUserEmail(email);
					setShowModal3(false);
					setShowModal4(true);
				}}
			/>

			<OtpModal
				show={showModal4}
				onClose={() => setShowModal4(false)}
				onContinue={() => {
					setShowModal4(false);
					setShowModal5(true);
				}}
				gender={selectedGender}
				email={userEmail}
			/>

			<NewPasswordModal
				show={showModal5}
				onClose={() => setShowModal5(false)}
				role={selectedGender}
				email={userEmail}
			/>

			{/* Selfie Verification Modal */}
			<SelfieModal
				isOpen={showSelfie}
				onClose={() => setShowSelfie(false)}
				onVerified={handleSelfieVerified}
			/>
		</>
	);
};

export default StepperMale;

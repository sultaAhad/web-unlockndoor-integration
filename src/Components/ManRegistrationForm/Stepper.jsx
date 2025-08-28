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

const StepperMale = () => {
	const steps = [1, 2, 3];
	const [step, setStep] = useState(0);
	const [formErrors, setFormErrors] = useState({});
	const [submitting, setSubmitting] = useState(false);
	const [showLogin, setShowLogin] = useState(false);
	const [showSelfie, setShowSelfie] = useState(false);
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
		can_pay: "",
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
		data.append("user_type", "male");
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
			const apiData = response?.data?.data.men;
			const token = response?.data?.data.token;

			dispatch(setUserToken({ user: apiData, token, remember: true }));

			Swal.fire({
				title: "Success",
				text: response?.data?.message || "Registration successful",
				icon: "success",
			}).then(() => setShowLogin(true));
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

			<LoginModal show={showLogin} onClose={() => setShowLogin(false)} />
			<SelfieModal
				isOpen={showSelfie}
				onClose={() => setShowSelfie(false)}
				onVerified={handleSelfieVerified}
			/>
		</>
	);
};

export default StepperMale;

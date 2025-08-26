import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { setUserToken } from "../../network/reducers/AuthReducer";
import { useManSignupMutation } from "../../network/services/ManAuth";
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import StepThree from "./StepThree";
import { validateMenRegistration } from "../../Constant/HelperFunction";
import LoginModal from "../Header/LoginModal";

const Stepper = () => {
	const steps = [1, 2, 3];
	const [step, setStep] = useState(0);
	const [formErrors, setFormErrors] = useState({});
	const [showLogin, setShowLogin] = useState(false);
	const [submitting, setSubmitting] = useState(false);

	const dispatch = useDispatch();

	const [registerman, setRegisterMan] = useState({
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
		const errors = validateMenRegistration(registerman, step);
		if (Object.keys(errors).length > 0) {
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

		const errors = validateMenRegistration(registerman, step);
		if (Object.keys(errors).length > 0) {
			setFormErrors(errors);
			setSubmitting(false);
			return;
		}

		const data = new FormData();
		Object.keys(registerman).forEach((key) => {
			const value = registerman[key];
			if (Array.isArray(value)) value.forEach((item) => data.append(key, item));
			else if (value instanceof File) data.append(key, value);
			else data.append(key, value ?? "");
		});

		try {
			await manSignup(data).unwrap();
		} catch (err) {
			console.error(err);
			setSubmitting(false);
		}
	};

	// Registration response
	useEffect(() => {
		if (response?.isSuccess) {
			Swal.fire({
				title: "Success",
				text: response?.data?.message || "Registration successful",
				icon: "success",
				confirmButtonText: "OK",
			}).then(() => setShowLogin(true)); // registration ke baad login modal
			setSubmitting(false);
		}

		if (response?.isError) {
			const errorData = response?.error?.data;
			let errorMessage = errorData?.message || "An error occurred";
			if (errorData?.errors)
				errorMessage = Object.values(errorData.errors).flat().join("\n");
			Swal.fire({
				title: "Error",
				text: errorMessage,
				icon: "error",
				confirmButtonText: "OK",
			});
			setSubmitting(false);
		}
	}, [response]);

	return (
		<>
			<div className="stepper-container mb-4">
				{step === 0 && (
					<StepOne
						formData={registerman}
						setFormData={setRegisterMan}
						next={handleNext}
						formErrors={formErrors}
					/>
				)}
				{step === 1 && (
					<StepTwo
						formData={registerman}
						setFormData={setRegisterMan}
						next={handleNext}
						prev={prev}
						formErrors={formErrors}
					/>
				)}
				{step === 2 && (
					<StepThree
						formData={registerman}
						setFormData={setRegisterMan}
						prev={prev}
						handleSubmit={handleSubmit}
						formErrors={formErrors}
						submitting={submitting}
					/>
				)}
			</div>

			{/* Login Modal */}
			{showLogin && (
				<LoginModal show={showLogin} onClose={() => setShowLogin(false)} />
			)}
		</>
	);
};

export default Stepper;

import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { setUserToken } from "../../network/reducers/AuthReducer";
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import StepThree from "./Stepthree";
import { useWomenSignupMutation } from "../../network/services/WomanAuth";
import { validateWomenRegistration } from "../../Constant/HelperFunction";

const Stepper = ({ currentStep }) => {
	const steps = [1, 2, 3];
	const [step, setStep] = useState(0);
	const [formErrors, setFormErrors] = useState({});

	const dispatch = useDispatch();
	const [registerWomen, setRegisterWomen] = useState({
		name: "",
		email: "",
		phone: "",
		date_of_birth: "",
		password: "",
		occupation: "",
		income: "",
		nationality: "",
		height: "",
		hair_color: "",
		address: "",
		body_type: "",
		occupation: "",
		income: "",
		skills: [],
		profile_image: null,
		cover_image: null,
		images: [],
		videos: [],
		message: "",
	});

	const [WomenSignup, response] = useWomenSignupMutation();
	const next = () => setStep((prev) => Math.min(prev + 1, steps.length - 1));
	const prev = () => setStep((prev) => Math.max(prev - 1, 0));

	const handleNext = () => {
		const errors = validateWomenRegistration(registerWomen, step);
		if (Object.keys(errors).length > 0) {
			setFormErrors(errors);
			return;
		}
		setFormErrors({});
		next();
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const errors = validateWomenRegistration(registerWomen, step);
		if (Object.keys(errors).length > 0) {
			setFormErrors(errors);
			return;
		}
		setFormErrors({});

		const data = new FormData();
		Object.keys(registerWomen).forEach((key) => {
			const value = registerWomen[key];
			if (Array.isArray(value))
				value.forEach((item) =>
					data.append(key, item instanceof File ? item : item),
				);
			else if (value instanceof File) data.append(key, value);
			else data.append(key, value ?? "");
		});

		try {
			await WomenSignup(data).unwrap();
		} catch (err) {
			console.error(err);
		}
	};

	useEffect(() => {
		if (response?.isSuccess) {
			dispatch(setUserToken(response?.data?.data));
			Swal.fire({
				title: "Success",
				text: response?.data?.message || "Registration successful",
				icon: "success",
				confirmButtonText: "OK",
			});
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
		}
	}, [response, dispatch]);

	return (
		<>
			<div className="stepper-container">
				{steps.map((step, index) => (
					<div key={index} className="step-wrapper">
						<div className="step-content">
							<div
								className={`step-circle secondary-secondsemibold-font ${
									currentStep >= step ? "active" : "inactive"
								}`}
							>
								{step}
							</div>
							<span
								className={`step-label secondary-secondsemibold-font ${
									currentStep >= step ? "active" : ""
								}`}
							>
								Step
							</span>
						</div>
						{index < steps.length - 1 && (
							<div
								className={`step-connector secondary-secondsemibold-font ${
									currentStep > step ? "active" : ""
								}`}
							/>
						)}
					</div>
				))}
			</div>
			{step === 0 && (
				<StepOne
					formData={registerWomen}
					setFormData={setRegisterWomen}
					next={handleNext}
					formErrors={formErrors}
				/>
			)}
			{step === 1 && (
				<StepTwo
					formData={registerWomen}
					setFormData={setRegisterWomen}
					next={handleNext}
					prev={prev}
					formErrors={formErrors}
				/>
			)}
			{step === 2 && (
				<StepThree
					formData={registerWomen}
					setFormData={setRegisterWomen}
					prev={prev}
					handleSubmit={handleSubmit}
					formErrors={formErrors}
				/>
			)}
		</>
	);
};

export default Stepper;

import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { setUserToken } from "../../network/reducers/AuthReducer";
import { useManSignupMutation } from "../../network/services/ManAuth";
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import StepThree from "./Stepthree";
import { validateMenRegistration } from "../../Constant/HelperFunction";
import SelfieModal from "../SelfieModal";
import ManPackagesTab from "../ManPackagesTab";

const Stepper = () => {
	const steps = [1, 2, 3];
	const [step, setStep] = useState(0);
	const [formErrors, setFormErrors] = useState({});
	const [showSelfie, setShowSelfie] = useState(false);
	const [showPackages, setShowPackages] = useState(false);

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
		const errors = validateMenRegistration(registerman, step);
		if (Object.keys(errors).length > 0) {
			setFormErrors(errors);
			return;
		}
		setFormErrors({});

		const data = new FormData();
		Object.keys(registerman).forEach((key) => {
			const value = registerman[key];
			if (Array.isArray(value))
				value.forEach((item) =>
					data.append(key, item instanceof File ? item : item),
				);
			else if (value instanceof File) data.append(key, value);
			else data.append(key, value ?? "");
		});

		try {
			await manSignup(data).unwrap();
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
			}).then(() => setTimeout(() => setShowSelfie(true), 100));
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

	// Callback after selfie verification
	const handleSelfieVerified = () => {
		setShowSelfie(false);
		setShowPackages(true);
	};

	return (
		<>
			{!showSelfie && !showPackages && (
				<div>
					<div className="stepper-container mb-4">
						{steps.map((s, index) => (
							<div key={index} className="step-wrapper">
								<div className="step-content">
									<div
										className={`step-circle ${
											step >= index ? "active" : "inactive"
										}`}
									>
										{index + 1}
									</div>
									<span
										className={`step-label ${step >= index ? "active" : ""}`}
									>
										Step
									</span>
								</div>
								{index < steps.length - 1 && (
									<div
										className={`step-connector ${step > index ? "active" : ""}`}
									/>
								)}
							</div>
						))}
					</div>

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
						/>
					)}
				</div>
			)}

			{/* Selfie Modal */}
			{showSelfie && (
				<SelfieModal
					isOpen={showSelfie}
					onClose={() => setShowSelfie(false)}
					profileImage={registerman.profile_image}
					onVerified={handleSelfieVerified}
				/>
			)}

			{/* Man Packages Modal */}
			{showPackages && (
				<ManPackagesTab
					isOpen={showPackages}
					onClose={() => setShowPackages(false)}
				/>
			)}
		</>
	);
};

export default Stepper;

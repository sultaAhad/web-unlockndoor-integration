import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import StepThree from "./StepThree";
import { validateMenRegistration } from "../../Constant/HelperFunction";
import { useManSignupMutation } from "../../network/services/ManAuth";

const Stepper = () => {
	const [step, setStep] = useState(0);
	const [formErrors, setFormErrors] = useState({});
	const [registerman, setRegisterMan] = useState({
		name: "",
		email: "",
		phone: "",
		date_of_birth: null,
		password: "",
		password_confirmation: "",
		occupation: "",
		income: "",
		message: "",
		can_pay: "",
		skills: [],
		profile_image: null,
		cover_image: null,
		images: [],
		videos: [],
	});

	const [manSignup, result] = useManSignupMutation();

	const next = () => setStep((prev) => prev + 1);
	const prev = () => setStep((prev) => prev - 1);

	const handleSubmit = () => {
		if (
			validateMenRegistration(registerman, setFormErrors, registerman.skills)
		) {
			const formData = new FormData();

			formData.append("user_type", "male");
			formData.append("name", registerman.name);
			formData.append("email", registerman.email);
			formData.append("phone", registerman.phone);
			formData.append(
				"date_of_birth",
				registerman.date_of_birth
					? registerman.date_of_birth.toISOString().split("T")[0]
					: ""
			);
			formData.append("password", registerman.password);
			formData.append("occupation", registerman.occupation);
			formData.append("income", registerman.income);
			formData.append("message", registerman.message);
			formData.append("can_pay", registerman.can_pay);

			registerman.skills.forEach((skill, index) =>
				formData.append(`skills[${index}]`, skill)
			);

			if (registerman.profile_image)
				formData.append("profile_image", registerman.profile_image);
			if (registerman.cover_image)
				formData.append("cover_image", registerman.cover_image);

			registerman.images.forEach((img, index) =>
				formData.append(`images[${index}]`, img)
			);
			registerman.videos.forEach((vid, index) =>
				formData.append(`videos[${index}]`, vid)
			);

			manSignup(formData);
		} else {
			Swal.fire("Error", "Please fix the errors in the form!", "error");
		}
	};

	// Monitor API response
	useEffect(() => {
		if (result?.isSuccess) {
			Swal.fire(
				"Success",
				result?.data?.message || "Registered successfully!",
				"success"
			);
		} else if (result?.isError) {
			const msg =
				result?.error?.data?.message || "Something went wrong!";
			Swal.fire("Error", msg, "error");
		}
	}, [result]);

	return (
		<div>
			{/* Stepper UI */}
			<div className="stepper-nav mb-4">
				<div>Step {step} of 3</div>
			</div>

			{/* Render steps */}
			{step === 1 && (
				<StepOne
					formData={registerman}
					setFormData={setRegisterMan}
					next={next}
					formErrors={formErrors}
				/>
			)}
			{step === 2 && (
				<StepTwo
					formData={registerman}
					setFormData={setRegisterMan}
					next={next}
					prev={prev}
					formErrors={formErrors}
				/>
			)}
			{step === 3 && (
				<StepThree
					formData={registerman}
					setFormData={setRegisterMan}
					prev={prev}
					handleSubmit={handleSubmit}
					formErrors={formErrors}
				/>
			)}
		</div>
	);
};

export default Stepper;

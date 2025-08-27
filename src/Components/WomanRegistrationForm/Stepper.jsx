import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { setUserToken } from "../../network/reducers/AuthReducer";
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import StepThree from "./StepThree";
import { useWomenSignupMutation } from "../../network/services/WomanAuth";
import { validateWomenRegistration } from "../../Constant/HelperFunction";
import LoginModal from "../Header/LoginModal";

const Stepper = () => {
	const steps = [1, 2, 3];
	const [step, setStep] = useState(0);
	const [formErrors, setFormErrors] = useState({});
	const dispatch = useDispatch();
	const [submitting, setSubmitting] = useState(false);
	const [showLogin, setShowLogin] = useState(false);

	// ✅ consistent initial state
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
		skills: [],
		profile_image: null,
		cover_images: null,
		images: [],
		videos: [],
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
		if (submitting) return;
		setSubmitting(true);

		const errors = validateWomenRegistration(registerWomen, step);
		if (Object.keys(errors).length > 0) {
			setFormErrors(errors);
			setSubmitting(false);
			return;
		}

		const data = new FormData();
		Object.keys(registerWomen).forEach((key) => {
			const value = registerWomen[key];

			if (key === "images" || key === "videos") {
				value.forEach((file) => data.append(`${key}[]`, file));
			} else if (key === "skills" && Array.isArray(value)) {
				data.append("skills", value.join(","));
			} else if (value instanceof File) {
				data.append(key, value);
			} else {
				data.append(key, value ?? "");
			}
		});

		try {
			const responseData = await WomenSignup(data).unwrap();
			if (responseData?.data?.token) {
				dispatch(setUserToken(responseData?.data));
			}
		} catch (err) {
			const errorData = err?.data;
			if (errorData?.errors) {
				const msg = Object.values(errorData.errors).flat().join("\n");
				Swal.fire({
					title: "Error",
					text: msg,
					icon: "error",
					confirmButtonText: "OK",
				});
			} else {
				Swal.fire({
					title: "Error",
					text: "Something went wrong!",
					icon: "error",
					confirmButtonText: "OK",
				});
			}
		} finally {
			setSubmitting(false);
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
			}).then(() => {
				setShowLogin(true); // ✅ registration ke baad login modal khulega
			});
			setSubmitting(false);
		}

		if (response?.isError) {
			const errorData = response?.error?.data;
			let errorMessage = errorData?.message || "An error occurred";
			if (errorData?.errors) {
				errorMessage = Object.values(errorData.errors).flat().join("\n");
			}
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
				{steps.map((s, index) => (
					<div key={index} className="step-wrapper">
						<div className="step-content">
							<div
								className={`step-circle ${step >= index ? "active" : "inactive"}`}
							>
								{s}
							</div>
							<span className={`step-label ${step >= index ? "active" : ""}`}>
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
					submitting={submitting}
				/>
			)}

			{/* ✅ Login Modal hamesha render hoga */}
			<LoginModal show={showLogin} onClose={() => setShowLogin(false)} />
		</>
	);
};

export default Stepper;

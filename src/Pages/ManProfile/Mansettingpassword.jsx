import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer";
import { innerpages1 } from "../../Constant/Index";
import Aos from "aos";
import ProfileNavbartwo from "../../Components/ProfileNavbartwo";
import ProfileHeader from "../../Components/ProfileHeader";
import { useManChangePasswordMutation } from "../../network/services/ManAuth";
import Swal from "sweetalert2";

// ✅ Validation function (updated keys)
export const validateChangePasswordMan = (values, setErrors) => {
	let isValid = true;
	const errors = {};

	if (!values.current_password.trim()) {
		errors.current_password = ["Current password is required"];
		isValid = false;
	}

	if (!values.password.trim()) {
		errors.password = ["New password is required"];
		isValid = false;
	} else if (values.password.length < 7) {
		errors.password = ["Password must be at least 7 characters long"];
		isValid = false;
	}

	if (!values.confirm_password.trim()) {
		errors.confirm_password = ["Confirm password is required"];
		isValid = false;
	} else if (values.password !== values.confirm_password) {
		errors.confirm_password = ["Passwords do not match"];
		isValid = false;
	} else if (values.confirm_password.length < 7) {
		errors.confirm_password = [
			"Confirm password must be at least 7 characters long",
		];
		isValid = false;
	}

	setErrors(errors);
	return isValid;
};

const Mansettingpassword = () => {
	const [manChangePassword] = useManChangePasswordMutation();
	const navigate = useNavigate();

	const [values, setValues] = useState({
		current_password: "",
		password: "",
		confirm_password: "",
	});
	const [errors, setErrors] = useState({});
	const [loading, setLoading] = useState(false);

	const [showOldPassword, setShowOldPassword] = useState(false);
	const [showNewPassword, setShowNewPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);

	const togglePasswordVisibility = (setFunction, currentState) => {
		setFunction(!currentState);
	};

	useEffect(() => {
		Aos.init({ duration: 1000, once: true });
		document.body.classList.add("body-background");
		document.body.style.backgroundImage = `url(${innerpages1})`;
		document.body.style.backgroundSize = "cover";
		document.body.style.backgroundPosition = "center";
		document.body.style.minHeight = "100vh";

		return () => {
			document.body.classList.remove("body-background");
			document.body.style.backgroundImage = "";
		};
	}, []);

	// ✅ Handle input change
	const handleChange = (e) => {
		setValues({ ...values, [e.target.name]: e.target.value });
	};

	// ✅ Submit function
	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!validateChangePasswordMan(values, setErrors)) return;

		setLoading(true);
		try {
			const response = await manChangePassword(values).unwrap();

			Swal.fire({
				icon: "success",
				title: "Password Updated",
				text:
					response?.message || "Your password has been changed successfully",
				timer: 1500,
				showConfirmButton: false,
			});

			setValues({
				current_password: "",
				password: "",
				confirm_password: "",
			});
			setErrors({});

			// ✅ Navigate to profile page after success
			setTimeout(() => {
				navigate("/profile");
			}, 1600);
		} catch (error) {
			Swal.fire({
				icon: "error",
				title: "Failed",
				text:
					error?.data?.message ||
					"Something went wrong. Please try again later.",
			});
		} finally {
			setLoading(false);
		}
	};

	return (
		<>
			<Header />
			<section className="profile_sec mt-5" data-aos="fade-up">
				<div className="container">
					<div className="row">
						<ProfileHeader />
						<div className="col-md-12 pt-5 pb-4 mt-4 for-extra-space1 mt-4">
							<ProfileNavbartwo />
						</div>
					</div>
				</div>
			</section>

			<section className="pt-5 pb-5">
				<div className="container">
					<div className="row">
						<div className="col-lg-11 mx-auto">
							<div className="row address-section mt-5 pt-3 pb-5">
								<div className="col-lg-5">
									<form onSubmit={handleSubmit}>
										{/* Current Password */}
										<div
											className={`form-group password_input position-relative mb-3 ${
												errors?.current_password ? "pass___error" : ""
											}`}
										>
											<div className="position-relative">
												<input
													type={showOldPassword ? "text" : "password"}
													className="form-control pe-5 w-100"
													placeholder="Current Password"
													name="current_password"
													value={values.current_password}
													onChange={handleChange}
												/>
												<i
													className={`fa ${
														showOldPassword ? "fa-eye-slash" : "fa-eye"
													} position-absolute text-white`}
													style={{
														top: "17px",
														right: "15px",
														cursor: "pointer",
													}}
													onClick={() =>
														togglePasswordVisibility(
															setShowOldPassword,
															showOldPassword,
														)
													}
												></i>
											</div>
											{errors.current_password && (
												<small className="text-danger">
													{errors.current_password[0]}
												</small>
											)}
										</div>

										{/* New Password */}
										<div
											className={`form-group password_input position-relative mb-3"
										${errors?.password ? "pass___error" : ""}`}
										>
											<div className="position-relative">
												<input
													type={showNewPassword ? "text" : "password"}
													className="form-control pe-5 w-100"
													placeholder="New Password"
													name="password"
													value={values.password}
													onChange={handleChange}
												/>
												<i
													className={`fa ${
														showNewPassword ? "fa-eye-slash" : "fa-eye"
													} position-absolute text-white`}
													style={{
														top: "17px",
														right: "15px",
														cursor: "pointer",
													}}
													onClick={() =>
														togglePasswordVisibility(
															setShowNewPassword,
															showNewPassword,
														)
													}
												></i>
											</div>
											{errors.password && (
												<small className="text-danger">
													{errors.password[0]}
												</small>
											)}
										</div>

										{/* Confirm Password */}
										<div
											className={`form-group password_input position-relative mb-3
											${errors?.confirm_password ? "pass___error" : ""}`}
										>
											<div className="position-relative">
												<input
													type={showConfirmPassword ? "text" : "password"}
													className="form-control pe-5 w-100"
													placeholder="Confirm New Password"
													name="confirm_password"
													value={values.confirm_password}
													onChange={handleChange}
												/>
												<i
													className={`fa ${
														showConfirmPassword ? "fa-eye-slash" : "fa-eye"
													} position-absolute text-white`}
													style={{
														top: "17px",
														right: "15px",
														cursor: "pointer",
													}}
													onClick={() =>
														togglePasswordVisibility(
															setShowConfirmPassword,
															showConfirmPassword,
														)
													}
												></i>
											</div>
											{errors.confirm_password && (
												<small className="text-danger">
													{errors.confirm_password[0]}
												</small>
											)}
										</div>

										{/* Submit Button */}
										<div>
											<button
												type="submit"
												disabled={loading}
												className="border text-white btn mt-2 w-100 main_bg white_color text-capitalize pt-2 pb-2"
												style={{ borderRadius: "10px" }}
											>
												{loading ? "Updating..." : "Update"}
											</button>
										</div>
									</form>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			<Footer />
		</>
	);
};

export default Mansettingpassword;

import React, { useState, useEffect } from "react";
import {
	contact,
	handsomeman,
	innerpages2,
	right_arrow,
	solar_calendar,
	user_pro,
} from "../../Constant/Index";
import DatePicker from "react-datepicker";

const StepOne = ({ formData, setFormData, next }) => {
	// Local state to store preview URL for uploaded image
	const [previewImage, setPreviewImage] = useState(null);
	const [showPassword, setShowPassword] = useState(false);
	const togglePasswordVisibility = (setFunction, currentState) => {
		setFunction(!currentState);
	};

	// Handle input changes for text inputs
	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	// Handle date change from DatePicker
	const handleDateChange = (date) => {
		setFormData({ ...formData, dateOfBirth: date });
	};

	// Handle file input change and create preview
	const handleFileChange = (e) => {
		const file = e.target.files[0];
		if (file) {
			setFormData({ ...formData, profileImage: file });
			setPreviewImage(URL.createObjectURL(file));
		}
	};

	// Clean up URL object on unmount or file change
	useEffect(() => {
		return () => {
			if (previewImage) URL.revokeObjectURL(previewImage);
		};
	}, [previewImage]);

	// Handle form submission (prevent default and call next)
	const handleSubmit = (e) => {
		e.preventDefault();
		next();
	};
	useEffect(() => {
		document.body.style.backgroundImage = `url(${innerpages2})`;
		document.body.style.backgroundSize = "cover";
		document.body.style.backgroundPosition = "center";
		document.body.style.minHeight = "100vh";

		return () => {
			document.body.style.backgroundImage = "";
		};
	}, []);

	return (
		<>
			<div className="register_sec py-5 pb-5">
				<div className="container">
					<div className="profile_dv1">
						<div className="row">
							<div className="col-md-6">
								<div className="edit-profile-form">
									<div className="form-container">
										<div className="form-header d-flex align-items-center mb-3">
											<div className="profile-icon me-3">
												<div className="pro_img">
													<img
														src={previewImage || user_pro}
														alt="Profile"
														className="img-fluid rounded-circle"
														style={{
															width: "80px",
															height: "80px",
															objectFit: "cover",
														}}
													/>
												</div>
											</div>
											<div className="create_btn position-relative">
												<label
													className="border wrapper-btn-wrapper btn btn-outline-secondary mb-0"
													style={{ cursor: "pointer" }}
												>
													Upload Photo
													<input
														type="file"
														accept="image/*"
														onChange={handleFileChange}
														style={{ display: "none" }}
													/>
												</label>
											</div>
										</div>

										<h2 className="mb-3">Registration (Women)</h2>
										<form onSubmit={handleSubmit}>
											<div className="form-group mb-3">
												<input
													type="text"
													name="name"
													placeholder="Your Name"
													required
													value={formData.name || ""}
													onChange={handleInputChange}
													className="form-control"
												/>
												{formErrors?.name && (
													<p className="mt-2 text-danger">
														{formErrors.name[0]}
													</p>
												)}
											</div>
											<div className="form-group mb-3">
												<input
													type="email"
													name="email"
													placeholder="Email Address"
													required
													value={formData.email || ""}
													onChange={handleInputChange}
													className="form-control"
												/>
												{formErrors?.email && (
													<p className="mt-2 text-danger">
														{formErrors.email[0]}
													</p>
												)}
											</div>
											<div className="form-group mb-3">
												<input
													type="tel"
													name="phone"
													placeholder="Phone Number"
													required
													value={formData.phone || ""}
													onChange={handleInputChange}
													className="form-control"
												/>
												{formErrors?.phone && (
													<p className="mt-2 text-danger">
														{formErrors.phone[0]}
													</p>
												)}
											</div>
											<div className="form-group position-relative mb-4">
												<DatePicker
													selected={dateOfBirth}
													onChange={handleDateChange}
													placeholderText="Date Of Birth (DOB must match the ID given)"
													dateFormat="dd/MM/yyyy"
													className="form-control custom_datePicker"
													maxDate={new Date()}
													showYearDropdown
													scrollableYearDropdown
												/>
												<div
													className="input_icons"
													style={{
														position: "absolute",
														right: "10px",
														top: "10px",
													}}
												>
													<img src={solar_calendar} alt="calendar" />
												</div>
												{formErrors?.date_of_birth && (
													<p className="mt-2 text-danger">
														{formErrors.date_of_birth[0]}
													</p>
												)}
											</div>
											<div className="form-group mb-3">
												<input
													type="text"
													name="Height"
													placeholder="Height"
													required
													value={formData.Height || ""}
													onChange={handleInputChange}
													className="form-control"
												/>
												{formErrors?.Height && (
													<p className="mt-2 text-danger">
														{formErrors.Height[0]}
													</p>
												)}
											</div>
											<div className="form-group mb-3">
												<input
													type="text"
													name="HairColor"
													placeholder="Hair Color"
													required
													value={formData.HairColor || ""}
													onChange={handleInputChange}
													className="form-control"
												/>
												{formErrors?.HairColor && (
													<p className="mt-2 text-danger">
														{formErrors.HairColor[0]}
													</p>
												)}
											</div>
											<div className="form-group password_input position-relative mb-3">
												<input
													type={showPassword ? "text" : "password"}
													className="form-control pe-5 w-100"
													placeholder=" Password"
												/>
												<i
													className={`fa ${
														showPassword ? "fa-eye-slash" : "fa-eye"
													} position-absolute text-white`}
													style={{
														top: "50%",
														right: "15px",
														transform: "translateY(-50%)",
														cursor: "pointer",
													}}
													onClick={() =>
														togglePasswordVisibility(
															setShowPassword,
															showPassword,
														)
													}
												></i>
											</div>
											<div className="submit_profile_btn position-relative d-flex align-items-center">
												<button
													type="submit"
													className="mt-2 border text-start submit_signup_btn btn btn-primary"
												>
													Next
												</button>
												<div className="profile_img ms-2">
													<img src={right_arrow} alt="next" />
												</div>
											</div>
										</form>
									</div>
								</div>
							</div>

							<div className="col-md-6">
								<div className="user_img1">
									<img
										src={handsomeman}
										className="img-fluid"
										alt="registration female"
									/>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default StepOne;

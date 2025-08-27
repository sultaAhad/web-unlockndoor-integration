import React, { useState, useEffect } from "react";
import {
	handsomeman,
	innerpages2,
	right_arrow,
	solar_calendar,
	user_pro,
} from "../../Constant/Index";
import DatePicker from "react-datepicker";

const StepOne = ({ formData, setFormData, next, formErrors }) => {
	const [previewImage, setPreviewImage] = useState(null);
	const [showPassword, setShowPassword] = useState(false);
	const [dateOfBirth, setDateOfBirth] = useState(new Date());

	const togglePasswordVisibility = () => setShowPassword(!showPassword);

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	const handleDateChange = (date) => {
		const formattedDate = date ? date.toISOString().split("T")[0] : "";
		setFormData({ ...formData, date_of_birth: formattedDate });
		setDateOfBirth(date);
	};

	const handleFileChange = (e) => {
		const file = e.target.files[0];
		if (file) {
			setFormData({ ...formData, profile_image: file });
			setPreviewImage(URL.createObjectURL(file));
		}
	};

	useEffect(() => {
		return () => {
			if (previewImage) URL.revokeObjectURL(previewImage);
		};
	}, [previewImage]);

	useEffect(() => {
		document.body.style.backgroundImage = `url(${innerpages2})`;
		document.body.style.backgroundSize = "cover";
		document.body.style.backgroundPosition = "center";
		document.body.style.minHeight = "100vh";

		return () => {
			document.body.style.backgroundImage = "";
		};
	}, []);

	const handleSubmit = (e) => {
		e.preventDefault();
		next();
	};

	return (
		<div className="register_sec py-5 pb-5">
			<div className="container">
				<div className="profile_dv1">
					<div className="row">
						<div className="col-md-6">
							<div className="edit-profile-form">
								<div className="form-container">
									{/* Profile Photo */}
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
											<label className="border wrapper-btn-wrapper btn btn-outline-secondary mb-0">
												Upload Photo
												<input
													type="file"
													accept="image/*"
													onChange={handleFileChange}
													style={{ display: "none" }}
												/>
											</label>
											{formErrors?.profile_image && (
												<p className="mt-2 text-danger">
													{formErrors.profile_image[0]}
												</p>
											)}
										</div>
									</div>

									<h2 className="mb-3">Registration (Women)</h2>
									<form onSubmit={handleSubmit}>
										{/* Name */}
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
												<p className="mt-2 text-danger">{formErrors.name[0]}</p>
											)}
										</div>

										{/* Email */}
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

										{/* Phone */}
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

										{/* DOB */}
										<div className="form-group position-relative mb-4">
											<DatePicker
												selected={dateOfBirth}
												onChange={handleDateChange}
												placeholderText="Date Of Birth"
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

										{/* Height */}
										<div className="form-group mb-3">
											<input
												type="text"
												name="height" // ✅ Fixed
												placeholder="Height"
												required
												value={formData.height || ""}
												onChange={handleInputChange}
												className="form-control"
											/>
											{formErrors?.height && (
												<p className="mt-2 text-danger">
													{formErrors.height[0]}
												</p>
											)}
										</div>

										{/* Hair Color */}
										<div className="form-group mb-3">
											<input
												type="text"
												name="hair_color" // ✅ Fixed
												placeholder="Hair Color"
												required
												value={formData.hair_color || ""}
												onChange={handleInputChange}
												className="form-control"
											/>
											{formErrors?.hair_color && (
												<p className="mt-2 text-danger">
													{formErrors.hair_color[0]}
												</p>
											)}
										</div>

										{/* Password */}
										<div className="form-group password_input position-relative mb-3">
											<input
												type={showPassword ? "text" : "password"}
												name="password"
												className="form-control pe-5 w-100"
												placeholder="Password"
												value={formData.password || ""}
												onChange={handleInputChange}
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
												onClick={togglePasswordVisibility}
											></i>
											{formErrors?.password && (
												<p className="mt-2 text-danger">
													{formErrors.password[0]}
												</p>
											)}
										</div>

										{/* Submit */}
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

						{/* Side Image */}
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
	);
};

export default StepOne;

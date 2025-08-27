import React, { useState, useEffect } from "react";
import { handsomeman, innerpages2, right_arrow } from "../../Constant/Index";

const StepTwo = ({ formData, setFormData, next, prev, formErrors }) => {
	const [chips, setChips] = useState(formData.skills || []);

	useEffect(() => {
		setFormData((prev) => ({ ...prev, skills: chips }));
	}, [chips, setFormData]);

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleAddChip = (chip) => {
		const trimmed = chip.trim();
		if (trimmed && !chips.includes(trimmed))
			setChips((prev) => [...prev, trimmed]);
	};

	const handleRemoveChip = (chip) =>
		setChips((prev) => prev.filter((c) => c !== chip));

	const handleSubmit = (e) => {
		e.preventDefault();
		next(); // This now calls handleNext with validation
	};

	// Background
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
		<div className="register_sec py-5 pb-5">
			<div className="container">
				<div className="profile_dv1">
					<div className="row">
						<div className="col-md-6">
							<div className="edit-profile-form">
								<div className="form-container">
									<form onSubmit={handleSubmit}>
										{/* Address */}
										<div className="form-group mb-3">
											<input
												type="text"
												name="address"
												placeholder="Address"
												required
												value={formData.address || ""}
												onChange={handleInputChange}
												className="form-control"
											/>
											{formErrors?.address && (
												<p className="mt-2 text-danger">
													{formErrors.address[0]}
												</p>
											)}
										</div>

										{/* Income */}
										<div className="form-group mb-3">
											<input
												type="text"
												name="income"
												placeholder="Income"
												required
												value={formData.income || ""}
												onChange={handleInputChange}
												className="form-control"
											/>
											{formErrors?.income && (
												<p className="mt-2 text-danger">
													{formErrors.income[0]}
												</p>
											)}
										</div>

										{/* Other platform */}
										<div className="form-group mb-3">
											<select
												name="occupation"
												required
												value={formData.occupation || ""}
												onChange={handleInputChange}
												className="form-control"
											>
												<option value="">
													Are you registered on any other platform?
												</option>
												<option value="yes">Yes</option>
												<option value="no">No</option>
											</select>
											{formErrors?.occupation && (
												<p className="mt-2 text-danger">
													{formErrors.occupation[0]}
												</p>
											)}
										</div>

										{/* Nationality */}
										<div className="form-group mb-3">
											<select
												name="nationality"
												required
												value={formData.nationality || ""}
												onChange={handleInputChange}
												className="form-control"
											>
												<option value="">Select nationality</option>
												<option value="Indian">Indian</option>
												<option value="American">American</option>
												<option value="Other">Other</option>
											</select>
											{formErrors?.nationality && (
												<p className="mt-2 text-danger">
													{formErrors.nationality[0]}
												</p>
											)}
										</div>

										{/* Body type */}
										<div className="form-group mb-3">
											<select
												name="body_type"
												required
												value={formData.body_type || ""}
												onChange={handleInputChange}
												className="form-control"
											>
												<option value="">Select Body Type</option>
												<option value="Slim">Slim</option>
												<option value="Athletic">Athletic</option>
												<option value="Other">Other</option>
											</select>
											{formErrors?.body_type && (
												<p className="mt-2 text-danger">
													{formErrors.body_type[0]}
												</p>
											)}
										</div>

										{/* Skills / Chips */}
										<div className="form-group mb-3">
											<input
												type="text"
												placeholder="Enter your talents/skills and press Enter"
												onKeyDown={(e) => {
													if (e.key === "Enter") {
														e.preventDefault();
														handleAddChip(e.target.value);
														e.target.value = "";
													}
												}}
												className="form-control"
											/>
											{formErrors?.skills && (
												<p className="mt-2 text-danger">
													{formErrors.skills[0]}
												</p>
											)}
											<div className="chips mt-2">
												{chips.map((chip) => (
													<div key={chip} className="chip">
														{chip}
														<span onClick={() => handleRemoveChip(chip)}>
															&times;
														</span>
													</div>
												))}
											</div>
										</div>

										{/* Buttons */}
										<div className="d-flex justify-content-between align-content-center mt-3 gap-3">
											<div className="submit_profile_btn position-relative d-flex align-items-center w-100">
												<button
													type="button"
													className="mt-2 w-100 border text-start submit_signup_btn btn btn-primary"
													onClick={prev}
												>
													Previous
												</button>
												<div className="profile_img ms-2">
													<img src={right_arrow} alt="prev" />
												</div>
											</div>
											<div className="submit_profile_btn position-relative d-flex align-items-center w-100">
												<button
													type="submit"
													className="mt-2 w-100 border text-start submit_signup_btn btn btn-primary"
												>
													Next
												</button>
												<div className="profile_img ms-2">
													<img src={right_arrow} alt="next" />
												</div>
											</div>
										</div>
									</form>
								</div>
							</div>
						</div>

						{/* Image */}
						<div className="col-md-6">
							<div className="user_img1">
								<img
									src={handsomeman}
									className="img-fluid"
									alt="handsome man"
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default StepTwo;

import React, { useState, useEffect } from "react";
import {
	imgregistaionfemale,
	innerpages2,
	right_arrow,
} from "../../Constant/Index";

const StepTwo = ({ formData, setFormData, next, prev, formErrors }) => {
	const [chips, setChips] = useState(formData.skills || []);

	const sliderLabels = {
		0: "10k",
		25: "25k",
		50: "50k",
		75: "75k",
		100: "100k+",
	};

	const [rangeValue, setRangeValue] = useState(
		Object.keys(sliderLabels).find(
			(key) => sliderLabels[key] === formData.income,
		) || 50,
	);

	useEffect(() => {
		setFormData((prev) => ({ ...prev, skills: chips }));
	}, [chips]);

	useEffect(() => {
		setFormData((prev) => ({ ...prev, income: sliderLabels[rangeValue] }));
	}, [rangeValue]);

	const handleAddChip = (chip) => {
		const trimmed = chip.trim();
		if (trimmed && !chips.includes(trimmed)) {
			setChips([...chips, trimmed]);
		}
	};

	const handleRemoveChip = (chip) => {
		setChips(chips.filter((c) => c !== chip));
	};

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));

		const foundKey = Object.keys(sliderLabels).find(
			(key) => sliderLabels[key] === value,
		);
		if (foundKey) setRangeValue(Number(foundKey));
	};

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
		<div className="register_sec py-5 pb-5">
			<div className="container">
				<div className="profile_dv1">
					<div className="row">
						<div className="col-md-6">
							<div className="edit-profile-form">
								<div className="form-container">
									<form onSubmit={handleSubmit}>
										{/* Occupation */}
										<div className="form-group mb-3">
											<input
												type="text"
												name="occupation"
												placeholder="Occupation"
												value={formData.occupation || ""}
												onChange={handleInputChange}
												className="form-control"
											/>
											{formErrors?.occupation && (
												<p className="mt-2 text-danger">
													{formErrors.occupation[0]}
												</p>
											)}
										</div>

										{/* Annual Income */}
										<div className="form-group mb-3">
											<input
												type="text"
												name="income"
												placeholder="What is your annual income"
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

										{/* Slider */}
										<div className="custom-slider-section mb-3">
											<div className="slider-wrapper">
												<input
													type="range"
													min="0"
													max="100"
													step="25"
													value={rangeValue}
													onChange={(e) =>
														setRangeValue(Number(e.target.value))
													}
													className="custom-slider"
												/>
												<div className="slider-labels d-flex justify-content-between">
													<span>10k</span>
													<span>25k</span>
													<span>50k</span>
													<span>75k</span>
													<span>100k+</span>
												</div>
											</div>
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
													<img src={right_arrow} alt="next" />
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

						<div className="col-md-6">
							<div className="user_img1">
								<img src={imgregistaionfemale} className="img-fluid" alt="" />
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default StepTwo;

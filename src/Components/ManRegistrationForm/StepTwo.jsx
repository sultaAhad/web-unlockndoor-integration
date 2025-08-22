import React, { useState, useEffect } from "react";
import {
	imgregistaionfemale,
	innerpages2,
	right_arrow,
} from "../../Constant/Index";
import { Link } from "react-router-dom";

const StepTwo = ({ formData, setFormData, next, formErrors }) => {
	const [chips, setChips] = useState(formData.talents || []);

	const sliderLabels = {
		0: "10k",
		25: "25k",
		50: "50k",
		75: "75k",
		100: "100k+",
	};

	const [rangeValue, setRangeValue] = useState(
		Object.keys(sliderLabels).find(
			(key) => sliderLabels[key] === formData.annualIncome
		) || 50
	);

	useEffect(() => {
		setFormData((prev) => ({ ...prev, talents: chips }));
	}, [chips]);

	useEffect(() => {
		setFormData((prev) => ({
			...prev,
			annualIncome: sliderLabels[rangeValue],
		}));
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
			(key) => sliderLabels[key] === value
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
												required
												placeholder="Occupation"
												name="occupation"
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
												required
												placeholder="What is your annual income"
												name="annualIncome"
												value={formData.annualIncome || ""}
												onChange={handleInputChange}
												className="form-control"
											/>
											{formErrors?.annual_income && (
												<p className="mt-2 text-danger">
													{formErrors.annual_income[0]}
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
													onChange={(e) => setRangeValue(Number(e.target.value))}
													className="custom-slider"
												/>
											</div>
											<div className="slider-labels d-flex justify-content-between">
												<span>10k</span>
												<span>25k</span>
												<span>50k</span>
												<span>75k</span>
												<span>100k+</span>
											</div>
										</div>

										{/* Chips */}
										<div className="form-group mb-3">
											<input
												type="text"
												placeholder="What are your talents and skills?"
												onKeyDown={(e) => {
													if (e.key === "Enter") {
														e.preventDefault();
														handleAddChip(e.target.value);
														e.target.value = "";
													}
												}}
												className="form-control"
											/>
											{formErrors?.talent_skills && (
												<p className="mt-2 text-danger">
													{formErrors.talent_skills[0]}
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

										{/* Submit */}
										<div className="submit_profile_btn position-relative">
											<Link>
												<button
													type="submit"
													onClick={handleSubmit}
													className="mt-2 border text-start submit_signup_btn btn btn-primary"
												>
													Next
												</button>
											</Link>
											<div className="profile_img">
												<img src={right_arrow} alt="" />
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

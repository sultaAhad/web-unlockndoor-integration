import React, { useState, useEffect } from "react";
import {
	imgregistaionfemale,
	innerpages2,
	right_arrow,
} from "../../Constant/Index";
import { Link } from "react-router-dom";

const StepTwo = ({ formData, setFormData, next }) => {
	const [chips, setChips] = useState(
		formData.talents || ["Gaming", "Movies", "Sports"]
	);

	// Mapping slider values to income labels
	const sliderLabels = {
		0: "10k",
		25: "25k",
		50: "50k",
		75: "75k",
		100: "100k+",
	};

	// Find slider position from saved income value, default to 50 if not found
	const [rangeValue, setRangeValue] = useState(
		Object.keys(sliderLabels).find(
			(key) => sliderLabels[key] === formData.annualIncome
		) || 50
	);

	// Sync talents with formData
	useEffect(() => {
		setFormData((prev) => ({ ...prev, talents: chips }));
	}, [chips]);

	// Sync slider with income label
	useEffect(() => {
		setFormData((prev) => ({
			...prev,
			annualIncome: sliderLabels[rangeValue],
		}));
	}, [rangeValue]);

	// Add new chip
	const handleAddChip = (chip) => {
		const trimmed = chip.trim();
		if (trimmed && !chips.includes(trimmed)) {
			setChips([...chips, trimmed]);
		}
	};

	// Remove chip
	const handleRemoveChip = (chip) => {
		setChips(chips.filter((c) => c !== chip));
	};

	// Handle input changes
	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));

		// Also update slider if typed value matches a label
		const foundKey = Object.keys(sliderLabels).find(
			(key) => sliderLabels[key] === value
		);
		if (foundKey) {
			setRangeValue(Number(foundKey));
		}
	};

	// Form submit
	const handleSubmit = (e) => {
		e.preventDefault();
		next();
	};

	// Page background effect
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
										<form onSubmit={handleSubmit}>
											<div className="form-group">
												<input
													type="text"
													required
													placeholder="Occupation"
													name="occupation"
													value={formData.occupation || ""}
													onChange={handleInputChange}
													className=""
												/>
											</div>

											<div className="form-group">
												<input
													type="text"
													required
													placeholder="What is your annual income"
													name="annualIncome"
													value={formData.annualIncome || ""}
													onChange={handleInputChange}
													className=""
												/>
											</div>

											{/* Slider */}
											<div className="custom-slider-section">
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
												</div>
												<div className="slider-labels">
													<span>10k</span>
													<span>25k</span>
													<span>50k</span>
													<span>75k</span>
													<span>100k+</span>
												</div>
											</div>

											{/* Chips */}
											<div className="form-group">
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
												/>
												<div className="chips">
													{chips.map((chip) => (
														<div key={chip} className="chip">
															{chip}
															<span
																onClick={() => handleRemoveChip(chip)}
															>
																&times;
															</span>
														</div>
													))}
												</div>
											</div>

											<div className="submit_profile_btn position-relative">
												<Link>
													<button
														type="submit"
														onClick={handleSubmit}
														className="mt-2 border text-start submit_signup_btn"
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
									<img
										src={imgregistaionfemale}
										className="img-fluid"
										alt=""
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

export default StepTwo;

import React, { useState, useEffect } from "react";
import {
	contact,
	handsomeman,
	imgregistaionfemale,
	innerpages2,
	right_arrow,
} from "../../Constant/Index";
import { Link } from "react-router-dom";

const StepTwo = ({ formData, setFormData, next }) => {
	const [chips, setChips] = useState(
		formData.talents || ["Gaming", "Movies", "Sports"],
	);
	const [rangeValue, setRangeValue] = useState(formData.paymentCapacity || 50);

	// Sync chips to formData
	useEffect(() => {
		setFormData({ ...formData, talents: chips });
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [chips]);

	// Sync rangeValue to formData
	useEffect(() => {
		setFormData({ ...formData, paymentCapacity: rangeValue });
		// eslint-disable-next-line react-hooks/exhaustive-deps
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
		setFormData({ ...formData, [name]: value });
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
		<>
			<div className="register_sec py-5 pb-5">
				<div className="container">
					<div className="profile_dv1">
						<div className="row">
							<div className="col-md-6">
								<div className="edit-profile-form">
									<div className="form-container">
										<form onSubmit={handleSubmit}>
											<div className="form-group mb-3">
												<input
													type="text"
													name="name"
													placeholder="Address"
													required
													value={formData.name || ""}
													onChange={handleInputChange}
													className="form-control"
												/>
											</div>
											<div className="form-group">
												<select
													required
													placeholder="Are you registered on any other dating platform?"
													name="occupation"
													value={formData.occupation || ""}
													onChange={handleInputChange}
												>
													<option value="" selected>
														Are you registered on any other platform
													</option>
													<option value="Option 1">yes</option>
													<option value="Option 2">no</option>
												</select>
											</div>
											<div className="form-group">
												<select
													required
													placeholder="Are you registered on any other dating platform?"
													name="occupation"
													value={formData.occupation || ""}
													onChange={handleInputChange}
												>
													<option value="" selected>
														nationality
													</option>
													<option value="Option 1">yes</option>
													<option value="Option 2">no</option>
												</select>
											</div>
											<div className="form-group">
												<select
													required
													placeholder="Are you registered on any other dating platform?"
													name="occupation"
													value={formData.occupation || ""}
													onChange={handleInputChange}
												>
													<option value="" selected>
														body type
													</option>
													<option value="Option 1">yes</option>
													<option value="Option 2">no</option>
												</select>
											</div>
											{/* Chips */}
											<div className="form-group">
												<input
													type="text"
													placeholder="what are your talents and skills?"
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
															<span onClick={() => handleRemoveChip(chip)}>
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
									<img src={handsomeman} className="img-fluid" alt="" />
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

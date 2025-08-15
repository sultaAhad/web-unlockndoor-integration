import React from "react";

const Stepper = ({ currentStep }) => {
	const steps = [1, 2, 3];

	return (
		<div className="stepper-container">
			{steps.map((step, index) => (
				<div key={index} className="step-wrapper">
					<div className="step-content">
						<div
							className={`step-circle secondary-secondsemibold-font ${
								currentStep >= step ? "active" : "inactive"
							}`}
						>
							{step}
						</div>
						<span
							className={`step-label secondary-secondsemibold-font ${
								currentStep >= step ? "active" : ""
							}`}
						>
							Step
						</span>
					</div>
					{index < steps.length - 1 && (
						<div
							className={`step-connector secondary-secondsemibold-font ${
								currentStep > step ? "active" : ""
							}`}
						/>
					)}
				</div>
			))}
		</div>
	);
};

export default Stepper;

// src/Constant/HelperFunction.js
export const validateMenRegistration = (registerman, step) => {
	const errors = {};

	// Step 1: Personal Info
	if (step === 0) {
		if (!registerman.name?.trim()) errors.name = ["Name is required"];

		if (!registerman.email?.trim()) {
			errors.email = ["Email is required"];
		} else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(registerman.email)) {
			errors.email = ["Enter a valid email"];
		}

		if (!registerman.phone?.trim()) {
			errors.phone = ["Phone number is required"];
		} else if (!/^\d{7,15}$/.test(registerman.phone)) {
			errors.phone = ["Enter a valid phone number"];
		}
		if (!registerman.nationality?.trim())
			errors.nationality = ["Nationality is required"];
		if (!registerman.date_of_birth) {
			errors.date_of_birth = ["Date of Birth is required"];
		}

		if (!registerman.password) {
			errors.password = ["Password is required"];
		} else if (registerman.password.length < 6) {
			errors.password = ["Password must be at least 6 characters"];
		}

		if (!registerman.profile_image) {
			errors.profile_image = ["Profile image is required"];
		}
		if (!registerman.can_pay) errors.can_pay = ["Please select if you can pay"];
	}

	// Step 2: Occupation & Skills
	if (step === 1) {
		if (!registerman.occupation?.trim())
			errors.occupation = ["Occupation is required"];

		if (!registerman.income?.trim()) {
			errors.income = ["Income is required"];
		}

		if (!registerman.skills || registerman.skills.length === 0) {
			errors.skills = ["At least one skill is required"];
		}
	}

	// Step 3: Media & Message
	if (step === 2) {
		if (!registerman.cover_image)
			errors.cover_image = ["Cover image is required"];

		if (!registerman.images || registerman.images.length < 5) {
			errors.images = ["At least 5 images are required"];
		}

		if (!registerman.videos || registerman.videos.length < 2) {
			errors.videos = ["At least 2 videos are required"];
		}

		if (!registerman.message?.trim()) errors.message = ["Message is required"];
	}

	return errors;
};
// src/Constant/HelperFunction.js
export const validateWomenRegistration = (registerWomen, step) => {
  const errors = {};

  // Step 1: Personal Info
  if (step === 0) {
    if (!registerWomen.name?.trim()) errors.name = ["Name is required"];

    if (!registerWomen.email?.trim()) {
      errors.email = ["Email is required"];
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(registerWomen.email)) {
      errors.email = ["Enter a valid email"];
    }

    if (!registerWomen.phone?.trim()) {
      errors.phone = ["Phone number is required"];
    } else if (!/^\d{7,15}$/.test(registerWomen.phone)) {
      errors.phone = ["Enter a valid phone number"];
    }

    if (!registerWomen.date_of_birth) {
      errors.date_of_birth = ["Date of Birth is required"];
    }

    if (!registerWomen.password) {
      errors.password = ["Password is required"];
    } else if (registerWomen.password.length < 6) {
      errors.password = ["Password must be at least 6 characters"];
    }

    if (!registerWomen.profile_image) {
      errors.profile_image = ["Profile image is required"];
    }

    if (!registerWomen.height?.trim()) {
      errors.height = ["Please enter the Height"];
    }

    if (!registerWomen.hair_color?.trim()) {
      errors.hair_color = ["Please enter the Hair Color"];
    }
  }

  // Step 2: Occupation & Skills
  if (step === 1) {
    if (!registerWomen.occupation?.trim())
      errors.occupation = ["Occupation is required"];

    if (!registerWomen.nationality?.trim())
      errors.nationality = ["Nationality is required"];

    if (!registerWomen.address?.trim())
      errors.address = ["Address is required"];

    if (!registerWomen.income?.trim()) {
      errors.income = ["Income is required"];
    }

    if (!registerWomen.body_type?.trim()) {
      errors.body_type = ["Body type is required"];
    }

    if (!registerWomen.skills || registerWomen.skills.length === 0) {
      errors.skills = ["At least one skill is required"];
    }
  }

  // Step 3: Media & Message
  if (step === 2) {
    if (!registerWomen.cover_images || registerWomen.cover_images.length === 0) {
      errors.cover_images = ["At least 1 cover photo is required"];
    }

    if (!registerWomen.images || registerWomen.images.length < 5) {
      errors.images = ["At least 5 images are required"];
    }

    if (!registerWomen.videos || registerWomen.videos.length < 2) {
      errors.videos = ["At least 2 videos are required"];
    }

  }

  return errors;
};



export const validatelogin = (login, setLoginErrors) => {
	let isValid = true;
	let errors = {};

	if (!login?.email?.trim()) {
		errors.email = ["Email is required"];
		isValid = false;
	} else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(login.email)) {
		errors.email = ["Invalid email format"];
		isValid = false;
	}

	if (!login?.password?.trim()) {
		errors.password = ["Password is required"];
		isValid = false;
	}

	setLoginErrors(errors);
	return isValid;
};
export const validateforget = (email, setForgotErrors) => {
	let isValid = true;
	let errors = {};

	if (!email?.trim()) {
		errors.email = ["Email is required"];
		isValid = false;
	} else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
		errors.email = ["Invalid email format"];
		isValid = false;
	}

	setForgotErrors(errors);
	return isValid;
};
export const validateOtpData = (email, otp, setErrors) => {
	let isValid = true;
	let errors = {};

	if (!email?.trim()) {
		errors.email = ["Email is required"];
		isValid = false;
	} else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
		errors.email = ["Invalid email format"];
		isValid = false;
	}

	if (!otp || otp.length !== 6 || !/^\d{6}$/.test(otp)) {
		errors.otp = ["Enter a valid 6-digit OTP"];
		isValid = false;
	}

	setErrors(errors);
	return isValid;
};
export const validateChangePassword = (changePassword, setErrors) => {
	let isValid = true;
	let errors = {};

	if (!changePassword.password?.trim()) {
		errors.password = ["New password is required"];
		isValid = false;
	}

	if (!changePassword.confirm_password?.trim()) {
		errors.confirm_password = ["Confirm password is required"];
		isValid = false;
	} else if (changePassword.password !== changePassword.confirm_password) {
		errors.confirm_password = ["Passwords do not match"];
		isValid = false;
	}

	setErrors(errors);
	return isValid;
};
// edit form man
export const validateMenEditForm = (registerman, setFormErrors, chips = []) => {
	let isValid = true;
	let errors = {};

	// Name
	if (!registerman?.name?.trim()) {
		errors.name = ["Name is required"];
		isValid = false;
	}

	// Phone Number
	if (!registerman?.phone_number?.trim()) {
		errors.phone_number = ["Phone number is required"];
		isValid = false;
	} else if (!/^\d{10}$/.test(registerman.phone_number)) {
		errors.phone_number = ["Phone number must be 10 digits"];
		isValid = false;
	}

	// Date of Birth
	if (!registerman?.dob) {
		errors.dob = ["Date of birth is required"];
		isValid = false;
	}

	// Occupation
	if (!registerman?.occupation?.trim()) {
		errors.occupation = ["Occupation is required"];
		isValid = false;
	}

	// Annual Income
	if (!registerman?.annual_income?.trim()) {
		errors.annual_income = ["Annual income is required"];
		isValid = false;
	}

	// Purpose
	if (!registerman?.purpose?.trim()) {
		errors.purpose = ["Purpose is required"];
		isValid = false;
	}

	// Talent/Skills
	if (!chips || chips.length === 0) {
		errors.talent_skills = ["At least one talent or skill is required"];
		isValid = false;
	}

	// Stage of Relationship
	if (!registerman?.stage_of_relationship?.trim()) {
		errors.stage_of_relationship = ["Stage of relationship is required"];
		isValid = false;
	}

	// Message
	if (!registerman?.message?.trim()) {
		errors.message = ["Message is required"];
		isValid = false;
	}

	// Profile Picture
	// if (!registerman?.profile_picture) {
	// 	errors.profile_picture = ["Profile picture is required"];
	// 	isValid = false;
	// }

	// // Cover Photo
	// if (!registerman?.cover_photo) {
	// 	errors.cover_photo = ["Cover photo is required"];
	// 	isValid = false;
	// }

	setFormErrors(errors);
	return isValid;
};
// Validation function
export const validateChangePasswordMan = (values, setErrors) => {
	let isValid = true;
	const errors = {};

	if (!values.current_password.trim()) {
		errors.current_password = ["Current password is required"];
		isValid = false;
	}

	if (!values.new_password.trim()) {
		errors.new_password = ["New password is required"];
		isValid = false;
	}

	if (!values.new_password_confirmation.trim()) {
		errors.new_password_confirmation = ["Confirm password is required"];
		isValid = false;
	} else if (values.new_password !== values.new_password_confirmation) {
		errors.new_password_confirmation = ["Passwords do not match"];
		isValid = false;
	}

	setErrors(errors);
	return isValid;
};

// src/validation/ContactValidation.js
export const validateContactForm = (values, setErrors) => {
	let isValid = true;
	const errors = {};

	if (!values.first_name.trim()) {
		errors.first_name = ["First name is required"];
		isValid = false;
	}

	if (!values.last_name.trim()) {
		errors.last_name = ["Last name is required"];
		isValid = false;
	}

	if (!values.phone.trim()) {
		errors.phone = ["Phone number is required"];
		isValid = false;
	} else if (!/^[0-9]{7,15}$/.test(values.phone)) {
		errors.phone = ["Enter a valid phone number"];
		isValid = false;
	}

	if (!values.email.trim()) {
		errors.email = ["Email is required"];
		isValid = false;
	} else if (!/\S+@\S+\.\S+/.test(values.email)) {
		errors.email = ["Enter a valid email"];
		isValid = false;
	}

	if (!values.message.trim()) {
		errors.message = ["Message is required"];
		isValid = false;
	}

	setErrors(errors);
	return isValid;
};
export const validateSubscriptionForm = (values, setErrors) => {
	let isValid = true;
	const errors = {};

	if (!values.name.trim()) {
		errors.name = ["Name is required"];
		isValid = false;
	}

	if (!values.email.trim()) {
		errors.email = ["Email is required"];
		isValid = false;
	} else if (!/\S+@\S+\.\S+/.test(values.email)) {
		errors.email = ["Enter a valid email"];
		isValid = false;
	}

	if (!values.phone.trim()) {
		errors.phone = ["Phone number is required"];
		isValid = false;
	} else if (!/^[0-9]{10,15}$/.test(values.phone)) {
		errors.phone = ["Phone must be between 10 and 15 digits"];
		isValid = false;
	}

	if (!values.interest.trim()) {
		errors.interest = ["Please select Male or Female"];
		isValid = false;
	}

	setErrors(errors);
	return isValid;
};

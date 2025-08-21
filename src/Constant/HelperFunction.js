// man register validation
export const validateMenRegistration = (
	registerman,
	setFormErrors,
	chips = [],
) => {
	let isValid = true;
	let errors = {};

	// Name
	if (!registerman?.name?.trim()) {
		errors.name = ["Name is required"];
		isValid = false;
	}

	// Email
	if (!registerman?.email?.trim()) {
		errors.email = ["Email is required"];
		isValid = false;
	} else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(registerman.email)) {
		errors.email = ["Invalid email format"];
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

	// Password
	if (!registerman?.password?.trim()) {
		errors.password = ["Password is required"];
		isValid = false;
	}

	// Password Confirmation
	if (!registerman?.password_confirmation?.trim()) {
		errors.password_confirmation = ["Please confirm your password"];
		isValid = false;
	} else if (registerman.password !== registerman.password_confirmation) {
		errors.password_confirmation = ["Passwords do not match"];
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
	if (!registerman?.profile_picture) {
		errors.profile_picture = ["Profile picture is required"];
		isValid = false;
	}

	// Cover Photo
	if (!registerman?.cover_photo) {
		errors.cover_photo = ["Cover photo is required"];
		isValid = false;
	}

	setFormErrors(errors);
	return isValid;
};
// female register validation
export const validateFemaleRegistration = (
	registerfemale,
	setFormErrors,
	galleryImages,
	introVideos,
	chips = [], // talent_skills
) => {
	let isValid = true;
	let errors = {};

	console.log("registerfemale:", registerfemale); // Log the form data
	console.log("chips:", chips); // Log the chips (skills)

	// Name
	if (!registerfemale?.name?.trim()) {
		errors.name = ["Name is required"];
		isValid = false;
	}

	// Email
	if (!registerfemale?.email?.trim()) {
		errors.email = ["Email is required"];
		isValid = false;
	} else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(registerfemale.email)) {
		errors.email = ["Invalid email format"];
		isValid = false;
	}

	// Phone Number
	if (!registerfemale?.phone_number?.trim()) {
		errors.phone_number = ["Phone number is required"];
		isValid = false;
	} else if (!/^\d{10}$/.test(registerfemale.phone_number)) {
		errors.phone_number = ["Phone number must be 10 digits"];
		isValid = false;
	}

	// Date of Birth
	if (!registerfemale?.dob) {
		errors.dob = ["Date of birth is required"];
		isValid = false;
	}

	// Password
	if (!registerfemale?.password?.trim()) {
		errors.password = ["Password is required"];
		isValid = false;
	}

	// Password Confirmation
	if (!registerfemale?.password_confirmation?.trim()) {
		errors.password_confirmation = ["Please confirm your password"];
		isValid = false;
	} else if (registerfemale.password !== registerfemale.password_confirmation) {
		errors.password_confirmation = ["Passwords do not match"];
		isValid = false;
	}

	// Occupation
	if (!registerfemale?.occupation?.trim()) {
		errors.occupation = ["Occupation is required"];
		isValid = false;
	}

	// Nationality
	if (!registerfemale?.nationality?.trim()) {
		errors.nationality = ["Nationality is required"];
		isValid = false;
	}

	// Height
	if (!registerfemale?.height?.trim()) {
		errors.height = ["Height is required"];
		isValid = false;
	}

	// Hair Color
	if (!registerfemale?.hair_color?.trim()) {
		errors.hair_color = ["Hair color is required"];
		isValid = false;
	}

	// Eye Color
	if (!registerfemale?.eye_color?.trim()) {
		errors.eye_color = ["Eye color is required"];
		isValid = false;
	}

	// Body Type
	if (!registerfemale?.body_type?.trim()) {
		errors.body_type = ["Body type is required"];
		isValid = false;
	}

	// Other Platforms
	if (!registerfemale?.other_platforms?.trim()) {
		errors.other_platforms = ["Other platforms info is required"];
		isValid = false;
	}

	// Reside in USA
	if (registerfemale?.reside_in_usa === undefined) {
		errors.reside_in_usa = ["Please indicate if you reside in the USA"];
		isValid = false;
	}

	// Already in a Relationship
	if (registerfemale?.already_in_relationship === undefined) {
		errors.already_in_relationship = [
			"Please indicate if you're already in a relationship",
		];
		isValid = false;
	}

	// Purpose (renamed to your_purpose)
	if (!registerfemale?.your_purpose?.trim()) {
		errors.your_purpose = ["Purpose is required"];
		isValid = false;
	}

	// License/Passport
	if (!registerfemale?.licence_passport) {
		errors.licence_passport = ["License or passport is required"];
		isValid = false;
	}

	// Talent/Skills
	if (!chips || chips.length === 0) {
		errors.talent_skills = ["At least one talent or skill is required"];
		isValid = false;
	}

	// Profile Picture
	if (!registerfemale?.profile_picture) {
		errors.profile_picture = ["Profile picture is required"];
		isValid = false;
	}

	// Cover Photo
	if (!registerfemale?.cover_photo) {
		errors.cover_photo = ["Cover photo is required"];
		isValid = false;
	}

	if (!introVideos || introVideos.length < 2) {
		errors.intro_video = ["Please upload at least 2 videos."];
		isValid = false;
	}

	if (!galleryImages || galleryImages.length < 5) {
		errors.gallery_images = ["Please upload at least 5 images."];
		isValid = false;
	}

	// Set errors and return isValid
	setFormErrors(errors);
	console.log("Validation errors:", errors); // Log errors
	return isValid;
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

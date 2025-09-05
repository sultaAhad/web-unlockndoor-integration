// Homepage starts here
export const CONTENT = "homepage-content";

export const FAQS = "faq";

export const TESTEMONIAL = "testimonial";

export const SETTING = "site-settings";

export const GALLERY = "gallery";

// contect us

export const CONTECT_US = "contact/send-contact-query";

export const SEND_SUBSCRIPTION = "subscription/send-subscription-query";

//  Auth endpoint

export const LOGIN_MAN = `register`;

export const LOGIN_URL = `login`;

export const LOGIN_FORGETPASSWORD = `forgot-password`;

export const LOGIN_OTP = `verify_otp`;

export const LOGIN_CHANGEPASSWORD = `reset-password`;

export const LOGIN_CHANGEPASSWORDMAN = `change-password`;

// profile man

// Endpoints man
export const MAN_SIGNUP = `auth-men/register-men`;
export const MAN_LOGIN = `auth-men/login-men`;
export const MAN_LOGIN_OTP_VARIFY = `auth-men/verify-otp`;
export const MAN_LOGIN_OTP_SAND = `auth-men/send-otp`;
export const MAN_LOGIN_CHANGEPASSWORD_RESET = `auth-men/reset-password`;
export const MAN_SELFIE = `auth-men/verify-selfie`;
export const GET_MANPACKAGES = `package`;
export const PURCHASE_PACKAGES = `auth-men/men-purchase-package`;
export const EDIT_PROFILE_MAN = `auth-men/update-men`;
export const MAN_LIKE_WOMEN = `auth-men/like-women`;
export const OFFER_DATE = `auth-men/offer-date`;
export const MAN_DELETE_IMAGES = `auth-men/delete-image`;
export const MAN_DELETE_VIDEO = `auth-men/delete-video`;
export const MAN_UPDATE_IMAGE = `auth-men/update-profile-image`;
export const MAN_UPDATE_COVER_IMAGE = `auth-men/update-cover-image`;
export const MAN_SEND_MASSAGE = `auth-men/send-message`;
export const MAN_UPGRADE_PACKAGES = `auth-men/upgrade-men-package`;
export const MAN_WITHDREW_DATE = `auth-men/withdraw-date`;
export const CHANGE_PROFILE_IMAGE = `auth-men/update-profile-image`;
export const CHANGE_COVER_IMAGE = `auth-men/update-cover-image`;

// GET API MAN
export const MAN_MATCHED_PRIFILE = `auth-men/matched-profiles`;
export const MAN_SPONSORED_DATES = `auth-men/sponsored-dates`;
export const MAN_FEMALE_MEMBERSHIP = `auth-men/female-members`;
export const MAN_DATA = `auth-men/men-data`;

// Endpoints women
export const WOMEN_SIGNUP = `auth-women/register-women`;
export const WOMEN_LOGIN = `auth-women/login-women`;
export const WOMEN_LOGIN_OTP_VARIFY = `auth-women/verify-otp`;
export const WOMEN_LOGIN_OTP_SAND = `auth-women/send-otp`;
export const WOMEN_LOGIN_CHANGEPASSWORD_RESET = `auth-women/reset-password`;
export const WOMEN_DATA = `auth-women/women-data`;
export const PURCHASE_PACKAGES_WOMEN = `auth-women/women-purchase-package`;
export const DELETE_IMAGE_WOMAN = `auth-women/delete-image`;
export const DELETE_VIDEO_WOMAN = `auth-women/delete-video`;
export const WOMAN_SPONSORED_DATES = `auth-women/sponsored-dates`;
export const WOMAN_MATCHED_PRIFILE = `auth-women/matched-profiles`;
export const CHATS_API = (type) => `auth-${type}/chats?type=${type}`;
export const SEND_CHAT_MESSAGE_API = (type) => `auth-${type}/send-message`;
export const GET_CHAT_MESSAGES_API = (type, chat_id) => `auth-${type}/single-chat?chat_id=${chat_id}`;

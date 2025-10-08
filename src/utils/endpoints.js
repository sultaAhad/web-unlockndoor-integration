// Homepage starts here
export const CONTENT = "homepage-content";

export const FAQS = "faq";

export const TESTEMONIAL = "testimonial";

export const SETTING = "site-settings";

export const GALLERY = "gallery";

export const HELPANDSUPPORT = "help-and-support";
export const TERMCONDITION = "terms-and-condition";
export const PRIVACYPOLICY = "privacy-policy";

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
export const REOFFER_DATE = `auth-men/reoffer-date`;
export const MAN_DELETE_IMAGES = `auth-men/delete-image`;
export const MAN_DELETE_VIDEO = `auth-men/delete-video`;
export const MAN_UPDATE_IMAGE = `auth-men/update-profile-image`;
export const MAN_UPDATE_COVER_IMAGE = `auth-men/update-cover-image`;
export const MAN_SEND_MASSAGE = `auth-men/send-message`;
export const MAN_UPGRADE_PACKAGES = `auth-men/upgrade-men-package`;
export const MAN_WITHDREW_DATE = `auth-men/withdraw-date`;
export const CHANGE_PROFILE_IMAGE = `auth-men/update-profile-image`;
export const CHANGE_COVER_IMAGE = `auth-men/update-cover-image`;
export const CHANGE_PASSWORD_PROFILE = `auth-men/change-password`;

// GET API MAN
export const MAN_MATCHED_PRIFILE = `auth-men/matched-profiles`;
export const MAN_SPONSORED_DATES = `auth-men/sponsored-dates`;
export const MAN_FEMALE_MEMBERSHIP = `auth-men/female-members`;
export const MAN_DATA = `auth-men/men-data`;
export const DELETE_IMAGE_MAN = `auth-men/delete-image`;
export const DELETE_VIDEO_MAN = `auth-men/delete-video`;
export const CHARGES_VIDEO_MAN = `auth-men/video-call-charges`;
export const VIDEO_CALL_PURCHASE_MAN = `auth-men/video-call-purchase`;
export const VIEW_MEMBER_PROFILE = `auth-men/view_member_profile`;

// Endpoints women
export const CHANGE_PASSWORD_PROFILE_WOMEN = `auth-women/change-password`;
export const CHANGE_PROFILE_IMAGE_WOMEN = `auth-women/update-profile-image`;
export const CHANGE_COVER_IMAGE_WOMEN = `auth-women/update-cover-image`;
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
export const WOMAN_REJECT_SPONSORED_DATES = `auth-women/change-date-status`;
export const WOMAN_MATCHED_PRIFILE = `auth-women/male-members`;
export const WOMAN_LIKE_MAN_PROFILE = `auth-women/like-men`;
export const CHATS_API = (type) => `auth-${type}/chats?type=${type}`;
export const SEND_CHAT_MESSAGE_API = (type) => `auth-${type}/send-message`;
export const GET_CHAT_MESSAGES_API = (type, chat_id) =>
	`auth-${type}/single-chat?chat_id=${chat_id}`;
export const WOMEN_SELFIE = `auth-women/verify-selfie`;

// Edit WmonenProfile
export const WOMEN_EDIT_PROFILE = `auth-women/update-women`;
export const WOMEN_UPGRADE_PACKAGE = `auth-women/women-upgrade-package`;
export const WOMEN_CANCEL_PACKAGE = `auth-women/women-cancel-package`;
export const START_VIDEO_CALL = `/call-action`;

export const NOTIFICATIONS_API = (data) =>
	`auth-${data?.type}/get_notifications?page=${data?.currentPage}`;

// services/WomanAuth.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../../utils/base_url";
import {
	CHANGE_COVER_IMAGE_WOMEN,
	CHANGE_PASSWORD_PROFILE_WOMEN,
	CHANGE_PROFILE_IMAGE_WOMEN,
	CHAT_DELETE_WOMEN,
	DELETE_IMAGE_WOMAN,
	DELETE_VIDEO_WOMAN,
	MAN_LIKE_WOMEN,
	PURCHASE_PACKAGES_WOMEN,
	WOMAN_LIKE_MAN_PROFILE,
	WOMAN_MATCHED_PRIFILE,
	WOMEN_CANCEL_PACKAGE,
	WOMEN_DATA,
	WOMEN_EDIT_PROFILE,
	WOMEN_LOGIN,
	WOMEN_LOGIN_CHANGEPASSWORD_RESET,
	WOMEN_LOGIN_OTP_SAND,
	WOMEN_LOGIN_OTP_VARIFY,
	WOMEN_PAYMENT_METHODS,
	WOMEN_PAYMENT_METHODS_DEFAULT,
	WOMEN_PAYMENT_METHODS_STORE,
	WOMEN_SELFIE,
	WOMEN_SIGNUP,
	WOMEN_UPGRADE_PACKAGE,
} from "../../utils/endpoints";

export const WomenAuth = createApi({
	reducerPath: "WomenAuth",
	baseQuery: fetchBaseQuery({
		baseUrl: BASE_URL,
		prepareHeaders: (headers, { getState }) => {
			const token = getState()?.auth?.userToken;
			headers.set("Accept", "application/json");
			if (token) {
				headers.set("Authorization", `Bearer ${token}`);
			}
			return headers;
		},
	}),
	endpoints: (build) => ({
		// ✅ Signup
		womenSignup: build.mutation({
			query: (data) => ({
				url: WOMEN_SIGNUP,
				method: "POST",
				body: data,
			}),
		}),
		// ✅ Login
		womenLogin: build.mutation({
			query: (credentials) => ({
				url: WOMEN_LOGIN,
				method: "POST",
				body: credentials,
			}),
		}),
		// ✅ OTP Send
		womenSendOtp: build.mutation({
			query: (data) => ({
				url: WOMEN_LOGIN_OTP_SAND,
				method: "POST",
				body: data,
			}),
		}),
		// ✅ OTP Verify
		womenVerifyOtp: build.mutation({
			query: (data) => ({
				url: WOMEN_LOGIN_OTP_VARIFY,
				method: "POST",
				body: data,
			}),
		}),
		// ✅ Reset Password
		resetPasswordWomen: build.mutation({
			query: (data) => ({
				url: WOMEN_LOGIN_CHANGEPASSWORD_RESET,
				method: "POST",
				body: data,
			}),
		}),
		// ✅ Get Profile Data
		WomanData: build.query({
			query: () => ({
				url: WOMEN_DATA,
				method: "GET",
			}),
		}),
		// ✅ Purchase Package
		purchasePackageWomen: build.mutation({
			query: (formData) => ({
				url: PURCHASE_PACKAGES_WOMEN,
				method: "POST",
				body: formData,
			}),
		}),
		// ✅ Delete Image
		deleteImageWoman: build.mutation({
			query: (formData) => ({
				url: DELETE_IMAGE_WOMAN,
				method: "POST",
				body: formData,
			}),
		}),
		// ✅ Delete Video
		deleteVideoWoman: build.mutation({
			query: (formData) => ({
				url: DELETE_VIDEO_WOMAN,
				method: "POST",
				body: formData,
			}),
		}),
		// ✅ Edit Profile
		womenEditProfile: build.mutation({
			query: (formData) => ({
				url: WOMEN_EDIT_PROFILE,
				method: "POST",
				body: formData,
			}),
		}),
		// ✅ Like Women
		likeProfile: build.mutation({
			query: (formData) => ({
				url: MAN_LIKE_WOMEN,
				method: "POST",
				body: formData,
			}),
		}),
		// ✅ Like Man
		likeManProfile: build.mutation({
			query: (formData) => ({
				url: WOMAN_LIKE_MAN_PROFILE,
				method: "POST",
				body: formData,
			}),
		}),
		// ✅ Get Match Profiles
		getWomanMatchProfiles: build.query({
			query: ({ filterBy, page }) => ({
				url: `${WOMAN_MATCHED_PRIFILE}?page=${page}&filter_by=${filterBy}`,
				method: "GET",
			}),
		}),
		// ✅ Profile Image Update
		updateProfileImageWomen: build.mutation({
			query: (formData) => ({
				url: CHANGE_PROFILE_IMAGE_WOMEN,
				method: "POST",
				body: formData,
			}),
		}),
		// ✅ Cover Image Update
		updateCoverImageWomen: build.mutation({
			query: (formData) => ({
				url: CHANGE_COVER_IMAGE_WOMEN,
				method: "POST",
				body: formData,
			}),
		}),
		// ✅ Cancel Package
		cancelWomenPackage: build.query({
			query: () => ({
				url: WOMEN_CANCEL_PACKAGE,
				method: "GET",
			}),
		}),
		// ✅ Upgrade Package
		upgradeWomenPackage: build.mutation({
			query: (formData) => ({
				url: WOMEN_UPGRADE_PACKAGE,
				method: "POST",
				body: formData,
			}),
		}),
		// ✅ Change Password
		womenChangePassword: build.mutation({
			query: (formData) => ({
				url: CHANGE_PASSWORD_PROFILE_WOMEN,
				method: "POST",
				body: formData,
			}),
		}),
		verifySelfieWomen: build.mutation({
			query: (formData) => ({
				url: WOMEN_SELFIE,
				method: "POST",
				body: formData,
			}),
		}),

		getPaymentMethods: build.query({
			query: () => ({
				url: WOMEN_PAYMENT_METHODS,
				method: "GET",
			}),
		}),

		deletePaymentMethods: build.mutation({
			query: (id) => ({
				url: `${WOMEN_PAYMENT_METHODS}/${id}`,
				method: "DELETE",
			}),
		}),
		addPaymentMethod: build.mutation({
			query: (formData) => ({
				url: WOMEN_PAYMENT_METHODS_STORE,
				method: "POST",
				body: formData,
			}),
		}),
		makePaymentMethodDefault: build.mutation({
			query: (formData) => ({
				url: WOMEN_PAYMENT_METHODS_DEFAULT,
				method: "POST",
				body: formData,
			}),
		}),
		ChatDeleteWomen: build.mutation({
			query: (formData) => ({
				url: CHAT_DELETE_WOMEN,
				method: "POST",
				body: formData,
			}),
		}),
	}),
});

export const {
	useVerifySelfieWomenMutation,
	useWomenChangePasswordMutation,
	useWomenSignupMutation,
	useWomenLoginMutation,
	usePurchasePackageWomenMutation,
	useDeleteImageWomanMutation,
	useDeleteVideoWomanMutation,
	useWomenEditProfileMutation,
	useUpdateProfileImageWomenMutation,
	useUpdateCoverImageWomenMutation,
	useWomanDataQuery,
	useLikeProfileMutation,
	useWomenSendOtpMutation,
	useWomenVerifyOtpMutation,
	useResetPasswordWomenMutation,
	useGetWomanMatchProfilesQuery,
	useLikeManProfileMutation,
	useLazyCancelWomenPackageQuery,
	useUpgradeWomenPackageMutation,
	useGetPaymentMethodsQuery,
	useAddPaymentMethodMutation,
	useMakePaymentMethodDefaultMutation,
	useDeletePaymentMethodsMutation,
	useChatDeleteWomenMutation,
} = WomenAuth;

export default WomenAuth;

// services/WomanAuth.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../../utils/base_url";
import {
	CHANGE_COVER_IMAGE_WOMEN,
	CHANGE_PROFILE_IMAGE_WOMEN,
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
	WOMEN_SIGNUP,
	WOMEN_UPGRADE_PACKAGE,
} from "../../utils/endpoints";
import { like } from "../../Constant/Index";

export const WomenAuth = createApi({
	reducerPath: "WomenAuth",
	baseQuery: fetchBaseQuery({
		baseUrl: BASE_URL,
		prepareHeaders: (headers, { getState }) => {
			const token = getState()?.auth?.userToken; // ✅ match your reducer
			headers.set("Accept", "application/json");

			if (token) {
				headers.set("Authorization", `Bearer ${token}`);
			}

			return headers;
		},
	}),
	endpoints: (build) => ({
		womenSignup: build.mutation({
			query: (data) => ({
				url: WOMEN_SIGNUP,
				method: "POST",
				body: data,
			}),
		}),
		womenLogin: build.mutation({
			query: (credentials) => ({
				url: WOMEN_LOGIN,
				method: "POST",
				body: credentials,
			}),
		}),
		// OTP Send
		womenSendOtp: build.mutation({
			query: (data) => ({
				url: WOMEN_LOGIN_OTP_SAND,
				method: "POST",
				body: data,
			}),
		}),
		// OTP Verify
		womenVerifyOtp: build.mutation({
			query: (data) => ({
				url: WOMEN_LOGIN_OTP_VARIFY,
				method: "POST",
				body: data,
			}),
		}),

		// Reset Password
		resetPasswordWomen: build.mutation({
			query: (data) => ({
				url: WOMEN_LOGIN_CHANGEPASSWORD_RESET,
				method: "POST",
				body: data,
			}),
		}),
		womanData: build.query({
			query: () => ({
				url: WOMEN_DATA, // your GET endpoint
				method: "GET",
			}),
		}),

		purchasePackageWomen: build.mutation({
			query: (formData) => ({
				url: PURCHASE_PACKAGES_WOMEN,
				method: "POST",
				body: formData, // ✅ works with FormData (Stripe token + package_id)
			}),
		}),
		deleteImageWoman: build.mutation({
			query: (formData) => ({
				url: DELETE_IMAGE_WOMAN,
				method: "POST",
				body: formData, // ✅ works with FormData (Stripe token + package_id)
			}),
		}),
		deleteVideoWoman: build.mutation({
			query: (formData) => ({
				url: DELETE_VIDEO_WOMAN,
				method: "POST",
				body: formData, // ✅ works with FormData (Stripe token + package_id)
			}),
		}),
		womenEditProfile: build.mutation({
			query: (formData) => ({
				url: WOMEN_EDIT_PROFILE,
				method: "POST",
				body: formData,
			}),
		}),
		likeProfile: build.mutation({
			query: (formData) => ({
				url: MAN_LIKE_WOMEN,
				method: "POST",
				body: formData, // ✅ works with FormData (Stripe token + package_id)
			}),
		}),
		likeManProfile: build.mutation({
			query: (formData) => ({
				url: WOMAN_LIKE_MAN_PROFILE,
				method: "POST",
				body: formData, // ✅ works with FormData (Stripe token + package_id)
			}),
		}),
		getWomanMatchProfiles: build.query({
			query: ({ filterBy, page }) => ({
				url: `${WOMAN_MATCHED_PRIFILE}?page=${page}&filter_by=${filterBy}`,
				method: "GET",
			}),
		}),
		updateProfileImageWomen: build.mutation({
			query: (formData) => ({
				url: CHANGE_PROFILE_IMAGE_WOMEN,
				method: "POST",
				body: formData,
			}),
		}),
		updateCoverImageWomen: build.mutation({
			query: (formData) => ({
				url: CHANGE_COVER_IMAGE_WOMEN,
				method: "POST",
				body: formData,
			}),
		}),
		cancelWomenPackage: build.query({
			query: () => ({
				url: WOMEN_CANCEL_PACKAGE,
				method: "GET",
			}),
		}),
		upgradeWomenPackage: build.query({
			query: () => ({
				url: WOMEN_UPGRADE_PACKAGE,
				method: "GET",
			}),
		}),
	}),
});

export const {
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
	useUpgradeWomenPackageQuery
} = WomenAuth;

export default WomenAuth;

// services/WomanAuth.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../../utils/base_url";
import {
	DELETE_IMAGE_WOMAN,
	DELETE_VIDEO_WOMAN,
	MAN_LIKE_WOMEN,
	PURCHASE_PACKAGES_WOMEN,
	WOMAN_CHATS,
	WOMAN_MATCHED_PRIFILE,
	WOMEN_DATA,
	WOMEN_LOGIN,
	WOMEN_LOGIN_CHANGEPASSWORD_RESET,
	WOMEN_LOGIN_OTP_SAND,
	WOMEN_LOGIN_OTP_VARIFY,
	WOMEN_SIGNUP,
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
		sendOtp: build.mutation({
			query: (data) => ({
				url: WOMEN_LOGIN_OTP_SAND,
				method: "POST",
				body: data,
			}),
		}),
		// OTP Verify
		verifyOtp: build.mutation({
			query: (data) => ({
				url: WOMEN_LOGIN_OTP_VARIFY,
				method: "POST",
				body: data,
			}),
		}),
		// Reset Password
		resetPassword: build.mutation({
			query: (data) => ({
				url: WOMEN_LOGIN_CHANGEPASSWORD_RESET,
				method: "POST",
				body: data,
			}),
		}),
		womanData: build.mutation({
			query: (credentials) => ({
				url: WOMEN_DATA,
				method: "POST",
				body: credentials,
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
		likeProfile: build.mutation({
			query: (formData) => ({
				url: MAN_LIKE_WOMEN,
				method: "POST",
				body: formData, // ✅ works with FormData (Stripe token + package_id)
			}),
		}),
		getWomanMatchProfiles: build.query({
			query: ({ filterBy, page }) => ({
				url: `${WOMAN_MATCHED_PRIFILE}?page=${page}&filterBy=${filterBy}`,
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
	useWomanDataMutation,
	useLikeProfileMutation,
	useSendOtpMutation,
	useVerifyOtpMutation,
	useResetPasswordMutation,
	useGetWomanMatchProfilesQuery,

} = WomenAuth;

export default WomenAuth;

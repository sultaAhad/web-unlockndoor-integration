import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../../utils/base_url";
import {
	MAN_LOGIN,
	MAN_SIGNUP,
	MAN_SELFIE,
	PURCHASE_PACKAGES,
	GET_MANPACKAGES,
	EDIT_PROFILE_MAN,
	MAN_UPDATE_IMAGE,
	MAN_UPDATE_COVER_IMAGE,
	MAN_DELETE_IMAGES,
	MAN_DELETE_VIDEO,
	MAN_LIKE_WOMEN,
	MAN_SEND_MASSAGE,
	OFFER_DATE,
	MAN_WITHDREW_DATE,
	MAN_DATA,
	MAN_FEMALE_MEMBERSHIP,
	MAN_SPONSORED_DATES,
	MAN_MATCHED_PRIFILE,
	MAN_LOGIN_OTP_VARIFY,
	MAN_LOGIN_OTP_SAND,
	MAN_LOGIN_CHANGEPASSWORD_RESET,
	DELETE_IMAGE_MAN,
	DELETE_VIDEO_MAN,
	REOFFER_DATE,
} from "../../utils/endpoints";

export const ManAuth = createApi({
	reducerPath: "ManAuth",
	baseQuery: fetchBaseQuery({
		baseUrl: BASE_URL,
		prepareHeaders: (headers, { getState }) => {
			const token = getState()?.auth?.userToken;
			headers.set("Accept", "application/json");
			if (token) headers.set("Authorization", `Bearer ${token}`);
			return headers;
		},
	}),
	endpoints: (build) => ({
		// ✅ Authentication
		manSignup: build.mutation({
			query: (data) => ({
				url: MAN_SIGNUP,
				method: "POST",
				body: data,
			}),
		}),
		manLogin: build.mutation({
			query: (data) => ({
				url: MAN_LOGIN,
				method: "POST",
				body: data,
			}),
		}),
		verifyOtp: build.mutation({
			query: (data) => ({
				url: MAN_LOGIN_OTP_VARIFY,
				method: "POST",
				body: data,
			}),
		}),
		sendOtp: build.mutation({
			query: (data) => ({
				url: MAN_LOGIN_OTP_SAND,
				method: "POST",
				body: data,
			}),
		}),
		resetPassword: build.mutation({
			query: (data) => ({
				url: MAN_LOGIN_CHANGEPASSWORD_RESET,
				method: "POST",
				body: data,
			}),
		}),
		verifySelfie: build.mutation({
			query: (formData) => ({
				url: MAN_SELFIE,
				method: "POST",
				body: formData,
			}),
		}),

		// ✅ Packages
		getMenPackages: build.query({
			query: () => ({
				url: GET_MANPACKAGES,
				method: "GET",
			}),
		}),
		purchasePackage: build.mutation({
			query: (formData) => ({
				url: PURCHASE_PACKAGES,
				method: "POST",
				body: formData,
				headers: {}, // Let browser set multipart/form-data automatically
			}),
		}),
		upgradePackage: build.mutation({
			query: (data) => ({
				url: MAN_UPGRADE_PACKAGES,
				method: "POST",
				body: data,
			}),
		}),

		// ✅ Profile
		editProfile: build.mutation({
			query: (data) => ({
				url: EDIT_PROFILE_MAN,
				method: "POST",
				body: data,
			}),
		}),
		updateProfileImage: build.mutation({
			query: (formData) => ({
				url: MAN_UPDATE_IMAGE,
				method: "POST",
				body: formData,
			}),
		}),
		updateCoverImage: build.mutation({
			query: (formData) => ({
				url: MAN_UPDATE_COVER_IMAGE,
				method: "POST",
				body: formData,
			}),
		}),
		deleteImage: build.mutation({
			query: (id) => ({
				url: `${MAN_DELETE_IMAGES}/${id}`,
				method: "DELETE",
			}),
		}),
		deleteVideo: build.mutation({
			query: (id) => ({
				url: `${MAN_DELETE_VIDEO}/${id}`,
				method: "DELETE",
			}),
		}),

		// ✅ Social Interactions
		likeWoman: build.mutation({
			query: (data) => ({
				url: MAN_LIKE_WOMEN,
				method: "POST",
				body: data,
			}),
		}),
		sendMessage: build.mutation({
			query: (data) => ({
				url: MAN_SEND_MASSAGE,
				method: "POST",
				body: data,
			}),
		}),

		offerDate: build.mutation({
			query: (data) => ({
				url: OFFER_DATE,
				method: "POST",
				body: data,
			}),
		}),
		reOfferDate: build.mutation({
			query: (data) => ({
				url: REOFFER_DATE,
				method: "POST",
				body: data,
			}),
		}),
		withdrawDate: build.mutation({
			query: (data) => ({
				url: MAN_WITHDREW_DATE,
				method: "POST",
				body: data,
			}),
		}),
		// ✅ New GET APIs
		getMatchedProfiles: build.query({
			query: (page) => ({
				url: `${MAN_MATCHED_PRIFILE}?page=${page}`,
				method: "GET",
			}),
		}),
		getSponsoredDates: build.query({
			query: (page) => ({
				url: `${MAN_SPONSORED_DATES}?page=${page}`,
				method: "GET",
			}),
		}),
		getFemaleMembership: build.query({
			query: (page) => ({
				url: `${MAN_FEMALE_MEMBERSHIP}?page=${page}`,
				method: "GET",
			}),
		}),
		getManData: build.query({
			query: () => ({
				url: MAN_DATA,
				method: "GET",
			}),
		}),
		deleteImageMan: build.mutation({
			query: (formData) => ({
				url: DELETE_IMAGE_MAN,
				method: "POST",
				body: formData, // ✅ works with FormData (Stripe token + package_id)
			}),
		}),
		deleteVideoMan: build.mutation({
			query: (formData) => ({
				url: DELETE_VIDEO_MAN,
				method: "POST",
				body: formData, // ✅ works with FormData (Stripe token + package_id)
			}),
		}),
	}),
});

export const {
	useManSignupMutation,
	useManLoginMutation,
	useVerifyOtpMutation,
	useSendOtpMutation,
	useResetPasswordMutation,
	useVerifySelfieMutation,
	useGetMenPackagesQuery,
	usePurchasePackageMutation,
	useUpgradePackageMutation,
	useEditProfileMutation,
	useUpdateProfileImageMutation,
	useUpdateCoverImageMutation,
	useDeleteImageMutation,
	useDeleteVideoMutation,
	useLikeWomanMutation,
	useSendMessageMutation,
	useOfferDateMutation,
	useWithdrawDateMutation,
	useGetSponsoredDatesQuery,
	useGetFemaleMembershipQuery,
	useGetManDataQuery,
	useGetMatchedProfilesQuery,
	useDeleteImageManMutation,
	useDeleteVideoManMutation,
	useReOfferDateMutation
} = ManAuth;

export default ManAuth;

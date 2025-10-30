import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../../utils/base_url";
import {
	CHANGE_COVER_IMAGE,
	CHANGE_PROFILE_IMAGE,
	CHECK_ATUH_API,
	HELPANDSUPPORT,
	LOGIN_CHANGEPASSWORD,
	LOGIN_CHANGEPASSWORDMAN,
	LOGIN_FORGETPASSWORD,
	LOGIN_MAN,
	LOGIN_OTP,
	LOGIN_URL,
	NOTIFICATIONS_API,
	PRIVACYPOLICY,
	TERMCONDITION,
} from "../../utils/endpoints";

// ✅ Create API instance
const AuthServices = createApi({
	reducerPath: "AuthServices",
	baseQuery: fetchBaseQuery({
		baseUrl: BASE_URL,
		prepareHeaders: (headers, { getState }) => {
			const token = localStorage.getItem("token");
			headers.set("Accept", "application/json");

			if (token) {
				headers.set("Authorization", `Bearer ${token}`);
			}
			return headers;
		},
	}),
	tagTypes: ["editInfo", "quiz"],
	endpoints: (build) => ({
		// 🔹 Register
		authRegister: build.mutation({
			query: (data) => ({
				url: LOGIN_MAN,
				method: "POST",
				body: data,
			}),
		}),

		// 🔹 Login
		loginRegister: build.mutation({
			query: (data) => ({
				url: LOGIN_URL,
				method: "POST",
				body: data,
			}),
		}),

		// 🔹 Forget Password
		forgetRegister: build.mutation({
			query: (data) => ({
				url: LOGIN_FORGETPASSWORD,
				method: "POST",
				body: data,
			}),
		}),

		// 🔹 OTP
		otpRegister: build.mutation({
			query: (data) => ({
				url: LOGIN_OTP,
				method: "POST",
				body: data,
			}),
		}),

		// 🔹 Change Password (woman)
		changepasswordRegister: build.mutation({
			query: (data) => ({
				url: LOGIN_CHANGEPASSWORD,
				method: "POST",
				body: data,
			}),
		}),

		// 🔹 Change Password (man)
		manchangepasswordRegister: build.mutation({
			query: (data) => ({
				url: LOGIN_CHANGEPASSWORDMAN,
				method: "POST",
				body: data,
			}),
		}),

		// 🔹 Update Profile Image
		manupUatepPofileImage: build.mutation({
			query: (data) => ({
				url: CHANGE_PROFILE_IMAGE,
				method: "POST",
				body: data,
			}),
		}),

		// 🔹 Update Cover Image
		updateManCoverImage: build.mutation({
			query: (data) => ({
				url: CHANGE_COVER_IMAGE,
				method: "POST",
				body: data,
			}),
		}),

		// 🔹 Help & Support
		helpAndSupport: build.query({
			query: () => ({
				url: HELPANDSUPPORT,
				method: "GET",
			}),
		}),
		// 🔹 Terms & Condition
		termsAndCondition: build.query({
			query: () => ({
				url: TERMCONDITION,
				method: "GET",
			}),
		}),

		// 🔹 Privacy Policy
		privacyPolicy: build.query({
			query: () => ({
				url: PRIVACYPOLICY,
				method: "GET",
			}),
		}),

		authNotifications: build.query({
			query: (data) => ({
				url: NOTIFICATIONS_API(data),
				method: "GET",
			}),
		}),
		checkAuth: build.query({
			query: () => ({
				url: CHECK_ATUH_API,
				method: "GET",
			}),
		}),
	}),
});

export default AuthServices;

export const {
	useTermsAndConditionQuery,
	usePrivacyPolicyQuery,
	useAuthRegisterMutation,
	useLoginRegisterMutation,
	useForgetRegisterMutation,
	useOtpRegisterMutation,
	useChangepasswordRegisterMutation,
	useManchangepasswordRegisterMutation,
	useManupUatepPofileImageMutation,
	useUpdateManCoverImageMutation,
	useHelpAndSupportQuery,
	useAuthNotificationsQuery,
	useCheckAuthQuery,
} = AuthServices;

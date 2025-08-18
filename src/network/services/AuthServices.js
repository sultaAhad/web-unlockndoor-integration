import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../../utils/base_url";
import {
	LOGIN_CHANGEPASSWORD,
	LOGIN_CHANGEPASSWORDMAN,
	LOGIN_FORGETPASSWORD,
	LOGIN_MAN,
	LOGIN_OTP,
	LOGIN_URL,
} from "../../utils/endpoints";

// Create API instance
const AuthServices = createApi({
	reducerPath: "AuthServices",
	baseQuery: fetchBaseQuery({
		baseUrl: BASE_URL,
		prepareHeaders: (headers, { getState }) => {
			const reducers = getState();
			const token = reducers?.authReducer?.userToken;
			headers.set("Accept", "application/json");

			// ✅ Send Authorization header if token exists
			if (token) {
				headers.set("Authorization", `Bearer ${token}`);
			}
			return headers;
		},
	}),
	tagTypes: ["editInfo", "quiz"],
	endpoints: (build) => ({
		authRegister: build.mutation({
			query: (data) => ({
				url: LOGIN_MAN,
				method: "POST",
				body: data,
			}),
		}),
		loginRegister: build.mutation({
			query: (data) => ({
				url: LOGIN_URL,
				method: "POST",
				body: data,
			}),
		}),
		forgetRegister: build.mutation({
			query: (data) => ({
				url: LOGIN_FORGETPASSWORD,
				method: "POST",
				body: data,
			}),
		}),
		otpRegister: build.mutation({
			query: (data) => ({
				url: LOGIN_OTP,
				method: "POST",
				body: data,
			}),
		}),
		changepasswordRegister: build.mutation({
			query: (data) => ({
				url: LOGIN_CHANGEPASSWORD,
				method: "POST",
				body: data,
			}),
		}),
		manchangepasswordRegister: build.mutation({
			query: (data) => ({
				url: LOGIN_CHANGEPASSWORDMAN,
				method: "POST",
				body: data,
			}),
		}),
	}),
});

export default AuthServices;

export const {
	useAuthRegisterMutation,
	useLoginRegisterMutation,
	useForgetRegisterMutation,
	useOtpRegisterMutation,
	useChangepasswordRegisterMutation,
	useManchangepasswordRegisterMutation, // ✅ Correct casing
} = AuthServices;

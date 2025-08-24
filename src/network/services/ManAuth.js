import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../../utils/base_url";
import { MAN_LOGIN, MAN_SIGNUP } from "../../utils/endpoints";

export const ManAuth = createApi({
	reducerPath: "ManAuth",
	baseQuery: fetchBaseQuery({
		baseUrl: BASE_URL,
		prepareHeaders: (headers, { getState }) => {
			const token = getState()?.authReducer?.userToken;
			headers.set("Accept", "application/json");

			if (token) {
				headers.set("Authorization", `Bearer ${token}`);
			}

			return headers;
		},
	}),
	endpoints: (build) => ({
		manSignup: build.mutation({
			query: (data) => ({
				url: MAN_SIGNUP,
				method: "POST",
				body: data, // FormData or JSON depending on your backend
			}),
		}),
		manLogin: build.mutation({
			query: (credentials) => ({
				url: MAN_LOGIN,
				method: "POST",
				body: credentials, // Usually JSON { email, password }
			}),
		}),
	}),
});

export const { useManSignupMutation, useManLoginMutation } = ManAuth;
export default ManAuth;

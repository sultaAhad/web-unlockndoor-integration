import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../../utils/base_url";
import {
	MAN_LOGIN,
	MAN_SIGNUP,
	MAN_SELFIE,
	PURCHASE_PACKAGES,
	GET_MANPACKAGES,
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
		verifySelfie: build.mutation({
			query: (formData) => ({
				url: MAN_SELFIE,
				method: "POST",
				body: formData,
			}),
		}),
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
				// ❌ No Content-Type, browser will set multipart/form-data automatically
				headers: {},
			}),
		}),
	}),
});

export const {
	useManSignupMutation,
	useManLoginMutation,
	useVerifySelfieMutation,
	useGetMenPackagesQuery,
	usePurchasePackageMutation,
} = ManAuth;

export default ManAuth;

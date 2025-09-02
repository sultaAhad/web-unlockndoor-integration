// services/WomanAuth.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../../utils/base_url";
import {
	DELETE_IMAGE_WOMAN,
	DELETE_VIDEO_WOMAN,
	PURCHASE_PACKAGES_WOMEN,
	WOMEN_LOGIN,
	WOMEN_SIGNUP,
} from "../../utils/endpoints";

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
	}),
});

export const {
	useWomenSignupMutation,
	useWomenLoginMutation,
	usePurchasePackageWomenMutation,
	useDeleteImageWomanMutation,
	useDeleteVideoWomanMutation,
} = WomenAuth;

export default WomenAuth;

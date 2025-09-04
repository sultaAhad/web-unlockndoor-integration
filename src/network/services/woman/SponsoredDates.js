// services/WomanAuth.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { WOMAN_SPONSORED_DATES } from "../../../utils/endpoints";
import { BASE_URL } from "../../../utils/base_url";

export const SponsoredDates = createApi({
	reducerPath: "SponsoredDates",
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
		// womenSignup: build.mutation({
		// 	query: (data) => ({
		// 		url: WOMEN_SIGNUP,
		// 		method: "POST",
		// 		body: data,
		// 	}),
		// }),
		getWomanSponsoredDates: build.query({
			query: (page) => ({
				url: `${WOMAN_SPONSORED_DATES}?page=${page}`,
				method: "GET",
			}),
		}),

	}),
});

export const {
	useGetWomanSponsoredDatesQuery,
} = SponsoredDates;

export default SponsoredDates;

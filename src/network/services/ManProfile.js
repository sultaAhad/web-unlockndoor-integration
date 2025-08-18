import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../../utils/base_url";
import { UPDATE_PROFILE } from "../../utils/endpoints";

export const ManProfile = createApi({
	reducerPath: "ManProfile",
	baseQuery: fetchBaseQuery({
		baseUrl: BASE_URL,
		prepareHeaders: (headers, { getState }) => {
			const reducers = getState();
			const token = reducers?.authReducer?.userToken;

			headers.set("Accept", "application/json");

			if (token) {
				// Attach token to Authorization header
				headers.set("Authorization", `Bearer ${token}`);
			}

			return headers;
		},
	}),
	endpoints: (build) => ({
		manUpdateProfile: build.mutation({
			query: (data) => ({
				url: UPDATE_PROFILE,
				method: "POST",
				body: data, // This sends the FormData, including files.
			}),
		}),
	}),
});

export const { useManUpdateProfileMutation } = ManProfile;
export default ManProfile;

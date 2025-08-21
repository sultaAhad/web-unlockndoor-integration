import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../../utils/base_url";
import { CONTECT_US, CONTENT, FAQS, SETTING, TESTEMONIAL } from "../../utils/endpoints";

const HelpServices = createApi({
	reducerPath: "HelpServices",
	baseQuery: fetchBaseQuery({
		baseUrl: BASE_URL,
		prepareHeaders: (headers, { getState }) => {
			const reducers = getState();
			const token = reducers?.authReducer?.userToken;
			headers.set("Accept", "application/json");
			if (token) {
				headers.set("authorization", `Bearer ${token}`);
			}
			return headers;
		},
	}),
	tagTypes: ["editInfo", "quiz"],
	endpoints: (build) => ({
		homeContent: build.query({
			query: () => ({
				url: CONTENT,
				method: "GET",
			}),
		}),
		faqsContent: build.query({
			query: () => ({
				url: FAQS,
				method: "GET",
			}),
		}),
		testemonialContent: build.query({
			query: () => ({
				url: TESTEMONIAL,
				method: "GET",
			}),
		}),
		settingContent: build.query({
			query: () => ({
				url: SETTING,
				method: "GET",
			}),
		}),
		// ✅ New POST API for Contact Us
		sendContactQuery: build.mutation({
			query: (data) => ({
				url: CONTECT_US,
				method: "POST",
				body: data,
			}),
		}),
	}),
});

export default HelpServices;
export const {
	useHomeContentQuery,
	useFaqsContentQuery,
	useTestemonialContentQuery,
	useSettingContentQuery,
	useSendContactQueryMutation,
} = HelpServices;

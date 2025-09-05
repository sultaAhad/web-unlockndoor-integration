// services/WomanAuth.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { CHATS_API, SEND_CHAT_MESSAGE_API } from "../../utils/endpoints";
import { BASE_URL } from "../../utils/base_url";

export const Chat = createApi({
	reducerPath: "Chat",
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
		getChats: build.query({
			query: (type) => ({
				url: CHATS_API(type),
				method: "GET",
			}),
		}),
		sendMessage: build.mutation({
			query: (data) => ({
				url: SEND_CHAT_MESSAGE_API(data?.type),
				method: "POST",
				body: data,
			}),
		}),
	}),
});

export const {
	useGetChatsQuery,
	useSendMessageMutation
} = Chat;

export default Chat;

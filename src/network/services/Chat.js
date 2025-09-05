// services/WomanAuth.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { CHATS_API, GET_CHAT_MESSAGES_API, SEND_CHAT_MESSAGE_API } from "../../utils/endpoints";
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
		getChatMessages: build.query({
			query: ({ type, chat_id }) => ({
				url: GET_CHAT_MESSAGES_API(type, chat_id),
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
	useGetChatMessagesQuery,
	useSendMessageMutation
} = Chat;

export default Chat;

import Pusher from "pusher-js";

const PUSHER_KEY = import.meta.env.VITE_APP_PUSHER_APP_KEY;
const PUSHER_CLUSTER = import.meta.env.VITE_APP_PUSHER_APP_CLUSTER;

export const createPusherClient = (options = {}) => {
	if (!PUSHER_KEY || !PUSHER_CLUSTER) {
		throw new Error("Missing Pusher environment configuration.");
	}

	return new Pusher(PUSHER_KEY, {
		cluster: PUSHER_CLUSTER,
		...options,
	});
};

export const cleanupPusherClient = (client, channels = []) => {
	channels.filter(Boolean).forEach((channel) => {
		channel.unbind_all?.();
		if (channel.name) {
			client.unsubscribe(channel.name);
		}
	});

	client.disconnect?.();
};

export const getUnreadCountChannelName = (user) =>
	`${user?.gender}_unread_count_${user?.id}`;

export const getNotificationChannelName = (user) =>
	user?.gender === "women"
		? `women-notifications-${user?.id}`
		: `men-notifications-${user?.id}`;

export const getUserChannelName = (userId) => `channel_${userId}`;

export const getRejectCallChannelName = (userId) => `reject_call_${userId}`;

export const getChatChannelName = (chatId) => `chat.${chatId}`;

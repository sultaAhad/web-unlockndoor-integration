import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import {
	cleanupPusherClient,
	createPusherClient,
	getNotificationChannelName,
} from "../utils/pusher";

const PusherNavigationBar = ({ onNotificationUpdate }) => {
	const { user } = useSelector((state) => state.auth);
	const pusherRef = useRef(null);
	const channelRef = useRef(null);

	useEffect(() => {
		if (!user?.id) return;

		if (pusherRef.current) {
			console.log("🧹 Old Pusher connection closed");
			try {
				pusherRef.current.disconnect();
			} catch {}
		}

		console.log("🚀 Initializing fresh Pusher for:", user.id, user.gender);
		pusherRef.current = createPusherClient();

		const channelName = getNotificationChannelName(user);

		console.log("📡 Subscribing to channel:", channelName);
		channelRef.current = pusherRef.current.subscribe(channelName);

		const handleData = (data) => {
			console.log("📬 Gender Notification:", data);

			const receiverId = data?.reciever_id ?? data?.receiver_id;
			if (Number(receiverId) !== Number(user.id)) return;

			const count = Number(data?.unread_notification_count ?? 0);
			console.log("📦 Sending count to parent:", count);
			onNotificationUpdate?.(count);
		};

		channelRef.current.bind("unread_notifications_count", handleData);
		channelRef.current.bind("new-notification", handleData);

		return () => {
			console.log("🧹 Cleaning up Pusher listener");
			if (pusherRef.current) {
				cleanupPusherClient(pusherRef.current, [channelRef.current]);
			}
		};
	}, [user?.id, user?.gender]);

	return null;
};

export default PusherNavigationBar;

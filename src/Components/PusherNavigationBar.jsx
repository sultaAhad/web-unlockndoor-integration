import React, { useEffect, useRef } from "react";
import Pusher from "pusher-js";
import { useSelector } from "react-redux";

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
		pusherRef.current = new Pusher(import.meta.env.VITE_APP_PUSHER_APP_KEY, {
			cluster: import.meta.env.VITE_APP_PUSHER_APP_CLUSTER,
		});

		const channelName =
			user.gender === "women"
				? `women-notifications-${user.id}`
				: `men-notifications-${user.id}`;

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
			if (channelRef.current) channelRef.current.unbind_all();
			if (pusherRef.current) pusherRef.current.disconnect();
		};
	}, [user?.id, user?.gender]);

	return null;
};

export default PusherNavigationBar;

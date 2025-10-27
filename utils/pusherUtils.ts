// utils/pusherUtils.ts
import Pusher from "pusher-js";

export const createPusherInstance = () => {
  return new Pusher(import.meta.env.VITE_APP_PUSHER_APP_KEY, {
    cluster: import.meta.env.VITE_APP_PUSHER_APP_CLUSTER,
    forceTLS: true,
  });
};

export const getGenderChannelName = (userId: string, gender: string) => {
  return gender === "women"
    ? `women-unread_count-${userId}`
    : `men-unread_count-${userId}`;
};

export const updateLocalStorageCounts = (data: any) => {
  localStorage.setItem(
    "unread_messages_count",
    data?.unread_messages_count ?? 0
  );
  localStorage.setItem(
    "unread_notification_count",
    data?.unread_notification_count ?? 0
  );
};

export const updateCountsState = (
  data: any,
  setCounts: React.Dispatch<React.SetStateAction<any>>
) => {
  setCounts((prev: any) => ({
    ...prev,
    notification:
      data.unread_notification_count !== undefined
        ? data.unread_notification_count
        : prev.notification,
    message:
      data.unread_messages_count !== undefined
        ? data.unread_messages_count
        : prev.message,
  }));
};

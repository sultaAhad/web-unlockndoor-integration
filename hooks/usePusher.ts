// hooks/usePusher.ts
import { useEffect, useRef } from "react";
import Pusher from "pusher-js";

interface PusherCounts {
  notification: number;
  message: number;
}

interface PusherData {
  unread_messages_count?: number;
  unread_notification_count?: number;
}

export const usePusher = (userId: string, gender: string) => {
  const pusherRef = useRef<Pusher | null>(null);
  const channelRef = useRef<any>(null);

  const initializePusher = () => {
    if (window.__PROFILE_PUSHER_CONNECTED__) {
      console.log("⚠️ Pusher already connected, skipping...");
      return null;
    }

    window.__PROFILE_PUSHER_CONNECTED__ = true;

    const pusher = new Pusher(import.meta.env.VITE_APP_PUSHER_APP_KEY, {
      cluster: import.meta.env.VITE_APP_PUSHER_APP_CLUSTER,
      forceTLS: true,
    });

    pusherRef.current = pusher;
    return pusher;
  };

  const subscribeToChannel = (
    pusher: Pusher,
    onData: (data: PusherData) => void
  ) => {
    const genderChannelName =
      gender === "women"
        ? `women-unread_count-${userId}`
        : `men-unread_count-${userId}`;

    const channel = pusher.subscribe(genderChannelName);
    channelRef.current = channel;

    channel.bind(genderChannelName, onData);
    return channel;
  };

  const cleanupPusher = () => {
    try {
      console.log("🧹 Cleaning up Pusher connection...");
      if (channelRef.current) {
        channelRef.current.unsubscribe();
      }
      if (pusherRef.current) {
        pusherRef.current.disconnect();
      }
      window.__PROFILE_PUSHER_CONNECTED__ = false;
    } catch (err) {
      console.warn("⚠️ Cleanup failed:", err);
    }
  };

  return {
    initializePusher,
    subscribeToChannel,
    cleanupPusher,
    pusherRef,
    channelRef,
  };
};

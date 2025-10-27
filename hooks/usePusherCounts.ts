// hooks/usePusherCounts.ts
import { useEffect, useState } from "react";
import { usePusher } from "./usePusher";

interface Counts {
  notification: number;
  message: number;
}

export const usePusherCounts = (
  user: { id: string; gender: string } | null
) => {
  const [counts, setCounts] = useState<Counts>({
    notification: 0,
    message: 0,
  });

  const { initializePusher, subscribeToChannel, cleanupPusher } = usePusher(
    user?.id || "",
    user?.gender || ""
  );

  useEffect(() => {
    if (!user?.id) return;

    const pusher = initializePusher();
    if (!pusher) return;

    const handleCountData = (data: any) => {
      console.log("count_data", data);

      localStorage.setItem(
        "unread_messages_count",
        data?.unread_messages_count ?? 0
      );
      localStorage.setItem(
        "unread_notification_count",
        data?.unread_notification_count ?? 0
      );

      setCounts((prev) => ({
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

    subscribeToChannel(pusher, handleCountData);

    return cleanupPusher;
  }, [user?.id, user?.gender]);

  return counts;
};

import socket from "@/lib/socket";
import { useQueryClient } from "@tanstack/react-query";
import type {
  INotification,
  NotificationsResponse,
} from "../types/notification";
import { QUERY_KEYS } from "@/constants/queryKeys";

export const registerNotificationListeners = (
  incrementUnread: () => void,
  queryClient: ReturnType<typeof useQueryClient>,
) => {
  socket.on("notification:new", (payload: INotification) => {
    incrementUnread();
    queryClient.setQueryData(
      QUERY_KEYS.notifications.list({ limit: 5 }),
      (old: NotificationsResponse) => {
        if (!old) return old;
        return {
          ...old,
          data: {
            ...old.data,
            notifications: [payload, ...old.data.notifications.slice(0, 4)],
          },
        };
      },
    );
  });
};

export const removeNotificationListeners = () => {
  socket.off("notification:new");
};

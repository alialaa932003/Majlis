import { useEffect } from "react";
import { useQueryClient, type InfiniteData } from "@tanstack/react-query";
import { useNotificationStore } from "@/store/notificationStore";
import socket from "@/lib/socket";
import { QUERY_KEYS } from "@/constants/queryKeys";
import type {
  INotification,
  NotificationsResponse,
} from "../types/notification";

export const useNotificationSocket = (isSocketConnected: boolean) => {
  const queryClient = useQueryClient();
  const incrementUnread = useNotificationStore(
    (state) => state.incrementUnread,
  );

  useEffect(() => {
    if (!isSocketConnected) return;

    const handleNewNotification = (payload: INotification) => {
      incrementUnread();

      queryClient.setQueriesData(
        { queryKey: QUERY_KEYS.notifications.list() },
        (old: InfiniteData<NotificationsResponse> | undefined) => {
          if (!old || !old.pages || old.pages.length === 0) return old;

          // Create a deep copy of the first page to avoid mutating the cache directly
          const firstPage = { ...old.pages[0] };
          firstPage.data = {
            ...firstPage.data,
            notifications: [payload, ...firstPage.data.notifications],
          };

          return {
            ...old,
            pages: [firstPage, ...old.pages.slice(1)],
          };
        },
      );
    };

    socket.on("notification:new", handleNewNotification);

    return () => {
      socket.off("notification:new", handleNewNotification);
    };
  }, [isSocketConnected, queryClient, incrementUnread]);
};

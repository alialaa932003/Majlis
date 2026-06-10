import { useEffect } from "react";
import { useQueryClient, type InfiniteData } from "@tanstack/react-query";
import { useNotificationStore } from "@/store/notificationStore";
import socket from "@/lib/socket";
import { QUERY_KEYS } from "@/constants/queryKeys";
import type { INotification, NotificationsResponse } from "../types/notification";

export const useNotificationSocket = (isSocketConnected: boolean) => {
  const queryClient = useQueryClient();
  const incrementUnread = useNotificationStore(
    (state) => state.incrementUnread,
  );

  useEffect(() => {
    if (!isSocketConnected) return;

    const handleNewNotification = (payload: INotification) => {
      if (!payload.isRead) {
        incrementUnread();
      }

      queryClient.setQueriesData(
        { queryKey: QUERY_KEYS.notifications.list() },
        (old: InfiniteData<NotificationsResponse> | NotificationsResponse | undefined) => {
          if (!old) return old;

          // Handle InfiniteData (used by useInfiniteNotifications)
          if ("pages" in old && Array.isArray(old.pages)) {
            if (old.pages.length === 0) return old;
            const firstPage = { ...old.pages[0] };
            if (firstPage.data && Array.isArray(firstPage.data.notifications)) {
              firstPage.data = {
                ...firstPage.data,
                notifications: [payload, ...firstPage.data.notifications],
              };
              return {
                ...old,
                pages: [firstPage, ...old.pages.slice(1)],
              };
            }
          }

          // Handle standard Query data (used by useNotifications)
          if ("data" in old && old.data && Array.isArray(old.data.notifications)) {
            return {
              ...old,
              data: {
                ...old.data,
                // Limit to 10 or keep array length reasonable for dropdowns
                notifications: [payload, ...old.data.notifications].slice(0, 10),
              },
            };
          }

          return old;
        },
      );
    };

    socket.on("notification:new", handleNewNotification);

    return () => {
      socket.off("notification:new", handleNewNotification);
    };
  }, [isSocketConnected, queryClient, incrementUnread]);
};

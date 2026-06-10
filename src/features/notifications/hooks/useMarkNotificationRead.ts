import { QUERY_KEYS } from "@/constants/queryKeys";
import { useNotificationStore } from "@/store/notificationStore";
import { useMutation, useQueryClient, type InfiniteData } from "@tanstack/react-query";
import { markNotificationRead } from "../services/markNotificationRead";
import type { INotification, NotificationsResponse } from "../types/notification";

export const useMarkNotificationRead = () => {
  const queryClient = useQueryClient();
  const decrementUnread = useNotificationStore(
    (state) => state.decrementUnread,
  );
  const incrementUnread = useNotificationStore(
    (state) => state.incrementUnread,
  );

  return useMutation({
    mutationFn: markNotificationRead,
    onMutate: async (notificationId) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({ queryKey: QUERY_KEYS.notifications.list() });

      // Snapshot the previous value
      const previousQueries = queryClient.getQueriesData({ queryKey: QUERY_KEYS.notifications.list() });

      // Optimistically update to the new value
      queryClient.setQueriesData(
        { queryKey: QUERY_KEYS.notifications.list() },
        (old: InfiniteData<NotificationsResponse> | NotificationsResponse | undefined) => {
        if (!old) return old;

        // Handle InfiniteData
        if ("pages" in old && Array.isArray(old.pages)) {
          return {
            ...old,
            pages: old.pages.map((page: any) => {
              if (page.data && Array.isArray(page.data.notifications)) {
                return {
                  ...page,
                  data: {
                    ...page.data,
                    notifications: page.data.notifications.map((notif: INotification) =>
                      notif._id === notificationId ? { ...notif, isRead: true } : notif
                    ),
                  },
                };
              }
              return page;
            }),
          };
        }

        // Handle standard Query data
        if ("data" in old && old.data && Array.isArray(old.data.notifications)) {
          return {
            ...old,
            data: {
              ...old.data,
              notifications: old.data.notifications.map((notif: INotification) =>
                notif._id === notificationId ? { ...notif, isRead: true } : notif
              ),
            },
          };
        }

        return old;
      });

      // Optimistically decrement the badge
      decrementUnread();

      // Return a context object with the snapshotted value
      return { previousQueries };
    },
    onError: (_err, _notificationId, context) => {
      // Rollback cache
      if (context?.previousQueries) {
        context.previousQueries.forEach(([queryKey, data]) => {
          queryClient.setQueryData(queryKey, data as any);
        });
      }
      // Rollback badge
      incrementUnread();
    },
    onSettled: () => {
      // Always refetch after error or success to ensure sync
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.notifications.list(),
      });
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.notifications.unreadCount(),
      });
    },
  });
};

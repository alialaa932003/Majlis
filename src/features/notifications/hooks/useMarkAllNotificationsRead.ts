
import { QUERY_KEYS } from "@/constants/queryKeys";
import { useNotificationStore } from "@/store/notificationStore";
import { useMutation, useQueryClient, type InfiniteData } from "@tanstack/react-query";
import { toast } from "sonner";
import { markAllNotificationsRead } from "../services/markAllNotificationsRead";
import type { INotification, NotificationsResponse } from "../types/notification";

export const useMarkAllNotificationsRead = () => {
  const queryClient = useQueryClient();
  const resetUnreadCount = useNotificationStore(
    (state) => state.resetUnreadCount,
  );
  const unreadCount = useNotificationStore((state) => state.unreadCount);
  const setUnreadCount = useNotificationStore((state) => state.setUnreadCount);

  return useMutation({
    mutationFn: markAllNotificationsRead,
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: QUERY_KEYS.notifications.list() });

      const previousQueries = queryClient.getQueriesData({ queryKey: QUERY_KEYS.notifications.list() });
      const previousUnreadCount = unreadCount;

      queryClient.setQueriesData(
        { queryKey: QUERY_KEYS.notifications.list() },
        (old: InfiniteData<NotificationsResponse> | NotificationsResponse | undefined) => {
        if (!old) return old;

        if ("pages" in old && Array.isArray(old.pages)) {
          return {
            ...old,
            pages: old.pages.map((page: any) => {
              if (page.data && Array.isArray(page.data.notifications)) {
                return {
                  ...page,
                  data: {
                    ...page.data,
                    notifications: page.data.notifications.map((notif: INotification) => ({ ...notif, isRead: true })),
                  },
                };
              }
              return page;
            }),
          };
        }

        if ("data" in old && old.data && Array.isArray(old.data.notifications)) {
          return {
            ...old,
            data: {
              ...old.data,
              notifications: old.data.notifications.map((notif: INotification) => ({ ...notif, isRead: true })),
            },
          };
        }

        return old;
      });

      resetUnreadCount();

      return { previousQueries, previousUnreadCount };
    },
    onSuccess: () => {
      toast.success("All notifications marked as read");
    },
    onError: (error: Error, _variables, context) => {
      if (context?.previousQueries) {
        context.previousQueries.forEach(([queryKey, data]) => {
          queryClient.setQueryData(queryKey, data as any);
        });
      }
      if (context?.previousUnreadCount !== undefined) {
        setUnreadCount(context.previousUnreadCount);
      }
      toast.error(error.message);
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.notifications.list(),
      });
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.notifications.unreadCount(),
      });
    },
  });
};

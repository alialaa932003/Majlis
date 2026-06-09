import { QUERY_KEYS } from "@/constants/queryKeys";
import { useNotificationStore } from "@/store/notificationStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { markNotificationRead } from "../services/markNotificationRead";

export const useMarkNotificationRead = () => {
  const queryClient = useQueryClient();
  const decrementUnread = useNotificationStore(
    (state) => state.decrementUnread,
  );

  return useMutation({
    mutationFn: markNotificationRead,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.notifications.list(),
      });
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.notifications.unreadCount(),
      });
      decrementUnread();
    },
  });
};

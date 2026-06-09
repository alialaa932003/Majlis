
import { QUERY_KEYS } from "@/constants/queryKeys";
import { useNotificationStore } from "@/store/notificationStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { markAllNotificationsRead } from "../services/markAllNotificationsRead";

export const useMarkAllNotificationsRead = () => {
  const queryClient = useQueryClient();
  const resetUnreadCount = useNotificationStore(
    (state) => state.resetUnreadCount,
  );

  return useMutation({
    mutationFn: markAllNotificationsRead,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.notifications.list(),
      });
      resetUnreadCount();
      toast.success("All notifications marked as read");
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
};

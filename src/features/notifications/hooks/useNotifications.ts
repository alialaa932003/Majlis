import { useQuery } from "@tanstack/react-query";
import { getNotifications } from "../services/getNotifications";
import { QUERY_KEYS } from "@/constants/queryKeys";
import type { NotificationsRequestParams } from "../types/notification";

export const useNotifications = (params?: NotificationsRequestParams) => {
  return useQuery({
    queryKey: QUERY_KEYS.notifications.list(params),
    queryFn: () => getNotifications(params),
    staleTime: Infinity,
  });
};

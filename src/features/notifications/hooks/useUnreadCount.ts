import { useQuery } from "@tanstack/react-query";
import { getUnreadCount } from "../services/getUnreadCount";
import { QUERY_KEYS } from "@/constants/queryKeys";

export const useUnreadCount = (isAuthenticated: boolean) => {
  return useQuery({
    queryKey: QUERY_KEYS.notifications.unreadCount(),
    queryFn: getUnreadCount,
    enabled: isAuthenticated,
    staleTime: Infinity,
  });
};
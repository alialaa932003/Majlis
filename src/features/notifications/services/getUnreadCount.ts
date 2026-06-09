import { customFetch } from "@/services/customFetch";
import type { UnreadCountResponse } from "../types/notification";

export const getUnreadCount = () => {
  return customFetch<UnreadCountResponse>("/notifications/unread-count");
};

import { customFetch } from "@/services/customFetch"

export const markAllNotificationsRead = async () => {
  return customFetch("/api/notifications/read-all", {
    method: "PATCH",
  });
};
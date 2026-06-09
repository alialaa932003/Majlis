import { customFetch } from "@/services/customFetch"

export const markAllNotificationsRead = async () => {
  return customFetch("/notifications/read-all", {
    method: "PATCH",
  });
};
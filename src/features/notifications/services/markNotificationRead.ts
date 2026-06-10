import { customFetch } from "@/services/customFetch";

export const markNotificationRead = async (id: string) => {
  return customFetch(`/api/notifications/${id}/read`, {
    method: "PATCH",
  });
};

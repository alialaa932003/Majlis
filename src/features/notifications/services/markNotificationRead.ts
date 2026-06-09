import { customFetch } from "@/services/customFetch";

export const markNotificationRead = async (id: string) => {
  return customFetch(`/notifications/${id}/read`, {
    method: "PATCH",
  });
};

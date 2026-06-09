import { t } from "i18next";
import type { INotification } from "../types/notification";

export const getNotificationText = (notification: INotification): string => {
  const username = notification.sender?.username || "";

  switch (notification.type) {
    case "like":
      return t("notifications:actionText.like", { username });
    case "comment":
      return t("notifications:actionText.comment", { username });
    case "friend_request":
      return t("notifications:actionText.friend_request", { username });
    case "friend_accept":
      return t("notifications:actionText.friend_accept", { username: "Alil" });
    default:
      return t("notifications:actionText.default");
  }
};

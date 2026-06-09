import type { INotification } from "../types/notification";

/**
 * Returns the navigation path for a given notification based on its type and resources.
 * 
 * @param notification The notification object
 * @returns The destination URL path string
 */
export const getNotificationPath = (notification: INotification): string => {
  if (notification.post?._id) {
    return `/posts/${notification.post._id}`;
  }

  if (
    notification.type === "friend_request" ||
    notification.type === "friend_accept"
  ) {
    return `/profile/${notification.sender?._id}`;
  }

  return "/notifications";
};

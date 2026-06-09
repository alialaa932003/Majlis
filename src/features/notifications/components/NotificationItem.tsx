import { UserAvatar } from "@/components/shared/UserAvatar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { formatDistanceToNow } from "@/utils/formatDistanceToNow";
import { Bell } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useMarkNotificationRead } from "../hooks/useMarkNotificationRead";
import type { INotification } from "../types/notification";
import { getNotificationPath } from "../utils/getNotificationPath";
import { getNotificationText } from "../utils/getNotificationText";

interface NotificationItemProps {
  notification: INotification;
  onClick?: () => void;
}

const NotificationItem = ({ notification, onClick }: NotificationItemProps) => {
  const { t } = useTranslation("notifications");
  const { mutate: markAsRead } = useMarkNotificationRead();

  const handleItemClick = () => {
    if (!notification.isRead) {
      markAsRead(notification._id);
    }
    onClick?.();
  };

  const handleAcceptFriendRequest = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation(); // Prevents marking the notification as read or navigating to profile
    // TODO: Wire up accept friend request endpoint/mutation when friends feature is ready
    console.log("Accepted friend request from:", notification.sender?._id);
  };

  const handleRejectFriendRequest = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation(); // Prevents marking the notification as read or navigating to profile
    // TODO: Wire up reject friend request endpoint/mutation when friends feature is ready
    console.log("Rejected friend request from:", notification.sender?._id);
  };

  return (
    <Link
      to={getNotificationPath(notification)}
      onClick={handleItemClick}
      className={cn(
        "flex cursor-pointer items-start gap-3 rounded-lg border px-4 py-3 text-start transition-all select-none focus:outline-none",
        "border-neutral-100 bg-white hover:bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-900 dark:hover:bg-neutral-800/50",
        notification.isRead
          ? "border-s-transparent"
          : "border-s-2 border-s-emerald-500 bg-emerald-50/30 dark:bg-emerald-950/20",
      )}
    >
      {notification.sender ? (
        <UserAvatar
          src={notification.sender.avatar}
          username={notification.sender.username}
          size="sm"
        />
      ) : (
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-neutral-100 text-neutral-500 dark:bg-neutral-800 dark:text-neutral-400">
          <Bell className="size-4" />
        </div>
      )}

      <div className="flex min-w-0 flex-1 flex-col text-sm">
        <span className="leading-snug font-medium wrap-break-word text-neutral-900 dark:text-neutral-100">
          {notification.sender ? (
            <>
              <span className="font-normal text-neutral-500 dark:text-neutral-400">
                {t(`actionText.${notification.type}`, {
                  username: notification.sender.username,
                })}
              </span>
            </>
          ) : (
            <span className="font-normal text-neutral-900 dark:text-neutral-100">
              {getNotificationText(notification)}
            </span>
          )}
        </span>
        <span className="mt-1 text-xs text-neutral-400 dark:text-neutral-500">
          {formatDistanceToNow(notification.createdAt)}
        </span>

        {notification.type === "comment" &&
          "commentText" in notification &&
          notification.commentText && (
            <p className="mt-1.5 truncate border-s-2 border-neutral-200 ps-2 text-xs text-neutral-500 italic dark:border-neutral-700 dark:text-neutral-400">
              {notification.commentText}
            </p>
          )}

        {notification.type === "like" &&
          notification.post &&
          (notification.post as { content?: string }).content && (
            <p className="mt-1.5 truncate border-s-2 border-neutral-200 ps-2 text-xs text-neutral-500 dark:border-neutral-700 dark:text-neutral-400">
              {(notification.post as { content?: string }).content}
            </p>
          )}

        {notification.type === "friend_request" && (
          <div className="mt-2 flex gap-2">
            <Button
              size="xs"
              className="rounded-full bg-neutral-950 px-3.5 py-1 font-semibold text-white hover:bg-neutral-800 dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-neutral-200"
              onClick={handleAcceptFriendRequest}
            >
              {t("actions.accept")}
            </Button>
            <Button
              size="xs"
              variant="ghost"
              className="rounded-full px-3.5 py-1 font-semibold text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900 dark:text-neutral-400 dark:hover:bg-neutral-800"
              onClick={handleRejectFriendRequest}
            >
              {t("actions.reject")}
            </Button>
          </div>
        )}
      </div>
    </Link>
  );
};

export default NotificationItem;

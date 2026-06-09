import { Button } from "@/components/ui/button";
import { BellOff, RefreshCw } from "lucide-react";
import { useNotifications } from "../hooks/useNotifications";
import NotificationItem from "./NotificationItem";
import { NotificationSkeleton } from "./NotificationSkeleton";
import { useTranslation } from "react-i18next";

export const NotificationList = ({ onItemClick }: { onItemClick?: () => void }) => {
  const { t } = useTranslation("notifications");
  const { data, isLoading, isError, refetch } = useNotifications({ limit: 5 });

  if (isLoading) {
    return (
      <div className="flex flex-col gap-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <NotificationSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-muted-foreground flex flex-col items-center justify-center py-6 text-center text-sm">
        <p className="mb-3">{t("error.title")}</p>
        <Button variant="outline" size="sm" onClick={() => refetch()}>
          <RefreshCw className="me-2 size-4" />
          {t("error.retry")}
        </Button>
      </div>
    );
  }

  if (!data?.data.notifications.length) {
    return (
      <div className="text-muted-foreground flex flex-col items-center justify-center py-8 text-center">
        <BellOff className="mb-3 size-8 opacity-20" />
        <p className="text-sm">{t("empty.title")}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2.5">
      {data.data.notifications.map((notification) => (
        <NotificationItem
          key={notification._id}
          notification={notification}
          onClick={onItemClick}
        />
      ))}
    </div>
  );
};

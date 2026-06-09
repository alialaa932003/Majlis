import { Button } from "@/components/ui/button";
import { useMarkAllNotificationsRead } from "../hooks/useMarkAllNotificationsRead";
import { useNotificationStore } from "@/store/notificationStore";
import { useTranslation } from "react-i18next";
import { customFetch } from "@/services/customFetch";
import { toast } from "sonner";
import { Bug } from "lucide-react";
import { useState } from "react";

export const NotificationHeader = () => {
  const { t } = useTranslation("notifications");
  const unreadCount = useNotificationStore((state) => state.unreadCount);
  const { mutate: markAllRead, isPending: isMarkingRead } =
    useMarkAllNotificationsRead();
  const [isTesting, setIsTesting] = useState(false);

  const handleTestTrigger = async () => {
    try {
      setIsTesting(true);
      await customFetch.post("/notifications/test");
      toast.success("Test notifications triggered successfully!");
    } catch (error) {
      toast.error("Failed to trigger test notifications");
    } finally {
      setIsTesting(false);
    }
  };

  return (
    <div className="mb-6 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <h1 className="text-2xl font-bold">{t("title")}</h1>
        {import.meta.env.DEV && (
          <Button
            variant="outline"
            size="sm"
            onClick={handleTestTrigger}
            disabled={isTesting}
            className="flex items-center gap-2 border-dashed border-amber-500 bg-amber-50 text-amber-700 hover:bg-amber-100 hover:text-amber-800 dark:bg-amber-950/20 dark:text-amber-400"
          >
            <Bug className="size-4" />
            Test Realtime
          </Button>
        )}
      </div>
      
      {unreadCount > 0 && (
        <Button
          variant="ghost"
          onClick={() => markAllRead()}
          disabled={isMarkingRead}
          className="text-sm font-medium text-emerald-600 hover:bg-emerald-50 hover:text-emerald-700 dark:text-emerald-500 dark:hover:bg-emerald-500/10 sm:text-base"
        >
          {isMarkingRead ? t("markingRead") : t("markAllRead")}
        </Button>
      )}
    </div>
  );
};

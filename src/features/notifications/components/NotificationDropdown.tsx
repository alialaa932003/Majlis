import { Button, buttonVariants } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { useNotificationStore } from "@/store/notificationStore";
import { Bell, CheckCheckIcon } from "lucide-react";
import { type FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMarkAllNotificationsRead } from "../hooks/useMarkAllNotificationsRead";
import { NotificationList } from "./NotificationList";
import { useTranslation } from "react-i18next";

const NotificationDropdown: FC = () => {
  const { t } = useTranslation("notifications");
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [open, setOpen] = useState(false);

  const { mutate: markAllNotificationsRead } = useMarkAllNotificationsRead();

  const unreadNotifications = useNotificationStore(
    (state) => state.unreadCount,
  );
  const notificationLabel =
    unreadNotifications > 9 ? "9+" : String(unreadNotifications);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        className={cn(
          buttonVariants({ variant: "ghost", size: "icon" }),
          "relative overflow-visible text-neutral-600",
        )}
        aria-label={`${t("title")} (${unreadNotifications})`}
      >
        <Bell className="size-5" />
        {unreadNotifications > 0 && (
          <span className="ring-background absolute inset-e-0 top-0 flex h-4 min-w-4 translate-x-1 rtl:-translate-x-1 -translate-y-1 items-center justify-center rounded-full bg-red-500 px-1 text-[9px] leading-none font-bold text-white ring-2">
            {notificationLabel}
          </span>
        )}
        <span className="sr-only">{t("title")}</span>
      </PopoverTrigger>
      <PopoverContent align={isMobile ? "center" : "end"}>
        <div className="flex items-center justify-between">
          <PopoverHeader>{t("title")}</PopoverHeader>
          {unreadNotifications > 0 && (
            <Button
              variant="link"
              size="sm"
              onClick={() => markAllNotificationsRead()}
            >
              <CheckCheckIcon className="size-4" />
              {t("markAllRead")}
            </Button>
          )}
        </div>

        <NotificationList onItemClick={() => setOpen(false)} />

        <Button
          variant="outline"
          className="mt-2 w-full"
          onClick={() => {
            setOpen(false);
            navigate("/notifications");
          }}
        >
          {t("viewAll")}
        </Button>
      </PopoverContent>
    </Popover>
  );
};

export default NotificationDropdown;

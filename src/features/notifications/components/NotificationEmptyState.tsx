import { BellOff } from "lucide-react";
import { useTranslation } from "react-i18next";
import type { FilterType } from "../hooks/useGroupedNotifications";

interface NotificationEmptyStateProps {
  activeFilter: FilterType;
}

export const NotificationEmptyState = ({
  activeFilter,
}: NotificationEmptyStateProps) => {
  const { t } = useTranslation("notifications");

  return (
    <div className="flex min-h-75 flex-col items-center justify-center py-16 text-center">
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-neutral-100 dark:bg-neutral-800">
        <BellOff className="h-8 w-8 text-neutral-400" />
      </div>
      <h3 className="text-lg font-medium text-neutral-900 dark:text-neutral-100">
        {t("empty.title")}
      </h3>
      <p className="mt-1 text-sm text-neutral-500">
        {activeFilter === "all"
          ? t("empty.description")
          : t("empty.filteredDescription")}
      </p>
    </div>
  );
};

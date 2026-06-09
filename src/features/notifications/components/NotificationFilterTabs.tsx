import { useTranslation } from "react-i18next";
import type { FilterType } from "../hooks/useGroupedNotifications";

interface NotificationFilterTabsProps {
  activeFilter: FilterType;
  setActiveFilter: (filter: FilterType) => void;
}

const filterTabs: { value: FilterType }[] = [
  { value: "all" },
  { value: "like" },
  { value: "comment" },
  { value: "friend_request" },
];

export const NotificationFilterTabs = ({
  activeFilter,
  setActiveFilter,
}: NotificationFilterTabsProps) => {
  const { t } = useTranslation("notifications");

  return (
    <div className="scrollbar-hide mb-6 flex gap-2 overflow-x-auto pb-2">
      {filterTabs.map((tab) => (
        <button
          type="button"
          key={tab.value}
          onClick={() => setActiveFilter(tab.value)}
          className={`rounded-full px-4 py-1.5 text-sm font-medium whitespace-nowrap transition-colors ${
            activeFilter === tab.value
              ? "bg-emerald-500 text-white"
              : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-700"
          }`}
        >
          {t(`filters.${tab.value}`)}
        </button>
      ))}
    </div>
  );
};

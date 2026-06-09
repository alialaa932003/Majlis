import { NotificationEmptyState } from "@/features/notifications/components/NotificationEmptyState";
import { NotificationFilterTabs } from "@/features/notifications/components/NotificationFilterTabs";
import { NotificationHeader } from "@/features/notifications/components/NotificationHeader";
import NotificationItem from "@/features/notifications/components/NotificationItem";
import { NotificationSkeleton } from "@/features/notifications/components/NotificationSkeleton";
import {
  useGroupedNotifications,
  type FilterType,
} from "@/features/notifications/hooks/useGroupedNotifications";
import { useInfiniteNotifications } from "@/features/notifications/hooks/useInfiniteNotifications";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { Button } from "@/components/ui/button";
import { useState, type FC } from "react";
import { useTranslation } from "react-i18next";

const Notifications: FC = () => {
  const { t } = useTranslation("notifications");
  const [activeFilter, setActiveFilter] = useState<FilterType>("all");

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    refetch,
  } = useInfiniteNotifications({
    limit: 10,
    unreadOnly: false,
  });

  const allNotifications =
    data?.pages.flatMap((page) => page.data.notifications) ?? [];

  const { notifications, groupedNotifications } = useGroupedNotifications(
    allNotifications,
    activeFilter,
  );

  const observerRef = useIntersectionObserver({
    onIntersect: fetchNextPage,
    enabled: !!hasNextPage && !isFetchingNextPage,
  });

  if (isError) {
    return (
      <div className="flex h-[50vh] flex-col items-center justify-center gap-4 text-center">
        <p className="text-neutral-500">{t("error.title")}</p>
        <Button onClick={() => refetch()} variant="outline">
          {t("error.retry")}
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-6 lg:px-8">
      <NotificationHeader />

      <NotificationFilterTabs
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
      />

      <div className="w-full">
        {isLoading ? (
          <div className="flex flex-col">
            {Array.from({ length: 10 }).map((_, i) => (
              <div
                key={i}
                className="mb-2 rounded-lg border border-neutral-100 bg-white dark:border-neutral-800 dark:bg-neutral-900"
              >
                <NotificationSkeleton />
              </div>
            ))}
          </div>
        ) : notifications.length === 0 ? (
          <NotificationEmptyState activeFilter={activeFilter} />
        ) : (
          <div className="flex flex-col">
            {groupedNotifications.map((group) => (
              <div key={group.label} className="flex flex-col">
                <div className="mb-2 mt-6 text-sm font-medium text-neutral-500 first:mt-0 dark:text-neutral-400">
                  {t(group.label)}
                </div>
                <div className="flex flex-col gap-2.5">
                  {group.items.map((notification) => (
                    <NotificationItem
                      key={notification._id}
                      notification={notification}
                    />
                  ))}
                </div>
              </div>
            ))}

            {isFetchingNextPage && (
              <div className="mt-2.5 flex flex-col">
                <div className="mb-2.5 rounded-lg border border-neutral-100 bg-white dark:border-neutral-800 dark:bg-neutral-900">
                  <NotificationSkeleton />
                </div>
                <div className="mb-2.5 rounded-lg border border-neutral-100 bg-white dark:border-neutral-800 dark:bg-neutral-900">
                  <NotificationSkeleton />
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="h-8 bg-transparent" ref={observerRef} />
    </div>
  );
};

export default Notifications;

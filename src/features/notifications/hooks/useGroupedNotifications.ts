import { useMemo } from "react";
import type { INotification } from "../types/notification";

export type FilterType = "all" | "like" | "comment" | "friend_request";

export const useGroupedNotifications = (
  allNotifications: INotification[],
  activeFilter: FilterType,
) => {
  const notifications = useMemo(() => {
    // Deduplicate items to handle offset pagination drift
    const uniqueMap = new Map<string, INotification>();
    allNotifications.forEach((n) => {
      if (!uniqueMap.has(n._id)) {
        uniqueMap.set(n._id, n);
      }
    });
    
    const uniqueNotifications = Array.from(uniqueMap.values());

    return activeFilter === "all"
      ? uniqueNotifications
      : uniqueNotifications.filter((n) => n.type === activeFilter);
  }, [allNotifications, activeFilter]);

  const groupedNotifications = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    const lastWeek = new Date(today);
    lastWeek.setDate(lastWeek.getDate() - 7);

    type GroupLabel = "groups.today" | "groups.yesterday" | "groups.thisWeek" | "groups.older";

    const groups: { label: GroupLabel; items: typeof notifications }[] = [
      { label: "groups.today", items: [] },
      { label: "groups.yesterday", items: [] },
      { label: "groups.thisWeek", items: [] },
      { label: "groups.older", items: [] },
    ];

    notifications.forEach((n) => {
      const d = new Date(n.createdAt);
      if (d >= today) {
        groups[0].items.push(n);
      } else if (d >= yesterday) {
        groups[1].items.push(n);
      } else if (d >= lastWeek) {
        groups[2].items.push(n);
      } else {
        groups[3].items.push(n);
      }
    });

    return groups.filter((g) => g.items.length > 0);
  }, [notifications]);

  return { notifications, groupedNotifications };
};

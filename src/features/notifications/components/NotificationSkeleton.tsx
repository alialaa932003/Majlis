import { Skeleton } from "@/components/ui/skeleton";

export const NotificationSkeleton = () => {
  return (
    <div className="flex items-start gap-3 rounded-xl p-2">
      <Skeleton className="h-10 w-10 shrink-0 rounded-full" />
      <div className="flex flex-1 flex-col gap-2 pt-1">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-3 w-1/2" />
      </div>
    </div>
  );
};

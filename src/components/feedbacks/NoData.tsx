import type { ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { FiInbox } from "react-icons/fi";
import { cn } from "@/lib/utils";
import type { ParseKeys } from "i18next";

export interface NoDataProps {
  messageKey?: ParseKeys<"common">;
  descriptionKey?: ParseKeys<"common">;
  icon?: ReactNode;
  className?: string;
  iconClassName?: string;
  messageClassName?: string;
  descriptionClassName?: string;
}

function NoData({
  messageKey = "noData.default",
  descriptionKey = "noData.description",
  className = "",
  icon = <FiInbox size={50} />,
  iconClassName = "",
  messageClassName = "",
  descriptionClassName = "",
}: NoDataProps) {
  const { t } = useTranslation("common");

  return (
    <div
      className={cn(
        "flex w-full flex-col items-center justify-center p-8 text-center",
        className,
      )}
    >
      <div className={cn("mb-4 text-gray-400", iconClassName)}>{icon}</div>
      <h3
        className={cn(
          "mb-1 text-lg font-medium text-gray-900",
          messageClassName,
        )}
      >
        {t(messageKey as any)}
      </h3>
      <p className={cn("max-w-md text-sm text-gray-500", descriptionClassName)}>
        {t(descriptionKey as any)}
      </p>
    </div>
  );
}

export default NoData;

import type { ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { FiAlertCircle } from "react-icons/fi";
import { cn } from "@/lib/utils";
import type { ParseKeys } from "i18next";

export interface ErrorMessageProps {
  messageKey?: ParseKeys<"common">;
  descriptionKey?: ParseKeys<"common">;
  icon?: ReactNode;
  onRetry?: () => void;
  className?: string;
  iconClassName?: string;
  messageClassName?: string;
  descriptionClassName?: string;
  buttonClassName?: string;
}

function ErrorMessage({
  messageKey = "error.default",
  descriptionKey = "error.description",
  className = "",
  icon = <FiAlertCircle size={50} />,
  onRetry,
  iconClassName = "",
  messageClassName = "",
  descriptionClassName = "",
  buttonClassName = "",
}: ErrorMessageProps) {
  const { t } = useTranslation("common");

  return (
    <div
      className={cn(
        "flex w-full flex-col items-center justify-center p-8 text-center",
        className,
      )}
    >
      <div className={cn("mb-4 text-red-500", iconClassName)}>{icon}</div>
      <h3
        className={cn(
          "mb-1 text-lg font-medium text-gray-900",
          messageClassName,
        )}
      >
        {t(messageKey as any)}
      </h3>
      <p
        className={cn(
          "mb-4 max-w-md text-sm text-gray-500",
          descriptionClassName,
        )}
      >
        {t(descriptionKey as any)}
      </p>
      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className={cn(
            "rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:outline-none",
            buttonClassName,
          )}
        >
          Try Again
        </button>
      )}
    </div>
  );
}

export default ErrorMessage;

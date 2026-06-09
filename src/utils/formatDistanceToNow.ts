import i18n from "@/i18n";

/**
 * Formats the distance between the given date and now using the browser's native relative time formatting.
 * Automatically detects the current language from i18n.
 * 
 * @param dateInput The date to format (Date object, ISO string, or timestamp)
 * @returns A localized string representing the relative time
 */
export function formatDistanceToNow(dateInput: string | Date | number): string {
  const date = typeof dateInput === "string" || typeof dateInput === "number" ? new Date(dateInput) : dateInput;
  
  // If date is invalid, return empty string
  if (isNaN(date.getTime())) {
    return "";
  }

  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  const locale = i18n.resolvedLanguage ?? i18n.language ?? "en";

  // Use the built-in relative time format API
  const rtf = new Intl.RelativeTimeFormat(locale, { numeric: "auto" });

  // Just now
  if (diffInSeconds < 60) {
    return locale.startsWith("ar") ? "الآن" : "just now";
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return rtf.format(-diffInMinutes, "minute");
  }

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return rtf.format(-diffInHours, "hour");
  }

  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 30) {
    return rtf.format(-diffInDays, "day");
  }

  // Fallback to absolute date formatting for older dates (more than 30 days)
  return date.toLocaleDateString(locale, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

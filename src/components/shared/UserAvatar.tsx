import { useState } from "react";
import { cn } from "@/lib/utils";

interface UserAvatarProps {
  src?: string;
  username?: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl" | number;
  className?: string;
}

const sizeClasses = {
  xs: "h-6 w-6 text-[10px]",
  sm: "h-8 w-8 text-xs",
  md: "h-10 w-10 text-sm",
  lg: "h-12 w-12 text-base",
  xl: "h-16 w-16 text-xl",
};

const getAvatarBgColor = (name: string) => {
  const colors = [
    "bg-red-500 text-white",
    "bg-orange-500 text-white",
    "bg-amber-500 text-white",
    "bg-emerald-500 text-white",
    "bg-teal-500 text-white",
    "bg-blue-500 text-white",
    "bg-indigo-500 text-white",
    "bg-violet-500 text-white",
    "bg-purple-500 text-white",
    "bg-pink-500 text-white",
  ];

  if (!name) return "bg-neutral-400 text-white";

  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % colors.length;
  return colors[index];
};

export const UserAvatar = ({
  src,
  username = "",
  size = "md",
  className,
}: UserAvatarProps) => {
  const [hasError, setHasError] = useState(false);

  const isCustomSize = typeof size === "number";
  const initials = username.trim().charAt(0).toUpperCase() || "?";
  const bgClass = getAvatarBgColor(username);

  const customStyle = isCustomSize
    ? {
        width: size,
        height: size,
        fontSize: `${size * 0.4}px`,
      }
    : undefined;

  const showImage = src && !hasError;

  return (
    <div
      style={customStyle}
      className={cn(
        "relative flex shrink-0 items-center justify-center overflow-hidden rounded-full font-semibold select-none",
        !isCustomSize && sizeClasses[size],
        bgClass,
        className,
      )}
    >
      {showImage ? (
        <img
          src={src}
          alt={username}
          className="h-full w-full object-cover"
          onError={() => setHasError(true)}
        />
      ) : (
        <span>{initials}</span>
      )}
    </div>
  );
};

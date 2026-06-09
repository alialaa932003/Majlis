import { cn } from "@/lib/utils";

const Spinner = ({ className = "" }) => {
  return (
    <div
      className={cn(
        "border-t-primary-500! size-14 animate-spin rounded-full border-[6px] border-gray-200",
        className,
      )}
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default Spinner;

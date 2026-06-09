import { createPortal } from "react-dom";
import Spinner from "./Spinner";
import { cn } from "@/lib/utils";

const FullPageLoading = ({ className }: { className?: string }) => {
  return createPortal(
    <div
      className={cn(
        `fixed top-0 left-0 z-99999999999 flex h-screen w-full items-center justify-center bg-[rgba(0,0,0,0.5)]`,
        className,
      )}
    >
      <Spinner />
    </div>,
    document.getElementById("portal") as HTMLElement,
  );
};

export default FullPageLoading;

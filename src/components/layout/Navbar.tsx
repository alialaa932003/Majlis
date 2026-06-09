import NotificationPopover from "@/features/notifications/components/NotificationDropdown";
import { Menu, Search, Settings } from "lucide-react";
import { Button } from "../ui/button";

interface NavbarProps {
  onMenuClick: () => void;
}

export function Navbar({ onMenuClick }: NavbarProps) {
  return (
    <header className="bg-background sticky top-0 z-40 flex h-16 w-full shrink-0 items-center justify-between border-b px-4 lg:px-6">
      {/* Mobile Menu Button & Search */}
      <div className="flex flex-1 items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          className="text-neutral-600 lg:hidden"
          onClick={onMenuClick}
        >
          <Menu className="size-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
        <div className="relative hidden w-full max-w-md sm:block">
          <Search className="absolute top-2.5 left-2.5 h-4 w-4 text-neutral-500" />
          <input
            type="text"
            placeholder="Search..."
            className="border-input focus-visible:ring-ring h-9 w-full rounded-full border bg-neutral-50 px-9 py-1 text-sm transition-colors placeholder:text-neutral-500 focus-visible:ring-1 focus-visible:outline-none"
          />
        </div>
      </div>

      {/* Actions & Profile */}
      <div className="flex items-center gap-4">
        <NotificationPopover />

        <Button variant="ghost" size="icon" className="text-neutral-600">
          <Settings className="size-5" />
          <span className="sr-only">Settings</span>
        </Button>

        <div className="bg-primary/20 text-primary hover:bg-primary/30 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full text-sm font-bold transition-colors">
          AL
        </div>
      </div>
    </header>
  );
}

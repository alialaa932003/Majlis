import { Link, useLocation, useNavigate } from "react-router-dom";
import {
    Home,
    Compass,
    Users,
    PlusSquare,
    User,
    LogOut,
    X,
    MessageSquare,
    Mic,
    Bell,
} from "lucide-react";
import { Button } from "../ui/button";
import { useLogout } from "@/features/auth/hooks/useLogout";

const navLinks = [
    { name: "Home Feed", href: "/", icon: Home },
    { name: "Explore", href: "/explore", icon: Compass },
    { name: "Notifications", href: "/notifications", icon: Bell },
    { name: "Friends", href: "/friends", icon: Users },
    { name: "Chat", href: "/chat", icon: MessageSquare },
    { name: "Voice", href: "/voice", icon: Mic },
    { name: "Create Post", href: "/create", icon: PlusSquare },
];

interface SidebarProps {
    onClose?: () => void;
}

export function Sidebar({ onClose }: SidebarProps) {
    const location = useLocation();
    const navigate = useNavigate();

    const logoutMutation = useLogout({
        onSettled: () => {
            navigate("/login", { replace: true });
        },
    });

    function handleLogout() {
        logoutMutation.mutate();
    }

    return (
        <aside className="flex h-full w-64 flex-col border-r bg-background rtl:border-l rtl:border-r-0">
            {/* Logo */}
            <div className="flex items-center justify-between px-6 pt-3">
                <Link
                    to="/"
                    className="flex items-center gap-2 font-heading text-2xl font-bold text-primary"
                    onClick={onClose}
                >
                    <img src="/logo-icon.png" alt="" className="w-13" />
                    Majlis
                </Link>

                {onClose && (
                    <Button
                        variant="ghost"
                        size="icon"
                        className="lg:hidden"
                        onClick={onClose}
                    >
                        <X className="h-5 w-5" />
                    </Button>
                )}
            </div>

            {/* Navigation */}
            <nav className="flex flex-1 flex-col gap-2 p-4">
                {navLinks.map((link) => {
                    const isActive = link.href === "/"
                        ? location.pathname === "/"
                        : location.pathname.startsWith(link.href);
                    const Icon = link.icon;

                    return (
                        <Link
                            key={link.name}
                            to={link.href}
                            onClick={onClose}
                            className={`flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors ${isActive
                                    ? "bg-primary/10 text-primary"
                                    : "text-neutral-700 hover:bg-neutral-50 hover:text-neutral-900 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-neutral-50"
                                }`}
                        >
                            <Icon className="h-5 w-5" />
                            {link.name}
                        </Link>
                    );
                })}
            </nav>

            {/* User Profile & Logout */}
            <div className="mt-auto flex flex-col gap-2 p-4">
                <Link
                    to="/profile"
                    onClick={onClose}
                    className={`flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors ${location.pathname === "/profile"
                            ? "border-r-4 border-primary bg-primary/10 text-primary rtl:border-l-4 rtl:border-r-0"
                            : "text-neutral-700 hover:bg-neutral-50 hover:text-neutral-900 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-neutral-50"
                        }`}
                >
                    <User className="h-5 w-5" />
                    Profile
                </Link>

                <button
                    type="button"
                    onClick={handleLogout}
                    disabled={logoutMutation.isPending}
                    className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-50 hover:text-neutral-900 disabled:cursor-not-allowed disabled:opacity-60 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-neutral-50"
                >
                    <LogOut className="h-5 w-5" />
                    {logoutMutation.isPending ? "Logging out..." : "Logout"}
                </button>
            </div>
        </aside>
    );
}
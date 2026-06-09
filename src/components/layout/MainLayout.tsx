import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import { Navbar } from "./Navbar";

export function MainLayout() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div className="flex h-screen w-full overflow-hidden bg-neutral-50 dark:bg-neutral-950">
            {/* Mobile Sidebar Overlay */}
            {isSidebarOpen && (
                <div 
                    className="fixed inset-0 z-40 bg-black/50 lg:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <div 
                className={`fixed inset-y-0 left-0 rtl:left-auto rtl:right-0 z-50 transform transition-all lg:opacity-100 duration-300 ease-in-out lg:relative lg:translate-x-0 lg:rtl:translate-x-0 lg:flex lg:w-64 lg:flex-shrink-0 ${
                    isSidebarOpen 
                        ? "translate-x-0 opacity-100" 
                        : "-translate-x-full rtl:translate-x-full opacity-0 "
                }`}
            >
                <Sidebar onClose={() => setIsSidebarOpen(false)} />
            </div>
            
            {/* Main content wrapper */}
            <div className="flex flex-1 flex-col min-w-0 overflow-hidden">
                <Navbar onMenuClick={() => setIsSidebarOpen(true)} />
                
                <main id="main-scroll-container" className="flex-1 overflow-y-auto p-6">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}

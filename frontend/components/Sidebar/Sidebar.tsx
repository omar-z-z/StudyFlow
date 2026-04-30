"use client";

import { useEffect, useState } from "react";
import { GraduationCap, LogOut, Moon, Sun } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/basicComponents/button";
import { useDarkMode } from "@/hooks/useDarkMode";
import MobileTopBar from "./MobileTopBar";
import SidebarNav from "./SidebarNav";
import { useAuth } from "@/lib/auth-context";
import SidebarNotificationFeed from "./SidebarNotificationFeed";
import PushNotificationToggle from "../basicComponents/PushNotificationToggle";

export default function Sidebar() {
  const pathname = usePathname();
  const { darkMode, toggleDark } = useDarkMode();
  const [menuOpen, setMenuOpen] = useState(false);
  const { logout } = useAuth();
  const router = useRouter();

  // Close drawer on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  // Lock body scroll while drawer is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const handleLogout = async () => {
    await logout();
    router.push("/login");
  };

  return (
    <>
      {/* Top bar — mobile only */}
      <MobileTopBar
        menuOpen={menuOpen}
        darkMode={darkMode}
        onMenuToggle={() => setMenuOpen((prev) => !prev)}
        onDarkToggle={toggleDark}
        onLogout={handleLogout}
      />

      {/* Backdrop — closes drawer on outside tap */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/40 md:hidden"
          onClick={() => setMenuOpen(false)}
        />
      )}

      {/* Sidebar panel */}
      <aside
        className={`
          fixed z-40 flex flex-col h-full min-h-screen
          bg-background border-r border-border shrink-0
          transition-transform duration-300 ease-in-out
          w-65
          ${menuOpen ? "translate-x-0" : "-translate-x-full"}
          md:relative md:translate-x-0 md:w-1/5 md:max-w-62.5
        `}
      >
        {/* Desktop logo (hidden on mobile) */}
        <div className="hidden md:flex px-5 py-10 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center shrink-0">
              <GraduationCap className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-lg font-semibold text-foreground leading-none">
                StudyFlow
              </h1>
              <h3 className="text-base text-muted-foreground mt-0.5">
                Study Planner
              </h3>
            </div>
          </div>
        </div>

        {/* Spacer so nav items clear the fixed top bar on mobile */}
        <div className="h-14 md:hidden shrink-0" />
        
        <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
          {/* Nav links */}
          <SidebarNav />

          <PushNotificationToggle />

          {/* Notification area */}
          <SidebarNotificationFeed />
        </div>

        {/* Dark mode button and Logout button */}
        <div className="hidden md:block px-3 py-4 border-t border-border">
          <Button
            onClick={toggleDark}
            variant="outline"
            className="w-full justify-start gap-3"
          >
            {darkMode ? (
              <Sun className="w-5 h-5 shrink-0" />
            ) : (
              <Moon className="w-5 h-5 shrink-0" />
            )}
            {darkMode ? "Light Mode" : "Dark Mode"}
          </Button>
          <Button
            onClick={handleLogout}
            variant="outline"
            className="w-full justify-start gap-3 mt-1 text-primary hover:text-destructive hover:bg-destructive/10"
          >
            <LogOut className="w-5 h-5 shrink-0" />
            Logout
          </Button>
        </div>
      </aside>
    </>
  );
}

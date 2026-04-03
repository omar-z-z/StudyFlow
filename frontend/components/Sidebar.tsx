"use client";

import { useEffect, useState } from "react";
import {
  Moon,
  Sun,
  GraduationCap,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "./basicComponents/button";
import navItems from "@/lib/sidebarNavItems";

export default function Sidebar() {
  // "Dashboard" is the default active page
  const pathname = usePathname();

  // Read system preference on first load so the icon matches reality
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const isDark = document.documentElement.classList.contains("dark");
    setDarkMode(isDark);
  }, []);

  const toggleDark = () => {
    const html = document.documentElement;
    if (html.classList.contains("dark")) {
      html.classList.remove("dark");
      setDarkMode(false);
    } else {
      html.classList.add("dark");
      setDarkMode(true);
    }
  };

  return (
    <aside className="flex flex-col w-[250px] min-h-screen bg-background border-r border-border shrink-0">
      {/* Logo */}
      <div className="px-5 py-10 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center shrink-0">
            <GraduationCap className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <p className="text-lg font-semibold text-foreground leading-none">
              StudyFlow
            </p>
            <p className="text-base text-muted-foreground mt-0.5">
              Study Planner
            </p>
          </div>
        </div>
      </div>

      {/* Nav Items */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {navItems.map(({ label, icon: Icon, href }) => {
          const isActive =
            href === "/" ? pathname === href : pathname.startsWith(href);

          return (
            <Link key={label} href={href}>
              <Button
                size="default"
                variant={isActive ? "default" : "secondary"}
                className={`w-full justify-start gap-3 text-base rounded-lg my-1 ${
                  isActive ? "shadow-sm" : "text-muted-foreground"
                }`}
              >
                <Icon className="w-10 h-10 shrink-0" />
                {label}
              </Button>
            </Link>
          );
        })}
      </nav>

      {/* Dark Mode Toggle */}
      <div className="px-3 py-4 border-t border-border">
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
      </div>
    </aside>
  );
}

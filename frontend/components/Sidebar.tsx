"use client";

import { useEffect, useState } from "react";
import { Moon, Sun, GraduationCap, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "./basicComponents/button";
import navItems from "@/lib/sidebarNavItems";

export default function Sidebar() {
  // "Dashboard" is the default active page
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  // Read system preference on first load so the icon matches reality
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const isDark = document.documentElement.classList.contains("dark");
    setDarkMode(isDark);
    setMenuOpen(false);
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
    <>
      <button
        className="fixed top-4 left-4 z-50 p-2 rounded-md bg-background border border-border shadow-md md:hidden"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>
      {menuOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/40 md:hidden"
          onClick={() => setMenuOpen(false)}
        />
      )}
      <aside
        className={`
          fixed z-40 flex flex-col w-48 md:w-56 lg:w-64 min-h-screen bg-background border-r border-border shrink-0
          transition-transform duration-300 ease-in-out
          ${menuOpen ? "translate-x-0" : "-translate-x-full"}
          md:relative md:translate-x-0
        `}
      >
        {/* Logo */}
        <div className="px-5 py-10 border-b border-border">
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
    </>
  );
}

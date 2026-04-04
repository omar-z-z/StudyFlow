"use client";

import { useEffect, useState } from "react";
import { Moon, Sun, GraduationCap, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "./basicComponents/button";
import navItems from "@/lib/sidebarNavItems";

export default function Sidebar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  // Read system preference on first load so the icon matches reality
  useEffect(() => {
    const isDark = document.documentElement.classList.contains("dark");
    setDarkMode(isDark);
  }, []);

  // Close the mobile menu whenever the route changes
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  // Prevent body scroll while the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

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
      {/* ── Mobile top bar ─────────────────────────────────────────── */}
      <header className="fixed top-0 left-0 right-0 z-50 h-14 flex items-center px-4 gap-3 bg-background border-b border-border md:hidden">
        <button
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          onClick={() => setMenuOpen(!menuOpen)}
          className="p-2 rounded-md hover:bg-muted transition-colors"
        >
          {menuOpen ? (
            <X className="w-5 h-5" />
          ) : (
            <Menu className="w-5 h-5" />
          )}
        </button>

        {/* Brand mark */}
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center shrink-0">
            <GraduationCap className="w-4 h-4 text-primary-foreground" />
          </div>
          <span className="text-sm font-semibold text-foreground">
            StudyFlow
          </span>
        </div>

        {/* Dark-mode toggle lives in the top bar on mobile */}
        <button
          aria-label="Toggle dark mode"
          onClick={toggleDark}
          className="ml-auto p-2 rounded-md hover:bg-muted transition-colors"
        >
          {darkMode ? (
            <Sun className="w-5 h-5" />
          ) : (
            <Moon className="w-5 h-5" />
          )}
        </button>
      </header>

      {/* ── Backdrop ───────────────────────────────────────────────── */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/40 md:hidden"
          onClick={() => setMenuOpen(false)}
        />
      )}

      {/* ── Sidebar panel ──────────────────────────────────────────── */}
      <aside
        className={`
          fixed z-40 flex flex-col h-full min-h-screen
          bg-background border-r border-border shrink-0
          transition-transform duration-300 ease-in-out
          w-[260px]
          ${menuOpen ? "translate-x-0" : "-translate-x-full"}
          md:relative md:translate-x-0 md:w-1/5 md:max-w-[250px]
        `}
      >
        {/* Logo — hidden on mobile (shown in the top bar instead) */}
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

        {/* On mobile, push content below the fixed top bar */}
        <div className="h-14 md:hidden shrink-0" />

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
                  <Icon className="w-5 h-5 shrink-0" />
                  {label}
                </Button>
              </Link>
            );
          })}
        </nav>

        {/* Dark Mode Toggle — desktop only (mobile version is in the top bar) */}
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
        </div>
      </aside>
    </>
  );
}
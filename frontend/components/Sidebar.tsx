"use client";

import { useState } from "react";
import {
  LayoutDashboard,
  BookOpen,
  Upload,
  Calendar,
  CheckSquare,
  BarChart2,
  Moon,
  Sun,
  GraduationCap,
} from "lucide-react";

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard, href: "#" },
  { label: "Courses", icon: BookOpen, href: "#" },
  { label: "Upload", icon: Upload, href: "#" },
  { label: "Planner", icon: Calendar, href: "#" },
  { label: "Tasks", icon: CheckSquare, href: "#" },
  { label: "Progress", icon: BarChart2, href: "#" },
];

export default function Sidebar() {
  const [active, setActive] = useState("Dashboard");
  const [darkMode, setDarkMode] = useState(false);

  const toggleDark = () => {
    setDarkMode((prev) => !prev);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <aside className="flex flex-col w-[230px] min-h-screen bg-background border-r border-border shrink-0">
      {/* Logo */}
      <div className="px-5 py-6 border-b border-border">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-md bg-primary flex items-center justify-center">
            <GraduationCap className="w-4 h-4 text-primary-foreground" />
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground leading-none">
              Syllabus AI
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">
              Study Planner
            </p>
          </div>
        </div>
      </div>

      {/* Nav Items */}
      <nav className="flex-1 px-3 py-4 space-y-0.5">
        {navItems.map(({ label, icon: Icon, href }) => {
          const isActive = active === label;
          return (
            <a
              key={label}
              href={href}
              onClick={(e) => {
                e.preventDefault();
                setActive(label);
              }}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-150 ${
                isActive
                  ? "bg-primary text-primary-foreground font-medium"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              }`}
            >
              <Icon className="w-4 h-4 shrink-0" />
              {label}
            </a>
          );
        })}
      </nav>

      {/* Dark Mode Toggle */}
      <div className="px-3 py-4 border-t border-border">
        <button
          onClick={toggleDark}
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-all duration-150 w-full"
        >
          {darkMode ? (
            <Sun className="w-4 h-4 shrink-0" />
          ) : (
            <Moon className="w-4 h-4 shrink-0" />
          )}
          {darkMode ? "Light Mode" : "Dark Mode"}
        </button>
      </div>
    </aside>
  );
}
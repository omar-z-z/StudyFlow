"use client";
import {
  LayoutDashboard,
  BookOpen,
  Upload,
  Calendar,
  CheckSquare,
  BarChart3,
  Moon,
  Sun,
  Menu,
  X
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { Button } from "./basicComponents/button";

export default function Sidebar() {
//   const location = useLocation();
  const [darkMode, setDarkMode] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

  const navItems = [
    { path: "/", label: "Dashboard", icon: LayoutDashboard },
    { path: "/courses", label: "Courses", icon: BookOpen },
    { path: "/upload", label: "Upload", icon: Upload },
    { path: "/planner", label: "Planner", icon: Calendar },
    { path: "/tasks", label: "Tasks", icon: CheckSquare },
    { path: "/progress", label: "Progress", icon: BarChart3 },
  ];

  const SidebarContent = () => (
    <>
      <div className="p-6 border-b border-border">
        <h2 className="text-primary">StudyFlow</h2>
        <p className="text-muted-foreground">Study Planner</p>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;

          return (
            <Link
              key={item.path}
              href={item.path}
              onClick={() => setSidebarOpen(false)}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-foreground hover:bg-accent"
              }`}
            >
              <Icon className="w-5 h-5" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-border">
        <Button
          variant="outline"
          className="w-full justify-start"
          onClick={toggleDarkMode}
        >
          {darkMode ? <Sun className="w-5 h-5 mr-2" /> : <Moon className="w-5 h-5 mr-2" />}
          {darkMode ? "Light Mode" : "Dark Mode"}
        </Button>
      </div>
    </>
  );

  return (
    <>
    <aside className="hidden md:flex w-64 border-r border-border bg-card flex-col">
        <SidebarContent />
      </aside>

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={`fixed top-0 left-0 h-full w-64 border-r border-border bg-card flex-col z-50 transform transition-transform duration-300 md:hidden ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b border-border">
          <div>
            <h2 className="text-primary">StudyFlow</h2>
            <p className="text-muted-foreground">Study Planner</p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="w-5 h-5" />
          </Button>
        </div>
        <SidebarContent />
      </aside>
      </>
  );
};

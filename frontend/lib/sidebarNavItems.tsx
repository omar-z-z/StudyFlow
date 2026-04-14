import { BookOpen, Calendar, CheckSquare, LayoutDashboard, Upload, BarChart2 } from "lucide-react";

export interface NavItem { 
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  href: string;
}

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
  { label: "Courses", icon: BookOpen, href: "/courses" },
  { label: "Upload", icon: Upload, href: "/upload" },
  { label: "Planner", icon: Calendar, href: "/planner" },
  { label: "Tasks", icon: CheckSquare, href: "/tasks" },
  { label: "Progress", icon: BarChart2, href: "/progress" },
];

export default navItems;
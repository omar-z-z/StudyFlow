import { CheckCircle2, AlertTriangle, BookOpen, Info } from "lucide-react";
import { NotificationType } from "@/types/notification";

export const typeStyles: Record<
  NotificationType,
  { icon: React.ReactNode; bg: string; color: string }
> = {
  task: {
    icon: <CheckCircle2 className="w-4 h-4" />,
    bg: "bg-green-100 dark:bg-green-900/30",
    color: "text-green-500",
  },
  deadline: {
    icon: <AlertTriangle className="w-4 h-4" />,
    bg: "bg-yellow-100 dark:bg-yellow-900/30",
    color: "text-yellow-500",
  },
  course: {
    icon: <BookOpen className="w-4 h-4" />,
    bg: "bg-blue-100 dark:bg-blue-900/30",
    color: "text-blue-500",
  },
  system: {
    icon: <Info className="w-4 h-4" />,
    bg: "bg-muted",
    color: "text-muted-foreground",
  },
};

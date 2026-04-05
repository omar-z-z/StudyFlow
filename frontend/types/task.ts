export type Priority = "high" | "medium" | "low";

export interface Task {
  id: number;
  title: string;
  course: string;
  courseColor: string;
  duration: number;
  priority: Priority;
  completed: boolean;
}

export const priorityStyles: Record<Priority, string> = {
  high: "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400",
  medium: "bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400",
  low: "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400",
};
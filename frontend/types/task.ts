import { Course } from "./course";

export type Priority = "high" | "medium" | "low";

export type TaskType =
  | "reading"
  | "lecture"
  | "exercise"
  | "review"
  | "project"
  | "quiz"
  | "assignment"
  | "other";

export interface Task {
  id: string;
  title: string;
  course: Course;
  completed: boolean;
  estimatedTime: number;
  priority: Priority;
  type: TaskType;
  date: string;
}

type BadgeConfig = {
  label: string;
  className: string;
};

export const priorityStyles: Record<Priority, string> = {
  high: "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400",
  medium:
    "bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400",
  low: "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400",
};

export const priorityConfig: Record<Priority, BadgeConfig> = {
  high: {
    label: "HIGH",
    className:
      "bg-red-50 text-red-500 border border-red-200 dark:bg-red-950/40 dark:text-red-400 dark:border-red-800",
  },
  medium: {
    label: "MEDIUM",
    className:
      "bg-orange-50 text-orange-500 border border-orange-200 dark:bg-orange-950/40 dark:text-orange-400 dark:border-orange-800",
  },
  low: {
    label: "LOW",
    className:
      "bg-emerald-50 text-emerald-600 border border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-400 dark:border-emerald-800",
  },
};

export const typeConfig: Record<TaskType, BadgeConfig> = {
  reading: {
    label: "READING",
    className:
      "bg-blue-50 text-blue-600 border border-blue-200 dark:bg-blue-950/40 dark:text-blue-400 dark:border-blue-800",
  },
  lecture: {
    label: "LECTURE",
    className:
      "bg-purple-50 text-purple-600 border border-purple-200 dark:bg-purple-950/40 dark:text-purple-400 dark:border-purple-800",
  },
  exercise: {
    label: "EXERCISE",
    className:
      "bg-yellow-50 text-yellow-600 border border-yellow-200 dark:bg-yellow-950/40 dark:text-yellow-400 dark:border-yellow-800",
  },
  review: {
    label: "REVIEW",
    className:
      "bg-indigo-50 text-indigo-600 border border-indigo-200 dark:bg-indigo-950/40 dark:text-indigo-400 dark:border-indigo-800",
  },
  project: {
    label: "PROJECT",
    className:
      "bg-teal-50 text-teal-600 border border-teal-200 dark:bg-teal-950/40 dark:text-teal-400 dark:border-teal-800",
  },
  quiz: {
    label: "QUIZ",
    className:
      "bg-pink-50 text-pink-600 border border-pink-200 dark:bg-pink-950/40 dark:text-pink-400 dark:border-pink-800",
  },
  assignment: {
    label: "ASSIGNMENT",
    className:
      "bg-green-50 text-pink-600 border border-pink-200 dark:bg-pink-950/40 dark:text-pink-400 dark:border-pink-800",
  },
  other: {
    label: "OTHER",
    className:
      "bg-slate-50 text-slate-600 border border-slate-200 dark:bg-slate-950/40 dark:text-slate-400 dark:border-slate-800",
  },
};
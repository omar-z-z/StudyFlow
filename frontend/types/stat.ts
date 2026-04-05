export interface StatsCardProps {
  title: string;
  type: "tasks" | "time" | "courses";
  tasksCompleted?: number;
  tasksTotal?: number;
  hours?: number;
  minutes?: number;
  coursesCount?: number;
}
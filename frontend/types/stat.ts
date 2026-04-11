export interface StatsCardProps {
  title: string;
  type: "tasks" | "time" | "courses" | "goal" | "rate" | "streak";

  // tasks
  tasksCompleted?: number;
  tasksTotal?: number;

  // time
  hours?: number;
  minutes?: number;

  // courses
  coursesCount?: number;

  // goal (e.g. Weekly Goal 12/20 with a progress bar)
  goalCurrent?: number;
  goalTarget?: number;

  // rate (e.g. Completion Rate 60%)
  rate?: number;
  rateSub?: string;

  // streak (e.g. Current Streak 5 days)
  streakDays?: number;
  streakSub?: string;
}
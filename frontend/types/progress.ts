export interface StatCard {
  label: string;
  value: string | number;
  suffix?: string;
  sub?: string;
  progress?: number; // 0–1 for the progress bar variant
  icon: "goal" | "clock" | "chart" | "streak";
}

export interface DailyEntry {
  day: string;
  completed: number;
  pending: number;
}

export interface TaskType {
  name: string;
  value: number;
  color: string;
}

export interface CourseProgress {
  id: string;
  name: string;
  topicsCompleted: number;
  topicsTotal: number;
  percentage: number;
  color: string; // accent color for the icon bg
}

export interface ProgressData {
  stats: {
    weeklyGoal: number;
    weeklyGoalTarget: number;
    studyHours: number;
    studyHoursTarget: number;
    completionRate: number;
    currentStreak: number;
  };
  dailyCompletion: DailyEntry[];
  tasksByType: TaskType[];
  courseProgress: CourseProgress[];
  summary: {
    tasksDone: number;
    dayStreak: number;
    studyTime: number;
  };
}
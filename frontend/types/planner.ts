export type TaskColor = "blue" | "green" | "yellow";

export interface Task {
  id: number;
  title: string;
  color: TaskColor;
  duration: number; // in minutes
  completed: boolean;
  dateKey: string; // "YYYY-MM-DD"
}

export interface DayDescriptor {
  date: Date;
  dateKey: string;
  dayName: string;
  dayNumber: number;
  isToday: boolean;
  tasks: Task[];
}
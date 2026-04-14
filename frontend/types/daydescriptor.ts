import { Task } from "./task";

export interface DayDescriptor {
  date: Date;
  dateKey: string;
  dayName: string;
  dayNumber: number;
  isToday: boolean;
  tasks: Task[];
}
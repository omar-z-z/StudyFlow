import type { DayDescriptor } from "@/types/daydescriptor";
import { Task } from "@/types/task";

export const getWeekStart = (date: Date, weekOffset: number = 0): Date => {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  const day = d.getDay();
  d.setDate(d.getDate() - day + weekOffset * 7);
  return d;
};

export const formatDateKey = (date: Date): string => {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
};

export const generateWeekDays = (
  weekStart: Date,
  tasks: Task[],
  today: Date
): DayDescriptor[] => {
  const todayKey = formatDateKey(today);

  return Array.from({ length: 7 }, (_, i) => {
    const date = new Date(weekStart);
    date.setDate(weekStart.getDate() + i);
    const dateKey = formatDateKey(date);

    return {
      date,
      dateKey,
      dayName: date.toLocaleDateString("en-US", { weekday: "short" }),
      dayNumber: date.getDate(),
      isToday: dateKey === todayKey,
      tasks: tasks.filter((t) => t.date === dateKey),
    };
  });
};

export const formatMinutes = (minutes: number): string | null => {
  if (!minutes) return null;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  if (h === 0) return `${m}m`;
  if (m === 0) return `${h}h`;
  return `${h}h ${m}m`;
};

export const getMonthLabel = (weekStart: Date): string => {
  const now = new Date();
  const opts: Intl.DateTimeFormatOptions = { month: "long" };
  if (weekStart.getFullYear() !== now.getFullYear()) {
    opts.year = "numeric";
  }
  return (
    weekStart.toLocaleDateString("en-US", opts) +
    " " +
    weekStart.getFullYear()
  );
};
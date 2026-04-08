import { useState } from "react";

import { INITIAL_TASKS } from "@/lib/plannerData";
import {
  generateWeekDays,
  getMonthLabel,
  getWeekStart,
} from "@/lib/plannerUtils";
import type { DayDescriptor, Task } from "@/types/planner";

interface UsePlannerReturn {
  days: DayDescriptor[];
  monthLabel: string;
  isCurrentWeek: boolean;
  totalTasks: number;
  completedTasks: number;
  studyMinutes: number;
  toggleTask: (id: number) => void;
  goToPrevWeek: () => void;
  goToNextWeek: () => void;
  goToToday: () => void;
}

export const usePlanner = (): UsePlannerReturn => {
  const today = new Date();

  const [weekOffset, setWeekOffset] = useState<number>(0);
  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);

  const weekStart = getWeekStart(today, weekOffset);
  const days = generateWeekDays(weekStart, tasks, today);
  const monthLabel = getMonthLabel(weekStart);
  const isCurrentWeek = weekOffset === 0;

  const weekTasks = days.flatMap((d) => d.tasks);
  const totalTasks = weekTasks.length;
  const completedTasks = weekTasks.filter((t) => t.completed).length;
  const studyMinutes = weekTasks.reduce((acc, t) => acc + t.duration, 0);

  const toggleTask = (id: number) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const goToPrevWeek = () => setWeekOffset((o) => o - 1);
  const goToNextWeek = () => setWeekOffset((o) => o + 1);
  const goToToday = () => setWeekOffset(0);

  return {
    days,
    monthLabel,
    isCurrentWeek,
    totalTasks,
    completedTasks,
    studyMinutes,
    toggleTask,
    goToPrevWeek,
    goToNextWeek,
    goToToday,
  };
};
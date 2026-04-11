import { useState } from "react";

// import { INITIAL_TASKS } from "@/lib/plannerData";
import {
  generateWeekDays,
  getMonthLabel,
  getWeekStart,
} from "@/lib/plannerUtils";
import type { DayDescriptor } from "@/types/daydescriptor";
import { Task } from "@/types/task";
import { useTasks } from "./useTasks";

interface UsePlannerReturn {
  days: DayDescriptor[];
  monthLabel: string;
  isCurrentWeek: boolean;
  selectedDayIndex: number;
  totalTasks: number;
  completedTasks: number;
  studyMinutes: number;
  toggleTask: (id: string) => void;
  selectDay: (index: number) => void;
  goToPrevWeek: () => void;
  goToNextWeek: () => void;
  goToToday: () => void;
}

export const usePlanner = (): UsePlannerReturn => {
  const { todayTasks } = useTasks();
  const today = new Date();

  const [weekOffset, setWeekOffset] = useState<number>(0);
  const [tasks, setTasks] = useState<Task[]>(todayTasks);
  // Default to today's weekday index (0=Sun…6=Sat) so mobile opens on today
  const [selectedDayIndex, setSelectedDayIndex] = useState<number>(
    today.getDay()
  );

  const weekStart = getWeekStart(today, weekOffset);
  const days = generateWeekDays(weekStart, tasks, today);
  const monthLabel = getMonthLabel(weekStart);
  const isCurrentWeek = weekOffset === 0;

  const weekTasks = days.flatMap((d) => d.tasks);
  const totalTasks = weekTasks.length;
  const completedTasks = weekTasks.filter((t) => t.completed).length;
  const studyMinutes = weekTasks.reduce((acc, t) => acc + t.estimatedTime, 0);

  const toggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const selectDay = (index: number) => setSelectedDayIndex(index);

  const goToPrevWeek = () => {
    setWeekOffset((o) => o - 1);
    setSelectedDayIndex(0);
  };

  const goToNextWeek = () => {
    setWeekOffset((o) => o + 1);
    setSelectedDayIndex(0);
  };

  const goToToday = () => {
    setWeekOffset(0);
    setSelectedDayIndex(today.getDay());
  };

  return {
    days,
    monthLabel,
    isCurrentWeek,
    selectedDayIndex,
    totalTasks,
    completedTasks,
    studyMinutes,
    toggleTask,
    selectDay,
    goToPrevWeek,
    goToNextWeek,
    goToToday,
  };
};
import { useState } from "react";
import {
  generateWeekDays,
  getMonthLabel,
  getWeekStart,
} from "@/lib/utils/plannerUtils";
import type { DayDescriptor } from "@/types/daydescriptor";
import { useTasks } from "./useTasks";

interface UsePlannerReturn {
  days: DayDescriptor[];
  monthLabel: string;
  isCurrentWeek: boolean;
  selectedDayIndex: number;
  isLoading: boolean;
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
  const { tasks, isLoading, toggleTask } = useTasks();

  const today = new Date();
  const [weekOffset, setWeekOffset] = useState<number>(0);
  const [selectedDayIndex, setSelectedDayIndex] = useState<number>(today.getDay());

  //    generateWeekDays receives ALL tasks and filters by date internally
  const weekStart = getWeekStart(today, weekOffset);
  const days = generateWeekDays(weekStart, tasks, today);
  const monthLabel = getMonthLabel(weekStart);
  const isCurrentWeek = weekOffset === 0;

  const weekTasks = days.flatMap((d) => d.tasks);
  const totalTasks = weekTasks.length;
  const completedTasks = weekTasks.filter((t) => t.completed).length;
  const studyMinutes = weekTasks.reduce((acc, t) => acc + t.estimatedTime, 0);

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
    isLoading,
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
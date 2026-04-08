"use client";

import type { DayDescriptor } from "@/types/planner";
import DayColumn from "./DayColumn";

interface WeeklyCalendarProps {
  days: DayDescriptor[];
  onToggleTask: (id: number) => void;
}

const WeeklyCalendar = ({ days, onToggleTask }: WeeklyCalendarProps) => {
  return (
    <div className="grid grid-cols-7 gap-3 mt-6">
      {days.map((day) => (
        <DayColumn key={day.dateKey} day={day} onToggleTask={onToggleTask} />
      ))}
    </div>
  );
};

export default WeeklyCalendar;
"use client";

import type { DayDescriptor } from "@/types/daydescriptor";
import DayColumn from "./DayColumn";
import MobileDayStrip from "./MobileDayStrip";

interface WeeklyCalendarProps {
  days: DayDescriptor[];
  selectedDayIndex: number;
  isLoading: boolean;
  onToggleTask: (id: string) => void;
  onSelectDay: (index: number) => void;
}

const WeeklyCalendar = ({
  days,
  selectedDayIndex,
  isLoading,
  onToggleTask,
  onSelectDay,
}: WeeklyCalendarProps) => {
  const selectedDay = days[selectedDayIndex] ?? days[0];

  return (
    <>
      {/* Mobile */}
      <div className="lg:hidden">
        <MobileDayStrip
          days={days}
          selectedIndex={selectedDayIndex}
          onSelect={onSelectDay}
        />
        <div className="mt-3">
          {selectedDay && (
            <DayColumn
              day={selectedDay}
              onToggleTask={onToggleTask}
              isLoading={isLoading}
              fullWidth
            />
          )}
        </div>
      </div>

      {/* Desktop */}
      <div className="hidden lg:grid lg:grid-cols-7 gap-3 mt-6">
        {days.map((day) => (
          <DayColumn key={day.dateKey} day={day} onToggleTask={onToggleTask} isLoading={isLoading} />
        ))}
      </div>
    </>
  );
};

export default WeeklyCalendar;
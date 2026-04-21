"use client";

import PlannerHeader from "@/components/Planner/PlannerHeader";
import WeeklyCalendar from "@/components/Planner/WeeklyCalendar";
import WeeklySummary from "@/components/Planner/WeeklySummary";
import WeeklySummarySkeleton from "@/components/Planner/WeeklySummarySkeleton";
import { usePlanner } from "@/hooks/usePlanner";

const PlannerPage = () => {
  const {
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
  } = usePlanner();

  return (
    <div className="flex-1 min-h-screen bg-background px-8 py-8 pb-12 box-border max-md:px-4 max-md:py-5 max-sm:px-3">
      {/* Page Header */}
      <PlannerHeader
        monthLabel={monthLabel}
        isCurrentWeek={isCurrentWeek}
        onPrev={goToPrevWeek}
        onNext={goToNextWeek}
        onToday={goToToday}
      />

      {/* Weekly Calendar */}
      <WeeklyCalendar
        days={days}
        selectedDayIndex={selectedDayIndex}
        onToggleTask={toggleTask}
        onSelectDay={selectDay}
        isLoading={isLoading}
      />

      {/* Weekly Summary */}
      {isLoading ? (
        <WeeklySummarySkeleton />
      ) : (
        <WeeklySummary
          totalTasks={totalTasks}
          completedTasks={completedTasks}
          studyMinutes={studyMinutes}
        />
      )}
    </div>
  );
};

export default PlannerPage;
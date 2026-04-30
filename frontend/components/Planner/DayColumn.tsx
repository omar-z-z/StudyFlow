import { formatMinutes } from "@/lib/utils/plannerUtils";
import type { DayDescriptor } from "@/types/daydescriptor";
import TaskCard from "./PlannerTaskCard";
import PlannerTaskCardSkeleton from "../skeletonComponents/PlannerTaskCardSkeleton";

interface DayColumnProps {
  day: DayDescriptor;
  onToggleTask: (id: string) => void;
  /** When true (mobile single-day view), removes the fixed min-height constraint */
  fullWidth?: boolean;
  isLoading: boolean;
}

const DayColumn = ({
  day,
  onToggleTask,
  fullWidth = false,
  isLoading = false,
}: DayColumnProps) => {
  const { dayName, dayNumber, isToday, tasks } = day;
  const totalMinutes = tasks.reduce((acc, t) => acc + t.estimatedTime, 0);
  const timeLabel = formatMinutes(totalMinutes);
  const SKELETON_COUNTS = [3, 1, 4, 2, 3, 1, 2];

  return (
    <div
      className={`flex flex-col rounded-xl border transition-colors ${
        isToday ? "border-foreground shadow-sm" : "border-border"
      } ${fullWidth ? "min-h-[280px]" : "min-h-[420px]"}`}
    >
      {/* Day header */}
      <div className="flex flex-col items-center py-3 px-2 gap-0.5">
        <span className="text-xs text-muted-foreground font-medium tracking-wide uppercase">
          {dayName}
        </span>
        <span
          className={`text-xl font-semibold leading-tight ${
            isToday ? "text-foreground" : "text-foreground/70"
          }`}
        >
          {dayNumber}
        </span>
        {timeLabel && (
          <span className="text-xs text-muted-foreground mt-0.5">
            {timeLabel}
          </span>
        )}
      </div>

      {/* Task list */}
      <div className="flex flex-col gap-2 px-2 pb-3 flex-1">
        {isLoading ? (
          <>
            {Array.from({ length: SKELETON_COUNTS[dayNumber % SKELETON_COUNTS.length] }).map(
              (_, i) => (
                <PlannerTaskCardSkeleton key={i} />
              ),
            )}
          </>
        ) : tasks.length === 0 ? (
          <p className="text-xs text-muted-foreground text-center mt-4">
            No tasks
          </p>
        ) : (
          tasks.map((task) => (
            <TaskCard key={task.id} task={task} onToggle={onToggleTask} />
          ))
        )}
      </div>
    </div>
  );
};

export default DayColumn;

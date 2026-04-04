import { StatsCardProps } from "@/types/stat";
import TasksStats from "./stats/TsksStats";
import TimeStats from "./stats/TimeStats";
import CoursesStats from "./stats/CourseStats";

export default function StatsCard({
  title,
  type,
  tasksCompleted = 0,
  tasksTotal = 0,
  hours = 0,
  minutes = 0,
  coursesCount = 0,
}: StatsCardProps) {
  return (
    <div className="bg-card border border-border rounded-xl p-4 flex flex-col gap-3 flex-1 md:p-6 md:gap-4">
      <p className="text-sm text-muted-foreground font-medium">{title}</p>

      {type === "tasks" && (
        <TasksStats tasksCompleted={tasksCompleted} tasksTotal={tasksTotal} />
      )}
      {type === "time" && (
        <TimeStats hours={hours} minutes={minutes} />
      )}
      {type === "courses" && (
        <CoursesStats coursesCount={coursesCount} />
      )}
    </div>
  );
}
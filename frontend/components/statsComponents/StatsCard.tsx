import { StatsCardProps } from "@/types/stat";
import TasksStats from "./stats/TasksStats";
import TimeStats from "./stats/TimeStats";
import CoursesStats from "./stats/CourseStats";
import GoalStats from "./stats/GoalStats";
import RateStats from "./stats/RateStats";
import StreakStats from "./stats/StreakStats";

export default function StatsCard({
  title,
  type,
  // tasks
  tasksCompleted = 0,
  tasksTotal = 0,
  // time
  hours = 0,
  minutes = 0,
  // courses
  coursesCount = 0,
  // goal
  goalCurrent = 0,
  goalTarget = 1,
  // rate
  rate = 0,
  rateSub,
  // streak
  streakDays = 0,
  streakSub,
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
      {type === "goal" && (
        <GoalStats goalCurrent={goalCurrent} goalTarget={goalTarget} />
      )}
      {type === "rate" && (
        <RateStats rate={rate} rateSub={rateSub} />
      )}
      {type === "streak" && (
        <StreakStats streakDays={streakDays} streakSub={streakSub} />
      )}
    </div>
  );
}
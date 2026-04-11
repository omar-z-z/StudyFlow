import { StatsCardProps } from "@/types/stat";
import TasksStats from "./stats/TasksStats";
import TimeStats from "./stats/TimeStats";
import CoursesStats from "./stats/CourseStats";
import GoalStats from "./stats/GoalStats";
import RateStats from "./stats/RateStats";
import StreakStats from "./stats/StreakStats";
import {
  TasksStatIcon,
  TimeStatIcon,
  CoursesStatIcon,
  GoalStatIcon,
  RateStatIcon,
  StreakStatIcon,
} from "@/components/basicComponents/icons";

/* ── icon + color per type ──────────────────────────────── */
const iconMap: Record<StatsCardProps["type"], { icon: React.ReactNode; color: string }> = {
  tasks:   { icon: <TasksStatIcon />,   color: "text-blue-500"    },
  time:    { icon: <TimeStatIcon />,    color: "text-emerald-500" },
  courses: { icon: <CoursesStatIcon />, color: "text-purple-500"  },
  goal:    { icon: <GoalStatIcon />,    color: "text-blue-500"    },
  rate:    { icon: <RateStatIcon />,    color: "text-orange-500"  },
  streak:  { icon: <StreakStatIcon />,  color: "text-purple-500"  },
};

export default function StatsCard({
  title,
  type,
  tasksCompleted = 0,
  tasksTotal = 0,
  hours = 0,
  minutes = 0,
  coursesCount = 0,
  goalCurrent = 0,
  goalTarget = 1,
  rate = 0,
  rateSub,
  streakDays = 0,
  streakSub,
}: StatsCardProps) {
  const { icon, color } = iconMap[type];

  return (
    <div className="bg-card border border-border rounded-xl p-4 flex flex-col gap-3 flex-1 md:p-6 md:gap-4">
      <div className={`flex items-center gap-1.5 ${color}`}>
        {icon}
        <p className="text-sm text-foreground font-medium">{title}</p>
      </div>

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
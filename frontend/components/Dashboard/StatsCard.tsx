import { Clock } from "lucide-react";

interface StatsCardProps {
  title: string;
  type: "tasks" | "time" | "courses";
  tasksCompleted?: number;
  tasksTotal?: number;
  hours?: number;
  minutes?: number;
  coursesCount?: number;
}

export default function StatsCard({
  title,
  type,
  tasksCompleted = 0,
  tasksTotal = 0,
  hours = 0,
  minutes = 0,
  coursesCount = 0,
}: StatsCardProps) {
  const progress = tasksTotal > 0 ? (tasksCompleted / tasksTotal) * 100 : 0;

  return (
    <div className="bg-card border border-border rounded-xl p-4 flex flex-col gap-3 md:p-6 md:gap-4">
      <p className="text-sm text-muted-foreground font-medium">{title}</p>

      {type === "tasks" && (
        <div className="flex flex-col gap-3">
          <div className="flex items-baseline gap-1.5">
            <span className="text-3xl font-semibold text-foreground md:text-4xl">
              {tasksCompleted}
            </span>
            <span className="text-muted-foreground text-base">
              / {tasksTotal}
            </span>
          </div>
          <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-foreground rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}

      {type === "time" && (
        <div className="flex items-center gap-2 md:gap-3">
          <Clock className="w-4 h-4 text-muted-foreground shrink-0 md:w-5 md:h-5" />
          <div className="flex items-baseline gap-1 flex-wrap">
            <span className="text-3xl font-semibold text-foreground md:text-4xl">
              {hours}
            </span>
            <span className="text-muted-foreground text-xs md:text-sm">hours</span>
            <span className="text-3xl font-semibold text-foreground ml-1 md:text-4xl">
              {minutes}
            </span>
            <span className="text-muted-foreground text-xs md:text-sm">min</span>
          </div>
        </div>
      )}

      {type === "courses" && (
        <div className="flex items-baseline gap-1.5">
          <span className="text-3xl font-semibold text-foreground md:text-4xl">
            {coursesCount}
          </span>
          <span className="text-muted-foreground text-base">courses</span>
        </div>
      )}
    </div>
  );
}
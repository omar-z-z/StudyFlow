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
    <div className="bg-card border border-border rounded-xl p-6 flex flex-col gap-4 flex-1">
      <p className="text-sm text-muted-foreground font-medium">{title}</p>

      {type === "tasks" && (
        <div className="flex flex-col gap-3">
          <div className="flex items-baseline gap-1.5">
            <span className="text-4xl font-semibold text-foreground">
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
        <div className="flex items-center gap-3">
          <Clock className="w-5 h-5 text-muted-foreground shrink-0" />
          <div className="flex items-baseline gap-1">
            <span className="text-4xl font-semibold text-foreground">
              {hours}
            </span>
            <span className="text-muted-foreground text-sm">hours</span>
            <span className="text-4xl font-semibold text-foreground ml-1">
              {minutes}
            </span>
            <span className="text-muted-foreground text-sm">min</span>
          </div>
        </div>
      )}

      {type === "courses" && (
        <div className="flex items-baseline gap-1.5">
          <span className="text-4xl font-semibold text-foreground">
            {coursesCount}
          </span>
          <span className="text-muted-foreground text-base">courses</span>
        </div>
      )}
    </div>
  );
}
interface TasksStatsProps {
  tasksCompleted: number;
  tasksTotal: number;
}

export default function TasksStats({ tasksCompleted, tasksTotal }: TasksStatsProps) {
  const progress = tasksTotal > 0 ? (tasksCompleted / tasksTotal) * 100 : 0;

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-baseline gap-1.5">
        <span className="text-3xl font-semibold text-foreground md:text-4xl">
          {tasksCompleted}
        </span>
        <span className="text-muted-foreground text-base">/ {tasksTotal}</span>
      </div>
      <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
        <div
          className="h-full bg-foreground rounded-full transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
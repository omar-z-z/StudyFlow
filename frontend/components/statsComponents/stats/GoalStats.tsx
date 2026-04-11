interface GoalStatsProps {
  goalCurrent: number;
  goalTarget: number;
}

export default function GoalStats({ goalCurrent, goalTarget }: GoalStatsProps) {
  const progress = Math.min(goalCurrent / goalTarget, 1);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-baseline gap-1.5">
        <span className="text-3xl font-semibold text-foreground md:text-4xl">
          {goalCurrent}
        </span>
        <span className="text-muted-foreground text-base">/ {goalTarget}</span>
      </div>

      {/* progress bar */}
      <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
        <div
          className="h-full rounded-full bg-foreground transition-all duration-500"
          style={{ width: `${progress * 100}%` }}
        />
      </div>
    </div>
  );
}
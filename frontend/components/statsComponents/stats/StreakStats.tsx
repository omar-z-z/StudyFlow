interface StreakStatsProps {
  streakDays: number;
  streakSub?: string;
}

export default function StreakStats({ streakDays, streakSub }: StreakStatsProps) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-3xl font-semibold text-foreground md:text-4xl">
        {streakDays}
      </span>
      {streakSub && (
        <span className="text-xs text-muted-foreground">{streakSub}</span>
      )}
    </div>
  );
}
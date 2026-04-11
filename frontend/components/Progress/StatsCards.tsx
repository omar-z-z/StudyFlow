import { ProgressData } from "@/types/progress";

/* ── tiny SVG icons ─────────────────────────────────────── */
const GoalIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
    <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="2" />
    <circle cx="12" cy="12" r="1.5" fill="currentColor" />
  </svg>
);

const ClockIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
    <path d="M12 7v5l3 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const TrendIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
    <path d="M4 16l5-5 4 4 7-8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const StreakIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
    <path d="M12 2C12 2 7 8 7 13a5 5 0 0010 0c0-5-5-11-5-11z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
  </svg>
);

const iconMap = {
  goal: { icon: <GoalIcon />, color: "text-blue-500" },
  clock: { icon: <ClockIcon />, color: "text-emerald-500" },
  chart: { icon: <TrendIcon />, color: "text-orange-500" },
  streak: { icon: <StreakIcon />, color: "text-purple-500" },
};

/* ── single card ────────────────────────────────────────── */
interface CardProps {
  label: string;
  children: React.ReactNode;
  iconKey: keyof typeof iconMap;
}

const Card = ({ label, children, iconKey }: CardProps) => {
  const { icon, color } = iconMap[iconKey];
  return (
    <div className="flex-1 min-w-[160px] bg-card border border-border rounded-xl p-5 flex flex-col gap-3">
      <div className={`flex items-center gap-2 text-sm font-medium text-muted-foreground ${color}`}>
        {icon}
        <span className="text-foreground">{label}</span>
      </div>
      {children}
    </div>
  );
};

/* ── thin progress bar ──────────────────────────────────── */
const Bar = ({ value }: { value: number }) => (
  <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
    <div
      className="h-full rounded-full bg-foreground transition-all duration-500"
      style={{ width: `${Math.min(value * 100, 100)}%` }}
    />
  </div>
);

/* ── exported component ─────────────────────────────────── */
interface StatsCardsProps {
  stats: ProgressData["stats"];
}

const StatsCards = ({ stats }: StatsCardsProps) => {
  const {
    weeklyGoal,
    weeklyGoalTarget,
    studyHours,
    studyHoursTarget,
    completionRate,
    currentStreak,
  } = stats;

  return (
    <div className="flex gap-4 flex-wrap">
      {/* Weekly Goal */}
      <Card label="Weekly Goal" iconKey="goal">
        <div className="flex flex-col gap-2">
          <span className="text-3xl font-semibold text-foreground leading-none">
            {weeklyGoal}
            <span className="text-base font-normal text-muted-foreground ml-1">
              / {weeklyGoalTarget}
            </span>
          </span>
          <Bar value={weeklyGoal / weeklyGoalTarget} />
        </div>
      </Card>

      {/* Study Hours */}
      <Card label="Study Hours" iconKey="clock">
        <div className="flex flex-col gap-2">
          <span className="text-3xl font-semibold text-foreground leading-none">
            {studyHours}
            <span className="text-base font-normal text-muted-foreground ml-1">
              / {studyHoursTarget}h
            </span>
          </span>
          <Bar value={studyHours / studyHoursTarget} />
        </div>
      </Card>

      {/* Completion Rate */}
      <Card label="Completion Rate" iconKey="chart">
        <div className="flex flex-col gap-1">
          <span className="text-3xl font-semibold text-foreground leading-none">
            {completionRate}%
          </span>
          <span className="text-xs text-muted-foreground">This week</span>
        </div>
      </Card>

      {/* Current Streak */}
      <Card label="Current Streak" iconKey="streak">
        <div className="flex flex-col gap-1">
          <span className="text-3xl font-semibold text-foreground leading-none">
            {currentStreak}
          </span>
          <span className="text-xs text-muted-foreground">Days in a row</span>
        </div>
      </Card>
    </div>
  );
};

export default StatsCards;
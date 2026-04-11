import StatsCard from "@/components/statsComponents/StatsCard";
import { ProgressData } from "@/types/progress";

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
      <StatsCard
        title="Weekly Goal"
        type="goal"
        goalCurrent={weeklyGoal}
        goalTarget={weeklyGoalTarget}
      />
      <StatsCard
        title="Study Hours"
        type="goal"
        goalCurrent={studyHours}
        goalTarget={studyHoursTarget}
      />
      <StatsCard
        title="Completion Rate"
        type="rate"
        rate={completionRate}
        rateSub="This week"
      />
      <StatsCard
        title="Current Streak"
        type="streak"
        streakDays={currentStreak}
        streakSub="Days in a row"
      />
    </div>
  );
};

export default StatsCards;
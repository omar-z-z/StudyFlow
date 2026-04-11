import { ProgressData } from "@/types/progress";

interface MotivationBannerProps {
  summary: ProgressData["summary"];
}

const TargetEmoji = () => (
  <div className="text-4xl leading-none select-none" aria-hidden>
    🎯
  </div>
);

const MotivationBanner = ({ summary }: MotivationBannerProps) => {
  const stats = [
    { value: summary.tasksDone, label: "Tasks Done" },
    { value: summary.dayStreak, label: "Day Streak" },
    { value: `${summary.studyTime}h`, label: "Study Time" },
  ];

  return (
    <div className="bg-secondary/60 border border-border rounded-xl p-8 flex flex-col items-center gap-4 text-center">
      <TargetEmoji />

      <div className="flex flex-col gap-1">
        <h2 className="text-lg font-semibold text-foreground">
          Keep Up the Great Work!
        </h2>
        <p className="text-sm text-muted-foreground max-w-xs leading-relaxed">
          You&apos;re making excellent progress across all your courses.
          Maintain this momentum to achieve your academic goals!
        </p>
      </div>

      {/* Summary stats row */}
      <div className="flex items-center gap-10 mt-2">
        {stats.map((s, i) => (
          <div key={i} className="flex flex-col items-center gap-0.5">
            <span className="text-2xl font-semibold text-foreground">{s.value}</span>
            <span className="text-xs text-muted-foreground">{s.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MotivationBanner;
interface ProgressBannerProps {
  completed: number;
  total: number;
}

const ProgressBanner = ({ completed, total }: ProgressBannerProps) => {
  if (completed === 0) return null;

  const allDone = completed === total && total > 0;

  return (
    <div
      className={`mt-6 rounded-xl p-6 text-center border ${
        allDone
          ? "bg-emerald-50 border-emerald-200 dark:bg-emerald-950/30 dark:border-emerald-800"
          : "bg-emerald-50 border-emerald-200 dark:bg-emerald-950/30 dark:border-emerald-800"
      }`}
    >
      <div className="text-3xl mb-2" aria-hidden="true">
        {allDone ? "🎉" : "🎉"}
      </div>
      <p className="text-sm font-semibold text-emerald-800 dark:text-emerald-300 mb-1">
        {allDone ? "All Done!" : "Great Progress!"}
      </p>
      <p className="text-xs text-emerald-700 dark:text-emerald-400">
        {allDone
          ? `You've completed all ${total} tasks today. Amazing work!`
          : `You've completed ${completed} task${completed > 1 ? "s" : ""} today. Keep it up!`}
      </p>
    </div>
  );
};

export default ProgressBanner;
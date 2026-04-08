"use client";

interface StatCardProps {
  label: string;
  value: string | number;
  highlight?: boolean;
}

const StatCard = ({ label, value, highlight = false }: StatCardProps) => (
  <div className="flex flex-col gap-1">
    <span className="text-sm text-muted-foreground">{label}</span>
    <span
      className={`text-3xl font-semibold ${
        highlight ? "text-green-500" : "text-foreground"
      }`}
    >
      {value}
    </span>
  </div>
);

interface WeeklySummaryProps {
  totalTasks: number;
  completedTasks: number;
  studyMinutes: number;
}

const WeeklySummary = ({
  totalTasks,
  completedTasks,
  studyMinutes,
}: WeeklySummaryProps) => {
  const studyHours = Math.round(studyMinutes / 60);

  return (
    <div className="mt-6 rounded-xl border border-border bg-card p-6">
      <h2 className="text-base font-semibold text-foreground mb-5">
        Weekly Summary
      </h2>

      <div className="grid grid-cols-3 divide-x divide-border">
        <div className="pr-8">
          <StatCard label="Total Tasks" value={totalTasks} />
        </div>
        <div className="px-8">
          <StatCard label="Completed" value={completedTasks} highlight />
        </div>
        <div className="pl-8">
          <StatCard label="Study Hours" value={`${studyHours}h`} />
        </div>
      </div>
    </div>
  );
};

export default WeeklySummary;
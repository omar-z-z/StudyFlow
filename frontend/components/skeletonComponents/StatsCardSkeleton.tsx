const StatsCardsSkeleton = ({ structure }: { structure: { goal: number; simple: number } }) => {
  const defaultStructure = {
    goal: 2,
    simple: 2,
  };

  const { goal, simple } = { ...defaultStructure, ...structure };

  return (
    <div className="flex gap-4 flex-wrap gap-3 mb-6">
      {/* Goal cards */}
      {Array.from({ length: goal }).map((_, i) => (
        <div
          key={`goal-${i}`}
          className="flex-1 min-w-[140px] bg-card border border-border rounded-xl p-5 flex flex-col gap-3.5"
        >
          <div className="h-2.5 w-20 bg-muted animate-pulse rounded-md" />
          <div className="h-7 w-14 bg-muted animate-pulse rounded-md" />
          <div className="h-1.5 w-full bg-muted animate-pulse rounded-full" />
          <div className="h-2 w-14 bg-muted animate-pulse rounded-md" />
        </div>
      ))}

      {/* Simple cards */}
      {Array.from({ length: simple }).map((_, i) => (
        <div
          key={`simple-${i}`}
          className="flex-1 min-w-[140px] bg-card border border-border rounded-xl p-5 flex flex-col gap-3.5"
        >
          <div className="h-2.5 w-24 bg-muted animate-pulse rounded-md" />
          <div className="h-7 w-12 bg-muted animate-pulse rounded-md" />
          <div className="h-2 w-16 bg-muted animate-pulse rounded-md" />
        </div>
      ))}
    </div>
  );
};

export default StatsCardsSkeleton;
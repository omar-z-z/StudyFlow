const PlannerTaskCardSkeleton = () => (
  <div className="flex items-start gap-2 rounded-lg border border-border bg-card p-2">
    {/* Checkbox */}
    <div className="mt-0.5 shrink-0 w-4 h-4 rounded border border-border bg-muted animate-pulse" />

    {/* Content */}
    <div className="flex-1 flex flex-col gap-1.5">
      {/* Title */}
      <div className="h-2.5 w-4/5 bg-muted animate-pulse rounded-md" />

      {/* Color dot + time */}
      <div className="flex items-center gap-1">
        <div className="w-2 h-2 rounded-full bg-muted animate-pulse shrink-0" />
        <div className="h-2 w-10 bg-muted animate-pulse rounded-md" />
      </div>
    </div>
  </div>
);

export default PlannerTaskCardSkeleton;
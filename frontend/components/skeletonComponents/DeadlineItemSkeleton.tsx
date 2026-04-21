const DeadlineItemSkeleton = () => (
  <div className="flex items-start gap-3 pb-3 border-b border-border last:border-0 last:pb-0">
    {/* AlertCircle icon */}
    <div className="w-4 h-4 mt-0.5 shrink-0 rounded-full bg-muted animate-pulse" />

    {/* Title + date */}
    <div className="flex flex-col gap-1.5 min-w-0 flex-1">
      <div className="h-3 bg-muted animate-pulse rounded-md" style={{ width: "70%" }} />
      <div className="flex items-center gap-1.5">
        <div className="w-3 h-3 shrink-0 bg-muted animate-pulse rounded-sm" />
        <div className="h-2.5 w-20 bg-muted animate-pulse rounded-md" />
      </div>
    </div>
  </div>
);

export default DeadlineItemSkeleton;
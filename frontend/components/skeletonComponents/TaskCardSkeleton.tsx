const TaskCardSkeleton = () => (
  <div className="flex items-start gap-3 p-4 bg-card border border-border rounded-xl">

    {/* Checkbox */}
    <div className="mt-0.5 shrink-0 w-5 h-5 rounded-md bg-muted animate-pulse" />

    {/* Content */}
    <div className="flex-1 flex flex-col gap-2">

      {/* Title */}
      <div className="h-3.5 w-3/4 bg-muted animate-pulse rounded-md" />

      {/* Course row */}
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-muted animate-pulse shrink-0" />
        <div className="h-2.5 w-24 bg-muted animate-pulse rounded-md" />
      </div>

      {/* Badges row */}
      <div className="flex items-center gap-2 mt-0.5">
        <div className="h-2.5 w-16 bg-muted animate-pulse rounded-md" />
        <div className="h-4 w-12 bg-muted animate-pulse rounded-full" />
        <div className="h-4 w-14 bg-muted animate-pulse rounded-full" />
      </div>

    </div>
  </div>
);

export default TaskCardSkeleton;
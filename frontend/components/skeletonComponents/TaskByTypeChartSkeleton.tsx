const TasksByTypeChartSkeleton = () => (
  <div className="bg-card border border-border rounded-xl p-5 flex flex-col gap-4 flex-1 min-w-[240px]">
    <div className="h-3 w-24 bg-muted animate-pulse rounded-md" />

    <div className="flex flex-col items-center gap-4">
      {/* Pie circle */}
      <div className="w-[150px] h-[150px] rounded-full bg-muted animate-pulse" />

      {/* Legend grid */}
      <div className="grid grid-cols-2 gap-x-6 gap-y-2 w-full">
        {[72, 60, 66, 56].map((w, i) => (
          <div key={i} className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-muted animate-pulse shrink-0" />
            <div className="h-2 bg-muted animate-pulse rounded-md" style={{ width: w }} />
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default TasksByTypeChartSkeleton;
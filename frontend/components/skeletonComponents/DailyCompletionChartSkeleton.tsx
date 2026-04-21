const HEIGHTS = [60, 30, 80, 45, 70, 20, 50];

const DailyCompletionChartSkeleton = () => (
  <div className="bg-card border border-border rounded-xl p-5 flex flex-col gap-4 flex-1 min-w-[280px]">
    <div className="h-3 w-32 bg-muted animate-pulse rounded-md" />

    {/* Bar chart placeholder */}
    <div className="flex items-end gap-1.5 h-[220px] pt-2">
      {HEIGHTS.map((h, i) => (
        <div
          key={i}
          className="flex-1 bg-muted animate-pulse rounded-t-md"
          style={{ height: `${h}%` }}
        />
      ))}
    </div>

    {/* Legend */}
    <div className="flex gap-4">
      {[70, 56].map((w, i) => (
        <div key={i} className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-muted animate-pulse" />
          <div className="h-2 bg-muted animate-pulse rounded-md" style={{ width: w }} />
        </div>
      ))}
    </div>
  </div>
);

export default DailyCompletionChartSkeleton;
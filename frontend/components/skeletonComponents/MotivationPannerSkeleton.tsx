const MotivationBannerSkeleton = () => (
  <div className="bg-secondary/60 border border-border rounded-xl p-8 flex flex-col items-center gap-4">
    {/* Emoji circle */}
    <div className="w-11 h-11 rounded-full bg-muted animate-pulse" />

    {/* Heading + description */}
    <div className="flex flex-col items-center gap-2">
      <div className="h-4 w-48 bg-muted animate-pulse rounded-md" />
      <div className="h-3 w-64 bg-muted animate-pulse rounded-md" />
      <div className="h-3 w-52 bg-muted animate-pulse rounded-md" />
    </div>

    {/* 3 stats */}
    <div className="flex items-center gap-10 mt-2">
      {[40, 32, 40].map((w, i) => (
        <div key={i} className="flex flex-col items-center gap-1.5">
          <div className="h-6 bg-muted animate-pulse rounded-md" style={{ width: w }} />
          <div className="h-2 w-14 bg-muted animate-pulse rounded-md" />
        </div>
      ))}
    </div>
  </div>
);

export default MotivationBannerSkeleton;
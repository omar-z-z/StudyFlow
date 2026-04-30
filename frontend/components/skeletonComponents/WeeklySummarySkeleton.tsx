const WeeklySummarySkeleton = () => (
  <div className="mt-6 rounded-xl border border-border bg-card p-6 max-sm:p-4">
    <div className="h-3.5 w-28 bg-muted animate-pulse rounded-md mb-5" />

    {/* Desktop */}
    <div className="hidden sm:grid sm:grid-cols-3 sm:divide-x sm:divide-border">
      {[0, 1, 2].map((i) => (
        <div key={i} className={i === 0 ? "pr-8" : i === 1 ? "px-8" : "pl-8"}>
          <div className="h-2.5 w-20 bg-muted animate-pulse rounded-md mb-2" />
          <div className="h-8 w-12 bg-muted animate-pulse rounded-md" />
        </div>
      ))}
    </div>

    {/* Mobile */}
    <div className="flex flex-col gap-5 sm:hidden">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className={`flex justify-between items-center ${i < 2 ? "border-b border-border pb-4" : ""}`}
        >
          <div className="h-2.5 w-20 bg-muted animate-pulse rounded-md" />
          <div className="h-7 w-10 bg-muted animate-pulse rounded-md" />
        </div>
      ))}
    </div>
  </div>
);

export default WeeklySummarySkeleton;
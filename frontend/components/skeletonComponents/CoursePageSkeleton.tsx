// A reusable shimmer block
const Shimmer = ({ className }: { className: string }) => (
  <div className={`bg-muted animate-pulse rounded ${className}`} />
);

const CoursePageSkeleton = () => (
  <div className="mx-auto px-4 py-6 sm:py-8">
    {/* Back button */}
    <Shimmer className="h-4 w-28 mb-5" />

    {/* ── CourseHeader skeleton ── */}
    <div className="bg-card border border-border rounded-(--radius-xl) p-5 sm:p-6 mb-5">
      <div className="flex items-start justify-between gap-3 mb-4">
        {/* Icon + name */}
        <div className="flex items-center gap-3">
          <Shimmer className="w-10 h-10 sm:w-12 sm:h-12 rounded-(--radius) shrink-0" />
          <div className="flex flex-col gap-2">
            <Shimmer className="h-5 w-40" />
            <Shimmer className="h-3 w-24" />
          </div>
        </div>
        {/* Edit / Delete buttons */}
        <div className="flex gap-1.5 shrink-0">
          <Shimmer className="h-7 w-16 rounded-(--radius)" />
          <Shimmer className="h-7 w-16 rounded-(--radius)" />
        </div>
      </div>
      {/* Progress label + bar */}
      <Shimmer className="h-3 w-16 mb-2" />
      <Shimmer className="h-2 w-full rounded-full" />
    </div>

    {/* ── Topics + Assignments grid skeleton ── */}
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
      {/* Topics */}
      <div className="bg-card border border-border rounded-(--radius-xl) p-5">
        <div className="flex items-center justify-between mb-3">
          <Shimmer className="h-3 w-14" />
          <Shimmer className="h-3 w-8" />
        </div>
        <div className="flex flex-col gap-2.5">
          {[...Array(7)].map((_, i) => (
            <div key={i} className="flex items-center gap-2.5">
              <Shimmer className="w-4 h-4 rounded shrink-0" />
              <Shimmer className="h-3 flex-1" />
            </div>
          ))}
        </div>
      </div>

      {/* Assignments */}
      <div className="bg-card border border-border rounded-(--radius-xl) p-5">
        <div className="flex items-center justify-between mb-3">
          <Shimmer className="h-3 w-20" />
          <Shimmer className="h-3 w-8" />
        </div>
        <div className="flex flex-col gap-2.5">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex items-center gap-4">
              <Shimmer className="w-4 h-4 rounded shrink-0" />
              <Shimmer className="h-3 flex-1" />
              <Shimmer className="h-3 w-16 shrink-0" />
            </div>
          ))}
        </div>
      </div>
    </div>

    {/* ── Tasks section skeleton ── */}
    <div className="bg-card border border-border rounded-(--radius-xl) p-5">
      <div className="flex items-center justify-between mb-3">
        <Shimmer className="h-3 w-10" />
        <Shimmer className="h-3 w-12" />
      </div>
      <div className="flex flex-col">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="flex items-center gap-3 py-2.5 border-b border-border last:border-0"
          >
            <Shimmer className="w-5 h-5 rounded-md shrink-0" />
            <div className="flex-1 flex flex-col gap-1.5">
              <Shimmer className="h-3.5 w-3/4" />
              <Shimmer className="h-2.5 w-24" />
            </div>
            <Shimmer className="h-6 w-6 rounded shrink-0" />
            <Shimmer className="h-6 w-6 rounded shrink-0" />
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default CoursePageSkeleton;
const CourseCardSkeleton = () => (
  <div className="bg-card border border-border rounded-(--radius-xl) p-6 mb-5">

    {/* Card Header  */}
    <div className="flex items-start justify-between gap-4 mb-3.5">

      <div className="flex items-center gap-3.5">
        <div className="w-11 h-11 rounded-(--radius) bg-muted animate-pulse shrink-0" />

        <div className="flex flex-col gap-1.5">
          <div className="h-3.5 w-40 bg-muted animate-pulse rounded-md" />
          <div className="h-2.5 w-24 bg-muted animate-pulse rounded-md" />
        </div>
      </div>

      <div className="flex flex-col items-end gap-1.5 shrink-0">
        <div className="h-6 w-11 bg-muted animate-pulse rounded-md" />
        <div className="h-2.5 w-14 bg-muted animate-pulse rounded-md" />
      </div>
    </div>

    {/* Progress Bar  */}
    <div className="h-1.5 w-full bg-muted animate-pulse rounded-full mb-5" />

    {/* Body Grid: Topics + Assignments */}
    <div className="grid grid-cols-2 gap-8 max-md:grid-cols-1 max-md:gap-5">

      {/* Topics column */}
      <div>
        <div className="h-2.5 w-14 bg-muted animate-pulse rounded-md mb-2.5" />
        <div className="flex flex-col gap-2.5">
          {[70, 55, 80].map((w, i) => (
            <div key={i} className="flex items-center gap-2.5">
              <div className="h-3.5 w-3.5 bg-muted animate-pulse rounded-sm shrink-0" />
              <div className="h-3 bg-muted animate-pulse rounded-md" style={{ width: `${w}%` }} />
            </div>
          ))}
        </div>
      </div>

      {/* Assignments column */}
      <div>
        <div className="h-2.5 w-14 bg-muted animate-pulse rounded-md mb-2.5" />
        <div className="flex flex-col gap-2.5">
          {[60, 75].map((w, i) => (
            <div key={i} className="flex items-center gap-2.5">
              <div className="h-3.5 w-3.5 bg-muted animate-pulse rounded-sm shrink-0" />
              <div className="h-3 bg-muted animate-pulse rounded-md" style={{ width: `${w}%` }} />
            </div>
          ))}
        </div>
      </div>

    </div>
  </div>
);

export default CourseCardSkeleton;
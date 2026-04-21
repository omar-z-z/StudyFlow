const CourseProgressSkeleton = () => (
  <div className="bg-card border border-border rounded-xl p-5 flex flex-col gap-4">
    <div className="h-3 w-28 bg-muted animate-pulse rounded-md" />

    <div className="flex flex-col gap-4">
      {[130, 110, 150, 114, 140].map((w, i) => (
        <div key={i} className="flex flex-col gap-1.5">
          <div className="flex justify-between items-center">
            <div className="h-2.5 bg-muted animate-pulse rounded-md" style={{ width: w }} />
            <div className="h-2.5 w-8 bg-muted animate-pulse rounded-md" />
          </div>
          <div className="h-1.5 w-full bg-muted animate-pulse rounded-full" />
        </div>
      ))}
    </div>
  </div>
);

export default CourseProgressSkeleton;
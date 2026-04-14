interface CoursesStatsProps {
  coursesCount: number;
}

export default function CoursesStats({ coursesCount }: CoursesStatsProps) {
  return (
    <div className="flex items-baseline gap-1.5">
      <span className="text-3xl font-semibold text-foreground md:text-4xl">
        {coursesCount}
      </span>
      <span className="text-muted-foreground text-base">courses</span>
    </div>
  );
}
import { CourseProgress } from "@/types/progress";

interface CourseProgressListProps {
  courses: CourseProgress[];
}

/* Color for percentage label based on value */
const percentageColor = (pct: number) => {
  if (pct >= 70) return "text-[#F59E0B]"; // amber — high
  if (pct >= 50) return "text-[#4E9AF1]"; // blue — mid
  return "text-[#2DBF8A]"; // green — lower
};

const CourseProgressList = ({ courses }: CourseProgressListProps) => {
  return (
    <div className="bg-card border border-border rounded-xl p-5 flex flex-col gap-5">
      <h2 className="text-base font-medium text-foreground">Course Progress</h2>

      <div className="flex flex-col gap-5">
        {courses.map((course) => (
          <div key={course.id} className="flex flex-col gap-2">
            {/* Header row */}
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3 min-w-0">
                {/* Colored icon badge */}
                <span
                  className="w-8 h-8 rounded-lg flex-shrink-0"
                  style={{ backgroundColor: course.color }}
                />
                <div className="min-w-0">
                  <p className="text-sm font-medium text-foreground leading-tight truncate">
                    {course.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {course.topicsCompleted} / {course.topicsTotal} topics completed
                  </p>
                </div>
              </div>
              <span
                className={`text-sm font-semibold flex-shrink-0 ${percentageColor(
                  course.percentage
                )}`}
              >
                {course.percentage}%
              </span>
            </div>

            {/* Progress bar */}
            <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
              <div
                className="h-full rounded-full bg-foreground transition-all duration-500"
                style={{ width: `${course.percentage}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseProgressList;
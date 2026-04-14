import { Course } from "@/types/course";

interface CourseProgressItemProps {
  course: Course;
  variant?: "simple" | "detailed";
}

export default function CourseProgressItem({
  course,
  variant = "simple",
}: CourseProgressItemProps) {
  const getTopicStats = () => {
    const topicsCompleted = course.topics.filter((t) => t.completed).length;
    const topicsTotal = course.topics.length;

    const assignmentsCompleted = course.assignments.filter(
      (a) => a.completed,
    ).length;
    const assignmentsTotal = course.assignments.length;

    return {
      completed: topicsCompleted + assignmentsCompleted,
      total: topicsTotal + assignmentsTotal,
    };
  };

  const { completed, total } = getTopicStats();

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 min-w-0">
          {/* Badge */}
          {variant === "detailed" ? (
            <span
              className="w-8 h-8 rounded-lg shrink-0"
              style={{ backgroundColor: course.color }}
            />
          ) : (
            <span
              className="w-2.5 h-2.5 rounded-full shrink-0"
              style={{ backgroundColor: course.color }}
            />
          )}

          <div className="min-w-0">
            <p className="text-sm text-foreground truncate">{course.name}</p>

            {variant === "detailed" && (
              <p className="text-xs text-muted-foreground">
                {completed} / {total} items completed
              </p>
            )}
          </div>
        </div>

        {/* Percentage */}
        <span
          className="text-md font-medium shrink-0"
          style={{ color: course.color }}
        >
          {course.progress}%
        </span>
      </div>

      {/* Progress bar */}
      <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
        <div
          className="h-full bg-foreground rounded-full transition-all duration-700"
          style={{
            width: `${course.progress}%`,
          }}
        />
      </div>
    </div>
  );
}
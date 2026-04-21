import CourseProgressItem from "./CourseProgressItem";
import { useCourses } from "@/hooks/useCourses";
import CourseProgressSkeleton from "./CourseProgressSkeleton";

export default function CourseProgress({
  variant = "simple",
}: {
  variant?: "simple" | "detailed";
}) {
  const { courses, isLoading } = useCourses();

  return (
    <>
      {isLoading ? (
        <CourseProgressSkeleton />
      ) : (
        <div className="bg-card border border-border rounded-xl p-4 md:p-6">
          <h2
            className={`text-base ${variant === "detailed" ? "font-medium" : "font-semibold"} text-foreground mb-4`}
          >
            Course Progress
          </h2>

          <div className="flex flex-col gap-4">
            {courses.map((course) => (
              <CourseProgressItem
                key={course.id}
                course={course}
                variant={variant}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
}

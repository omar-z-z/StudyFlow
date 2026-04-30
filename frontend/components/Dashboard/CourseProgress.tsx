import { Course } from "@/types/course";
import CourseProgressItem from "./CourseProgressItem";

interface CourseProgressProps {
  courses: Course[];
  variant?: "simple" | "detailed";
}

export default function CourseProgress({
  courses,
  variant = "simple",
}: CourseProgressProps) {
  return (
    <div className="bg-card border border-border rounded-xl p-4 md:p-6">
      <h2 className="text-base font-semibold text-foreground mb-4">
        Course Progress
      </h2>
      <div className="flex flex-col gap-4">
        {courses.map((course) => (
          <CourseProgressItem key={course.id} course={course} variant={variant} />
        ))}
      </div>
    </div>
  );
}
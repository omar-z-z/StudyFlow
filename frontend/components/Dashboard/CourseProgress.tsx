interface Course {
  name: string;
  color: string;
  progress: number;
}

const courses: Course[] = [
  {
    name: "Data Structures & Algorithms",
    color: "bg-blue-500",
    progress: 65,
  },
  {
    name: "Machine Learning",
    color: "bg-green-500",
    progress: 40,
  },
  {
    name: "Web Development",
    color: "bg-yellow-500",
    progress: 75,
  },
];

export default function CourseProgress() {
  return (
    <div className="bg-card border border-border rounded-xl p-6">
      <h2 className="text-base font-semibold text-foreground mb-4">
        Course Progress
      </h2>
      <div className="flex flex-col gap-4">
        {courses.map((course) => (
          <div key={course.name} className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span
                  className={`w-2.5 h-2.5 rounded-full shrink-0 ${course.color}`}
                />
                <span className="text-sm text-foreground">{course.name}</span>
              </div>
              <span className="text-sm font-medium text-foreground">
                {course.progress}%
              </span>
            </div>
            <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-foreground rounded-full transition-all duration-700"
                style={{ width: `${course.progress}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
"use client";
import { useTasks } from "@/hooks/useTasks";
// import { courses } from "@/lib/dummy-data";
import CourseProgress from "@/components/Dashboard/CourseProgress";
import DashboardHeader from "@/components/Dashboard/DashboardHeader";
import StatsCard from "@/components/statsComponents/StatsCard";
import TasksList from "@/components/Dashboard/TasksList";
import UpcomingDeadlines from "@/components/Dashboard/UpcomingDeadlines";
import { useCourses } from "@/hooks/useCourses";
import StatsCardsSkeleton from "@/components/skeletonComponents/StatsCardSkeleton";

export default function DashboardPage() {
  const { pendingTasks, isLoading, todayTasks, completedTasks, toggleTask } =
    useTasks();
  const { courses } = useCourses();

  const tasksCompleted = completedTasks.length;
  const tasksTotal = todayTasks.length;
  const studyTimeMinutes = todayTasks
    .filter((t) => t.completed)
    .reduce((sum, t) => sum + t.estimatedTime, 0);
  const studyHours = Math.floor(studyTimeMinutes / 60);
  const studyMinutes = studyTimeMinutes % 60;
  const coursesCount = courses.length;
  return (
    <main className="flex-1 overflow-auto px-8 py-8">
      {/* Header */}
      <DashboardHeader name="Omar" />

      {/* Stats Row — single column on mobile, 3 columns on sm+ */}
      {isLoading ? (
        <StatsCardsSkeleton structure={{ goal: 2, simple: 1 }} />
      ) : (
        <div className="grid grid-cols-1 gap-3 mb-6 sm:grid-cols-3 sm:gap-4">
          <StatsCard
            title="Tasks Today"
            type="tasks"
            tasksCompleted={tasksCompleted}
            tasksTotal={tasksTotal}
          />
          <StatsCard
            title="Study Time Today"
            type="time"
            hours={studyHours}
            minutes={studyMinutes}
          />
          <StatsCard
            title="Active Courses"
            type="courses"
            coursesCount={coursesCount}
          />
        </div>
      )}

      {/* Bottom Layout — stacked on mobile, two columns on lg+ */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start">
        {/* Tasks List */}
        <div className="w-full lg:flex-[1.6] lg:min-w-0">
          <TasksList
            tasks={todayTasks}
            isLoading={isLoading}
            onToggle={toggleTask}
          />
        </div>

        {/* Progress + Deadlines */}
        <div className="w-full lg:flex-1 lg:min-w-0 flex flex-col gap-4">
          <CourseProgress />
          <UpcomingDeadlines />
        </div>
      </div>
    </main>
  );
}

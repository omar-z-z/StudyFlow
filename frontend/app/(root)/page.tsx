import CourseProgress from "@/components/Dashboard/CourseProgress";
import DashboardHeader from "@/components/Dashboard/DashboardHeader";
import StatsCard from "@/components/Dashboard/StatsCard";
import TasksList from "@/components/Dashboard/TasksList";
import UpcomingDeadlines from "@/components/Dashboard/UpcomingDeadlines";

export default function DashboardPage() {
  return (
    <main className="flex-1 overflow-auto px-8 py-8">
      {/* Header */}
      <DashboardHeader name="Omar" />

      {/* Stats Row — single column on mobile, 3 columns on sm+ */}
      <div className="grid grid-cols-1 gap-3 mb-6 sm:grid-cols-3 sm:gap-4">
        <StatsCard
          title="Tasks Today"
          type="tasks"
          tasksCompleted={2}
          tasksTotal={5}
        />
        <StatsCard
          title="Study Time Today"
          type="time"
          hours={4}
          minutes={35}
        />
        <StatsCard title="Active Courses" type="courses" coursesCount={3} />
      </div>

      {/* Bottom Layout — stacked on mobile, two columns on lg+ */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start">
        {/* Tasks List */}
        <div className="w-full lg:flex-[1.6] lg:min-w-0">
          <TasksList />
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

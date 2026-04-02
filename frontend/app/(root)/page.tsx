import CourseProgress from "@/components/Dashboard/CourseProgress";
import DashboardHeader from "@/components/Dashboard/DashboardHeader";
import StatsCard from "@/components/Dashboard/StatsCard";
import TasksList from "@/components/Dashboard/TasksList";
import UpcomingDeadlines from "@/components/Dashboard/UpcomingDeadlines";
import Sidebar from "@/components/Sidebar";

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 overflow-auto px-8 py-8">
        {/* Header */}
        <DashboardHeader name="Omar" />

        {/* Top Stats Row */}
        <div className="flex gap-4 mb-6">
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
          <StatsCard
            title="Active Courses"
            type="courses"
            coursesCount={3}
          />
        </div>

        {/* Bottom Two-Column Layout */}
        <div className="flex gap-4 items-start">
          {/* Left: Tasks List (wider) */}
          <div className="flex-[1.6] min-w-0">
            <TasksList />
          </div>

          {/* Right: Progress + Deadlines */}
          <div className="flex-1 min-w-0 flex flex-col gap-4">
            <CourseProgress />
            <UpcomingDeadlines />
          </div>
        </div>
      </main>
    </div>
  );
}
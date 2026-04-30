import { serverFetch } from "@/lib/server-api";
import { cookies } from "next/headers";
import DashboardHeader from "@/components/Dashboard/DashboardHeader";
import StatsCard from "@/components/statsComponents/StatsCard";
import TasksList from "@/components/Dashboard/TasksList";
import CourseProgress from "@/components/Dashboard/CourseProgress";
import UpcomingDeadlines from "@/components/Dashboard/UpcomingDeadlines";
import type { Task } from "@/types/task";
import type { Course } from "@/types/course";
import type { Deadline } from "@/types/deadline";

export default async function DashboardPage() {
  // three fetches run in parallel on the server
  const [tasksRes, coursesRes, deadlinesRes] = await Promise.all([
    serverFetch("/tasks"),
    serverFetch("/courses"),
    serverFetch("/deadlines"),
  ]);

  const tasks: Task[] = tasksRes.data ?? tasksRes;
  const courses: Course[] = coursesRes.data ?? coursesRes;
  const deadlines: Deadline[] = deadlinesRes.data ?? deadlinesRes;

  const today = new Date().toISOString().split("T")[0];
  const todayTasks = tasks.filter((t) => t.date === today);
  const completedTasks = todayTasks.filter((t) => t.completed);

  const studyTimeMinutes = completedTasks.reduce(
    (sum, t) => sum + t.estimatedTime, 0
  );
  const studyHours = Math.floor(studyTimeMinutes / 60);
  const studyMinutes = studyTimeMinutes % 60;

  // Get user name from cookie
  const cookieStore = await cookies();
  const stored = cookieStore.get("studyflow_user")?.value;
  const user = stored ? JSON.parse(stored) : null;
  const userFirstName = user?.name?.split(" ")[0] ?? "User";

  return (
    <main className="flex-1 overflow-auto px-8 py-8">
      <DashboardHeader name={userFirstName} />

      <div className="grid grid-cols-1 gap-3 mb-6 sm:grid-cols-3 sm:gap-4">
        <StatsCard
          title="Tasks Today"
          type="tasks"
          tasksCompleted={completedTasks.length}
          tasksTotal={todayTasks.length}
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
          coursesCount={courses.length}
        />
      </div>

      <div className="flex flex-col gap-4 lg:flex-row lg:items-start">
        <div className="w-full lg:flex-[1.6] lg:min-w-0">
          <TasksList tasks={todayTasks} />
        </div>

        <div className="w-full lg:flex-1 lg:min-w-0 flex flex-col gap-4">
          <CourseProgress courses={courses} />
          <UpcomingDeadlines deadlines={deadlines} />
        </div>
      </div>
    </main>
  );
}
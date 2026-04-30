import { serverFetch } from "@/lib/server-api";
import { ProgressData } from "@/types/progress";
import StatsCards from "@/components/Progress/StatsCards";
import DailyCompletionChart from "@/components/Progress/DailyCompletionChart";
import TasksByTypeChart from "@/components/Progress/TaskByTypeChart";
import MotivationBanner from "@/components/Progress/MotivationBanner";
import CourseProgress from "@/components/Dashboard/CourseProgress";

export default async function ProgressPage() {
  const [progressRes, coursesRes] = await Promise.all([
    serverFetch("/progress"),
    serverFetch("/courses"),
  ]);

  const data: ProgressData = progressRes.data ?? progressRes;
  const courses = coursesRes.data ?? coursesRes;

  return (
    <div className="flex-1 min-h-screen bg-background px-8 py-8 pb-12 box-border max-md:px-4 max-md:py-5 max-sm:px-3">
      <div className="flex flex-col gap-0.5 mb-7">
        <h1 className="text-2xl font-semibold text-foreground m-0 tracking-tight leading-snug">
          Progress Analytics
        </h1>
        <p className="text-sm text-muted-foreground m-0">
          Track your study progress and achievements
        </p>
      </div>

      <StatsCards stats={data.stats} />

      <div className="flex gap-4 mt-5 flex-wrap">
        <DailyCompletionChart data={data.dailyCompletion} />
        <TasksByTypeChart data={data.tasksByType} />
      </div>

      <div className="mt-5">
        <CourseProgress courses={courses} variant="detailed" />
      </div>

      <div className="mt-5">
        <MotivationBanner summary={data.summary} />
      </div>
    </div>
  );
}
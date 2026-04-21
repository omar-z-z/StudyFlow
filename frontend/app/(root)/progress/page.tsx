"use client";

import { useProgress } from "@/hooks/useProgress";
import StatsCards from "@/components/Progress/StatsCards";
import DailyCompletionChart from "@/components/Progress/DailyCompletionChart";
import TasksByTypeChart from "@/components/Progress/TaskByTypeChart";
import MotivationBanner from "@/components/Progress/MotivationBanner";
import CourseProgress from "@/components/Dashboard/CourseProgress";
import MotivationBannerSkeleton from "@/components/skeletonComponents/MotivationPannerSkeleton";
import StatsCardsSkeleton from "@/components/skeletonComponents/StatsCardSkeleton";
import DailyCompletionChartSkeleton from "@/components/skeletonComponents/DailyCompletionChartSkeleton";
import TasksByTypeChartSkeleton from "@/components/skeletonComponents/TaskByTypeChartSkeleton";
import CourseProgressSkeleton from "@/components/skeletonComponents/CourseProgressSkeleton";

const ProgressPage = () => {
  const { data, loading, error } = useProgress();
 
  return (
    <div className="flex-1 min-h-screen bg-background px-8 py-8 pb-12 box-border max-md:px-4 max-md:py-5 max-sm:px-3">
      {/* ── Page Header ── */}
      <div className="flex flex-col gap-0.5 mb-7">
        <h1 className="text-2xl font-semibold text-foreground m-0 tracking-tight leading-snug">
          Progress Analytics
        </h1>
        <p className="text-sm text-muted-foreground m-0">
          Track your study progress and achievements
        </p>
      </div>
 
      {/* ── Error ── */}
      {error && (
        <div className="text-sm text-destructive py-16 text-center">
          {error}
        </div>
      )}

      {/* ── Loading skeleton ── */}
      {loading && !error && (
        <>
          <StatsCardsSkeleton structure={{ goal: 2, simple: 2 }} />

          <div className="flex gap-4 mt-5 flex-wrap">
            <DailyCompletionChartSkeleton />
            <TasksByTypeChartSkeleton />
          </div>

          <div className="mt-5">
            <CourseProgressSkeleton />
          </div>

          <div className="mt-5">
            <MotivationBannerSkeleton />
          </div>
        </>
      )}
 
      {/* ── Content ── */}
      {data && !loading && (
        <>
          <StatsCards stats={data.stats} />
 
          <div className="flex gap-4 mt-5 flex-wrap">
            <DailyCompletionChart data={data.dailyCompletion} />
            <TasksByTypeChart data={data.tasksByType} />
          </div>
 
          <div className="mt-5">
            <CourseProgress variant="detailed" />
          </div>
 
          <div className="mt-5">
            <MotivationBanner summary={data.summary} />
          </div>
        </>
      )}
    </div>
  );
};
 
export default ProgressPage;
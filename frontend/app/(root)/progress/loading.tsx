import StatsCardsSkeleton from "@/components/skeletonComponents/StatsCardSkeleton";
import DailyCompletionChartSkeleton from "@/components/skeletonComponents/DailyCompletionChartSkeleton";
import TasksByTypeChartSkeleton from "@/components/skeletonComponents/TaskByTypeChartSkeleton";
import CourseProgressSkeleton from "@/components/skeletonComponents/CourseProgressSkeleton";
import MotivationBannerSkeleton from "@/components/skeletonComponents/MotivationPannerSkeleton";

export default function ProgressLoading() {
  return (
    <div className="flex-1 min-h-screen bg-background px-8 py-8 pb-12 box-border max-md:px-4 max-md:py-5 max-sm:px-3">
      <div className="h-8 w-52 bg-muted animate-pulse rounded-md mb-7" />
      <StatsCardsSkeleton structure={{ goal: 2, simple: 2 }} />
      <div className="flex gap-4 mt-5 flex-wrap">
        <DailyCompletionChartSkeleton />
        <TasksByTypeChartSkeleton />
      </div>
      <div className="mt-5"><CourseProgressSkeleton /></div>
      <div className="mt-5"><MotivationBannerSkeleton /></div>
    </div>
  );
}
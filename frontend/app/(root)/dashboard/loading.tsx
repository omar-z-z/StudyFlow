import StatsCardsSkeleton from "@/components/skeletonComponents/StatsCardSkeleton";
import TaskCardSkeleton from "@/components/skeletonComponents/TaskCardSkeleton";
import DeadlineItemSkeleton from "@/components/skeletonComponents/DeadlineItemSkeleton";

export default function DashboardLoading() {
  return (
    <main className="flex-1 overflow-auto px-8 py-8">
      {/* Header skeleton */}
      <div className="h-7 w-48 bg-muted animate-pulse rounded-md mb-6" />

      {/* Stats skeleton */}
      <StatsCardsSkeleton structure={{ goal: 2, simple: 1 }} />

      {/* Bottom layout */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start mt-4">
        <div className="w-full lg:flex-[1.6] bg-card border border-border rounded-xl p-4 md:p-6">
          <div className="h-2.5 w-24 bg-muted animate-pulse rounded-md mb-3" />
          <div className="flex flex-col gap-3">
            <TaskCardSkeleton />
            <TaskCardSkeleton />
            <TaskCardSkeleton />
          </div>
        </div>
        <div className="w-full lg:flex-1 flex flex-col gap-4">
          <div className="bg-card border border-border rounded-xl p-4 md:p-6">
            <div className="h-3 w-28 bg-muted animate-pulse rounded-md mb-4" />
          </div>
          <div className="bg-card border border-border rounded-xl p-4 md:p-6">
            <div className="h-3 w-28 bg-muted animate-pulse rounded-md mb-4" />
            <DeadlineItemSkeleton />
            <DeadlineItemSkeleton />
            <DeadlineItemSkeleton />
          </div>
        </div>
      </div>
    </main>
  );
}
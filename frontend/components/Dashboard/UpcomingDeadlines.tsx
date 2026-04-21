import { useDeadlines } from "@/hooks/useDeadlines";
import DeadlineItem from "./DeadlineItem";
import { Deadline } from "@/types/deadline";
import DeadlineItemSkeleton from "../skeletonComponents/DeadlineItemSkeleton";

export default function UpcomingDeadlines() {
  const { data, loading, error } = useDeadlines();
  return (
    <div className="bg-card border border-border rounded-xl p-4 md:p-6">
      {!loading ? (
        <h2 className="text-base font-semibold text-foreground mb-4">
          Upcoming Deadlines
        </h2>
      ) : (
        <div className="h-3 w-28 bg-muted animate-pulse rounded-md mb-4" />
      )}
      <div className="flex flex-col gap-3">
        {loading && (
          <>
            <DeadlineItemSkeleton />
            <DeadlineItemSkeleton />
            <DeadlineItemSkeleton />
          </>
        )}

        {/* ── Error ── */}
        {error && (
          <div className="text-sm text-destructive py-16 text-center">
            {error}
          </div>
        )}

        {/* ── Content ── */}
        {data &&
          data.map((deadline: Deadline) => (
            <DeadlineItem key={deadline.id} deadline={deadline} />
          ))}
      </div>
    </div>
  );
}

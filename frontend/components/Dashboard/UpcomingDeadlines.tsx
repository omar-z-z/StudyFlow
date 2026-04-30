import { Deadline } from "@/types/deadline";
import DeadlineItem from "./DeadlineItem";
import DeadlineNotifier from "./DeadlineNotifier";

interface UpcomingDeadlinesProps {
  deadlines: Deadline[];
}

export default function UpcomingDeadlines({ deadlines }: UpcomingDeadlinesProps) {
  return (
    <div className="bg-card border border-border rounded-xl p-4 md:p-6">
      <h2 className="text-base font-semibold text-foreground mb-4">
        Upcoming Deadlines
      </h2>
      {/* Invisible client component — only runs the toast logic */}
      <DeadlineNotifier deadlines={deadlines} />
      <div className="flex flex-col gap-3">
        {deadlines.map((deadline) => (
          <DeadlineItem key={deadline.id} deadline={deadline} />
        ))}
      </div>
    </div>
  );
}
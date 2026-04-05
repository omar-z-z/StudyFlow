import DeadlineItem from "./DeadlineItem";
import { deadlines } from "@/lib/dashboardDeadlines";

export default function UpcomingDeadlines() {
  return (
    <div className="bg-card border border-border rounded-xl p-4 md:p-6">
      <h2 className="text-base font-semibold text-foreground mb-4">
        Upcoming Deadlines
      </h2>
      <div className="flex flex-col gap-3">
        {deadlines.map((deadline) => (
          <DeadlineItem key={deadline.id} deadline={deadline} />
        ))}
      </div>
    </div>
  );
}
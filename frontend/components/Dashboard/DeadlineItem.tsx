import { AlertCircle } from "lucide-react";
import { Deadline, urgencyStyles } from "@/types/deadline";

interface DeadlineItemProps {
  deadline: Deadline;
}

export default function DeadlineItem({ deadline }: DeadlineItemProps) {
  return (
    <div className="flex items-start gap-3 pb-3 border-b border-border last:border-0 last:pb-0">
      <AlertCircle
        className={`w-4 h-4 mt-0.5 shrink-0 ${urgencyStyles[deadline.urgency]}`}
      />
      <div className="flex flex-col gap-0.5 min-w-0">
        <p className="text-sm text-foreground leading-snug">{deadline.title}</p>
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <svg
            className="w-3 h-3 shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
            <line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" />
            <line x1="3" y1="10" x2="21" y2="10" />
          </svg>
          {new Date(deadline.due_date).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          })}
        </div>
      </div>
    </div>
  );
}
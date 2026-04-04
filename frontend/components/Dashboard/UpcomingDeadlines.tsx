import { AlertCircle } from "lucide-react";

interface Deadline {
  id: number;
  title: string;
  date: string;
  urgency: "urgent" | "normal";
}

const deadlines: Deadline[] = [
  {
    id: 1,
    title: "Assignment 2: Linked List Implementation",
    date: "12/04/2026",
    urgency: "urgent",
  },
  {
    id: 2,
    title: "Lab 2: Classification Models",
    date: "15/04/2026",
    urgency: "urgent",
  },
  {
    id: 3,
    title: "Project Proposal: Web App",
    date: "20/04/2026",
    urgency: "normal",
  },
];

const urgencyStyles = {
  urgent: "text-orange-500",
  normal: "text-muted-foreground",
};

export default function UpcomingDeadlines() {
  return (
    <div className="bg-card border border-border rounded-xl p-4 md:p-6">
      <h2 className="text-base font-semibold text-foreground mb-4">
        Upcoming Deadlines
      </h2>
      <div className="flex flex-col gap-3">
        {deadlines.map((deadline) => (
          <div
            key={deadline.id}
            className="flex items-start gap-3 pb-3 border-b border-border last:border-0 last:pb-0"
          >
            <AlertCircle
              className={`w-4 h-4 mt-0.5 shrink-0 ${urgencyStyles[deadline.urgency]}`}
            />
            <div className="flex flex-col gap-0.5 min-w-0">
              {/* Title wraps naturally; min-w-0 prevents overflow */}
              <p className="text-sm text-foreground leading-snug">
                {deadline.title}
              </p>
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
                {deadline.date}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
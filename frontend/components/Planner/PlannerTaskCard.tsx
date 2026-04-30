"use client";

import type { Task } from "@/types/task";
import { useRouter } from "next/navigation";

interface TaskCardProps {
  task: Task;
  onToggle: (id: string) => void;
}

const TaskCard = ({ task, onToggle }: TaskCardProps) => {
  const { id, title, course, estimatedTime, completed } = task;
  const router = useRouter();

  return (
    <div
      className="flex items-start gap-2 rounded-lg border border-border bg-card p-2 cursor-pointer group transition-colors hover:bg-accent/60"
      onClick={() => router.push(`/courses/${course.id}`)}
    >
      {/* Checkbox */}
      <button
        type="button"
        aria-label={completed ? "Mark as incomplete" : "Mark as complete"}
        onClick={(e) => {
          e.stopPropagation();
          onToggle(id);
        }}
        className={`
          mt-0.5 shrink-0 w-4 h-4 rounded border flex items-center justify-center transition-colors
          ${
            completed
              ? "bg-primary border-primary"
              : "border-border bg-background group-hover:border-muted-foreground"
          }
        `}
      >
        {completed && (
          <svg
            width="10"
            height="10"
            viewBox="0 0 10 10"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M2 5l2.5 2.5L8 3"
              stroke="var(--secondary)"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </button>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <p
          className={`text-xs font-medium truncate leading-tight ${
            completed
              ? "line-through text-muted-foreground"
              : "text-foreground"
          }`}
        >
          {title}
        </p>
        <div className="flex items-center gap-1 mt-1">
          <span
            className={`w-2 h-2 rounded-full shrink-0`}
            style={{ backgroundColor: course.color }}
          />
          <span className="text-xs text-muted-foreground">{estimatedTime} min</span>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
"use client";

import type { Task, TaskColor } from "@/types/planner";

const DOT_COLOR: Record<TaskColor, string> = {
  blue: "bg-blue-500",
  green: "bg-green-500",
  yellow: "bg-yellow-400",
};

interface TaskCardProps {
  task: Task;
  onToggle: (id: number) => void;
}

const TaskCard = ({ task, onToggle }: TaskCardProps) => {
  const { id, title, color, duration, completed } = task;

  return (
    <div
      className="flex items-start gap-2 rounded-lg border border-border bg-card p-2 cursor-pointer group transition-colors hover:bg-accent/60"
      onClick={() => onToggle(id)}
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
          mt-0.5 flex-shrink-0 w-4 h-4 rounded border flex items-center justify-center transition-colors
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
              stroke="currentColor"
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
            className={`w-2 h-2 rounded-full flex-shrink-0 ${
              DOT_COLOR[color] ?? "bg-muted"
            }`}
          />
          <span className="text-xs text-muted-foreground">{duration} min</span>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
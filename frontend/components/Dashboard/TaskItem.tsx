"use client";

import { Task, priorityStyles } from "@/types/task";
import { useRouter } from "next/navigation";

interface TaskItemProps {
  task: Task;
}

export default function TaskItem({ task }: TaskItemProps) {
  const router = useRouter();
  return (
    <div
      className={`flex items-start gap-3 p-3 rounded-lg border transition-all duration-200 cursor-pointer select-none md:p-4 ${
        task.completed
          ? "border-border bg-muted/40"
          : "border-border bg-background hover:bg-accent/50"
      }`}
      onClick={() => router.push("/tasks")} 
    >

      {/* Content */}
      <div className="flex-1 min-w-0">
        <p
          className={`text-sm font-medium transition-all duration-200 ${
            task.completed
              ? "line-through text-muted-foreground"
              : "text-foreground"
          }`}
        >
          {task.title}
        </p>
        <div className="flex items-center gap-2 mt-1.5 flex-wrap">
          <span className={`w-2 h-2 rounded-full shrink-0`} style={{ backgroundColor: task.course.color }} />
          <span className="text-xs text-muted-foreground truncate max-w-30 sm:max-w-none">
            {task.course.name}
          </span>
          <span className="text-xs text-muted-foreground">·</span>
          <span className="text-xs text-muted-foreground">{task.estimatedTime} min</span>
          <span className="text-xs text-muted-foreground">·</span>
          <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${priorityStyles[task.priority]}`}>
            {task.priority}
          </span>
        </div>
      </div>
    </div>
  );
}
"use client";

import { Task } from "@/types/task";

interface TasksListProps {
  tasks: Task[];
  isLoading: boolean;
}
import TaskItem from "./TaskItem";
import TaskCardSkeleton from "../skeletonComponents/TaskCardSkeleton";

export default function TasksList({
  tasks,
  isLoading,
}: TasksListProps) {
  return (
    <div className="bg-card border border-border rounded-xl p-4 md:p-6">
      {isLoading ? (
        <div>
          <div className="h-2.5 w-24 bg-muted animate-pulse rounded-md mb-3" />
          <div className="flex flex-col gap-3">
            <TaskCardSkeleton />
            <TaskCardSkeleton />
            <TaskCardSkeleton />
          </div>
        </div>
      ) : (
        <>
          <h2 className="text-base font-semibold text-foreground mb-4">
            Today&apos;s Study Tasks
          </h2>
          <div className="flex flex-col gap-2">
            {tasks.map((task) => (
              <TaskItem key={task.id} task={task} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

"use client";

import { Task } from "@/types/task";

interface TasksListProps {
  tasks: Task[];
  onToggle: (id: string) => void;
}
import TaskItem from "./TaskItem";

export default function TasksList({ tasks, onToggle }: TasksListProps) {
  return (
    <div className="bg-card border border-border rounded-xl p-4 md:p-6">
      <h2 className="text-base font-semibold text-foreground mb-4">
        Today&apos;s Study Tasks
      </h2>
      <div className="flex flex-col gap-2">
        {tasks.map((task) => (
          <TaskItem key={task.id} task={task} onToggle={onToggle} />
        ))}
      </div>
    </div>
  );
}
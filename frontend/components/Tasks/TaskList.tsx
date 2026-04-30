"use client";

import { useState } from "react";
import { Task } from "@/types/task";
import TasksTaskCard from "./TaskCard";
import AddTaskModal from "./AddTaskModal";
import { PlusIcon } from "../basicComponents/icons";
import TaskCardSkeleton from "../skeletonComponents/TaskCardSkeleton";

interface TaskListProps {
  pendingTasks: Task[];
  completedTasks: Task[];
  isLoading: boolean;
  onToggle: (id: string) => void;
  onAdd: (task: Omit<Task, "id" | "completed">) => void;
}

const TaskList = ({
  pendingTasks,
  completedTasks,
  isLoading,
  onToggle,
  onAdd,
}: TaskListProps) => {
  const [showModal, setShowModal] = useState(false);
  const total = pendingTasks.length + completedTasks.length;
  const completed = completedTasks.length;

  return (
    <div className="bg-card border border-border rounded-xl p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-5 gap-4 flex-wrap">
        <div className="flex items-center gap-3">
          <h2 className="text-base font-medium text-foreground">
            Today's Tasks
          </h2>
          <span className="text-xs text-muted-foreground font-medium px-2.5 py-1 bg-muted rounded-full">
            {completed} / {total} completed
          </span>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-1.5 px-3.5 py-2 bg-primary text-primary-foreground text-xs font-medium rounded-(--radius) border-none cursor-pointer transition-all duration-150 hover:opacity-90 hover:-translate-y-px active:translate-y-0"
        >
          <PlusIcon />
          Add Task
        </button>
      </div>

      {/* Loading state */}
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
          {/* Pending section */}
          {pendingTasks.length > 0 && (
            <div className="mb-5">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-3">
                Pending Tasks
              </p>
              <div className="flex flex-col gap-3">
                {pendingTasks.map((task) => (
                  <TasksTaskCard
                    key={task.id}
                    task={task}
                    onToggle={onToggle}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Completed section */}
          {completedTasks.length > 0 && (
            <div>
              <p className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest mb-3">
                Completed Tasks
              </p>
              <div className="flex flex-col gap-3">
                {completedTasks.map((task) => (
                  <TasksTaskCard
                    key={task.id}
                    task={task}
                    onToggle={onToggle}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Empty state */}
          {total === 0 && (
            <div className="text-center py-12 px-8 text-muted-foreground text-sm border-2 border-dashed border-border rounded-xl">
              No tasks for today. Click "Add Task" to get started.
            </div>
          )}
        </>
      )}

      {showModal && (
        <AddTaskModal onClose={() => setShowModal(false)} onAdd={onAdd} />
      )}
    </div>
  );
};

export default TaskList;

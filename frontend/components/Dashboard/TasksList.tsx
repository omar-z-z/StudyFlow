import { Task } from "@/types/task";
import TaskItem from "./TaskItem";

interface TasksListProps {
  tasks: Task[];
}

export default function TasksList({ tasks }: TasksListProps) {
  return (
    <div className="bg-card border border-border rounded-xl p-4 md:p-6">
      <h2 className="text-base font-semibold text-foreground mb-4">
        Today&apos;s Study Tasks
      </h2>
      <div className="flex flex-col gap-2">
        {tasks.map((task) => (
          <TaskItem key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
}
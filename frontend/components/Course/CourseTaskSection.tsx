import { Task } from "@/types/task";
import TaskRow from "./TaskRow";

type Props = {
  tasks: Task[];
  isLoading: boolean;
  onToggle: (taskId: string) => void;
  onEdit: (task: Task) => void;
  onDelete: (taskId: string) => void;
};

const CourseTasksSection = ({
  tasks,
  isLoading,
  onToggle,
  onEdit,
  onDelete,
}: Props) => {
  const doneCount = tasks.filter((t) => t.completed).length;

  return (
    <div className="bg-card border border-border rounded-(--radius-xl) p-5">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-[0.7rem] font-semibold uppercase tracking-widest text-muted-foreground">
          Tasks
        </h2>
        {tasks.length > 0 && (
          <span className="text-xs text-muted-foreground">
            {doneCount}/{tasks.length} done
          </span>
        )}
      </div>

      {isLoading ? (
        <p className="text-xs text-muted-foreground py-1 animate-pulse">
          Loading tasks…
        </p>
      ) : tasks.length === 0 ? (
        <p className="text-xs text-muted-foreground py-1">
          No tasks linked to this course yet.
        </p>
      ) : (
        tasks.map((task) => (
          <TaskRow
            key={task.id}
            task={task}
            onToggle={() => onToggle(task.id)}
            onEdit={() => onEdit(task)}
            onDelete={() => onDelete(task.id)}
          />
        ))
      )}
    </div>
  );
};

export default CourseTasksSection;
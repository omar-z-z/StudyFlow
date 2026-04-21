import { Task } from "@/types/task";
import { CalendarIcon, CheckIcon, ClockIcon } from "@/components/basicComponents/icons";
import { EditIcon, TrashIcon } from "lucide-react";

type Props = {
  task: Task;
  onToggle: ()  => void;
  onEdit: () => void;
  onDelete: () => void;
};

const TaskRow = ({ task, onToggle, onEdit, onDelete }: Props) => (
  <div className="flex items-center gap-3 py-2.5 border-b border-border last:border-0 group">
    {/* Checkbox */}
    <button
        onClick={() => onToggle}
        aria-label={task.completed ? "Mark incomplete" : "Mark complete"}
        className={`mt-0.5 shrink-0 w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all duration-150 cursor-pointer ${
          task.completed
            ? "bg-foreground border-foreground"
            : "bg-transparent border-border hover:border-muted-foreground"
        }`}
      >
      {task.completed && <CheckIcon />}
    </button>

    {/* Title + meta */}
    <div className="flex-1 min-w-0">
      <span
        className={`text-sm block truncate ${
          task.completed
            ? "line-through text-muted-foreground"
            : "text-foreground"
        }`}
      >
        {task.title}
      </span>
      <div className="flex items-center gap-2.5 mt-0.5 flex-wrap">
        <span className="text-xs text-muted-foreground flex items-center gap-1">
          <CalendarIcon />
          {task.date}
        </span>
        {task.estimatedTime && (
          <span className="text-xs text-muted-foreground flex items-center gap-1">
            <ClockIcon />
            {task.estimatedTime}m
          </span>
        )}
      </div>
    </div>

    {/* Actions — always visible on mobile, hover on desktop */}
    <div className="flex items-center gap-1 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
      <button
        onClick={onEdit}
        className="p-1.5 rounded-radius text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
        aria-label="Edit task"
      >
        <EditIcon size={16}/>
      </button>
      <button
        onClick={onDelete}
        className="p-1.5 rounded-radius text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
        aria-label="Delete task"
      >
        <TrashIcon size={16}/>
      </button>
    </div>
  </div>
);

export default TaskRow;
import { Task } from "@/types/task";
import { CalendarIcon } from "@/components/basicComponents/icons";

const CheckIcon = () => (
  <svg width="10" height="10" viewBox="0 0 14 14" fill="none">
    <path
      d="M2.5 7l3 3 6-6"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const EditIcon = () => (
  <svg width="13" height="13" viewBox="0 0 15 15" fill="none">
    <path
      d="M10.586 1.586a2 2 0 012.828 2.828L4.828 13H2v-2.828l8.586-8.586z"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinejoin="round"
    />
  </svg>
);

const TrashIcon = () => (
  <svg width="13" height="13" viewBox="0 0 15 15" fill="none">
    <path
      d="M2 4h11M5 4V2.5a.5.5 0 01.5-.5h4a.5.5 0 01.5.5V4M6 7v4M9 7v4M3 4l.8 8.5a.5.5 0 00.5.5h5.4a.5.5 0 00.5-.5L11 4"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ClockIcon = () => (
  <svg width="11" height="11" viewBox="0 0 13 13" fill="none">
    <circle cx="6.5" cy="6.5" r="5" stroke="currentColor" strokeWidth="1.3" />
    <path
      d="M6.5 4v3l2 1.5"
      stroke="currentColor"
      strokeWidth="1.3"
      strokeLinecap="round"
    />
  </svg>
);

type Props = {
  task: Task;
  onToggle: () => void;
  onEdit: () => void;
  onDelete: () => void;
};

const TaskRow = ({ task, onToggle, onEdit, onDelete }: Props) => (
  <div className="flex items-center gap-3 py-2.5 border-b border-border last:border-0 group">
    {/* Checkbox */}
    <button
      onClick={onToggle}
      className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 transition-colors ${
        task.completed
          ? "bg-primary border-primary text-primary-foreground"
          : "border-border hover:border-primary"
      }`}
      aria-label={task.completed ? "Mark incomplete" : "Mark complete"}
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
        className="p-1.5 rounded-(--radius) text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
        aria-label="Edit task"
      >
        <EditIcon />
      </button>
      <button
        onClick={onDelete}
        className="p-1.5 rounded-(--radius) text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
        aria-label="Delete task"
      >
        <TrashIcon />
      </button>
    </div>
  </div>
);

export default TaskRow;
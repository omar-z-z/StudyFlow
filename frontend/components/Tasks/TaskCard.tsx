import { Task, priorityConfig, typeConfig } from "@/types/task";
import { ClockIcon } from "../basicComponents/icons";

interface TaskCardProps {
  task: Task;
  onToggle: (id: string) => void;
}

const TasksTaskCard = ({ task, onToggle }: TaskCardProps) => {
  const priority = priorityConfig[task.priority];
  const type = typeConfig[task.type];

  return (
    <div
      className={`flex items-start gap-3 p-4 bg-card border border-border rounded-xl transition-all duration-150 hover:shadow-sm ${
        task.completed ? "opacity-70" : ""
      }`}
    >
      {/* Checkbox */}
      <button
        onClick={() => onToggle(task.id)}
        aria-label={task.completed ? "Mark incomplete" : "Mark complete"}
        className={`mt-0.5 shrink-0 w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all duration-150 cursor-pointer ${
          task.completed
            ? "bg-foreground border-foreground"
            : "bg-transparent border-border hover:border-muted-foreground"
        }`}
      >
        {task.completed && (
          <svg
            width="10"
            height="10"
            viewBox="0 0 10 10"
            fill="none"
            stroke="var(--background)"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <polyline points="1.5,5 4,7.5 8.5,2.5" />
          </svg>
        )}
      </button>

      {/* Content */}
      <div className="flex-1 min-w-0">
        {/* Title */}
        <p
          className={`text-sm font-medium text-foreground leading-snug ${
            task.completed ? "line-through text-muted-foreground" : ""
          }`}
        >
          {task.title}
        </p>

        {/* Course row */}
        <div className="flex items-center gap-1.5 mt-1">
          <span
            className="w-2 h-2 rounded-full shrink-0"
            style={{ backgroundColor: task.course.color }}
          />
          <span className="text-xs text-muted-foreground truncate">
            {task.course.name}
          </span>
          {task.completed && (
            <span className="text-xs text-muted-foreground">
              · {task.estimatedTime} minutes
            </span>
          )}
        </div>

        {/* Badges row (only for pending) */}
        {!task.completed && (
          <div className="flex items-center gap-2 mt-2 flex-wrap">
            {/* Duration */}
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <ClockIcon />
              {task.estimatedTime} minutes
            </span>

            {/* Priority badge */}
            <span
              className={`text-[10px] font-semibold px-2 py-0.5 rounded-full tracking-wide ${priority.className}`}
            >
              {priority.label}
            </span>

            {/* Type badge */}
            <span
              className={`text-[10px] font-semibold px-2 py-0.5 rounded-full tracking-wide ${type.className}`}
            >
              {type.label}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default TasksTaskCard;
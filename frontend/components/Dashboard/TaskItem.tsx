import { Task, priorityStyles } from "@/types/task";

interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
}

export default function TaskItem({ task, onToggle }: TaskItemProps) {
  return (
    <div
      className={`flex items-start gap-3 p-3 rounded-lg border transition-all duration-200 cursor-pointer select-none md:p-4 ${
        task.completed
          ? "border-border bg-muted/40"
          : "border-border bg-background hover:bg-accent/50"
      }`}
      onClick={() =>console.log("Task clicked:", task.id)} // For now, when the tasks page is done it would navigate there
    >
      {/* Checkbox */}
      <div
        className={`mt-0.5 w-4 h-4 rounded shrink-0 border-2 flex items-center justify-center transition-all duration-200 ${
          task.completed
            ? "bg-primary border-primary"
            : "border-muted-foreground/40"
        }`}
        onClick={() => onToggle(task.id)}
      >
        {task.completed && (
          <svg
            className="w-2.5 h-2.5 text-primary-foreground"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={3}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
        )}
      </div>

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
          <span className="text-xs text-muted-foreground truncate max-w-[120px] sm:max-w-none">
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
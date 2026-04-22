import { Course } from "@/types/course";
import ProgressBar from "@/components/Courses/ProgressBar";
import { CalendarIcon } from "@/components/basicComponents/icons";
import { EditIcon, TrashIcon } from "lucide-react";

type Props = {
  course: Course;
  onEdit: () => void;
  onDelete: () => void;
};

const CourseHeader = ({ course, onEdit, onDelete }: Props) => (
  <div className="bg-card border border-border rounded-(--radius-xl) p-5 sm:p-6 mb-5">
    {/* Top row */}
    <div className="flex items-start justify-between gap-3 mb-4">
      {/* Icon + name */}
      <div className="flex items-center gap-3 min-w-0">
        <div
          className="w-10 h-10 sm:w-12 sm:h-12 rounded-radius flex items-center justify-center shrink-0"
          style={{ backgroundColor: course.color }}
          aria-hidden="true"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path
              d="M2 4.5A2.5 2.5 0 014.5 2h11A2.5 2.5 0 0118 4.5v11A2.5 2.5 0 0115.5 18H4.5A2.5 2.5 0 012 15.5V4.5z"
              stroke="var(--primary)"
              strokeWidth="1.4"
            />
            <path
              d="M6 7h8M6 10h8M6 13h5"
              stroke="var(--primary)"
              strokeWidth="1.4"
              strokeLinecap="round"
            />
          </svg>
        </div>

        <div className="min-w-0">
          <h1 className="text-lg sm:text-xl font-semibold text-foreground leading-snug truncate">
            {course.name}
          </h1>
          <span className="flex items-center gap-1.5 text-xs text-muted-foreground mt-0.5">
            <CalendarIcon />
            Exam: {course.examDate}
          </span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-1.5 shrink-0">
        <button
          onClick={onEdit}
          className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs rounded-radius border border-border text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
          aria-label="Edit course"
        >
          <EditIcon size={16} />
          <span className="hidden sm:inline">Edit</span>
        </button>
        <button
          onClick={onDelete}
          className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs rounded-radius border border-border text-muted-foreground hover:text-destructive hover:border-destructive hover:bg-destructive/10 transition-colors"
          aria-label="Delete course"
        >
          <TrashIcon size={16} />
          <span className="hidden sm:inline">Delete</span>
        </button>
      </div>
    </div>

    {/* Progress */}
    <div className="flex items-center justify-between mb-1.5">
      <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
        Progress
      </span>
    </div>
    <ProgressBar value={course.progress} />
  </div>
);

export default CourseHeader;
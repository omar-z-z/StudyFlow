import { Course } from "@/types/course";
import ProgressBar from "@/components/Courses/ProgressBar";
import { CalendarIcon } from "@/components/basicComponents/icons";

const EditIcon = () => (
  <svg width="14" height="14" viewBox="0 0 15 15" fill="none">
    <path
      d="M10.586 1.586a2 2 0 012.828 2.828L4.828 13H2v-2.828l8.586-8.586z"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinejoin="round"
    />
  </svg>
);

const TrashIcon = () => (
  <svg width="14" height="14" viewBox="0 0 15 15" fill="none">
    <path
      d="M2 4h11M5 4V2.5a.5.5 0 01.5-.5h4a.5.5 0 01.5.5V4M6 7v4M9 7v4M3 4l.8 8.5a.5.5 0 00.5.5h5.4a.5.5 0 00.5-.5L11 4"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

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
          className="w-10 h-10 sm:w-12 sm:h-12 rounded-(--radius) flex items-center justify-center shrink-0"
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
          className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs rounded-(--radius) border border-border text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
          aria-label="Edit course"
        >
          <EditIcon />
          <span className="hidden sm:inline">Edit</span>
        </button>
        <button
          onClick={onDelete}
          className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs rounded-(--radius) border border-border text-muted-foreground hover:text-destructive hover:border-destructive hover:bg-destructive/10 transition-colors"
          aria-label="Delete course"
        >
          <TrashIcon />
          <span className="hidden sm:inline">Delete</span>
        </button>
      </div>
    </div>

    {/* Progress */}
    <div className="flex items-center justify-between mb-1.5">
      <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
        Progress
      </span>
      <span className="text-sm font-bold text-foreground">{course.progress}%</span>
    </div>
    <ProgressBar value={course.progress} />
  </div>
);

export default CourseHeader;
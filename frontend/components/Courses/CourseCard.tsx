import ProgressBar from "./ProgressBar";
import TopicItem from "./TopicItem";
import AssignmentItem from "./AssignmentItem";
import { Course } from "@/lib/dummy-data";
import { CalendarIcon } from "../basicComponents/icons";

type CourseCardProps = {
  course: Course;
  onToggleTopic: (topicId: string) => void;
  onToggleAssignment: (assignmentId: string) => void;
};

const CourseCard = ({
  course,
  onToggleTopic,
  onToggleAssignment,
}: CourseCardProps) => {
  return (
    <div className="bg-card border border-border rounded-(--radius-xl) p-6 mb-5 transition-shadow duration-200 hover:shadow-md">
      {/* ── Card Header ── */}
      <div className="flex items-start justify-between gap-4">
        {/* Left: icon + info */}
        <div className="flex items-center gap-3.5">
          {/* Icon */}
          <div
            className="w-11 h-11 rounded-(--radius) flex items-center justify-center shrink-0"
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

          {/* Title + exam */}
          <div className="flex flex-col gap-0.5">
            <h3 className="text-base font-semibold text-foreground leading-snug m-0">
              {course.name}
            </h3>
            <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <CalendarIcon />
              Exam: {course.examDate}
            </span>
          </div>
        </div>

        {/* Right: completion badge */}
        <div className="flex flex-col items-end shrink-0">
          <span className="text-[1.3rem] font-bold leading-none">
            {course.progress}%
          </span>
          <span className="text-[0.72rem] text-muted-foreground font-medium mt-0.5">
            Complete
          </span>
        </div>
      </div>

      {/* ── Progress Bar ── */}
      <ProgressBar value={course.progress} />

      {/* ── Body Grid: Topics + Assignments ── */}
      <div className="grid grid-cols-2 gap-8 max-md:grid-cols-1 max-md:gap-5">
        {/* Topics */}
        <div>
          <h4 className="text-[0.7rem] font-semibold uppercase tracking-widest text-muted-foreground m-0 mb-2.5">
            Topics
          </h4>
          <div className="flex flex-col">
            {course.topics.map((topic) => (
              <TopicItem
                key={topic.id}
                topic={topic}
                onToggle={() => onToggleTopic(topic.id)}
              />
            ))}
          </div>
        </div>

        {/* Assignments */}
        <div>
          <h4 className="text-[0.7rem] font-semibold uppercase tracking-widest text-muted-foreground m-0 mb-2.5">
            Assignments
          </h4>
          <div className="flex flex-col">
            {course.assignments.map((assignment) => (
              <AssignmentItem key={assignment.id} assignment={assignment} onToggle={() => onToggleAssignment(assignment.id)} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;

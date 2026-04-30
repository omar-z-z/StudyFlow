import { Assignment } from "@/types/assignment";
import AssignmentItem from "@/components/Courses/AssignmentItem";

type Props = {
  assignments: Assignment[];
  onToggle: (assignmentId: string) => void;
};

const CourseAssignmentsSection = ({ assignments, onToggle }: Props) => (
  <div className="bg-card border border-border rounded-xl p-5">
    <div className="flex items-center justify-between mb-3">
      <h2 className="text-[0.7rem] font-semibold uppercase tracking-widest text-muted-foreground">
        Assignments
      </h2>
      <span className="text-xs text-muted-foreground">
        {assignments.filter((a) => a.completed).length}/{assignments.length}
      </span>
    </div>

    {assignments.length === 0 ? (
      <p className="text-xs text-muted-foreground py-1">
        No assignments added yet.
      </p>
    ) : (
      <div className="flex flex-col">
        {assignments.map((assignment) => (
          <AssignmentItem
            key={assignment.id}
            assignment={assignment}
            onToggle={() => onToggle(assignment.id)}
          />
        ))}
      </div>
    )}
  </div>
);

export default CourseAssignmentsSection;
"use client";

import RemoveButton from "@/components/basicComponents/RemoveButton";
import AddRowButton from "@/components/basicComponents/AddRowButton";
import { AssignmentDraft } from "@/types/modal";

type AssignmentsStepProps = {
  assignments: AssignmentDraft[];
  onAdd: () => void;
  onUpdate: (id: string, field: keyof Omit<AssignmentDraft, "id">, value: string) => void;
  onRemove: (id: string) => void;
};

const AssignmentsStep = ({ assignments, onAdd, onUpdate, onRemove }: AssignmentsStepProps) => (
  <div className="flex flex-col gap-3">
    {assignments.map((assignment, index) => (
      <div key={assignment.id} className="flex items-center gap-2">
        {/* Title */}
        <div className="flex-1 flex flex-col gap-1">
          <span className="text-[0.6rem] font-semibold uppercase tracking-widest text-muted-foreground">
            Assignment Title
          </span>
          <input
            type="text"
            value={assignment.title}
            onChange={(e) => onUpdate(assignment.id, "title", e.target.value)}
            placeholder="e.g. Array Problems"
            aria-label={`Title for assignment ${index + 1}`}
            className="w-full px-3 py-2 bg-background text-sm text-foreground rounded-(--radius) border border-border outline-none focus:border-primary focus:ring-2 focus:ring-primary/30"
          />
        </div>

        {/* Due Date */}
        <div className="flex flex-col gap-1">
          <span className="text-[0.6rem] font-semibold uppercase tracking-widest text-muted-foreground">
            Due Date
          </span>
          <input
            type="date"
            value={assignment.dueDate}
            onChange={(e) => onUpdate(assignment.id, "dueDate", e.target.value)}
            aria-label={`Due date for assignment ${index + 1}`}
            className="px-2 py-2 bg-background text-sm text-foreground rounded-(--radius) border border-border outline-none focus:border-primary focus:ring-2 focus:ring-primary/30"
          />
        </div>

        <div className="mt-5">
          <RemoveButton onClick={() => onRemove(assignment.id)} />
        </div>
      </div>
    ))}
    <AddRowButton label="Add Assignment" onClick={onAdd} />
  </div>
);

export default AssignmentsStep;
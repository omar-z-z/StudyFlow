"use client";

import RemoveButton from "@/components/basicComponents/RemoveButton";
import AddRowButton from "@/components/basicComponents/AddRowButton";
import { AssignmentDraft } from "@/types/modal";

type AssignmentsStepProps = {
  assignments: AssignmentDraft[];
  onAdd: () => void;
  onUpdate: (
    id: string,
    field: keyof Omit<AssignmentDraft, "id">,
    value: string,
  ) => void;
  onRemove: (id: string) => void;
  errors?: Record<string, { title?: string; dueDate?: string }>;
};

const AssignmentsStep = ({
  assignments,
  onAdd,
  onUpdate,
  onRemove,
  errors,
}: AssignmentsStepProps) => (
  <div className="flex flex-col gap-3">
    {assignments.map((assignment, index) => (
      <div
        key={assignment.id}
        className="flex flex-col gap-2 p-3 bg-background border border-border rounded-(--radius)"
      >
        {/* Row: fields + remove button */}
        <div className="flex gap-2 items-start">
          <div className="flex-1 flex flex-col sm:flex-row gap-2">
            {/* Title */}
            <div className="flex-1 flex flex-col gap-1">
              <span className="text-[0.6rem] font-semibold uppercase tracking-widest text-muted-foreground">
                Assignment Title
              </span>
              <input
                type="text"
                value={assignment.title}
                onChange={(e) =>
                  onUpdate(assignment.id, "title", e.target.value)
                }
                placeholder="e.g. Array Problems"
                aria-label={`Title for assignment ${index + 1}`}
                className="w-full px-3 py-2 bg-background text-sm text-foreground rounded-(--radius) border border-border outline-none focus:border-primary focus:ring-2 focus:ring-primary/30"
              />
              {errors?.[assignment.id]?.title && (
                <p className="text-xs text-destructive">
                  {errors[assignment.id].title}
                </p>
              )}
            </div>

            {/* Due Date */}
            <div className="flex flex-col gap-1">
              <span className="text-[0.6rem] font-semibold uppercase tracking-widest text-muted-foreground">
                Due Date
              </span>
              <input
                type="date"
                value={assignment.dueDate}
                min={new Date().toISOString().split("T")[0]}
                onChange={(e) =>
                  onUpdate(assignment.id, "dueDate", e.target.value)
                }
                aria-label={`Due date for assignment ${index + 1}`}
                className="w-full px-2 py-2 bg-background text-sm text-foreground rounded-(--radius) border border-border outline-none focus:border-primary focus:ring-2 focus:ring-primary/30"
              />
              {errors?.[assignment.id]?.dueDate && (
                <p className="text-xs text-destructive">
                  {errors[assignment.id].dueDate}
                </p>
              )}
            </div>
          </div>

          <div className="pt-5">
            <RemoveButton onClick={() => onRemove(assignment.id)} />
          </div>
        </div>
      </div>
    ))}
    <AddRowButton label="Add Assignment" onClick={onAdd} />
  </div>
);

export default AssignmentsStep;

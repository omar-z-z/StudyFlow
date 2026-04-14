"use client";

import { useState } from "react";
import SectionHeader from "./SectionHeader";
import { Assignment } from "@/types/assignment";

interface AssignmentsSectionProps {
  assignments: Assignment[];
  onToggle: (id: string) => void;
  onRemove: (id: string) => void;
  onAdd: (assignment: Assignment) => void;
}

const AssignmentsSection = ({
  assignments,
  onToggle,
  onRemove,
  onAdd,
}: AssignmentsSectionProps) => {
  const [title, setTitle] = useState("");
  const [dueDate, setDueDate] = useState("");

  const handleAdd = () => {
    if (!title.trim() || !dueDate) return;
    onAdd({ id: `a${Date.now()}`, title: title.trim(), dueDate, completed: false });
    setTitle("");
    setDueDate("");
  };

  return (
    <div>
      <SectionHeader title="Assignments" count={assignments.length} />

      <div className="flex flex-col gap-1">
        {assignments.map((assignment) => (
          <div
            key={assignment.id}
            className="flex items-center gap-2.5 px-3 py-2 rounded-(--radius-md) bg-muted/40 hover:bg-muted/70 transition-colors group"
          >
            <span
              className="flex-1 text-sm text-foreground"
            >
              {assignment.title}
            </span>
            <span className="text-xs text-muted-foreground shrink-0">
              Due{" "}
              {new Date(assignment.dueDate).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              })}
            </span>
            <button
              onClick={() => onRemove(assignment.id)}
              className="opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-destructive transition-all cursor-pointer p-0.5"
              aria-label={`Remove assignment "${assignment.title}"`}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        ))}
      </div>

      {/* Add row */}
      <div className="flex items-center gap-2 mt-3 flex-wrap">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleAdd()}
          placeholder="Assignment title..."
          className="flex-1 min-w-0 px-3 py-1.5 rounded-(--radius-md) border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
        />
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="px-2 py-1.5 rounded-(--radius-md) border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
        />
        <button
          onClick={handleAdd}
          disabled={!title.trim() || !dueDate}
          className="px-3 py-1.5 text-sm font-medium border border-border rounded-(--radius-md) bg-background text-foreground hover:bg-accent transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
        >
          Add
        </button>
      </div>
    </div>
  );
};

export default AssignmentsSection;
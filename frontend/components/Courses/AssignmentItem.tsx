"use client";

import { Assignment } from "@/types/assignment";
import { StatusIcon, CalendarIcon } from "../basicComponents/icons";

type AssignmentItemProps = {
  assignment: Assignment;
  onToggle: () => void;
};

const AssignmentItem = ({ assignment, onToggle }: AssignmentItemProps) => {
  return (
    <div
      className={`flex items-start gap-3 px-4 py-3 border border-border rounded-(--radius) mb-2.5 last:mb-0 transition-shadow duration-200 hover:shadow-sm ${
        assignment.completed ? "bg-muted/30" : "bg-card"
      }`}
    >
      {/* Checkbox icon */}
      <button
        onClick={onToggle}
        aria-label={assignment.completed ? "Mark as incomplete" : "Mark as complete"}
        className="shrink-0 bg-transparent border-none p-0 cursor-pointer rounded-full transition-opacity hover:opacity-70"
      >
        <StatusIcon completed={assignment.completed} />
      </button>

      {/* Body */}
      <div className="flex flex-col gap-1">
        <span
          className={`text-sm font-medium leading-snug ${
            assignment.completed
              ? "line-through text-muted-foreground"
              : "text-foreground"
          }`}
        >
          {assignment.title}
        </span>
        <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <CalendarIcon />
          Due: {assignment.dueDate.split("T")[0]}
        </span>
      </div>
    </div>
  );
};

export default AssignmentItem;
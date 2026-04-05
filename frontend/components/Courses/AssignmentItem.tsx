// components/AssignmentItem.jsx
import { Assignment } from "@/lib/dummy-data";
import React from "react";

/**
 * AssignmentItem
 * Props:
 *  - assignment: { id, name, dueDate, completed }
 */

const CalendarIcon = () => (
  <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
    <rect x="1" y="2" width="11" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.1" />
    <path d="M4 1V3M9 1V3" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
    <path d="M1 5H12" stroke="currentColor" strokeWidth="1.1" />
  </svg>
);

const AssignmentItem = ({ assignment } : { assignment: Assignment }) => {
  return (
    <div
      className={`flex items-start gap-3 px-4 py-3 border border-border rounded-[var(--radius)] mb-2.5 last:mb-0 transition-shadow duration-200 hover:shadow-sm ${
        assignment.completed ? "bg-muted/30" : "bg-card"
      }`}
    >
      {/* Checkbox icon */}
      <div className="mt-0.5 flex-shrink-0">
        {assignment.completed ? (
          <span aria-label="Completed">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <circle cx="9" cy="9" r="8.5" stroke="#10B981" />
              <path
                d="M5.5 9L7.8 11.5L12.5 6.5"
                stroke="#10B981"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        ) : (
          <span aria-label="Not completed">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <circle cx="9" cy="9" r="8.5" stroke="var(--border)" strokeWidth="1.5" />
            </svg>
          </span>
        )}
      </div>

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
          Due: {assignment.dueDate}
        </span>
      </div>
    </div>
  );
};

export default AssignmentItem;
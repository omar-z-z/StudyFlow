// components/TopicItem.jsx
import { Topic } from "@/lib/dummy-data";
import React from "react";

/**
 * TopicItem
 * Props:
 *  - topic: { id, name, week, completed }
 */
const TopicItem = ({ topic } : { topic: Topic }) => {
  return (
    <div className="flex items-center justify-between py-[0.45rem]">
      {/* Left: icon + name */}
      <div className="flex items-center gap-2.5">
        {topic.completed ? (
          <span className="flex items-center flex-shrink-0" aria-label="Completed">
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
          <span className="flex items-center flex-shrink-0" aria-label="Not completed">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <circle cx="9" cy="9" r="8.5" stroke="var(--border)" strokeWidth="1.5" />
            </svg>
          </span>
        )}
        <span
          className={`text-sm ${
            topic.completed
              ? "line-through text-muted-foreground"
              : "text-foreground"
          }`}
        >
          {topic.title}
        </span>
      </div>

      {/* Week badge */}
      <span className="text-xs text-muted-foreground font-medium whitespace-nowrap ml-2">
        {topic.week}
      </span>
    </div>
  );
};

export default TopicItem;
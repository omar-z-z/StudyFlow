"use client";

import { Topic } from "@/types/topic";
import { StatusIcon } from "../basicComponents/icons";

type TopicItemProps = {
  topic: Topic;
  onToggle: () => void;
};

const TopicItem = ({ topic, onToggle }: TopicItemProps) => {
  return (
    <div className="flex items-center justify-between py-[0.45rem]">
      {/* Left: icon + name */}
      <div className="flex items-center gap-2.5">
        <button
          onClick={onToggle}
          aria-label={
            topic.completed ? "Mark as incomplete" : "Mark as complete"
          }
          className="flex items-center shrink-0 cursor-pointer bg-transparent border-none p-0 rounded-full transition-opacity hover:opacity-70"
        >
          <StatusIcon completed={topic.completed} />
        </button>
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
        {topic.week} Weeks
      </span>
    </div>
  );
};

export default TopicItem;

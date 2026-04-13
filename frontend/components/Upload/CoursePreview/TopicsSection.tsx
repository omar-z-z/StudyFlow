"use client";

import { useState } from "react";
import SectionHeader from "./SectionHeader";
import { Topic } from "@/types/topic";

interface TopicsSectionProps {
  topics: Topic[];
  onToggle: (id: string) => void;
  onRemove: (id: string) => void;
  onAdd: (topic: Topic) => void;
}

const TopicsSection = ({
  topics,
  onToggle,
  onRemove,
  onAdd,
}: TopicsSectionProps) => {
  const [title, setTitle] = useState("");
  const [week, setWeek] = useState(1);

  const handleAdd = () => {
    if (!title.trim()) return;
    onAdd({ id: `t${Date.now()}`, week, title: title.trim(), completed: false });
    setTitle("");
  };

  const topicsByWeek = topics.reduce<Record<number, Topic[]>>((acc, topic) => {
    if (!acc[topic.week]) acc[topic.week] = [];
    acc[topic.week].push(topic);
    return acc;
  }, {});

  return (
    <div>
      <SectionHeader title="Topics" count={topics.length} />

      <div className="flex flex-col gap-3">
        {Object.keys(topicsByWeek)
          .map(Number)
          .sort((a, b) => a - b)
          .map((w) => (
            <div key={w}>
              <p className="text-xs font-medium text-muted-foreground mb-1.5">
                Week {w}
              </p>
              <div className="flex flex-col gap-1">
                {topicsByWeek[w].map((topic) => (
                  <div
                    key={topic.id}
                    className="flex items-center gap-2.5 px-3 py-2 rounded-(--radius-md) bg-muted/40 hover:bg-muted/70 transition-colors group"
                  >
                    <span
                      className="flex-1 text-sm text-foreground"
                    >
                      {topic.title}
                    </span>
                    <button
                      onClick={() => onRemove(topic.id)}
                      className="opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-destructive transition-all cursor-pointer p-0.5"
                      aria-label={`Remove topic "${topic.title}"`}
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                        <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
      </div>

      {/* Add row */}
      <div className="flex items-center gap-2 mt-3">
        <input
          type="number"
          min={1}
          value={week}
          onChange={(e) => setWeek(Number(e.target.value))}
          placeholder="Wk"
          className="w-14 px-2 py-1.5 rounded-(--radius-md) border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          aria-label="Week number"
        />
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleAdd()}
          placeholder="Add a topic..."
          className="flex-1 px-3 py-1.5 rounded-(--radius-md) border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
        />
        <button
          onClick={handleAdd}
          disabled={!title.trim()}
          className="px-3 py-1.5 text-sm font-medium border border-border rounded-(--radius-md) bg-background text-foreground hover:bg-accent transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
        >
          Add
        </button>
      </div>
    </div>
  );
};

export default TopicsSection;
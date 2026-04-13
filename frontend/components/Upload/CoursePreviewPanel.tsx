"use client";

import { useState } from "react";

// ── Types ──────────────────────────────────────────────────────────────────

export interface Topic {
  id: string;
  week: number;
  title: string;
  completed: boolean;
}

export interface Assignment {
  id: string;
  title: string;
  dueDate: string;
  completed: boolean;
}

export interface GeneratedCourse {
  id: string;
  name: string;
  color: string;
  progress: number;
  examDate: string;
  topics: Topic[];
  assignments: Assignment[];
}

interface CoursePreviewPanelProps {
  course: GeneratedCourse;
  onConfirm: (course: GeneratedCourse) => void;
  onDiscard: () => void;
}

// ── Colour options ─────────────────────────────────────────────────────────

const COLOR_OPTIONS = [
  "#3b82f6", // blue
  "#10b981", // emerald
  "#f59e0b", // amber
  "#ef4444", // red
  "#8b5cf6", // violet
  "#ec4899", // pink
  "#06b6d4", // cyan
  "#84cc16", // lime
];

// ── Sub-components ─────────────────────────────────────────────────────────

const SectionHeader = ({ title, count }: { title: string; count: number }) => (
  <div className="flex items-center justify-between mb-3">
    <h3 className="text-sm font-medium text-foreground">{title}</h3>
    <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
      {count}
    </span>
  </div>
);

// ── Main Component ─────────────────────────────────────────────────────────

const CoursePreviewPanel = ({
  course: initialCourse,
  onConfirm,
  onDiscard,
}: CoursePreviewPanelProps) => {
  const [course, setCourse] = useState<GeneratedCourse>(initialCourse);
  const [newTopicTitle, setNewTopicTitle] = useState("");
  const [newTopicWeek, setNewTopicWeek] = useState(1);
  const [newAssignmentTitle, setNewAssignmentTitle] = useState("");
  const [newAssignmentDue, setNewAssignmentDue] = useState("");

  // ── Course-level helpers ──

  const updateField = <K extends keyof GeneratedCourse>(
    key: K,
    value: GeneratedCourse[K]
  ) => setCourse((prev) => ({ ...prev, [key]: value }));

  // ── Topic helpers ──

  const toggleTopic = (id: string) =>
    setCourse((prev) => ({
      ...prev,
      topics: prev.topics.map((t) =>
        t.id === id ? { ...t, completed: !t.completed } : t
      ),
    }));

  const removeTopic = (id: string) =>
    setCourse((prev) => ({
      ...prev,
      topics: prev.topics.filter((t) => t.id !== id),
    }));

  const addTopic = () => {
    if (!newTopicTitle.trim()) return;
    const newTopic: Topic = {
      id: `t${Date.now()}`,
      week: newTopicWeek,
      title: newTopicTitle.trim(),
      completed: false,
    };
    setCourse((prev) => ({ ...prev, topics: [...prev.topics, newTopic] }));
    setNewTopicTitle("");
  };

  // ── Assignment helpers ──

  const toggleAssignment = (id: string) =>
    setCourse((prev) => ({
      ...prev,
      assignments: prev.assignments.map((a) =>
        a.id === id ? { ...a, completed: !a.completed } : a
      ),
    }));

  const removeAssignment = (id: string) =>
    setCourse((prev) => ({
      ...prev,
      assignments: prev.assignments.filter((a) => a.id !== id),
    }));

  const addAssignment = () => {
    if (!newAssignmentTitle.trim() || !newAssignmentDue) return;
    const newAssignment: Assignment = {
      id: `a${Date.now()}`,
      title: newAssignmentTitle.trim(),
      dueDate: newAssignmentDue,
      completed: false,
    };
    setCourse((prev) => ({
      ...prev,
      assignments: [...prev.assignments, newAssignment],
    }));
    setNewAssignmentTitle("");
    setNewAssignmentDue("");
  };

  // ── Group topics by week ──

  const topicsByWeek = course.topics.reduce<Record<number, Topic[]>>(
    (acc, topic) => {
      if (!acc[topic.week]) acc[topic.week] = [];
      acc[topic.week].push(topic);
      return acc;
    },
    {}
  );

  return (
    <div className="border border-border rounded-(--radius-lg) bg-card overflow-hidden">
      {/* ── Header bar ── */}
      <div
        className="h-1.5 w-full"
        style={{ backgroundColor: course.color }}
        aria-hidden="true"
      />

      <div className="p-6 flex flex-col gap-6">
        {/* ── Banner ── */}
        <div className="flex items-center gap-2">
          <div
            className="w-2 h-2 rounded-full shrink-0"
            style={{ backgroundColor: course.color }}
            aria-hidden="true"
          />
          <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">
            AI Generated — Review &amp; Edit Before Saving
          </p>
        </div>

        {/* ── Course meta ── */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {/* Course name */}
          <div className="flex flex-col gap-1.5 sm:col-span-2">
            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              Course Name
            </label>
            <input
              type="text"
              value={course.name}
              onChange={(e) => updateField("name", e.target.value)}
              className="px-3 py-2 rounded-(--radius-md) border border-border bg-input-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>

          {/* Exam date */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              Exam Date
            </label>
            <input
              type="date"
              value={course.examDate}
              onChange={(e) => updateField("examDate", e.target.value)}
              className="px-3 py-2 rounded-(--radius-md) border border-border bg-input-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>

          {/* Color */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              Course Color
            </label>
            <div className="flex items-center gap-2 flex-wrap">
              {COLOR_OPTIONS.map((c) => (
                <button
                  key={c}
                  onClick={() => updateField("color", c)}
                  title={c}
                  className={`w-7 h-7 rounded-full border-2 transition-transform duration-100 hover:scale-110 cursor-pointer ${
                    course.color === c
                      ? "border-foreground scale-110"
                      : "border-transparent"
                  }`}
                  style={{ backgroundColor: c }}
                  aria-label={`Color ${c}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* ── Topics ── */}
        <div>
          <SectionHeader title="Topics" count={course.topics.length} />

          <div className="flex flex-col gap-3">
            {Object.keys(topicsByWeek)
              .map(Number)
              .sort((a, b) => a - b)
              .map((week) => (
                <div key={week}>
                  <p className="text-xs font-medium text-muted-foreground mb-1.5">
                    Week {week}
                  </p>
                  <div className="flex flex-col gap-1">
                    {topicsByWeek[week].map((topic) => (
                      <div
                        key={topic.id}
                        className="flex items-center gap-2.5 px-3 py-2 rounded-(--radius-md) bg-muted/40 hover:bg-muted/70 transition-colors group"
                      >
                        <input
                          type="checkbox"
                          checked={topic.completed}
                          onChange={() => toggleTopic(topic.id)}
                          className="w-4 h-4 rounded accent-foreground cursor-pointer shrink-0"
                          aria-label={`Mark "${topic.title}" complete`}
                        />
                        <span
                          className={`flex-1 text-sm ${
                            topic.completed
                              ? "line-through text-muted-foreground"
                              : "text-foreground"
                          }`}
                        >
                          {topic.title}
                        </span>
                        <button
                          onClick={() => removeTopic(topic.id)}
                          className="opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-destructive transition-all cursor-pointer p-0.5"
                          aria-label={`Remove topic "${topic.title}"`}
                        >
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                            <path
                              d="M18 6L6 18M6 6l12 12"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                            />
                          </svg>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
          </div>

          {/* Add topic row */}
          <div className="flex items-center gap-2 mt-3">
            <input
              type="number"
              min={1}
              value={newTopicWeek}
              onChange={(e) => setNewTopicWeek(Number(e.target.value))}
              placeholder="Wk"
              className="w-14 px-2 py-1.5 rounded-(--radius-md) border border-border bg-input-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              aria-label="Week number"
            />
            <input
              type="text"
              value={newTopicTitle}
              onChange={(e) => setNewTopicTitle(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addTopic()}
              placeholder="Add a topic..."
              className="flex-1 px-3 py-1.5 rounded-(--radius-md) border border-border bg-input-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
            <button
              onClick={addTopic}
              disabled={!newTopicTitle.trim()}
              className="px-3 py-1.5 text-sm font-medium border border-border rounded-(--radius-md) bg-background text-foreground hover:bg-accent transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
            >
              Add
            </button>
          </div>
        </div>

        {/* ── Assignments ── */}
        <div>
          <SectionHeader
            title="Assignments"
            count={course.assignments.length}
          />

          <div className="flex flex-col gap-1">
            {course.assignments.map((assignment) => (
              <div
                key={assignment.id}
                className="flex items-center gap-2.5 px-3 py-2 rounded-(--radius-md) bg-muted/40 hover:bg-muted/70 transition-colors group"
              >
                <input
                  type="checkbox"
                  checked={assignment.completed}
                  onChange={() => toggleAssignment(assignment.id)}
                  className="w-4 h-4 rounded accent-foreground cursor-pointer shrink-0"
                  aria-label={`Mark "${assignment.title}" complete`}
                />
                <span
                  className={`flex-1 text-sm ${
                    assignment.completed
                      ? "line-through text-muted-foreground"
                      : "text-foreground"
                  }`}
                >
                  {assignment.title}
                </span>
                <span className="text-xs text-muted-foreground shrink-0">
                  Due {new Date(assignment.dueDate).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                </span>
                <button
                  onClick={() => removeAssignment(assignment.id)}
                  className="opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-destructive transition-all cursor-pointer p-0.5"
                  aria-label={`Remove assignment "${assignment.title}"`}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M18 6L6 18M6 6l12 12"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </button>
              </div>
            ))}
          </div>

          {/* Add assignment row */}
          <div className="flex items-center gap-2 mt-3 flex-wrap">
            <input
              type="text"
              value={newAssignmentTitle}
              onChange={(e) => setNewAssignmentTitle(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addAssignment()}
              placeholder="Assignment title..."
              className="flex-1 min-w-0 px-3 py-1.5 rounded-(--radius-md) border border-border bg-input-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
            <input
              type="date"
              value={newAssignmentDue}
              onChange={(e) => setNewAssignmentDue(e.target.value)}
              className="px-2 py-1.5 rounded-(--radius-md) border border-border bg-input-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
            <button
              onClick={addAssignment}
              disabled={!newAssignmentTitle.trim() || !newAssignmentDue}
              className="px-3 py-1.5 text-sm font-medium border border-border rounded-(--radius-md) bg-background text-foreground hover:bg-accent transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
            >
              Add
            </button>
          </div>
        </div>

        {/* ── Action Buttons ── */}
        <div className="flex gap-3 pt-2 border-t border-border max-sm:flex-col">
          <button
            onClick={onDiscard}
            className="flex-1 py-2.5 px-4 text-sm font-medium text-foreground border border-border rounded-(--radius) bg-background hover:bg-accent transition-colors cursor-pointer"
          >
            Discard &amp; Re-upload
          </button>
          <button
            onClick={() => onConfirm(course)}
            className="flex-1 py-2.5 px-4 text-sm font-medium text-primary-foreground bg-primary rounded-(--radius) border-none hover:opacity-90 transition-opacity cursor-pointer"
          >
            Save Course
          </button>
        </div>
      </div>
    </div>
  );
};

export default CoursePreviewPanel;
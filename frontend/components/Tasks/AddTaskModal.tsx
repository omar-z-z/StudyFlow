"use client";

import { useState } from "react";
import { Task, Priority, TaskType } from "@/types/task";
import { useCourses } from "@/hooks/useCourses";

interface AddTaskModalProps {
  onClose: () => void;
  onAdd: (task: Omit<Task, "id" | "completed">) => void;
}

const PRIORITIES: Priority[] = ["high", "medium", "low"];
const TASK_TYPES: TaskType[] = [
  "reading",
  "lecture",
  "exercise",
  "quiz",
  "project",
];

const AddTaskModal = ({ onClose, onAdd }: AddTaskModalProps) => {
  const [title, setTitle] = useState("");
  const [courseIndex, setCourseIndex] = useState(0);
  const [duration, setDuration] = useState(30);
  const [priority, setPriority] = useState<Priority>("medium");
  const [type, setType] = useState<TaskType>("reading");
  const { courses } = useCourses()


  const handleSubmit = () => {
    if (!title.trim()) return;
    const course = courses[courseIndex];
    onAdd({
        title: title.trim(),
        course: course,
        estimatedTime: duration,
        priority,
        type,
        date: new Date().toISOString().split("T")[0], 
    });
    onClose();
  };

  return (
    /* Overlay */
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: "rgba(0,0,0,0.4)" }}
    >
      <div className="bg-card border border-border rounded-xl w-full max-w-md p-6 shadow-xl">
        {/* Modal header */}
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-base font-medium text-foreground">Add New Task</h3>
          <button
            onClick={onClose}
            className="w-7 h-7 flex items-center justify-center rounded-md text-muted-foreground hover:text-foreground hover:bg-accent transition-colors cursor-pointer border-none bg-transparent"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        <div className="flex flex-col gap-4">
          {/* Title */}
          <div>
            <label className="block text-xs font-medium text-foreground mb-1.5">
              Task Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Read Chapter 5"
              className="w-full px-3 py-2 text-sm bg-input-background text-foreground rounded-(--radius) border border-border outline-none focus:ring-2 focus:ring-ring placeholder:text-muted-foreground"
            />
          </div>

          {/* Course */}
          <div>
            <label className="block text-xs font-medium text-foreground mb-1.5">
              Course
            </label>
            <select
              value={courseIndex}
              onChange={(e) => setCourseIndex(Number(e.target.value))}
              className="w-full px-3 py-2 text-sm bg-input-background text-foreground rounded-(--radius) border border-border outline-none focus:ring-2 focus:ring-ring cursor-pointer"
            >
              {courses.map((c, i) => (
                <option key={c.name} value={i}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          {/* Duration */}
          <div>
            <label className="block text-xs font-medium text-foreground mb-1.5">
              Duration (minutes): {duration}
            </label>
            <input
              type="range"
              min={10}
              max={180}
              step={5}
              value={duration}
              onChange={(e) => setDuration(Number(e.target.value))}
              className="w-full accent-foreground cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-muted-foreground mt-0.5">
              <span>10 min</span>
              <span>180 min</span>
            </div>
          </div>

          {/* Priority + Type row */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-foreground mb-1.5">
                Priority
              </label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as Priority)}
                className="w-full px-3 py-2 text-sm bg-input-background text-foreground rounded-(--radius) border border-border outline-none focus:ring-2 focus:ring-ring cursor-pointer"
              >
                {PRIORITIES.map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-foreground mb-1.5">
                Type
              </label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value as TaskType)}
                className="w-full px-3 py-2 text-sm bg-input-background text-foreground rounded-(--radius) border border-border outline-none focus:ring-2 focus:ring-ring cursor-pointer"
              >
                {TASK_TYPES.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 mt-6">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2.5 text-sm font-medium text-foreground bg-background border border-border rounded-(--radius) cursor-pointer transition-all duration-150 hover:bg-accent"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={!title.trim()}
            className="flex-1 px-4 py-2.5 text-sm font-medium text-primary-foreground bg-primary rounded-(--radius) border-none cursor-pointer transition-all duration-150 hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Add Task
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddTaskModal;
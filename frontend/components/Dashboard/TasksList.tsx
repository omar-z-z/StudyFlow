"use client";

import { useState } from "react";

type Priority = "high" | "medium" | "low";

interface Task {
  id: number;
  title: string;
  course: string;
  courseColor: string;
  duration: number;
  priority: Priority;
  completed: boolean;
}

const initialTasks: Task[] = [
  {
    id: 1,
    title: "Read Chapter 4: Stacks and Queues",
    course: "Data Structures & Algorithms",
    courseColor: "bg-blue-500",
    duration: 45,
    priority: "high",
    completed: false,
  },
  {
    id: 2,
    title: "Watch Lecture 7: Stack Implementation",
    course: "Data Structures & Algorithms",
    courseColor: "bg-blue-500",
    duration: 60,
    priority: "high",
    completed: false,
  },
  {
    id: 3,
    title: "Solve exercises 15-20",
    course: "Data Structures & Algorithms",
    courseColor: "bg-blue-500",
    duration: 90,
    priority: "medium",
    completed: false,
  },
  {
    id: 4,
    title: "Read Chapter 3: Logistic Regression",
    course: "Machine Learning",
    courseColor: "bg-green-500",
    duration: 50,
    priority: "medium",
    completed: true,
  },
  {
    id: 5,
    title: "Build responsive navbar",
    course: "Web Development",
    courseColor: "bg-yellow-500",
    duration: 40,
    priority: "low",
    completed: false,
  },
];

const priorityStyles: Record<Priority, string> = {
  high: "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400",
  medium:
    "bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400",
  low: "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400",
};

export default function TasksList() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);

  const toggleTask = (id: number) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  return (
    <div className="bg-card border border-border rounded-xl p-4 md:p-6">
      <h2 className="text-base font-semibold text-foreground mb-4">
        Today&apos;s Study Tasks
      </h2>
      <div className="flex flex-col gap-2">
        {tasks.map((task) => (
          <div
            key={task.id}
            className={`flex items-start gap-3 p-3 rounded-lg border transition-all duration-200 cursor-pointer select-none md:p-4 ${
              task.completed
                ? "border-border bg-muted/40"
                : "border-border bg-background hover:bg-accent/50"
            }`}
            onClick={() => toggleTask(task.id)}
          >
            {/* Checkbox */}
            <div
              className={`mt-0.5 w-4 h-4 rounded shrink-0 border-2 flex items-center justify-center transition-all duration-200 ${
                task.completed
                  ? "bg-primary border-primary"
                  : "border-muted-foreground/40"
              }`}
            >
              {task.completed && (
                <svg
                  className="w-2.5 h-2.5 text-primary-foreground"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={3}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              )}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <p
                className={`text-sm font-medium transition-all duration-200 ${
                  task.completed
                    ? "line-through text-muted-foreground"
                    : "text-foreground"
                }`}
              >
                {task.title}
              </p>
              <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                <span
                  className={`w-2 h-2 rounded-full shrink-0 ${task.courseColor}`}
                />
                {/* Course name truncated on small screens */}
                <span className="text-xs text-muted-foreground truncate max-w-[120px] sm:max-w-none">
                  {task.course}
                </span>
                <span className="text-xs text-muted-foreground">·</span>
                <span className="text-xs text-muted-foreground">
                  {task.duration} min
                </span>
                <span className="text-xs text-muted-foreground">·</span>
                <span
                  className={`text-xs px-2 py-0.5 rounded-full font-medium ${priorityStyles[task.priority]}`}
                >
                  {task.priority}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
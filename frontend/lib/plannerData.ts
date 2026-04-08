import type { Task } from "@/types/planner";

export const INITIAL_TASKS: Task[] = [
  // Tuesday March 31
  {
    id: 1,
    title: "Read Chapter 5",
    color: "blue",
    duration: 45,
    completed: false,
    dateKey: "2026-03-31",
  },
  {
    id: 2,
    title: "Watch Lecture Recording",
    color: "blue",
    duration: 60,
    completed: false,
    dateKey: "2026-03-31",
  },
  {
    id: 3,
    title: "Solve exercises",
    color: "blue",
    duration: 90,
    completed: false,
    dateKey: "2026-03-31",
  },
  {
    id: 4,
    title: "Read Chapter 3",
    color: "green",
    duration: 50,
    completed: true,
    dateKey: "2026-03-31",
  },
  {
    id: 5,
    title: "Review React Notes",
    color: "yellow",
    duration: 30,
    completed: true,
    dateKey: "2026-03-31",
  },

  // Wednesday April 1
  {
    id: 6,
    title: "Watch Lecture",
    color: "green",
    duration: 75,
    completed: false,
    dateKey: "2026-04-01",
  },
  {
    id: 7,
    title: "Complete Lab 2",
    color: "green",
    duration: 120,
    completed: false,
    dateKey: "2026-04-01",
  },
  {
    id: 8,
    title: "Read Chapter 4",
    color: "blue",
    duration: 60,
    completed: false,
    dateKey: "2026-04-01",
  },
];
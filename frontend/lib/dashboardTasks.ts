import { Task } from "@/types/task";

export const initialTasks: Task[] = [
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
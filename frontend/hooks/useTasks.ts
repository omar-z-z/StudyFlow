import { useState } from "react";
import { Task } from "@/types/task";
import { tasks as initialTasks } from "@/lib/dummy-data";

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);

  const toggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  return { tasks, toggleTask };
}
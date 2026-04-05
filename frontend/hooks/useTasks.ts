import { useState } from "react";
import { Task } from "@/types/task";
import { initialTasks } from "@/lib/dashboardTasks";

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);

  const toggleTask = (id: number) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  return { tasks, toggleTask };
}
import { useMemo, useState } from "react";
import { Task } from "@/types/task";
import { tasks as initialTasks } from "@/lib/expanded_dummy_data";

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);

  const toggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const addTask = (task: Omit<Task, "id" | "completed">) => {
    setTasks((prev) => [
      ...prev,
      { ...task, id: crypto.randomUUID(), completed: false },
    ]);
  };

  const today = new Date().toISOString().split("T")[0];

  const todayTasks = useMemo(
    () => tasks.filter((t) => t.date === today),
    [tasks, today]
  );

  const pendingTasks = todayTasks.filter((t) => !t.completed);
  const completedTasks = todayTasks.filter((t) => t.completed);

  return { tasks, toggleTask, addTask, todayTasks, pendingTasks, completedTasks };
}
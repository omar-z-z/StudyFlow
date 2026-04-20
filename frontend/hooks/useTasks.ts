import { useEffect, useMemo, useState } from "react";
import { Task } from "@/types/task";
import { apiFetch } from "@/lib/auth-context";
import { useAuth } from "@/lib/auth-context";

export function useTasks() {
  const { user } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user) return; // wait for auth
    apiFetch("/tasks")
      .then((res) => setTasks(res.data ?? res))
      .catch(console.error)
      .finally(() => setIsLoading(false));
  }, [user]);

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

  return { tasks, isLoading, toggleTask, addTask, todayTasks, pendingTasks, completedTasks };
}
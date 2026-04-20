import { useEffect, useMemo, useState } from "react";
import { Task } from "@/types/task";
import { apiFetch, useAuth } from "@/lib/auth-context";

export function useTasks() {
  const { user } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // GET /api/tasks
  useEffect(() => {
    if (!user) return;
    setIsLoading(true);
    apiFetch("/tasks")
      .then((res) => setTasks(res.data ?? res))
      .catch(console.error)
      .finally(() => setIsLoading(false));
  }, [user]);

  // POST /api/tasks
  const addTask = async (task: Omit<Task, "id" | "completed">) => {
    const tempId = `temp-${crypto.randomUUID()}`;
    const optimisticTask: Task = { ...task, id: tempId, completed: false };

    setTasks((prev) => [...prev, optimisticTask]);

    try {
      const res = await apiFetch("/tasks", {
        method: "POST",
        body: JSON.stringify({
          ...task,
          course_id: task.course?.id,
          course: undefined, // don't send the full object to the API
          estimatedTime: undefined, // don't send this to API as well
          estimated_time: task.estimatedTime
        }),
      });
      const created: Task = res.data ?? res;
      setTasks((prev) => prev.map((t) => (t.id === tempId ? created : t)));
    } catch (err) {
      console.error(err);
      setTasks((prev) => prev.filter((t) => t.id !== tempId));
    }
  };

  // PUT /api/tasks/{id}
  const updateTask = async (id: string, changes: Partial<Omit<Task, "id">>) => {
    const original = tasks.find((t) => t.id === id);
    if (!original) return;

    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, ...changes } : t)),
    );

    try {
      const res = await apiFetch(`/tasks/${id}`, {
        method: "PUT",
        body: JSON.stringify(changes),
      });
      // Laravel returns { data: Task } via TaskResource
      const updated: Task = res.data ?? res;
      setTasks((prev) => prev.map((t) => (t.id === id ? updated : t)));
    } catch (err) {
      console.error(err);
      setTasks((prev) => prev.map((t) => (t.id === id ? original : t)));
    }
  };

  // Toggle via PUT
  const toggleTask = (id: string) => {
    const task = tasks.find((t) => t.id === id);
    if (!task) return;
    updateTask(id, { completed: !task.completed });
  };

  // DELETE /api/tasks/{id}
  const deleteTask = async (id: string) => {
    const original = tasks.find((t) => t.id === id);

    setTasks((prev) => prev.filter((t) => t.id !== id));

    try {
      // Returns { message: "Task deleted" }, nothing to parse
      await apiFetch(`/tasks/${id}`, { method: "DELETE" });
    } catch (err) {
      console.error(err);
      if (original) {
        setTasks((prev) => [...prev, original]);
      }
    }
  };

  // Derived state
  const today = new Date().toISOString().split("T")[0];

  const todayTasks = useMemo(
    () => tasks.filter((t) => t.date === today),
    [tasks, today],
  );

  const pendingTasks = todayTasks.filter((t) => !t.completed);
  const completedTasks = todayTasks.filter((t) => t.completed);

  return {
    tasks,
    isLoading,
    addTask,
    toggleTask,
    updateTask,
    deleteTask,
    todayTasks,
    pendingTasks,
    completedTasks,
  };
}

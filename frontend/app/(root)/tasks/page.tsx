"use client";

import PomodoroTimer from "@/components/Tasks/PomodoroTimer";
import TaskList from "@/components/Tasks/TaskList";
import ProgressBanner from "@/components/Tasks/ProgressPanner";
import { useTasks } from "@/hooks/useTasks";

const TasksPage = () => {
  const { pendingTasks, completedTasks, toggleTask, addTask } = useTasks();
  const total = pendingTasks.length + completedTasks.length;

  return (
    <div className="flex-1 min-h-screen bg-background px-8 py-8 pb-12 box-border max-md:px-4 max-md:py-5 max-sm:px-3">
      {/* ── Page Header ── */}
      <div className="flex flex-col gap-0.5 mb-7">
        <h1 className="text-2xl font-semibold text-foreground m-0 tracking-tight leading-snug">
          Focus Mode
        </h1>
        <p className="text-sm text-muted-foreground m-0">
          Stay focused and complete your daily tasks
        </p>
      </div>

      {/* ── Pomodoro Timer ── */}
      <PomodoroTimer />

      {/* ── Task List ── */}
      <TaskList
        pendingTasks={pendingTasks}
        completedTasks={completedTasks}
        onToggle={toggleTask}
        onAdd={addTask}
      />

      {/* ── Progress Banner ── */}
      <ProgressBanner completed={completedTasks.length} total={total} />
    </div>
  );
};

export default TasksPage;
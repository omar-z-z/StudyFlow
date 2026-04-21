import { useState } from "react";
import { Task } from "@/types/task";
import { inputClass } from "@/lib/constants/courseModal";

type TaskChanges = Pick<Task, "title" | "date"> & { estimatedTime?: number };

type Props = {
  task: Task;
  onSave: (changes: TaskChanges) => void;
  onClose: () => void;
};

const EditTaskModal = ({ task, onSave, onClose }: Props) => {
  const [title, setTitle] = useState(task.title);
  const [date, setDate] = useState(task.date);
  const [estimatedTime, setEstimatedTime] = useState(
    task.estimatedTime?.toString() ?? "",
  );
  const [titleError, setTitleError] = useState(false);

  const handleSave = () => {
    if (!title.trim()) {
      setTitleError(true);
      return;
    }
    onSave({
      title: title.trim(),
      date,
      estimatedTime: estimatedTime ? Number(estimatedTime) : undefined,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Sheet on mobile, centered modal on desktop */}
      <div className="relative bg-card border border-border rounded-t-(--radius-xl) sm:rounded-(--radius-xl) p-6 w-full sm:max-w-md shadow-xl">
        <h2 className="text-base font-semibold text-foreground mb-5">
          Edit Task
        </h2>

        {/* Title */}
        <div className="mb-4">
          <label className="block text-xs font-medium text-muted-foreground mb-1.5 uppercase tracking-wider">
            Task Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              if (titleError) setTitleError(false);
            }}
            className={inputClass(titleError)}
            placeholder="e.g. Review chapter 3"
          />
          {titleError && (
            <p className="text-xs text-red-400 mt-1">Title is required.</p>
          )}
        </div>

        {/* Date */}
        <div className="mb-4">
          <label className="block text-xs font-medium text-muted-foreground mb-1.5 uppercase tracking-wider">
            Date
          </label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className={inputClass()}
          />
        </div>

        {/* Estimated Time */}
        <div className="mb-6">
          <label className="block text-xs font-medium text-muted-foreground mb-1.5 uppercase tracking-wider">
            Estimated Time (minutes)
          </label>
          <input
            type="number"
            min="0"
            value={estimatedTime}
            onChange={(e) => setEstimatedTime(e.target.value)}
            className={inputClass()}
            placeholder="e.g. 45"
          />
        </div>

        {/* Actions */}
        <div className="flex gap-2 justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm rounded-(--radius) border border-border text-muted-foreground hover:bg-muted transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 text-sm rounded-(--radius) bg-primary text-primary-foreground hover:opacity-90 transition-opacity font-medium"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditTaskModal;
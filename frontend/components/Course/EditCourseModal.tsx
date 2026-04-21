import { useState } from "react";
import { Course } from "@/types/course";
import { COLOR_OPTIONS, inputClass } from "@/lib/constants/courseModal";

const CheckIcon = () => (
  <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
    <path
      d="M2.5 7l3 3 6-6"
      stroke="white"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

type CourseChanges = {
  name: string;
  examDate: string;
  color: string;
};

type Props = {
  course: Course;
  onSave: (changes: CourseChanges) => void;
  onClose: () => void;
};

const EditCourseModal = ({ course, onSave, onClose }: Props) => {
  const [name, setName] = useState(course.name);
  const [examDate, setExamDate] = useState(course.examDate);
  const [color, setColor] = useState(course.color);
  const [nameError, setNameError] = useState(false);

  const handleSave = () => {
    if (!name.trim()) {
      setNameError(true);
      return;
    }
    onSave({ name: name.trim(), examDate: examDate || "", color: color || "" });
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
          Edit Course
        </h2>

        {/* Course Name */}
        <div className="mb-4">
          <label className="block text-xs font-medium text-muted-foreground mb-1.5 uppercase tracking-wider">
            Course Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              if (nameError) setNameError(false);
            }}
            className={inputClass(nameError)}
            placeholder="e.g. Data Structures"
          />
          {nameError && (
            <p className="text-xs text-red-400 mt-1">Name is required.</p>
          )}
        </div>

        {/* Exam Date */}
        <div className="mb-4">
          <label className="block text-xs font-medium text-muted-foreground mb-1.5 uppercase tracking-wider">
            Exam Date
          </label>
          <input
            type="date"
            value={examDate}
            onChange={(e) => setExamDate(e.target.value)}
            className={inputClass()}
          />
        </div>

        {/* Color */}
        <div className="mb-6">
          <label className="block text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wider">
            Color
          </label>
          <div className="flex gap-2.5 flex-wrap">
            {COLOR_OPTIONS.map(({ label, value }) => (
              <button
                key={value}
                onClick={() => setColor(value)}
                title={label}
                className="w-7 h-7 rounded-full transition-transform hover:scale-110 flex items-center justify-center"
                style={{ backgroundColor: value }}
                aria-label={`Select ${label}`}
              >
                {color === value && <CheckIcon />}
              </button>
            ))}
          </div>
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

export default EditCourseModal;
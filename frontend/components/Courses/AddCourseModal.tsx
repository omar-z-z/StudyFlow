"use client";

import { useState } from "react";
import { Course } from "@/types/course";

// ── Types 

type AddCourseModalProps = {
  onClose: () => void;
  onAdd: (course: Course) => void;
};

type FormState = {
  name: string;
  examDate: string;
  color: string;
};

type FormErrors = Partial<Record<keyof FormState, string>>;

// ── Constants 

const COLOR_OPTIONS = [
  { label: "Blue",   value: "#DBEAFE" },
  { label: "Green",  value: "#D1FAE5" },
  { label: "Purple", value: "#EDE9FE" },
  { label: "Orange", value: "#FFEDD5" },
  { label: "Pink",   value: "#FCE7F3" },
  { label: "Yellow", value: "#FEF9C3" },
];

const INITIAL_FORM: FormState = {
  name: "",
  examDate: "",
  color: COLOR_OPTIONS[0].value,
};

// ── Validation 

const validate = (form: FormState): FormErrors => {
  const errors: FormErrors = {};

  if (!form.name.trim()) {
    errors.name = "Course name is required.";
  }
  if (!form.examDate) {
    errors.examDate = "Exam date is required.";
  }

  return errors;
};

// ── Component 

const AddCourseModal = ({ onClose, onAdd }: AddCourseModalProps) => {
  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const [errors, setErrors] = useState<FormErrors>({});

  // ── Handlers 

  const handleChange = (field: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    // Clear the error for this field as the user types
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = () => {
    const validationErrors = validate(form);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Format the date to a readable string, e.g. "Jan 15, 2025"
    const formatted = new Date(form.examDate).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

    const newCourse: Course = {
      id: crypto.randomUUID(),
      name: form.name.trim(),
      examDate: formatted,
      color: form.color,
      progress: 0,
      topics: [],
      assignments: [],
    };

    onAdd(newCourse);
    onClose();
  };

  // ── Render 

  return (
    <div
      className="fixed inset-0 bg-black/35 flex items-center justify-center z-50 animate-[fadeIn_0.2s_ease]"
      onClick={onClose}
    >
      <div
        className="bg-card rounded-xl p-8 w-full max-w-[440px] shadow-2xl mx-4 animate-[slideUp_0.25s_cubic-bezier(0.34,1.56,0.64,1)]"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        {/* Header */}
        <h2
          id="modal-title"
          className="text-lg font-semibold text-foreground m-0 mb-1"
        >
          Add New Course
        </h2>
        <p className="text-sm text-muted-foreground m-0 mb-6 leading-relaxed">
          Fill in the details below to start tracking a new course.
        </p>

        {/* ── Fields ── */}
        <div className="flex flex-col gap-5">

          {/* Course Name */}
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="course-name"
              className="text-xs font-semibold uppercase tracking-widest text-muted-foreground"
            >
              Course Name
            </label>
            <input
              id="course-name"
              type="text"
              value={form.name}
              onChange={(e) => handleChange("name", e.target.value)}
              placeholder="e.g. Data Structures"
              className={`w-full px-3 py-2.5 bg-background text-sm text-foreground rounded-[var(--radius)] border transition-colors duration-150 outline-none focus:ring-2 focus:ring-primary/40 ${
                errors.name
                  ? "border-red-400 focus:ring-red-300/40"
                  : "border-border focus:border-primary"
              }`}
            />
            {errors.name && (
              <span className="text-xs text-red-500">{errors.name}</span>
            )}
          </div>

          {/* Exam Date */}
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="exam-date"
              className="text-xs font-semibold uppercase tracking-widest text-muted-foreground"
            >
              Exam Date
            </label>
            <input
              id="exam-date"
              type="date"
              value={form.examDate}
              onChange={(e) => handleChange("examDate", e.target.value)}
              className={`w-full px-3 py-2.5 bg-background text-sm text-foreground rounded-[var(--radius)] border transition-colors duration-150 outline-none focus:ring-2 focus:ring-primary/40 ${
                errors.examDate
                  ? "border-red-400 focus:ring-red-300/40"
                  : "border-border focus:border-primary"
              }`}
            />
            {errors.examDate && (
              <span className="text-xs text-red-500">{errors.examDate}</span>
            )}
          </div>

          {/* Color Picker */}
          <div className="flex flex-col gap-2">
            <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Card Color
            </span>
            <div className="flex items-center gap-2.5 flex-wrap">
              {COLOR_OPTIONS.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleChange("color", option.value)}
                  title={option.label}
                  aria-label={`Select ${option.label} color`}
                  className={`w-7 h-7 rounded-full border-2 transition-all duration-150 cursor-pointer ${
                    form.color === option.value
                      ? "border-primary scale-110 shadow-md"
                      : "border-transparent hover:scale-105"
                  }`}
                  style={{ backgroundColor: option.value }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* ── Actions ── */}
        <div className="flex justify-end gap-3 mt-8">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-transparent border border-border rounded-[var(--radius)] text-sm font-medium text-foreground cursor-pointer transition-colors duration-150 hover:bg-accent"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-primary text-primary-foreground border-none rounded-[var(--radius)] text-sm font-medium cursor-pointer transition-opacity duration-150 hover:opacity-90"
          >
            Add Course
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddCourseModal;
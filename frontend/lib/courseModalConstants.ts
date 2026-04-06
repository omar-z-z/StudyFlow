import { BasicForm } from "@/types/modaltypes";

export const COLOR_OPTIONS = [
  { label: "Blue",   value: "#3b82f6" },
  { label: "Green",  value: "#10b981" },
  { label: "Purple", value: "#8b5cf6" },
  { label: "Orange", value: "#f59e0b" },
  { label: "Pink",   value: "#ec4899" },
  { label: "Red",    value: "#ef4444" },
];

export const STEPS = ["Course Details", "Topics", "Assignments"] as const;

export const INITIAL_BASIC: BasicForm = {
  name: "",
  examDate: "",
  color: COLOR_OPTIONS[0].value,
};

/** Shared Tailwind class builder for text inputs */
export const inputClass = (hasError?: boolean) =>
  `w-full px-3 py-2.5 bg-background text-sm text-foreground rounded-[var(--radius)] border transition-colors duration-150 outline-none focus:ring-2 ${
    hasError
      ? "border-red-400 focus:ring-red-300/40"
      : "border-border focus:border-primary focus:ring-primary/30"
  }`;
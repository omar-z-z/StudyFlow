"use client";

import { useState } from "react";
import CourseMetaFields from "./CourseMetaFields";
import TopicsSection from "./TopicsSection";
import AssignmentsSection from "./AssignmentsSection";
import { Course as GeneratedCourse } from "@/types/course";
import { Topic } from "@/types/topic";
import { Assignment } from "@/types/assignment";

interface CoursePreviewPanelProps {
  course: GeneratedCourse;
  onConfirm: (course: GeneratedCourse) => void;
  onDiscard: () => void;
}

const CoursePreviewPanel = ({
  course: initialCourse,
  onConfirm,
  onDiscard,
}: CoursePreviewPanelProps) => {
  const [course, setCourse] = useState<GeneratedCourse>(initialCourse);

  const updateField = <K extends keyof GeneratedCourse>(
    key: K,
    value: GeneratedCourse[K]
  ) => setCourse((prev) => ({ ...prev, [key]: value }));

  const toggleTopic = (id: string) =>
    setCourse((prev) => ({
      ...prev,
      topics: prev.topics.map((t) =>
        t.id === id ? { ...t, completed: !t.completed } : t
      ),
    }));

  const removeTopic = (id: string) =>
    setCourse((prev) => ({
      ...prev,
      topics: prev.topics.filter((t) => t.id !== id),
    }));

  const addTopic = (topic: Topic) =>
    setCourse((prev) => ({ ...prev, topics: [...prev.topics, topic] }));

  const toggleAssignment = (id: string) =>
    setCourse((prev) => ({
      ...prev,
      assignments: prev.assignments.map((a) =>
        a.id === id ? { ...a, completed: !a.completed } : a
      ),
    }));

  const removeAssignment = (id: string) =>
    setCourse((prev) => ({
      ...prev,
      assignments: prev.assignments.filter((a) => a.id !== id),
    }));

  const addAssignment = (assignment: Assignment) =>
    setCourse((prev) => ({
      ...prev,
      assignments: [...prev.assignments, assignment],
    }));

  return (
    <div className="border border-border rounded-(--radius-lg) bg-card overflow-hidden">
      <div
        className="h-1.5 w-full"
        style={{ backgroundColor: course.color }}
        aria-hidden="true"
      />

      <div className="p-6 flex flex-col gap-6">
        {/* Banner */}
        <div className="flex items-center gap-2">
          <div
            className="w-2 h-2 rounded-full shrink-0"
            style={{ backgroundColor: course.color }}
            aria-hidden="true"
          />
          <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">
            AI Generated — Review &amp; Edit Before Saving
          </p>
        </div>

        <CourseMetaFields
          name={course.name}
          examDate={course.examDate}
          color={course.color}
          onUpdate={updateField}
        />

        <TopicsSection
          topics={course.topics}
          onToggle={toggleTopic}
          onRemove={removeTopic}
          onAdd={addTopic}
        />

        <AssignmentsSection
          assignments={course.assignments}
          onToggle={toggleAssignment}
          onRemove={removeAssignment}
          onAdd={addAssignment}
        />

        {/* Actions */}
        <div className="flex gap-3 pt-2 border-t border-border max-sm:flex-col">
          <button
            onClick={onDiscard}
            className="flex-1 py-2.5 px-4 text-sm font-medium text-foreground border border-border rounded-(--radius) bg-background hover:bg-accent transition-colors cursor-pointer"
          >
            Discard &amp; Re-upload
          </button>
          <button
            onClick={() => onConfirm(course)}
            className="flex-1 py-2.5 px-4 text-sm font-medium text-primary-foreground bg-primary rounded-(--radius) border-none hover:opacity-90 transition-opacity cursor-pointer"
          >
            Save Course
          </button>
        </div>
      </div>
    </div>
  );
};

export default CoursePreviewPanel;
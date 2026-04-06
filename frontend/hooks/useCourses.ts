import { useState } from "react";
import { courses as initialData } from "@/lib/dummy-data";
import { Course } from "@/types/course";

// ── helpers ──


const recalculateProgress = (course: Course): number => {
  const total = course.topics.length + course.assignments.length;
  if (total === 0) return 0;

  const completed =
    course.topics.filter((t) => t.completed).length +
    course.assignments.filter((a) => a.completed).length;

  return Math.round((completed / total) * 100);
};

// ── hook ──

export const useCourses = () => {
  const [courses, setCourses] = useState<Course[]>(initialData);

  const toggleTopic = (courseId: string, topicId: string) => {
    setCourses((prev) =>
      prev.map((course) => {
        if (course.id !== courseId) return course;

        const updatedTopics = course.topics.map((t) =>
          t.id === topicId ? { ...t, completed: !t.completed } : t
        );

        const updated = { ...course, topics: updatedTopics };
        return { ...updated, progress: recalculateProgress(updated) };
      })
    );
  };

  const toggleAssignment = (courseId: string, assignmentId: string) => {
    setCourses((prev) =>
      prev.map((course) => {
        if (course.id !== courseId) return course;

        const updatedAssignments = course.assignments.map((a) =>
          a.id === assignmentId ? { ...a, completed: !a.completed } : a
        );

        const updated = { ...course, assignments: updatedAssignments };
        return { ...updated, progress: recalculateProgress(updated) };
      })
    );
  };

  // ── Add a new course ───
  const addCourse = (newCourse: Course) => {
    setCourses((prev) => [...prev, newCourse]);
  };

  return { courses, toggleTopic, toggleAssignment, addCourse };
};
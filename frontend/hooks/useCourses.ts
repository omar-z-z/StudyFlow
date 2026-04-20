import { useEffect, useState } from "react";
import { Course } from "@/types/course";
import { apiFetch } from "@/lib/api";
import { useAuth } from "@/lib/auth-context";

// helpers
const recalculateProgress = (course: Course): number => {
  const total = course.topics.length + course.assignments.length;
  if (total === 0) return 0;

  const completed =
    course.topics.filter((t) => t.completed).length +
    course.assignments.filter((a) => a.completed).length;

  return Math.round((completed / total) * 100);
};

export const useCourses = () => {
  const { user } = useAuth();
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    apiFetch("/courses")
      .then((res) => setCourses(res.data ?? res))
      .catch(console.error)
      .finally(() => setIsLoading(false));
  }, [user]);

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

  const addCourse = (newCourse: Course) => {
    setCourses((prev) => [...prev, newCourse]);
  };

  return { courses, isLoading, toggleTopic, toggleAssignment, addCourse };
};
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

  // ─── GET /api/courses ──────────────────────────────────────────────────────
  useEffect(() => {
    if (!user) return;
    setIsLoading(true);
    apiFetch("/courses")
      .then((res) => setCourses(res.data ?? res))
      .catch(console.error)
      .finally(() => setIsLoading(false));
  }, [user]);

  // ─── POST /api/courses + topics + assignments ──────────────────────────────
  const addCourse = async (newCourse: Omit<Course, "id" | "progress">) => {
    const { topics, assignments, ...courseFields } = newCourse;
    console.log(courseFields);

    const tempId = `temp-${crypto.randomUUID()}`;
    const optimisticCourse: Course = {
      ...newCourse,
      id: tempId,
      progress: 0,
    };

    setCourses((prev) => [...prev, optimisticCourse]);

    try {
      // Step 1: create the course
      const courseRes = await apiFetch("/courses", {
        method: "POST",
        body: JSON.stringify({
          name: courseFields.name,
          color: courseFields.color,
          exam_date: courseFields.examDate,
        }),
      });
      const createdCourse: Course = courseRes.data ?? courseRes;
      const courseId = createdCourse.id;

      // Step 2: create all topics and assignments in parallel
      const [createdTopics, createdAssignments] = await Promise.all([
        Promise.all(
          topics.map((t) =>
            apiFetch(`/courses/${courseId}/topics`, {
              method: "POST",
              body: JSON.stringify({ title: t.title, week: t.week }),
              // no course_id in body — it's in the URL
            }).then((res) => res.data ?? res),
          ),
        ),
        Promise.all(
          assignments.map((a) =>
            apiFetch(`/courses/${courseId}/assignments`, {
              method: "POST",
              body: JSON.stringify({ title: a.title, due_date: a.dueDate }),
            }).then((res) => res.data ?? res),
          ),
        ),
      ]);

      // Step 3: replace optimistic entry with the fully assembled course
      const finalCourse: Course = {
        ...createdCourse,
        topics: createdTopics,
        assignments: createdAssignments,
        progress: 0,
      };

      setCourses((prev) =>
        prev.map((c) => (c.id === tempId ? finalCourse : c)),
      );
    } catch (err) {
      console.error(err);
      // Revert the whole thing if any request fails
      setCourses((prev) => prev.filter((c) => c.id !== tempId));
    }
  };

  // ─── PUT /api/courses/{id} ─────────────────────────────────────────────────
  const updateCourse = async (
    id: string,
    changes: Partial<
      Omit<Course, "id" | "topics" | "assignments" | "progress">
    >,
  ) => {
    const original = courses.find((c) => c.id === id);
    if (!original) return;

    setCourses((prev) =>
      prev.map((c) => (c.id === id ? { ...c, ...changes } : c)),
    );

    try {
      const res = await apiFetch(`/courses/${id}`, {
        method: "PUT",
        body: JSON.stringify(changes),
      });
      // update() also doesn't load relations — preserve existing ones
      const updated: Course = {
        ...(res.data ?? res),
        topics: original.topics,
        assignments: original.assignments,
        progress: original.progress,
      };
      setCourses((prev) => prev.map((c) => (c.id === id ? updated : c)));
    } catch (err) {
      console.error(err);
      setCourses((prev) => prev.map((c) => (c.id === id ? original : c)));
    }
  };

  // ─── DELETE /api/courses/{id} ──────────────────────────────────────────────
  const deleteCourse = async (id: string) => {
    const original = courses.find((c) => c.id === id);

    setCourses((prev) => prev.filter((c) => c.id !== id));

    try {
      // Returns { message: "Course deleted" }, nothing to parse
      await apiFetch(`/courses/${id}`, { method: "DELETE" });
    } catch (err) {
      console.error(err);
      if (original) {
        setCourses((prev) => [...prev, original]);
      }
    }
  };

  // ─── Toggle topic → PUT /api/courses/{courseId}/topics/{topicId} ───────────
  const toggleTopic = async (courseId: string, topicId: string) => {
    const course = courses.find((c) => c.id === courseId);
    const topic = course?.topics.find((t) => t.id === topicId);
    if (!course || !topic) return;

    // Optimistic update
    setCourses((prev) =>
      prev.map((c) => {
        if (c.id !== courseId) return c;
        const updatedTopics = c.topics.map((t) =>
          t.id === topicId ? { ...t, completed: !t.completed } : t,
        );
        const updated = { ...c, topics: updatedTopics };
        return { ...updated, progress: recalculateProgress(updated) };
      }),
    );

    try {
      await apiFetch(`/courses/${courseId}/topics/${topicId}`, {
        method: "PUT",
        body: JSON.stringify({ completed: !topic.completed }),
      });
    } catch (err) {
      console.error(err);
      // Revert on failure
      setCourses((prev) =>
        prev.map((c) => {
          if (c.id !== courseId) return c;
          const revertedTopics = c.topics.map((t) =>
            t.id === topicId ? topic : t,
          );
          const reverted = { ...c, topics: revertedTopics };
          return { ...reverted, progress: recalculateProgress(reverted) };
        }),
      );
    }
  };

  // ─── Toggle assignment → PUT /api/courses/{courseId}/assignments/{assignmentId}
  const toggleAssignment = async (courseId: string, assignmentId: string) => {
    const course = courses.find((c) => c.id === courseId);
    const assignment = course?.assignments.find((a) => a.id === assignmentId);
    if (!course || !assignment) return;

    // Optimistic update
    setCourses((prev) =>
      prev.map((c) => {
        if (c.id !== courseId) return c;
        const updatedAssignments = c.assignments.map((a) =>
          a.id === assignmentId ? { ...a, completed: !a.completed } : a,
        );
        const updated = { ...c, assignments: updatedAssignments };
        return { ...updated, progress: recalculateProgress(updated) };
      }),
    );

    try {
      await apiFetch(`/courses/${courseId}/assignments/${assignmentId}`, {
        method: "PUT",
        body: JSON.stringify({ completed: !assignment.completed }),
      });
    } catch (err) {
      console.error(err);
      // Revert on failure
      setCourses((prev) =>
        prev.map((c) => {
          if (c.id !== courseId) return c;
          const revertedAssignments = c.assignments.map((a) =>
            a.id === assignmentId ? assignment : a,
          );
          const reverted = { ...c, assignments: revertedAssignments };
          return { ...reverted, progress: recalculateProgress(reverted) };
        }),
      );
    }
  };

  return {
    courses,
    isLoading,
    addCourse,
    updateCourse,
    deleteCourse,
    toggleTopic,
    toggleAssignment,
  };
};

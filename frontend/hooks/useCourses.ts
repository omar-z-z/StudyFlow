import { useEffect, useState } from "react";
import { Course } from "@/types/course";
import { apiFetch } from "@/lib/api";
import { useAuth } from "@/lib/auth-context";
import { useNotifications } from "@/lib/notification-context";

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
  const { showToast } = useNotifications();

  // ─── GET /api/courses ──────────────────────────────────────────────────────
  useEffect(() => {
    if (!user) return;
    setIsLoading(true);
    apiFetch("/courses")
      .then((res) => {
        const raw: Course[] = res.data ?? res;
        const normalized = raw.map((course) => ({
          ...course,
          assignments: course.assignments.map((a: any) => ({
            ...a,
            dueDate: a.due_date ?? a.dueDate ?? "",
          })),
        }));
        setCourses(normalized);
      })
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
      showToast({
        type: "course",
        title: "Course Added!",
        body: `"${courseFields.name}" has been created.`,
      });
    } catch (err) {
      console.error(err);
      // Revert the whole thing if any request fails
      setCourses((prev) => prev.filter((c) => c.id !== tempId));
    }
  };

  // ─── PUT /api/courses/{id} ─────────────────────────────────────────────────
  const updateCourse = async (id: string, updated: Course) => {
    const original = courses.find((c) => c.id === id);
    if (!original) return;
    setIsLoading(true);

    // Optimistic update
    setCourses((prev) =>
      prev.map((c) =>
        c.id === id
          ? { ...updated, progress: recalculateProgress(updated) }
          : c,
      ),
    );

    try {
      // update basic course fields
      await apiFetch(`/courses/${id}`, {
        method: "PUT",
        body: JSON.stringify({
          name: updated.name,
          color: updated.color,
          exam_date: updated.examDate,
        }),
      });

      const originalTopicIds = new Set(original.topics.map((t) => t.id));
      const originalAssignmentIds = new Set(
        original.assignments.map((a) => a.id),
      );

      const updatedTopicIds = new Set(updated.topics.map((t) => t.id));
      const updatedAssignmentIds = new Set(
        updated.assignments.map((a) => a.id),
      );

      // sync topics
      await Promise.all([
        // POST new topics
        ...updated.topics
          .filter((t) => !originalTopicIds.has(t.id))
          .map((t) =>
            apiFetch(`/courses/${id}/topics`, {
              method: "POST",
              body: JSON.stringify({ title: t.title, week: t.week }),
            }),
          ),
        // PUT existing topics
        ...updated.topics
          .filter((t) => {
            const orig = original.topics.find((o) => o.id === t.id);
            return orig && (orig.title !== t.title || orig.week !== t.week);
          })
          .map((t) =>
            apiFetch(`/courses/${id}/topics/${t.id}`, {
              method: "PUT",
              body: JSON.stringify({ title: t.title, week: t.week }),
            }),
          ),
        // DELETE removed topics
        ...original.topics
          .filter((t) => !updatedTopicIds.has(t.id))
          .map((t) =>
            apiFetch(`/courses/${id}/topics/${t.id}`, { method: "DELETE" }),
          ),
      ]);

      // sync assignments
      await Promise.all([
        // POST new assignments
        ...updated.assignments
          .filter((a) => !originalAssignmentIds.has(a.id))
          .map((a) =>
            apiFetch(`/courses/${id}/assignments`, {
              method: "POST",
              body: JSON.stringify({ title: a.title, due_date: a.dueDate }),
            }),
          ),
        // PUT existing assignments
        ...updated.assignments
          .filter((a) => {
            const orig = original.assignments.find((o) => o.id === a.id);
            return (
              orig && (orig.title !== a.title || orig.dueDate !== a.dueDate)
            );
          })
          .map((a) =>
            apiFetch(`/courses/${id}/assignments/${a.id}`, {
              method: "PUT",
              body: JSON.stringify({ title: a.title, due_date: a.dueDate }),
            }),
          ),
        // DELETE removed assignments
        ...original.assignments
          .filter((a) => !updatedAssignmentIds.has(a.id))
          .map((a) =>
            apiFetch(`/courses/${id}/assignments/${a.id}`, {
              method: "DELETE",
            }),
          ),
      ]);
      setIsLoading(false);
    } catch (err) {
      console.error(err);
      setIsLoading(false);
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

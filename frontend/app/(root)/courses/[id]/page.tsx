"use client";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useCourses } from "@/hooks/useCourses";
import { useTasks } from "@/hooks/useTasks";
import { Task } from "@/types/task";
import { Course } from "@/types/course";
import CourseHeader from "@/components/Course/CourseHeader";
import CourseTopicsSection from "@/components/Course/CourseTopicsSection";
import CourseAssignmentsSection from "@/components/Course/CourseAssignmentsSection";
import CourseTasksSection from "@/components/Course/CourseTaskSection";
import EditCourseModal from "@/components/Course/EditCourseModal";
import ConfirmDialog from "@/components/basicComponents/ConfirmDialog";
import EditTaskModal from "@/components/Course/EditTaskModal";
import { ArrowLeft } from "lucide-react";


export default function CoursePage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const {
    courses,
    isLoading: coursesLoading,
    toggleTopic,
    toggleAssignment,
    updateCourse,
    deleteCourse,
  } = useCourses();

  const {
    tasks,
    isLoading: tasksLoading,
    toggleTask,
    updateTask,
    deleteTask,
  } = useTasks();

  const course = courses.find((c) => String(c.id) === id);
  const courseTasks = tasks.filter((t) => String(t.course?.id) === id);

  // ── Modal state ──
  const [showEditCourse, setShowEditCourse] = useState(false);
  const [showDeleteCourse, setShowDeleteCourse] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [deletingTaskId, setDeletingTaskId] = useState<string | null>(null);

  // ── Handlers ──
  const handleUpdateCourse = (changes: Pick<Course, "name" | "examDate" | "color">) => {
    if (!course) return; 
    updateCourse(course.id, changes);
    setShowEditCourse(false);
  };

  const handleDeleteCourse = async () => {
    if (!course) return; 
    await deleteCourse(course.id);
    router.push("/courses");
  };

  const handleUpdateTask = (changes: Partial<Omit<Task, "id">>) => {
    if (!editingTask) return;
    updateTask(editingTask.id, changes);
    setEditingTask(null);
  };

  const handleDeleteTask = async () => {
    if (!deletingTaskId) return;
    await deleteTask(deletingTaskId);
    setDeletingTaskId(null);
  };

  // ── Loading / not found ──
  if (coursesLoading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <span className="text-sm text-muted-foreground animate-pulse">
          Loading course…
        </span>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] gap-3">
        <span className="text-sm text-muted-foreground">Course not found.</span>
        <button
          onClick={() => router.push("/courses")}
          className="text-sm text-primary hover:underline"
        >
          Back to courses
        </button>
      </div>
    );
  }

  return (
    <>
      <div className="mx-auto px-4 py-6 sm:py-8">
        {/* Back */}
        <button
          onClick={() => router.back()}
          className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-5"
        >
          <ArrowLeft size={16} />
          Back to Courses
        </button>

        {/* Header */}
        <CourseHeader
          course={course}
          onEdit={() => setShowEditCourse(true)}
          onDelete={() => setShowDeleteCourse(true)}
        />

        {/* Topics + Assignments */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <CourseTopicsSection
            topics={course.topics}
            onToggle={(topicId) => toggleTopic(course.id, topicId)}
          />
          <CourseAssignmentsSection
            assignments={course.assignments}
            onToggle={(assignmentId) => toggleAssignment(course.id, assignmentId)}
          />
        </div>

        {/* Tasks */}
        <CourseTasksSection
          tasks={courseTasks}
          isLoading={tasksLoading}
          onToggle={toggleTask}
          onEdit={setEditingTask}
          onDelete={setDeletingTaskId}
        />
      </div>

      {/* Modals */}
      {showEditCourse && (
        <EditCourseModal
          course={course}
          onSave={handleUpdateCourse}
          onClose={() => setShowEditCourse(false)}
        />
      )}

      {showDeleteCourse && (
        <ConfirmDialog
          title="Delete Course"
          message={`Are you sure you want to delete "${course.name}"? This cannot be undone.`}
          confirmLabel="Delete Course"
          onConfirm={handleDeleteCourse}
          onCancel={() => setShowDeleteCourse(false)}
        />
      )}

      {editingTask && (
        <EditTaskModal
          task={editingTask}
          onSave={handleUpdateTask}
          onClose={() => setEditingTask(null)}
        />
      )}

      {deletingTaskId && (
        <ConfirmDialog
          title="Delete Task"
          message="Are you sure you want to delete this task?"
          confirmLabel="Delete Task"
          onConfirm={handleDeleteTask}
          onCancel={() => setDeletingTaskId(null)}
        />
      )}
    </>
  );
}
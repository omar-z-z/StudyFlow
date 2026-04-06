"use client";

import { useState } from "react";
import CourseCard from "../../../components/Courses/CourseCard";
import { useCourses } from "@/hooks/useCourses";
import AddCourseModal from "@/components/Courses/AddCourseModal";

const CoursesPage = () => {
  const { courses, toggleTopic, toggleAssignment, addCourse } = useCourses();
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="flex-1 min-h-screen bg-background px-8 py-8 pb-12 box-border max-md:px-4 max-md:py-5 max-sm:px-3">
      {/* ── Page Header ── */}
      <div className="flex items-start justify-between mb-7 gap-4 flex-wrap max-sm:flex-col max-sm:items-stretch">
        <div className="flex flex-col gap-0.5">
          <h1 className="text-2xl font-semibold text-foreground m-0 tracking-tight leading-snug">
            My Courses
          </h1>
          <p className="text-sm text-muted-foreground m-0">
            Track your progress across all courses
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-4 py-2.5 bg-primary text-primary-foreground text-sm font-medium rounded-(--radius) border-none cursor-pointer transition-all duration-150 hover:opacity-90 hover:-translate-y-px active:translate-y-0 max-sm:w-full max-sm:justify-center"
        >
          <svg
            width="15"
            height="15"
            viewBox="0 0 15 15"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M7.5 2v11M2 7.5h11"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
          Add Course
        </button>
      </div>

      {/* ── Course List ── */}
      <div className="flex flex-col">
        {courses.length === 0 ? (
          <div className="text-center py-16 px-8 text-muted-foreground text-sm border-2 border-dashed border-border rounded-xl bg-card">
            No courses yet. Click "Add Course" to get started.
          </div>
        ) : (
          courses.map((course) => (
            <CourseCard
              key={course.id}
              course={course}
              onToggleTopic={(topicId) => toggleTopic(course.id, topicId)}
              onToggleAssignment={(assignmentId) =>
                toggleAssignment(course.id, assignmentId)
              }
            />
          ))
        )}
      </div>

      {/* ── Add Course Modal ── */}
      {showModal && (
        <AddCourseModal onClose={() => setShowModal(false)} onAdd={addCourse} />
      )}
    </div>
  );
};

export default CoursesPage;

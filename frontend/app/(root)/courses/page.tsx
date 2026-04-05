"use client";

import { useState } from "react";
import CourseCard from "../../../components/Courses/CourseCard";
import { courses as coursesData } from "@/lib/dummy-data";


const CoursesPage = () => {
  const [courses, setCourses] = useState(coursesData);
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
          <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
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
            <CourseCard key={course.id} course={course} />
          ))
        )}
      </div>

      {/* ── Add Course Modal (placeholder) ── */}
      {showModal && (
        <div
          className="fixed inset-0 bg-black/35 flex items-center justify-center z-50 animate-[fadeIn_0.2s_ease]"
          onClick={() => setShowModal(false)}
        >
          <div
            className="bg-card rounded-xl p-8 w-full max-w-[420px] shadow-2xl mx-4 animate-[slideUp_0.25s_cubic-bezier(0.34,1.56,0.64,1)]"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
          >
            <h2
              id="modal-title"
              className="text-lg font-semibold text-foreground m-0 mb-2"
            >
              Add New Course
            </h2>
            <p className="text-sm text-muted-foreground m-0 mb-6 leading-relaxed">
              Connect this modal to your form or routing logic to create courses.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-transparent border border-border rounded-[var(--radius)] text-sm font-medium text-foreground cursor-pointer transition-colors duration-150 hover:bg-accent"
              >
                Cancel
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-primary text-primary-foreground border-none rounded-[var(--radius)] text-sm font-medium cursor-pointer transition-opacity duration-150 hover:opacity-90"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CoursesPage;
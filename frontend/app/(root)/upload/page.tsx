"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import UploadPDFCard from "@/components/Upload/UploadPDFCard";
import SyllabusContentArea from "@/components/Upload/SyllabusContentArea";
import WhatHappensNext from "@/components/Upload/WhatHappensNext";
import CoursePreviewPanel from "@/components/Upload/CoursePreview/CoursePreviewPanel";
import { useCourses } from "@/hooks/useCourses";
import { Course as GeneratedCourse } from "@/types/course";
import { extractTextFromPDF } from "@/lib/utils/getPdfText";

const UploadPage = () => {
  const { addCourse } = useCourses();
  const router = useRouter();

  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const [syllabusContent, setSyllabusContent] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedCourse, setGeneratedCourse] =
    useState<GeneratedCourse | null>(null);
  const [error, setError] = useState<string | null>(null);

  // ── CHANGE 1: Real PDF extraction ──
  const handleFileSelect = async (file: File) => {
    try {
      const text = await extractTextFromPDF(file);
      setSyllabusContent(text);
      setTimeout(
        () => textareaRef.current?.scrollIntoView({ behavior: "smooth" }),
        100,
      );
    } catch {
      setError("Failed to extract PDF text. Try pasting it manually.");
    }
  };

  // ── CHANGE 2: Real API call ──
  const handleGenerate = async () => {
    if (!syllabusContent.trim()) {
      setError("Please enter or upload a syllabus first.");
      return;
    }

    setIsGenerating(true);
    setGeneratedCourse(null);
    setError(null);

    try {
      const res = await fetch("/api/generate-course", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ syllabus: syllabusContent }),
      });

      if (!res.ok) throw new Error("Failed to generate course");

      const data: GeneratedCourse = await res.json();
      setGeneratedCourse(data);

      setTimeout(
        () =>
          document
            .getElementById("course-preview")
            ?.scrollIntoView({ behavior: "smooth" }),
        100,
      );
    } catch (err) {
      setError(
        "Something went wrong while generating the course. Please try again.",
      );
    } finally {
      setIsGenerating(false);
    }
  };

  const handleConfirm = (course: GeneratedCourse) => {
    addCourse(course);
    router.push("/courses");
  };

  const handleClear = () => {
    setSyllabusContent("");
    setGeneratedCourse(null);
    setError(null);
  };

  const handleDiscard = () => {
    setGeneratedCourse(null);
    setSyllabusContent("");
    setError(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="flex-1 min-h-screen bg-background px-8 py-8 pb-12 box-border max-md:px-4 max-md:py-5 max-sm:px-3">
      <div className="flex flex-col gap-0.5 mb-7">
        <h1 className="text-2xl font-semibold text-foreground m-0 tracking-tight leading-snug">
          Upload Syllabus
        </h1>
        <p className="text-sm text-muted-foreground m-0">
          Upload or paste your course syllabus to automatically generate a study
          plan
        </p>
      </div>

      <div className="flex gap-4 mb-5 max-sm:flex-col">
        <UploadPDFCard onFileSelect={handleFileSelect} onClear={handleClear} />
      </div>

      <div className="flex flex-col gap-4">
        <SyllabusContentArea
          textareaRef={textareaRef as React.RefObject<HTMLTextAreaElement>}
          value={syllabusContent}
          onChange={setSyllabusContent}
          onGenerate={handleGenerate}
          isGenerating={isGenerating}
        />

        {error && <p className="text-sm text-destructive px-1">{error}</p>}

        {!generatedCourse && !isGenerating && <WhatHappensNext />}

        {generatedCourse && (
          <div id="course-preview">
            <CoursePreviewPanel
              course={generatedCourse}
              onConfirm={handleConfirm}
              onDiscard={handleDiscard}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default UploadPage;

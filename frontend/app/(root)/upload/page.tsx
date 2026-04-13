"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import UploadPDFCard from "@/components/Upload/UploadPDFCard";
import SyllabusContentArea from "@/components/Upload/SyllabusContentArea";
import WhatHappensNext from "@/components/Upload/WhatHappensNext";
import CoursePreviewPanel, {
  GeneratedCourse,
} from "@/components/Upload/CoursePreviewPanel";
import { useCourses } from "@/hooks/useCourses";

const UploadPage = () => {
  const router = useRouter();
  const { addCourse } = useCourses();

  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const [syllabusContent, setSyllabusContent] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedCourse, setGeneratedCourse] = useState<GeneratedCourse | null>(null);

  // ── PDF selected: extract text and populate the shared textarea ──
  const handleFileSelect = (file: File) => {
    setSyllabusContent(`[PDF uploaded: ${file.name}]\n\nExtracted content will appear here after processing...`);
    // Scroll to textarea so the user sees it filled
    setTimeout(() => textareaRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
  };

  // ── Call AI, get back a structured course ──
  const handleGenerate = async () => {
    if (!syllabusContent.trim()) return;
    setIsGenerating(true);
    setGeneratedCourse(null);

    try {
      const res = await fetch("/api/generate-course", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ syllabus: syllabusContent }),
      });
      const data: GeneratedCourse = await res.json();
      setGeneratedCourse(data);
      // Scroll to preview panel
      setTimeout(
        () =>
          document
            .getElementById("course-preview")
            ?.scrollIntoView({ behavior: "smooth" }),
        100
      );
    } finally {
      setIsGenerating(false);
    }
  };

  // ── User confirms the (possibly edited) course ──
  const handleConfirm = (course: GeneratedCourse) => {
    addCourse(course);
    router.push("/courses");
  };

  // ── User discards and wants to re-upload ──
  const handleDiscard = () => {
    setGeneratedCourse(null);
    setSyllabusContent("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="flex-1 min-h-screen bg-background px-8 py-8 pb-12 box-border max-md:px-4 max-md:py-5 max-sm:px-3">
      {/* ── Page Header ── */}
      <div className="flex flex-col gap-0.5 mb-7">
        <h1 className="text-2xl font-semibold text-foreground m-0 tracking-tight leading-snug">
          Upload Syllabus
        </h1>
        <p className="text-sm text-muted-foreground m-0">
          Upload or paste your course syllabus to automatically generate a study plan
        </p>
      </div>

      {/* ── Upload Method Cards ── */}
      <div className="flex gap-4 mb-5 max-sm:flex-col">
        <UploadPDFCard onFileSelect={handleFileSelect} />
      </div>

      {/* ── Shared Syllabus Textarea + Generate Button ── */}
      <div className="flex flex-col gap-4">
        <SyllabusContentArea
          textareaRef={textareaRef as React.RefObject<HTMLTextAreaElement>}
          value={syllabusContent}
          onChange={setSyllabusContent}
          onGenerate={handleGenerate}
          isGenerating={isGenerating}
        />

        {/* Info box — only shown before a result appears */}
        {!generatedCourse && !isGenerating && <WhatHappensNext />}

        {/* ── AI Result: editable course preview ── */}
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
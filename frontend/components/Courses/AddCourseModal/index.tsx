"use client";

import { useState } from "react";
import { Course } from "@/types/course";
import { Assignment } from "@/types/assignment";
import { Topic } from "@/types/topic";
import { Step, BasicForm, BasicErrors, TopicDraft, AssignmentDraft } from "@/types/modal";
import { INITIAL_BASIC, STEP_SUBTITLES } from "@/lib/courseModalConstants";
import StepIndicator from "./StepIndicator";
import CourseDetailsStep from "./CourseDetailsStep";
import TopicsStep from "./TopicsStep";
import AssignmentsStep from "./AssignmentsStep";
import ModalFooter from "./ModalFooter";

// Types 

type AddCourseModalProps = {
  onClose: () => void;
  onAdd: (course: Course) => void;
};

// Helpers 

const newTopicDraft = (): TopicDraft => ({ id: crypto.randomUUID(), title: "", week: "1" });
const newAssignmentDraft = (): AssignmentDraft => ({ id: crypto.randomUUID(), title: "", dueDate: "" });

const validateBasic = (form: BasicForm): BasicErrors => {
  const errors: BasicErrors = {};
  if (!form.name.trim()) errors.name = "Course name is required.";
  if (!form.examDate)    errors.examDate = "Exam date is required.";
  return errors;
};

// Component 

const AddCourseModal = ({ onClose, onAdd }: AddCourseModalProps) => {
  const [step, setStep]               = useState<Step>(0);
  const [basic, setBasic]             = useState<BasicForm>(INITIAL_BASIC);
  const [basicErrors, setBasicErrors] = useState<BasicErrors>({});
  const [topics, setTopics]           = useState<TopicDraft[]>([newTopicDraft()]);
  const [assignments, setAssignments] = useState<AssignmentDraft[]>([newAssignmentDraft()]);

  // Basic handlers 

  const handleBasicChange = (field: keyof BasicForm, value: string) => {
    setBasic((prev) => ({ ...prev, [field]: value }));
    if (basicErrors[field]) setBasicErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  // Topic handlers 

  const addTopic    = () => setTopics((prev) => [...prev, newTopicDraft()]);
  const removeTopic = (id: string) => setTopics((prev) => prev.filter((t) => t.id !== id));
  const updateTopic = (id: string, field: keyof Omit<TopicDraft, "id">, value: string) =>
    setTopics((prev) => prev.map((t) => (t.id === id ? { ...t, [field]: value } : t)));

  // Assignment handlers 

  const addAssignment    = () => setAssignments((prev) => [...prev, newAssignmentDraft()]);
  const removeAssignment = (id: string) => setAssignments((prev) => prev.filter((a) => a.id !== id));
  const updateAssignment = (id: string, field: keyof Omit<AssignmentDraft, "id">, value: string) =>
    setAssignments((prev) => prev.map((a) => (a.id === id ? { ...a, [field]: value } : a)));

  // Navigation 

  const handleNext = () => {
    if (step === 0) {
      const errors = validateBasic(basic);
      if (Object.keys(errors).length > 0) { setBasicErrors(errors); return; }
    }
    setStep((prev) => (prev + 1) as Step);
  };

  const handleBack = () => setStep((prev) => (prev - 1) as Step);

  // Submit 

  const handleSubmit = () => {
    const finalTopics: Topic[] = topics
      .filter((t) => t.title.trim())
      .map((t) => ({ id: `t-${t.id}`, title: t.title.trim(), week: parseInt(t.week, 10) || 1, completed: false }));

    const finalAssignments: Assignment[] = assignments
      .filter((a) => a.title.trim())
      .map((a) => ({ id: `a-${a.id}`, title: a.title.trim(), dueDate: a.dueDate, completed: false }));

    onAdd({
      id: crypto.randomUUID(),
      name: basic.name.trim(),
      examDate: basic.examDate,
      color: basic.color,
      progress: 0,
      topics: finalTopics,
      assignments: finalAssignments,
    });
    onClose();
  };

  // Render 

  return (
    <div
      className="fixed inset-0 bg-black/35 flex items-center justify-center z-50 animate-[fadeIn_0.2s_ease]"
      onClick={onClose}
    >
      <div
        className="bg-card rounded-xl p-8 w-full max-w-[480px] shadow-2xl mx-4 animate-[slideUp_0.25s_cubic-bezier(0.34,1.56,0.64,1)] max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        {/* Header */}
        <div className="shrink-0">
          <h2 id="modal-title" className="text-lg font-semibold text-foreground m-0 mb-1">
            Add New Course
          </h2>
          <p className="text-sm text-muted-foreground m-0 mb-6 leading-relaxed">
            {STEP_SUBTITLES[step]}
          </p>
          <StepIndicator current={step} />
        </div>

        {/* Scrollable step content */}
        <div className="flex-1 overflow-y-auto pr-1 -mr-1">
          {step === 0 && (
            <CourseDetailsStep basic={basic} errors={basicErrors} onChange={handleBasicChange} />
          )}
          {step === 1 && (
            <TopicsStep
              topics={topics}
              onAdd={addTopic}
              onUpdate={updateTopic}
              onRemove={removeTopic}
            />
          )}
          {step === 2 && (
            <AssignmentsStep
              assignments={assignments}
              onAdd={addAssignment}
              onUpdate={updateAssignment}
              onRemove={removeAssignment}
            />
          )}
        </div>

        {/* Footer */}
        <ModalFooter
          step={step}
          onClose={onClose}
          onBack={handleBack}
          onNext={handleNext}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
};

export default AddCourseModal;
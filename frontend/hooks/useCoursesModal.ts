"use client";

import { useState } from "react";
import { Course } from "@/types/course";
import { Assignment } from "@/types/assignment";
import { Topic } from "@/types/topic";
import {
  Step,
  BasicForm,
  BasicErrors,
  TopicDraft,
  AssignmentDraft,
} from "@/types/modal";
import { INITIAL_BASIC } from "@/lib/constants/courseModal";

// Helpers
const newTopicDraft = (): TopicDraft => ({
  id: crypto.randomUUID(),
  title: "",
  week: "1",
});

const newAssignmentDraft = (): AssignmentDraft => ({
  id: crypto.randomUUID(),
  title: "",
  dueDate: "",
});

const validateBasic = (form: BasicForm): BasicErrors => {
  const errors: BasicErrors = {};
  if (!form.name.trim()) errors.name = "Course name is required.";
  if (!form.examDate) errors.examDate = "Exam date is required.";
  return errors;
};

// Transformation
const buildCourse = (
  basic: BasicForm,
  topics: TopicDraft[],
  assignments: AssignmentDraft[],
  initialCourse?: Course
): Course => {
  return {
    id: initialCourse?.id ?? crypto.randomUUID(),
    name: basic.name.trim(),
    examDate: basic.examDate,
    color: basic.color,
    progress: initialCourse?.progress ?? 0,
    topics: topics
      .filter((t) => t.title.trim())
      .map<Topic>((t) => ({
        id: t.id,
        title: t.title.trim(),
        week: parseInt(t.week, 10) || 1,
        completed: false,
      })),
    assignments: assignments
      .filter((a) => a.title.trim())
      .map<Assignment>((a) => ({
        id: a.id,
        title: a.title.trim(),
        dueDate: a.dueDate,
        completed: false,
      })),
  };
};

// Hook
export const useCourseModal = (initialCourse?: Course) => {
  const isEditMode = !!initialCourse;

  const [step, setStep] = useState<Step>(0);
  const [basicErrors, setBasicErrors] = useState<BasicErrors>({});

  const [basic, setBasic] = useState<BasicForm>(
    initialCourse
      ? {
          name: initialCourse.name,
          examDate: initialCourse.examDate ?? "",
          color: initialCourse.color,
        }
      : INITIAL_BASIC
  );

  const [topics, setTopics] = useState<TopicDraft[]>(
    initialCourse?.topics.length
      ? initialCourse.topics.map((t) => ({
          id: t.id,
          title: t.title,
          week: String(t.week),
        }))
      : [newTopicDraft()]
  );

  const [assignments, setAssignments] = useState<AssignmentDraft[]>(
    initialCourse?.assignments.length
      ? initialCourse.assignments.map((a) => ({
          id: a.id,
          title: a.title,
          dueDate: a.dueDate.split("T")[0],
        }))
      : [newAssignmentDraft()]
  );

  // Handlers
  const handleBasicChange = (field: keyof BasicForm, value: string) => {
    setBasic((prev) => ({ ...prev, [field]: value }));
    if (basicErrors[field]) {
      setBasicErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const addTopic = () => setTopics((p) => [...p, newTopicDraft()]);
  const removeTopic = (id: string) =>
    setTopics((p) => p.filter((t) => t.id !== id));
  const updateTopic = (
    id: string,
    field: keyof Omit<TopicDraft, "id">,
    value: string
  ) =>
    setTopics((p) =>
      p.map((t) => (t.id === id ? { ...t, [field]: value } : t))
    );

  const addAssignment = () =>
    setAssignments((p) => [...p, newAssignmentDraft()]);
  const removeAssignment = (id: string) =>
    setAssignments((p) => p.filter((a) => a.id !== id));
  const updateAssignment = (
    id: string,
    field: keyof Omit<AssignmentDraft, "id">,
    value: string
  ) =>
    setAssignments((p) =>
      p.map((a) => (a.id === id ? { ...a, [field]: value } : a))
    );

  // Navigation
  const next = () => {
    if (step === 0) {
      const errors = validateBasic(basic);
      if (Object.keys(errors).length) {
        setBasicErrors(errors);
        return;
      }
    }
    setStep((s) => (s + 1) as Step);
  };

  const back = () => setStep((s) => (s - 1) as Step);

  // Submit
  const submit = (): Course => {
    return buildCourse(basic, topics, assignments, initialCourse);
  };

  return {
    isEditMode,
    step,
    basic,
    topics,
    assignments,
    basicErrors,
    handleBasicChange,
    addTopic,
    removeTopic,
    updateTopic,
    addAssignment,
    removeAssignment,
    updateAssignment,
    next,
    back,
    submit,
  };
};
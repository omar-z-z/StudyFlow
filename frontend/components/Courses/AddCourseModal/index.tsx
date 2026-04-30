"use client";

import { Course } from "@/types/course";
import { STEP_SUBTITLES } from "@/lib/constants/courseModal";
import StepIndicator from "./StepIndicator";
import CourseDetailsStep from "./CourseDetailsStep";
import TopicsStep from "./TopicsStep";
import AssignmentsStep from "./AssignmentsStep";
import ModalFooter from "./ModalFooter";
import { useCourseModal } from "@/hooks/useCoursesModal";

type Props = {
  onClose: () => void;
  onAdd: (course: Course) => void;
  initialCourse?: Course;
  onEdit?: (course: Course) => void;
};

const AddCourseModal = ({ onClose, onAdd, onEdit, initialCourse }: Props) => {
  const {
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
  } = useCourseModal(initialCourse);

  const handleSubmit = () => {
    const course = submit();

    if (isEditMode) {
      onEdit?.(course);
    } else {
      onAdd(course);
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/35 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-card rounded-xl p-8 w-full max-w-120 shadow-2xl mx-4 max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div>
          <h2 className="text-lg font-semibold mb-1">
            {isEditMode ? "Edit Course" : "Add New Course"}
          </h2>
          <p className="text-sm text-muted-foreground mb-6">
            {STEP_SUBTITLES[step]}
          </p>
          <StepIndicator current={step} />
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          {step === 0 && (
            <CourseDetailsStep
              basic={basic}
              errors={basicErrors}
              onChange={handleBasicChange}
            />
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
          onBack={back}
          onNext={next}
          onSubmit={handleSubmit}
          submitLabel={isEditMode ? "Save Changes" : "Add Course"}
        />
      </div>
    </div>
  );
};

export default AddCourseModal;
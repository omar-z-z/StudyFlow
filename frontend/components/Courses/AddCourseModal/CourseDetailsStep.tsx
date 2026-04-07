import Field from "@/components/basicComponents/Field";
import { COLOR_OPTIONS, inputClass } from "@/lib/courseModalConstants";
import { BasicForm, BasicErrors } from "@/types/modal";

type CourseDetailsStepProps = {
  basic: BasicForm;
  errors: BasicErrors;
  onChange: (field: keyof BasicForm, value: string) => void;
};

const CourseDetailsStep = ({ basic, errors, onChange }: CourseDetailsStepProps) => (
  <div className="flex flex-col gap-5">
    <Field label="Course Name" htmlFor="course-name" error={errors.name}>
      <input
        id="course-name"
        type="text"
        value={basic.name}
        onChange={(e) => onChange("name", e.target.value)}
        placeholder="e.g. Data Structures"
        className={inputClass(!!errors.name)}
      />
    </Field>

    <Field label="Exam Date" htmlFor="exam-date" error={errors.examDate}>
      <input
        id="exam-date"
        type="date"
        value={basic.examDate}
        onChange={(e) => onChange("examDate", e.target.value)}
        className={inputClass(!!errors.examDate)}
      />
    </Field>

    <div className="flex flex-col gap-2">
      <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
        Card Color
      </span>
      <div className="flex items-center p-2 gap-2.5 flex-wrap">
        {COLOR_OPTIONS.map((option) => (
          <button
            key={option.value}
            onClick={() => onChange("color", option.value)}
            title={option.label}
            aria-label={`Select ${option.label}`}
            className={`w-7 h-7 rounded-full border-2 transition-all duration-150 cursor-pointer ${
              basic.color === option.value
                ? "border-foreground scale-110 shadow-md"
                : "border-transparent hover:scale-105"
            }`}
            style={{ backgroundColor: option.value }}
          />
        ))}
      </div>
    </div>
  </div>
);

export default CourseDetailsStep;
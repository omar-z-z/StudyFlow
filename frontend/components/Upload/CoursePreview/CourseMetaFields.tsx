import ColorPicker from "./ColorPicker";
import { Course as GeneratedCourse } from "@/types/course";

interface CourseMetaFieldsProps {
  name: string;
  examDate: string | undefined;
  color: string;
  onUpdate: <K extends keyof GeneratedCourse>(
    key: K,
    value: GeneratedCourse[K]
  ) => void;
}

const CourseMetaFields = ({
  name,
  examDate,
  color,
  onUpdate,
}: CourseMetaFieldsProps) => (
  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
    {/* Course name */}
    <div className="flex flex-col gap-1.5 sm:col-span-2">
      <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
        Course Name
      </label>
      <input
        type="text"
        value={name}
        onChange={(e) => onUpdate("name", e.target.value)}
        className="px-3 py-2 rounded-(--radius-md) border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
      />
    </div>

    {/* Exam date */}
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
        Exam Date
      </label>
      <input
        type="date"
        value={examDate}
        onChange={(e) => onUpdate("examDate", e.target.value)}
        className="px-3 py-2 rounded-(--radius-md) border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
      />
    </div>

    <ColorPicker selected={color} onChange={(c) => onUpdate("color", c)} />
  </div>
);

export default CourseMetaFields;
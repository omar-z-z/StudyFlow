import { ChangeEvent, RefObject } from "react";
import { SparkleIcon } from "../basicComponents/icons";
import { PLACEHOLDER } from "@/lib/constants/uploadTextPlaceHolder";

interface SyllabusContentAreaProps {
  textareaRef: RefObject<HTMLTextAreaElement>;
  value: string;
  onChange: (value: string) => void;
  onGenerate: () => void;
  isGenerating: boolean;
}

const SyllabusContentArea = ({
  textareaRef,
  value,
  onChange,
  onGenerate,
  isGenerating,
}: SyllabusContentAreaProps) => {

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className="border border-border rounded-(--radius-lg) bg-card p-6 flex flex-col gap-4">
      {/* Section Title */}
      <h2 className="text-base font-medium text-foreground m-0">
        Syllabus Content
      </h2>

      {/* Textarea */}
      <textarea
        ref={textareaRef}
        value={value}
        onChange={handleChange}
        placeholder={PLACEHOLDER}
        rows={12}
        className="
          w-full resize-y min-h-[220px] p-4 rounded-(--radius-md)
          border border-border bg-background text-foreground text-sm
          placeholder:text-muted-foreground
          focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent
          transition-colors duration-150
          font-[inherit] leading-relaxed
        "
      />

      {/* Generate Button */}
      <button
        onClick={onGenerate}
        disabled={isGenerating || value.trim().length === 0}
        className="
          flex items-center justify-center gap-2.5
          w-full py-3 px-6
          bg-primary text-primary-foreground
          text-sm font-medium rounded-(--radius)
          border-none cursor-pointer
          transition-all duration-150
          hover:opacity-90 hover:-translate-y-px
          active:translate-y-0
          disabled:opacity-50 disabled:cursor-not-allowed disabled:translate-y-0
        "
      >
        {/* Sparkle Icon */}
        <SparkleIcon />
        {isGenerating ? "Generating..." : "Generate Study Plan"}
      </button>
    </div>
  );
};

export default SyllabusContentArea;

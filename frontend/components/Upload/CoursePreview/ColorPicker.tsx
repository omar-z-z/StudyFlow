// import { COLOR_OPTIONS } from "@/constants/courseColors";
export const COLOR_OPTIONS = [
  "#3b82f6",
  "#10b981",
  "#f59e0b",
  "#ef4444",
  "#8b5cf6",
  "#ec4899",
  "#06b6d4",
  "#84cc16",
];

interface ColorPickerProps {
  selected: string;
  onChange: (color: string) => void;
}

const ColorPicker = ({ selected, onChange }: ColorPickerProps) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
      Course Color
    </label>
    <div className="flex items-center gap-2 flex-wrap">
      {COLOR_OPTIONS.map((c) => (
        <button
          key={c}
          onClick={() => onChange(c)}
          title={c}
          className={`w-7 h-7 rounded-full border-2 transition-transform duration-100 hover:scale-110 cursor-pointer ${
            selected === c
              ? "border-foreground scale-110"
              : "border-transparent"
          }`}
          style={{ backgroundColor: c }}
          aria-label={`Color ${c}`}
        />
      ))}
    </div>
  </div>
);

export default ColorPicker;
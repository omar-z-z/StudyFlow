import { COLOR_OPTIONS } from "@/lib/constants/courseModal";

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
      {COLOR_OPTIONS.map(({label, value}) => (
        <button
          key={value}
          onClick={() => onChange(value)}
          title={label}
          className={`w-7 h-7 rounded-full border-2 transition-transform duration-100 hover:scale-110 cursor-pointer ${
            selected === value
              ? "border-foreground scale-110"
              : "border-transparent"
          }`}
          style={{ backgroundColor: value }}
          aria-label={`Color ${value}`}
        />
      ))}
    </div>
  </div>
);

export default ColorPicker;
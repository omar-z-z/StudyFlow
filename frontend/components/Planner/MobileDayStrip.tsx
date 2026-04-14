import type { DayDescriptor } from "@/types/daydescriptor";

interface MobileDayStripProps {
  days: DayDescriptor[];
  selectedIndex: number;
  onSelect: (index: number) => void;
}

const MobileDayStrip = ({
  days,
  selectedIndex,
  onSelect,
}: MobileDayStripProps) => {
  return (
    <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide -mx-4 px-4 mt-4">
      {days.map((day, index) => {
        const isSelected = index === selectedIndex;
        const hasTask = day.tasks.length > 0;

        return (
          <button
            key={day.dateKey}
            type="button"
            onClick={() => onSelect(index)}
            className={`
              flex flex-col items-center gap-0.5 shrink-0 w-12 md:w-20 py-2.5 rounded-xl border transition-colors cursor-pointer
              ${
                isSelected
                  ? "bg-primary border-primary text-primary-foreground"
                  : day.isToday
                  ? "border-foreground bg-background text-foreground"
                  : "border-border bg-card text-foreground hover:bg-accent"
              }
            `}
          >
            <span
              className={`text-xs font-medium uppercase tracking-wide ${
                isSelected ? "text-primary-foreground/80" : "text-muted-foreground"
              }`}
            >
              {day.dayName}
            </span>
            <span className="text-base font-semibold leading-none">
              {day.dayNumber}
            </span>
            {/* Task count dot */}
            {hasTask && (
              <span
                className={`w-1.5 h-1.5 rounded-full mt-0.5 ${
                  isSelected ? "bg-primary-foreground/60" : "bg-muted-foreground/50"
                }`}
              />
            )}
          </button>
        );
      })}
    </div>
  );
};

export default MobileDayStrip;
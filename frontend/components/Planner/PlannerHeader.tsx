"use client";

interface PlannerHeaderProps {
  monthLabel: string;
  isCurrentWeek: boolean;
  onPrev: () => void;
  onNext: () => void;
  onToday: () => void;
}

const PlannerHeader = ({
  monthLabel,
  isCurrentWeek,
  onPrev,
  onNext,
  onToday,
}: PlannerHeaderProps) => {
  return (
    <div className="flex items-start justify-between gap-4 flex-wrap max-sm:flex-col max-sm:items-stretch">
      {/* Left: title + month */}
      <div className="flex flex-col gap-0.5">
        <h1 className="text-2xl font-semibold text-foreground m-0 tracking-tight leading-snug">
          Study Planner
        </h1>
        <p className="text-sm text-muted-foreground m-0">{monthLabel}</p>
      </div>

      {/* Right: navigation */}
      <div className="flex items-center gap-2 max-sm:justify-between">
        <button
          type="button"
          onClick={onToday}
          disabled={isCurrentWeek}
          className={`px-4 py-1.5 text-sm font-medium rounded-(--radius) border transition-colors ${
            isCurrentWeek
              ? "border-border text-muted-foreground cursor-default"
              : "border-border text-foreground hover:bg-accent cursor-pointer"
          }`}
        >
          Today
        </button>

        <div className="flex items-center gap-2 ml-auto">
          <button
            type="button"
            onClick={onPrev}
            aria-label="Previous week"
            className="w-8 h-8 flex items-center justify-center rounded-(--radius) border border-border text-foreground hover:bg-accent transition-colors cursor-pointer"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M10 12L6 8l4-4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          <button
            type="button"
            onClick={onNext}
            aria-label="Next week"
            className="w-8 h-8 flex items-center justify-center rounded-(--radius) border border-border text-foreground hover:bg-accent transition-colors cursor-pointer"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M6 4l4 4-4 4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlannerHeader;
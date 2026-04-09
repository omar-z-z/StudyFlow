interface PomodoroSettingsProps {
  workMinutes: number;
  breakMinutes: number;
  onWorkChange: (value: number) => void;
  onBreakChange: (value: number) => void;
  onClose: () => void;
}

const WORK_PRESETS = [15, 25, 30, 45, 50];
const BREAK_PRESETS = [5, 10, 15];

const clamp = (val: number, min: number, max: number) =>
  Math.max(min, Math.min(max, val));

export const PomodoroSettings = ({
  workMinutes,
  breakMinutes,
  onWorkChange,
  onBreakChange,
  onClose,
}: PomodoroSettingsProps) => {
  return (
    <div className="mt-4 border-t border-border pt-4 animate-in fade-in slide-in-from-top-2 duration-200">
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {/* Focus Duration */}
        <div className="rounded-lg border border-border/60 p-3">
          <div className="mb-2 flex items-center justify-between">
            <label className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
              Focus Duration
            </label>
            <span className="text-xs font-semibold tabular-nums text-foreground">
              {workMinutes} min
            </span>
          </div>

          <div className="mb-3 flex flex-wrap gap-1.5">
            {WORK_PRESETS.map((val) => (
              <button
                key={val}
                onClick={() => onWorkChange(val)}
                className={`rounded border px-2.5 py-1 text-xs font-medium transition-all duration-150 cursor-pointer ${
                  workMinutes === val
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-background text-muted-foreground hover:border-foreground hover:text-foreground"
                }`}
              >
                {val}m
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onWorkChange(clamp(workMinutes - 5, 5, 90))}
              className="flex h-7 w-7 items-center justify-center rounded border border-border bg-background text-sm text-foreground transition-colors hover:bg-accent cursor-pointer"
            >
              −
            </button>
            <input
              type="number"
              min={5}
              max={90}
              value={workMinutes}
              onChange={(e) =>
                onWorkChange(clamp(Number(e.target.value) || 5, 5, 90))
              }
              className="h-7 flex-1 rounded border border-border bg-background text-center text-sm font-medium tabular-nums text-foreground focus:outline-none focus:ring-1 focus:ring-foreground"
            />
            <button
              onClick={() => onWorkChange(clamp(workMinutes + 5, 5, 90))}
              className="flex h-7 w-7 items-center justify-center rounded border border-border bg-background text-sm text-foreground transition-colors hover:bg-accent cursor-pointer"
            >
              +
            </button>
          </div>
        </div>

        {/* Break Duration */}
        <div className="rounded-lg border border-border/60 p-3">
          <div className="mb-2 flex items-center justify-between">
            <label className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
              Break Duration
            </label>
            <span className="text-xs font-semibold tabular-nums text-foreground">
              {breakMinutes} min
            </span>
          </div>

          <div className="mb-3 flex flex-wrap gap-1.5">
            {BREAK_PRESETS.map((val) => (
              <button
                key={val}
                onClick={() => onBreakChange(val)}
                className={`rounded border px-2.5 py-1 text-xs font-medium transition-all duration-150 cursor-pointer ${
                  breakMinutes === val
                    ? "border-[#22c55e] bg-[#22c55e] text-white"
                    : "border-border bg-background text-muted-foreground hover:border-foreground hover:text-foreground"
                }`}
              >
                {val}m
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onBreakChange(clamp(breakMinutes - 1, 1, 30))}
              className="flex h-7 w-7 items-center justify-center rounded border border-border bg-background text-sm text-foreground transition-colors hover:bg-accent cursor-pointer"
            >
              −
            </button>
            <input
              type="number"
              min={1}
              max={30}
              value={breakMinutes}
              onChange={(e) =>
                onBreakChange(clamp(Number(e.target.value) || 1, 1, 30))
              }
              className="h-7 flex-1 rounded border border-border bg-background text-center text-sm font-medium tabular-nums text-foreground focus:outline-none focus:ring-1 focus:ring-foreground"
            />
            <button
              onClick={() => onBreakChange(clamp(breakMinutes + 1, 1, 30))}
              className="flex h-7 w-7 items-center justify-center rounded border border-border bg-background text-sm text-foreground transition-colors hover:bg-accent cursor-pointer"
            >
              +
            </button>
          </div>
        </div>
      </div>

      <button
        onClick={onClose}
        className="mt-4 w-full rounded border border-border py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground cursor-pointer"
      >
        Done
      </button>
    </div>
  );
};
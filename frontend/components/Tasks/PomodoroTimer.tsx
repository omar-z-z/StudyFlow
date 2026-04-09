import { usePomodoro } from "@/hooks/usePomodoro";

const CIRCUMFERENCE = 2 * Math.PI * 54; // r=54

const PomodoroTimer = () => {
  const { minutes, seconds, running, phase, progress, start, pause, reset } =
    usePomodoro();

  const strokeDashoffset = CIRCUMFERENCE * (1 - progress);

  return (
    <div className="bg-card border border-border rounded-xl p-6 mb-6">
      <h2 className="text-base font-medium text-foreground text-center mb-5">
        Pomodoro Timer
      </h2>

      {/* SVG ring + time display */}
      <div className="flex justify-center mb-5">
        <div className="relative w-36 h-36 flex items-center justify-center">
          <svg
            className="absolute inset-0 -rotate-90"
            width="144"
            height="144"
            viewBox="0 0 144 144"
          >
            {/* Track */}
            <circle
              cx="72"
              cy="72"
              r="54"
              fill="none"
              stroke="var(--muted)"
              strokeWidth="6"
            />
            {/* Progress */}
            <circle
              cx="72"
              cy="72"
              r="54"
              fill="none"
              stroke={phase === "work" ? "var(--foreground)" : "#22c55e"}
              strokeWidth="6"
              strokeLinecap="round"
              strokeDasharray={CIRCUMFERENCE}
              strokeDashoffset={strokeDashoffset}
              className="transition-all duration-1000 ease-linear"
            />
          </svg>
          {/* Time */}
          <span className="text-3xl font-semibold tabular-nums text-foreground tracking-tight">
            {minutes}:{seconds}
          </span>
        </div>
      </div>

      {/* Phase label */}
      <p className="text-center text-xs font-medium text-muted-foreground uppercase tracking-widest mb-4">
        {phase === "work" ? "Focus" : "Short Break"}
      </p>

      {/* Controls */}
      <div className="flex justify-center gap-3">
        <button
          onClick={running ? pause : start}
          className="flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground text-sm font-medium rounded-(--radius) border-none cursor-pointer transition-all duration-150 hover:opacity-90 hover:-translate-y-px active:translate-y-0"
        >
          {running ? (
            <>
              <PauseIcon />
              Pause
            </>
          ) : (
            <>
              <PlayIcon />
              Start
            </>
          )}
        </button>

        <button
          onClick={reset}
          className="flex items-center gap-2 px-5 py-2.5 bg-background text-foreground text-sm font-medium rounded-(--radius) border border-border cursor-pointer transition-all duration-150 hover:bg-accent hover:-translate-y-px active:translate-y-0"
        >
          <ResetIcon />
          Reset
        </button>
      </div>
    </div>
  );
};

/* ── Inline icon components ── */

const PlayIcon = () => (
  <svg
    width="13"
    height="13"
    viewBox="0 0 13 13"
    fill="currentColor"
    aria-hidden="true"
  >
    <polygon points="2,1 11,6.5 2,12" />
  </svg>
);

const PauseIcon = () => (
  <svg
    width="13"
    height="13"
    viewBox="0 0 13 13"
    fill="currentColor"
    aria-hidden="true"
  >
    <rect x="2" y="1" width="3.5" height="11" rx="1" />
    <rect x="7.5" y="1" width="3.5" height="11" rx="1" />
  </svg>
);

const ResetIcon = () => (
  <svg
    width="13"
    height="13"
    viewBox="0 0 13 13"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M1.5 6.5A5 5 0 1 1 3 10.2" />
    <polyline points="1.5,3.5 1.5,6.5 4.5,6.5" />
  </svg>
);

export default PomodoroTimer;
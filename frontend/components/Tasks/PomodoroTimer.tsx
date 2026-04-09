"use client";

import { useState } from "react";
import { usePomodoro } from "@/hooks/usePomodoro";
import { PomodoroSettings } from "./PomodoroSettings";
import { PauseIcon, PlayIcon, ResetIcon } from "../basicComponents/icons";

const CIRCUMFERENCE = 2 * Math.PI * 54;

const GearIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1Z" />
  </svg>
);

const PomodoroTimer = () => {
  const [workMinutes, setWorkMinutes] = useState(25);
  const [breakMinutes, setBreakMinutes] = useState(5);
  const [showSettings, setShowSettings] = useState(false);

  const { minutes, seconds, running, phase, progress, sessions, start, pause, reset } =
    usePomodoro({ workMinutes, breakMinutes });

  const strokeDashoffset = CIRCUMFERENCE * (1 - progress);
  const isWork = phase === "work";

  return (
    <div className="bg-secondary border border-border rounded-xl p-6 mb-6">

      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-base font-medium text-foreground">
          Pomodoro Timer
        </h2>
        <div className="flex items-center gap-2.5">
          {sessions > 0 && (
            <span className="text-xs tabular-nums text-muted-foreground">
              {sessions} {sessions === 1 ? "session" : "sessions"}
            </span>
          )}
          <button
            onClick={() => setShowSettings((v) => !v)}
            title="Adjust times"
            className={`w-7 h-7 flex items-center justify-center rounded border cursor-pointer transition-all duration-150
              ${showSettings
                ? "bg-foreground text-background border-foreground"
                : "bg-transparent text-muted-foreground border-border hover:text-foreground hover:border-foreground"
              }`}
          >
            <GearIcon />
          </button>
        </div>
      </div>

      {/* Ring + time */}
      <div className="flex justify-center mb-5">
        <div className="relative w-36 h-36 flex items-center justify-center">
          <svg className="absolute inset-0 -rotate-90" width="144" height="144" viewBox="0 0 144 144">
            <circle cx="72" cy="72" r="54" fill="none"
              stroke="var(--background)" strokeWidth="6" />
            <circle cx="72" cy="72" r="54" fill="none"
              stroke={isWork ? "var(--foreground)" : "#22c55e"}
              strokeWidth="6" strokeLinecap="round"
              strokeDasharray={CIRCUMFERENCE}
              strokeDashoffset={strokeDashoffset}
              className="transition-all duration-1000 ease-linear"
            />
          </svg>
          <span className="text-3xl font-semibold tabular-nums text-foreground tracking-tight">
            {minutes}:{seconds}
          </span>
        </div>
      </div>

      <p className="text-center text-xs font-medium text-muted-foreground uppercase tracking-widest mb-4">
        {isWork ? `Focus · ${workMinutes}m` : `Short Break · ${breakMinutes}m`}
      </p>

      <div className="flex justify-center gap-3">
        <button
          onClick={running ? pause : start}
          className="flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground text-sm font-medium rounded-(--radius) border-none cursor-pointer transition-all duration-150 hover:opacity-90 hover:-translate-y-px active:translate-y-0"
        >
          {running ? <><PauseIcon />Pause</> : <><PlayIcon />Start</>}
        </button>
        <button
          onClick={reset}
          className="flex items-center gap-2 px-5 py-2.5 bg-background text-foreground text-sm font-medium rounded-(--radius) border border-border cursor-pointer transition-all duration-150 hover:bg-accent hover:-translate-y-px active:translate-y-0"
        >
          <ResetIcon />Reset
        </button>
      </div>

      {/* Settings panel */}
      {showSettings && (
        <PomodoroSettings
          workMinutes={workMinutes}
          breakMinutes={breakMinutes}
          onWorkChange={setWorkMinutes}
          onBreakChange={setBreakMinutes}
          onClose={() => setShowSettings(false)}
        />
      )}
    </div>
  );
};

export default PomodoroTimer;
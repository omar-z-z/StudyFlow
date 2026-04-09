"use client";

import { useState, useEffect, useRef, useCallback } from "react";

type Phase = "work" | "break";

interface UsePomodoroOptions {
  workMinutes?: number;
  breakMinutes?: number;
}

export function usePomodoro({
  workMinutes = 25,
  breakMinutes = 5,
}: UsePomodoroOptions = {}) {
  const [phase, setPhase] = useState<Phase>("work");
  const [secondsLeft, setSecondsLeft] = useState(workMinutes * 60);
  const [running, setRunning] = useState(false);
  const [sessions, setSessions] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const totalSeconds = phase === "work" ? workMinutes * 60 : breakMinutes * 60;
  const progress = 1 - secondsLeft / totalSeconds;

  const minutes = String(Math.floor(secondsLeft / 60)).padStart(2, "0");
  const seconds = String(secondsLeft % 60).padStart(2, "0");

  const clearTimer = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  useEffect(() => {
    if (!running) return;
    intervalRef.current = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearTimer();
          setRunning(false);
          const nextPhase = phase === "work" ? "break" : "work";
          if (phase === "work") setSessions((s) => s + 1);
          setPhase(nextPhase);
          return nextPhase === "work" ? workMinutes * 60 : breakMinutes * 60;
        }
        return prev - 1;
      });
    }, 1000);
    return clearTimer;
  }, [running, phase, workMinutes, breakMinutes, clearTimer]);

  // Reset timer when durations change externally
  useEffect(() => {
    clearTimer();
    setRunning(false);
    setPhase("work");
    setSecondsLeft(workMinutes * 60);
  }, [workMinutes, breakMinutes, clearTimer]);

  const start = () => setRunning(true);
  const pause = () => setRunning(false);

  const reset = useCallback(() => {
    clearTimer();
    setRunning(false);
    setPhase("work");
    setSecondsLeft(workMinutes * 60);
  }, [clearTimer, workMinutes]);

  const skipPhase = useCallback(() => {
    clearTimer();
    setRunning(false);
    const nextPhase = phase === "work" ? "break" : "work";
    if (phase === "work") setSessions((s) => s + 1);
    setPhase(nextPhase);
    setSecondsLeft(nextPhase === "work" ? workMinutes * 60 : breakMinutes * 60);
  }, [clearTimer, phase, workMinutes, breakMinutes]);

  return {
    minutes,
    seconds,
    running,
    phase,
    progress,
    sessions,
    start,
    pause,
    reset,
    skipPhase,
  };
}
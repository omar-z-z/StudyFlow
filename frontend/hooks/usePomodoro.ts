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
          setPhase(nextPhase);
          return nextPhase === "work" ? workMinutes * 60 : breakMinutes * 60;
        }
        return prev - 1;
      });
    }, 1000);
    return clearTimer;
  }, [running, phase, workMinutes, breakMinutes, clearTimer]);

  const start = () => setRunning(true);
  const pause = () => setRunning(false);

  const reset = () => {
    clearTimer();
    setRunning(false);
    setPhase("work");
    setSecondsLeft(workMinutes * 60);
  };

  return { minutes, seconds, running, phase, progress, start, pause, reset };
}
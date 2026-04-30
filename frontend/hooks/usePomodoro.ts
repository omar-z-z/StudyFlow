"use client";

import { useNotifications } from "@/lib/notification-context";
import { useEffect, useRef, useCallback, useReducer } from "react";

type Phase = "work" | "break";

interface UsePomodoroOptions {
  workMinutes?: number;
  breakMinutes?: number;
}

interface State {
  phase: Phase;
  secondsLeft: number;
  running: boolean;
  sessions: number;
}

type Action =
  | { type: "START" }
  | { type: "PAUSE" }
  | { type: "RESET"; workMinutes: number }
  | { type: "TICK"; workMinutes: number; breakMinutes: number }
  | { type: "SKIP"; workMinutes: number; breakMinutes: number }
  | { type: "SET_DURATIONS"; workMinutes: number };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "START":
      return { ...state, running: true };

    case "PAUSE":
      return { ...state, running: false };

    case "RESET":
      return {
        phase: "work",
        secondsLeft: action.workMinutes * 60,
        running: false,
        sessions: 0,
      };

    case "SET_DURATIONS":
      return {
        phase: "work",
        secondsLeft: action.workMinutes * 60,
        running: false,
        sessions: state.sessions,
      };

    case "TICK": {
      if (!state.running) return state;

      if (state.secondsLeft <= 1) {
        const nextPhase: Phase = state.phase === "work" ? "break" : "work";

        return {
          ...state,
          phase: nextPhase,
          running: false,
          secondsLeft:
            nextPhase === "work"
              ? action.workMinutes * 60
              : action.breakMinutes * 60,
          sessions:
            state.phase === "work"
              ? state.sessions + 1
              : state.sessions,
        };
      }

      return {
        ...state,
        secondsLeft: state.secondsLeft - 1,
      };
    }

    case "SKIP": {
      const nextPhase: Phase = state.phase === "work" ? "break" : "work";

      return {
        ...state,
        phase: nextPhase,
        running: false,
        secondsLeft:
          nextPhase === "work"
            ? action.workMinutes * 60
            : action.breakMinutes * 60,
        sessions:
          state.phase === "work"
            ? state.sessions + 1
            : state.sessions,
      };
    }

    default:
      return state;
  }
}

export function usePomodoro({
  workMinutes = 25,
  breakMinutes = 5,
}: UsePomodoroOptions = {}) {
  const { showToast } = useNotifications();

  const [state, dispatch] = useReducer(reducer, {
    phase: "work",
    secondsLeft: workMinutes * 60,
    running: false,
    sessions: 0,
  });

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const clearTimer = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  // Timer effect
  useEffect(() => {
    if (!state.running) return;

    intervalRef.current = setInterval(() => {
      dispatch({
        type: "TICK",
        workMinutes,
        breakMinutes,
      });
    }, 1000);

    return clearTimer;
  }, [state.running, workMinutes, breakMinutes, clearTimer]);

  // Phase change side effects (toasts ONLY — no state mutation)
  const prevPhaseRef = useRef<Phase>(state.phase);

  useEffect(() => {
    if (prevPhaseRef.current === state.phase) return;

    if (prevPhaseRef.current === "work" && state.phase === "break") {
      showToast({
        type: "work",
        title: "✅ Focus Session Complete",
        body: `${workMinutes} minute session done. Time for a break!`,
      });
    }

    if (prevPhaseRef.current === "break" && state.phase === "work") {
      showToast({
        type: "break",
        title: "⏱️ Break Over",
        body: "Ready for another focus session?",
      });
    }

    prevPhaseRef.current = state.phase;
  }, [state.phase, showToast, workMinutes]);

  // Reset when durations change
  useEffect(() => {
    clearTimer();
    dispatch({ type: "SET_DURATIONS", workMinutes });
  }, [workMinutes, breakMinutes, clearTimer]);

  const start = () => dispatch({ type: "START" });
  const pause = () => dispatch({ type: "PAUSE" });

  const reset = useCallback(() => {
    clearTimer();
    dispatch({ type: "RESET", workMinutes });
  }, [clearTimer, workMinutes]);

  const skipPhase = useCallback(() => {
    clearTimer();
    dispatch({
      type: "SKIP",
      workMinutes,
      breakMinutes,
    });
  }, [clearTimer, workMinutes, breakMinutes]);

  const totalSeconds =
    state.phase === "work"
      ? workMinutes * 60
      : breakMinutes * 60;

  const progress = 1 - state.secondsLeft / totalSeconds;

  const minutes = String(Math.floor(state.secondsLeft / 60)).padStart(2, "0");
  const seconds = String(state.secondsLeft % 60).padStart(2, "0");

  return {
    minutes,
    seconds,
    running: state.running,
    phase: state.phase,
    progress,
    sessions: state.sessions,
    start,
    pause,
    reset,
    skipPhase,
  };
}
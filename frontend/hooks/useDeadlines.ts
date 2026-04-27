"use client";

import { useState, useEffect, useRef } from "react";
import { Deadline } from "@/types/deadline";
import { fetchDeadlines } from "@/lib/dashboardDeadlines";
import { useNotifications } from "@/lib/notification-context";

interface UseDeadlinesResult {
  data: Deadline[];
  loading: boolean;
  error: string | null;
}

export function useDeadlines(): UseDeadlinesResult {
  const [data, setData] = useState<Deadline[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { showToast } = useNotifications();

  useEffect(() => {
    fetchDeadlines()
      .then((deadlines) => {
        setData(deadlines);

        const alreadyToasted = sessionStorage.getItem("deadlines_toasted");
        if (!alreadyToasted) {
          sessionStorage.setItem("deadlines_toasted", "true");

          deadlines.forEach((deadline) => {
            const daysLeft = Math.ceil(
              (new Date(deadline.due_date).getTime() - Date.now()) / 86_400_000,
            );

            if (daysLeft <= 0) {
              showToast({
                type: "deadline",
                title: "Due Today!",
                body: `"${deadline.title}" is due today.`,
              });
            } else if (daysLeft === 1) {
              showToast({
                type: "deadline",
                title: "Due Tomorrow",
                body: `"${deadline.title}" is due tomorrow.`,
              });
            } else if (daysLeft <= 3) {
              showToast({
                type: "deadline",
                title: `Due in ${daysLeft} Days`,
                body: `"${deadline.title}" is coming up soon.`,
              });
            }
          });
        }
      })
      .catch((err: unknown) => {
        setError(err instanceof Error ? err.message : "Something went wrong");
      })
      .finally(() => setLoading(false));
  }, []);

  return { data, loading, error };
}

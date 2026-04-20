"use client";

import { useState, useEffect } from "react";
import { fetchProgress } from "@/lib/progress-data";
import { ProgressData } from "@/types/progress";

interface UseProgressResult {
  data: ProgressData | null;
  loading: boolean;
  error: string | null;
}

// const courses = await apiFetch("/courses");

export function useProgress(): UseProgressResult {
  const [data, setData] = useState<ProgressData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    fetchProgress()
      .then(setData)
      .catch((err: unknown) => {
        setError(err instanceof Error ? err.message : "Something went wrong");
      })
      .finally(() => setLoading(false));
  }, []);

  return { data, loading, error };
}
"use client";

import { useState, useEffect } from "react";
import { Deadline } from "@/types/deadline";
import { fetchDeadlines } from "@/lib/dashboardDeadlines";

interface UseDeadlinesResult {
  data: Deadline[];
  loading: boolean;
  error: string | null;
}

export function useDeadlines(): UseDeadlinesResult {
  const [data, setData] = useState<Deadline[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    fetchDeadlines()
      .then(setData)
      .catch((err: unknown) => {
        setError(err instanceof Error ? err.message : "Something went wrong");
      })
      .finally(() => setLoading(false));
  }, []);

  return { data, loading, error };
}
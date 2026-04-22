"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold">Something went wrong</h1>
      <p className="text-muted-foreground mt-2">{error.message}</p>
      <button onClick={reset} className="mt-4 px-4 py-2 bg-primary text-white rounded">
        Try Again
      </button>
    </div>
  );
}
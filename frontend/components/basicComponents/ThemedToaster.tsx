"use client";

import { Toaster } from "sonner";
import { useEffect, useState } from "react";

export default function ThemedToaster() {
  const [isDark, setIsDark] = useState(false);

  // mutaion observer to look for changes to the "dark" class on the <html> element
  useEffect(() => {
    // set initial value
    setIsDark(document.documentElement.classList.contains("dark"));

    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains("dark"));
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  return (
    <Toaster
      position="top-right"
      richColors
      closeButton
      duration={4000}
      theme={isDark ? "dark" : "light"}
    />
  );
}

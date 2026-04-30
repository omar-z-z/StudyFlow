"use client";

import { useEffect, useState } from "react";

const COOKIE_NAME = "studyflow-theme";
const COOKIE_MAX_AGE = 60 * 60 * 24 ; // 1 year in seconds

function setThemeCookie(value: "dark" | "light") {
  document.cookie = `${COOKIE_NAME}=${value}; path=/; max-age=${COOKIE_MAX_AGE}; SameSite=Lax`;
}

function getThemeCookie(): "dark" | "light" | null {
  const match = document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${COOKIE_NAME}=`));
  return (match?.split("=")[1] as "dark" | "light") ?? null;
}

export function useDarkMode() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const saved = getThemeCookie();
    const prefersDark =
      saved !== null
        ? saved === "dark"
        : window.matchMedia("(prefers-color-scheme: dark)").matches;

    document.documentElement.classList.toggle("dark", prefersDark);
    setDarkMode(prefersDark);
  }, []);

  const toggleDark = () => {
    const html = document.documentElement;
    const next = !html.classList.contains("dark");

    html.classList.toggle("dark", next);
    setDarkMode(next);
    setThemeCookie(next ? "dark" : "light"); // Save to cookie
  };

  return { darkMode, toggleDark };
}
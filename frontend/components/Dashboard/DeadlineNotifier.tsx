"use client"; 

import { useEffect } from "react";
import { useNotifications } from "@/lib/notification-context";
import { Deadline } from "@/types/deadline";

export default function DeadlineNotifier({ deadlines }: { deadlines: Deadline[] }) {
  const { showToast } = useNotifications();

  useEffect(() => {
    const alreadyToasted = sessionStorage.getItem("deadlines_toasted");
    if (alreadyToasted) return;
    sessionStorage.setItem("deadlines_toasted", "true");

    deadlines.forEach((deadline) => {
      const daysLeft = Math.ceil(
        (new Date(deadline.due_date).getTime() - Date.now()) / 86_400_000,
      );
      if (daysLeft <= 0) {
        showToast({ type: "deadline", title: "Due Today!", body: `"${deadline.title}" is due today.` });
      } else if (daysLeft === 1) {
        showToast({ type: "deadline", title: "Due Tomorrow", body: `"${deadline.title}" is due tomorrow.` });
      } else if (daysLeft <= 3) {
        showToast({ type: "deadline", title: `Due in ${daysLeft} Days`, body: `"${deadline.title}" is coming up soon.` });
      }
    });
  }, []);

  return null;
}
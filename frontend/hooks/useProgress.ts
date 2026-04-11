import { ProgressData } from "@/types/progress";

export function useProgress(): ProgressData {
  return {
    stats: {
      weeklyGoal: 12,
      weeklyGoalTarget: 20,
      studyHours: 15.5,
      studyHoursTarget: 20,
      completionRate: 60,
      currentStreak: 5,
    },
    dailyCompletion: [
      { day: "Mon", completed: 0, pending: 3 },
      { day: "Tue", completed: 0, pending: 4 },
      { day: "Wed", completed: 0, pending: 2 },
      { day: "Thu", completed: 0, pending: 5 },
      { day: "Fri", completed: 0, pending: 3 },
      { day: "Sat", completed: 0, pending: 2 },
      { day: "Sun", completed: 0, pending: 1 },
    ],
    tasksByType: [
      { name: "Reading", value: 3, color: "#4E9AF1" },
      { name: "Lectures", value: 2, color: "#2DBF8A" },
      { name: "Exercises", value: 2, color: "#F59E0B" },
      { name: "Review", value: 1, color: "#A78BFA" },
    ],
    courseProgress: [
      {
        id: "1",
        name: "Data Structures & Algorithms",
        topicsCompleted: 3,
        topicsTotal: 6,
        percentage: 65,
        color: "#DBEAFE",
      },
      {
        id: "2",
        name: "Machine Learning",
        topicsCompleted: 2,
        topicsTotal: 5,
        percentage: 40,
        color: "#D1FAE5",
      },
      {
        id: "3",
        name: "Web Development",
        topicsCompleted: 3,
        topicsTotal: 5,
        percentage: 75,
        color: "#FEF9C3",
      },
    ],
    summary: {
      tasksDone: 12,
      dayStreak: 5,
      studyTime: 15.5,
    },
  };
}
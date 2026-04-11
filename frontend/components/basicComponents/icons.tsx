export const CalendarIcon = () => (
  <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
    <rect x="1" y="2" width="11" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.1" />
    <path d="M4 1V3M9 1V3" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
    <path d="M1 5H12" stroke="currentColor" strokeWidth="1.1" />
  </svg>
);

export const StatusIcon = ({ completed }: { completed: boolean }) =>
  completed ? (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <circle cx="9" cy="9" r="8.5" stroke="#10B981" />
      <path d="M5.5 9L7.8 11.5L12.5 6.5" stroke="#10B981" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ) : (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <circle cx="9" cy="9" r="8.5" stroke="var(--border)" strokeWidth="1.5" />
    </svg>
  );

export const ClockIcon = () => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 12 12"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    aria-hidden="true"
  >
    <circle cx="6" cy="6" r="4.5" />
    <polyline points="6,3.5 6,6 7.5,7.5" />
  </svg>
);

export const PlusIcon = () => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 12 12"
    fill="none"
    aria-hidden="true"
  >
    <path
      d="M6 1v10M1 6h10"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
  </svg>
);

export const PlayIcon = () => (
  <svg
    width="13"
    height="13"
    viewBox="0 0 13 13"
    fill="currentColor"
    aria-hidden="true"
  >
    <polygon points="2,1 11,6.5 2,12" />
  </svg>
);

export const PauseIcon = () => (
  <svg
    width="13"
    height="13"
    viewBox="0 0 13 13"
    fill="currentColor"
    aria-hidden="true"
  >
    <rect x="2" y="1" width="3.5" height="11" rx="1" />
    <rect x="7.5" y="1" width="3.5" height="11" rx="1" />
  </svg>
);

export const ResetIcon = () => (
  <svg
    width="13"
    height="13"
    viewBox="0 0 13 13"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M1.5 6.5A5 5 0 1 1 3 10.2" />
    <polyline points="1.5,3.5 1.5,6.5 4.5,6.5" />
  </svg>
);

/* Stat Card Icons */

export const TasksStatIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <rect x="1" y="1" width="14" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" />
    <path d="M4.5 8l2.5 2.5 4.5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const TimeStatIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.5" />
    <path d="M8 4.5V8l2.5 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const CoursesStatIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M3 13a2 2 0 0 1 2-2h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <rect x="1" y="1" width="14" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" />
    <path d="M5 1v10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

export const GoalStatIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="8" cy="8" r="3.5" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="8" cy="8" r="1" fill="currentColor" />
  </svg>
);

export const RateStatIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M2 11l4-4 3 3 5-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M11 4h3v3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const StreakStatIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M8 1.5C8 1.5 4.5 6 4.5 9.5a3.5 3.5 0 0 0 7 0C11.5 6 8 1.5 8 1.5z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    <path d="M6 10.5c.5 1 2 1.5 2.5.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
  </svg>
);
// components/icons/index.tsx

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
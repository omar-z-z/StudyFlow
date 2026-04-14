const AddRowButton = ({ label, onClick }: { label: string; onClick: () => void }) => (
  <button
    onClick={onClick}
    className="flex items-center gap-2 text-xs font-medium text-primary hover:opacity-75 transition-opacity duration-150 mt-1 cursor-pointer"
  >
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
      <path
        d="M6.5 1.5v10M1.5 6.5h10"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
    {label}
  </button>
);

export default AddRowButton;
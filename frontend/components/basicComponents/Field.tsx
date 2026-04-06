type FieldProps = {
  label: string;
  htmlFor: string;
  error?: string;
  children: React.ReactNode;
};

const Field = ({ label, htmlFor, error, children }: FieldProps) => (
  <div className="flex flex-col gap-1.5">
    <label
      htmlFor={htmlFor}
      className="text-xs font-semibold uppercase tracking-widest text-muted-foreground"
    >
      {label}
    </label>
    {children}
    {error && <span className="text-xs text-red-500">{error}</span>}
  </div>
);

export default Field;
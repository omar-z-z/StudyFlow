import { Lock, Eye, EyeOff } from "lucide-react";

interface PasswordFieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  show: boolean;
  onToggle: () => void;
  placeholder?: string;
  autoComplete?: string;
}

export default function PasswordField({
  id,
  label,
  value,
  onChange,
  error,
  show,
  onToggle,
  placeholder = "••••••••",
  autoComplete,
}: PasswordFieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-medium text-foreground">
        {label}
      </label>
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
          <Lock className="w-4 h-4" />
        </span>
        <input
          id={id}
          type={show ? "text" : "password"}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          autoComplete={autoComplete}
          className={`
            w-full rounded-lg pl-9 pr-10 py-2.5 text-sm text-foreground
            bg-background outline-none transition-all
            placeholder:text-muted-foreground
            focus:ring-2 focus:ring-primary/20 focus:bg-white
            ${error ? "ring-2 ring-destructive/40" : ""}
          `}
        />
        <button
          type="button"
          onClick={onToggle}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
          aria-label={show ? "Hide password" : "Show password"}
        >
          {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
        </button>
      </div>
      {error && <p className="text-xs text-destructive mt-0.5">{error}</p>}
    </div>
  );
}
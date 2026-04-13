import { InputHTMLAttributes } from "react";
import { LucideIcon } from "lucide-react";

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
  icon?: LucideIcon;
  error?: string;
}

export default function FormInput({
  label,
  id,
  icon: Icon,
  error,
  className = "",
  ...props
}: FormInputProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-medium text-foreground">
        {label}
      </label>

      <div className="relative">
        {Icon && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
            <Icon className="w-4 h-4" />
          </span>
        )}
        <input
          id={id}
          className={`
            w-full rounded-lg px-3 py-2.5 text-sm text-foreground
            bg-background outline-none transition-all
            placeholder:text-muted-foreground
            focus:ring-2 focus:ring-primary/20
            ${Icon ? "pl-9" : ""}
            ${error ? "ring-2 ring-destructive/40" : ""}
            ${className}
          `}
          {...props}
        />
      </div>
      {error && <p className="text-xs text-destructive mt-0.5">{error}</p>}
    </div>
  );
}

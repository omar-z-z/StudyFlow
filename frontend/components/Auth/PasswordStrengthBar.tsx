import { getMissing, getStrength } from "@/lib/utils/registerValidation";

export default function PasswordStrengthBar({ password }: { password: string }) {
  const { level, label, color } = getStrength(password);
  const missing = level < 3 ? getMissing(password) : [];

  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex gap-1">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className={`h-1 flex-1 rounded-full transition-all duration-300 ${
              i <= level ? color : "bg-muted"
            }`}
          />
        ))}
      </div>
      <p className="text-xs text-muted-foreground">
        Password strength:{" "}
        <span className={
          level === 1 ? "text-destructive"
          : level === 2 ? "text-yellow-500"
          : level === 3 ? "text-blue-500"
          : "text-green-600"
        }>
          {label}
        </span>
      </p>

      {missing.length > 0 && (
        <ul className="flex flex-col gap-0.5 mt-0.5">
          {missing.map((hint) => (
            <li key={hint} className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <span className="text-destructive">✕</span>
              {hint}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
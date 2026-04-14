function getStrength(password: string): {
  level: number;
  label: string;
  color: string;
} {
  let score = 0;
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  if (score <= 1) return { level: 1, label: "Weak", color: "bg-destructive" };
  if (score === 2) return { level: 2, label: "Fair", color: "bg-yellow-400" };
  if (score === 3) return { level: 3, label: "Good", color: "bg-blue-400" };
  return { level: 4, label: "Strong", color: "bg-green-500" };
}

export default function PasswordStrengthBar({ password }: { password: string }) {
  const { level, label, color } = getStrength(password);

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
        <span
          className={
            level === 1
              ? "text-destructive"
              : level === 2
                ? "text-yellow-500"
                : level === 3
                  ? "text-blue-500"
                  : "text-green-600"
          }
        >
          {label}
        </span>
      </p>
    </div>
  );
}
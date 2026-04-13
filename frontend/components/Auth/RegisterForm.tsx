"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { User, Mail, Lock, Eye, EyeOff } from "lucide-react";
import FormInput from "./FormInput";

interface RegisterFormState {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface RegisterFormErrors {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

export default function RegisterForm() {
  const router = useRouter();

  const [form, setForm] = useState<RegisterFormState>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<RegisterFormErrors>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const validate = (): boolean => {
    const newErrors: RegisterFormErrors = {};

    if (!form.name.trim()) {
      newErrors.name = "Full name is required.";
    }

    if (!form.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (!form.password) {
      newErrors.password = "Password is required.";
    } else if (form.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters.";
    }

    if (!form.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password.";
    } else if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (field: keyof RegisterFormState) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);
    // TODO: Replace with your actual registration logic
    await new Promise((res) => setTimeout(res, 1200));
    setIsLoading(false);
    router.push("/dashboard");
  };

  // Reusable password field renderer
  const PasswordField = ({
    id,
    label,
    value,
    onChange,
    error,
    show,
    onToggle,
    placeholder = "••••••••",
    autoComplete,
  }: {
    id: string;
    label: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    error?: string;
    show: boolean;
    onToggle: () => void;
    placeholder?: string;
    autoComplete?: string;
  }) => (
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
            bg-[var(--input-background)] outline-none transition-all
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

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {/* Full Name */}
      <FormInput
        id="name"
        label="Full name"
        type="text"
        placeholder="Omar Zuhri"
        icon={User}
        value={form.name}
        onChange={handleChange("name")}
        error={errors.name}
        autoComplete="name"
      />

      {/* Email */}
      <FormInput
        id="email"
        label="Email address"
        type="email"
        placeholder="you@example.com"
        icon={Mail}
        value={form.email}
        onChange={handleChange("email")}
        error={errors.email}
        autoComplete="email"
      />

      {/* Password */}
      <PasswordField
        id="password"
        label="Password"
        value={form.password}
        onChange={handleChange("password")}
        error={errors.password}
        show={showPassword}
        onToggle={() => setShowPassword((v) => !v)}
        autoComplete="new-password"
      />

      {/* Confirm Password */}
      <PasswordField
        id="confirmPassword"
        label="Confirm password"
        value={form.confirmPassword}
        onChange={handleChange("confirmPassword")}
        error={errors.confirmPassword}
        show={showConfirm}
        onToggle={() => setShowConfirm((v) => !v)}
        placeholder="••••••••"
        autoComplete="new-password"
      />

      {/* Password strength hint */}
      {form.password.length > 0 && (
        <PasswordStrengthBar password={form.password} />
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={isLoading}
        className="
          mt-2 w-full py-2.5 rounded-lg text-sm font-medium
          bg-primary text-primary-foreground
          hover:opacity-90 active:opacity-80
          transition-opacity disabled:opacity-50 disabled:cursor-not-allowed
        "
      >
        {isLoading ? "Creating account…" : "Create account"}
      </button>
    </form>
  );
}

// --- Password strength indicator ---
function getStrength(password: string): { level: number; label: string; color: string } {
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

function PasswordStrengthBar({ password }: { password: string }) {
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
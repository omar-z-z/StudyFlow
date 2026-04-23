"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { User, Mail } from "lucide-react";
import FormInput from "./FormInput";
import PasswordField from "./RegisterPasswordField";
import PasswordStrengthBar from "./PasswordStrengthBar";
import { useAuth } from "@/lib/auth-context";
import { validate } from "@/lib/utils/registerValidation";
import type { RegisterFormState, RegisterFormErrors } from "@/types/auth";

export default function RegisterForm() {
  const router = useRouter();
  const { register } = useAuth();

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

  const handleChange =
    (field: keyof RegisterFormState) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
      if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
    };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validationErrors = validate(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsLoading(true);
    try {
      await register(form.name, form.email, form.password);
      router.push("/dashboard");
    } catch {
      setErrors({ email: "Something went wrong. Try again." });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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

      <PasswordField
        id="confirmPassword"
        label="Confirm password"
        value={form.confirmPassword}
        onChange={handleChange("confirmPassword")}
        error={errors.confirmPassword}
        show={showConfirm}
        onToggle={() => setShowConfirm((v) => !v)}
        autoComplete="new-password"
      />

      {form.password.length > 0 && (
        <PasswordStrengthBar password={form.password} />
      )}

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
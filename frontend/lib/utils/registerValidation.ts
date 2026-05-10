import type { RegisterFormState, RegisterFormErrors } from "@/types/auth";

export function getStrength(password: string): {
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

export function getMissing(password: string): string[] {
  const missing: string[] = [];
  if (password.length < 8) missing.push("At least 8 characters");
  if (!/[A-Z]/.test(password)) missing.push("One uppercase letter");
  if (!/[0-9]/.test(password)) missing.push("One number");
  if (!/[^A-Za-z0-9]/.test(password)) missing.push("One special character");
  return missing;
}

export function validate(form: RegisterFormState): RegisterFormErrors {
  const errors: RegisterFormErrors = {};

  if (!form.name.trim()) errors.name = "Full name is required.";

  if (!form.email.trim()) {
    errors.email = "Email is required.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = "Please enter a valid email address.";
  }

  if (!form.password) {
    errors.password = "Password is required.";
  } else if (form.password.length < 8) {
    errors.password = "Password must be at least 8 characters.";
  } else if (form.password) {
    const { level } = getStrength(form.password);
    if (level < 3) {
      errors.password = "Password is too weak. Please follow the hints above.";
    }
  }

  if (!form.confirmPassword) {
    errors.confirmPassword = "Please confirm your password.";
  } else if (form.password !== form.confirmPassword) {
    errors.confirmPassword = "Passwords do not match.";
  }

  return errors;
}

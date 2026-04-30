"use client";

import { useState } from "react";
import { Mail, ArrowLeft, MailCheck } from "lucide-react";
import Link from "next/link";
import FormInput from "./FormInput";
import { useAuth } from "@/lib/auth-context";

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | undefined>();
  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { forgotPassword } = useAuth();

  const validate = (): boolean => {
    setError(undefined);
    
    if (!email.trim()) {
      setError("Email is required.");
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);
    setError(undefined);

    try {
      await forgotPassword(email);
      setSubmitted(true);
    } catch (err: any) {
      setError(err?.message || "Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Success state
  if (submitted) {
    return (
      <div className="flex flex-col items-center text-center gap-4 py-2">
        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-background">
          <MailCheck className="w-6 h-6 text-foreground" />
        </div>
        <div>
          <p className="text-sm font-medium text-foreground">
            Check your inbox
          </p>
          <p className="text-sm text-muted-foreground mt-1">
            We sent a reset link to{" "}
            <span className="font-medium text-foreground">{email}</span>.
            <br />
            It may take a few minutes to arrive.
          </p>
        </div>
        <button
          onClick={() => {
            setSubmitted(false);
            setEmail("");
          }}
          className="text-sm text-muted-foreground hover:text-foreground transition-colors underline underline-offset-4"
        >
          Try a different email
        </button>
      </div>
    );
  }

  // Form state
  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <p className="text-sm text-muted-foreground -mt-1">
        Enter your email and we&apos;ll send you a link to reset your password.
      </p>

      <FormInput
        id="email"
        label="Email address"
        type="email"
        placeholder="you@example.com"
        icon={Mail}
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
          if (error) setError(undefined);
        }}
        error={error}
        autoComplete="email"
      />

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
        {isLoading ? "Sending link…" : "Send reset link"}
      </button>

      <Link
        href="/login"
        className="flex items-center justify-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mt-1"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        Back to sign in
      </Link>
    </form>
  );
}
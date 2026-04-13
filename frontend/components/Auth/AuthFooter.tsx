import Link from "next/link";

interface AuthFooterProps {
  mode: "login" | "register";
}

export default function AuthFooter({ mode }: AuthFooterProps) {
  return (
    <p className="text-center text-sm text-muted-foreground mt-6">
      {mode === "login" ? (
        <>
          Don&apos;t have an account?{" "}
          <Link
            href="/register"
            className="font-medium text-foreground hover:underline underline-offset-4 transition-all"
          >
            Sign up
          </Link>
        </>
      ) : (
        <>
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-medium text-foreground hover:underline underline-offset-4 transition-all"
          >
            Sign in
          </Link>
        </>
      )}
    </p>
  );
}
import AuthCard from "@/components/Auth/AuthCard";
import AuthFooter from "@/components/Auth/AuthFooter";
import AuthHeader from "@/components/Auth/AuthHeader";
import LoginForm from "@/components/Auth/LoginForm";

export default function LoginPage() {
  return (
    <>
      <AuthHeader
        title="Welcome back"
        subtitle="Sign in to continue your study journey"
      />

      <AuthCard>
        <LoginForm />
      </AuthCard>

      <AuthFooter mode="login" />
    </>
  );
}
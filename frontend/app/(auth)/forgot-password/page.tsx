import AuthCard from "@/components/Auth/AuthCard";
import AuthHeader from "@/components/Auth/AuthHeader";
import ForgotPasswordForm from "@/components/Auth/ForgotPasswordForm";

export default function ForgotPasswordPage() {
  return (
    <>
      <AuthHeader
        title="Forgot your password?"
        subtitle="No worries, we'll help you reset it"
      />

      <AuthCard>
        <ForgotPasswordForm />
      </AuthCard>
    </>
  );
}
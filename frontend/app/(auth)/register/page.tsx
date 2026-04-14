import AuthCard from "@/components/Auth/AuthCard";
import AuthFooter from "@/components/Auth/AuthFooter";
import AuthHeader from "@/components/Auth/AuthHeader";
import RegisterForm from "@/components/Auth/RegisterForm";

export default function RegisterPage() {
  return (
    <>
      <AuthHeader
        title="Create your account"
        subtitle="Start organizing your studies with StudyFlow"
      />

      <AuthCard>
        <RegisterForm />
      </AuthCard>

      <AuthFooter mode="register" />
    </>
  );
}
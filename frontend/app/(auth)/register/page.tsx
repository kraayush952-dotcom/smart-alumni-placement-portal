import AuthLayout from "@/components/auth/AuthLayout";
import RegisterForm from "@/components/auth/RegisterForm";

export default function RegisterPage() {
  return (
    <AuthLayout
      title="Create Account"
      subtitle="Join the Vignan Smart Alumni & Placement Portal"
    >
      <RegisterForm />
    </AuthLayout>
  );
}
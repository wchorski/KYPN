import LoginForm from "@/components/menus/LoginForm";
import PasswordReset from "@/components/menus/PasswordResetRequest";
import RegisterForm from "@/components/menus/RegisterForm";

export default function LoginPage() {
  return (
    <div>
      <LoginForm />
      <RegisterForm />
      <PasswordReset />
    </div>
  )
}

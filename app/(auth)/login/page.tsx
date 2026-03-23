import type { Metadata } from "next";
import { LoginForm } from "@/features/auth/components/login-form";

export const metadata: Metadata = {
  title: "Login | Sodiq Ardianto",
  description: "Login page for portfolio and blog management access.",
};

export default function LoginPage() {
  return <LoginForm />;
}

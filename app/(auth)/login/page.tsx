import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getAuthSessionState } from "@/features/auth/lib/auth-session";
import { LoginForm } from "@/features/auth/components/login-form";

export const metadata: Metadata = {
  title: "Login | Sodiq Ardianto",
  description: "Login page for portfolio and blog management access.",
};

export const dynamic = "force-dynamic";

export default async function LoginPage() {
  const session = await getAuthSessionState();

  if (session.status === "authenticated") {
    redirect("/dashboard");
  }

  return (
    <LoginForm
      user={null}
      authUnavailable={session.status === "unavailable"}
      unavailableMessage={session.message}
    />
  );
}

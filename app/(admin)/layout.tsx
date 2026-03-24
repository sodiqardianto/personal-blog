import type { ReactNode } from "react";
import { redirect } from "next/navigation";
import { AdminShell } from "@/features/admin/components/admin-shell";
import { AuthServiceUnavailable } from "@/features/auth/components/auth-service-unavailable";
import { getAuthSessionState } from "@/features/auth/lib/auth-session";

export const dynamic = "force-dynamic";

export default async function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await getAuthSessionState();

  if (session.status !== "authenticated") {
    if (session.status === "unauthenticated") {
      redirect("/login");
    }

    return <AuthServiceUnavailable message={session.message} />;
  }

  return <AdminShell user={session.user}>{children}</AdminShell>;
}

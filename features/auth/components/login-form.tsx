import Link from "next/link";
import { AuthServiceUnavailable } from "@/features/auth/components/auth-service-unavailable";
import { GoogleLoginButton } from "@/features/auth/components/google-login-button";
import type { AuthUser } from "@/features/auth/types";

type LoginFormProps = {
  user: AuthUser | null;
  authUnavailable?: boolean;
  unavailableMessage?: string;
};

function initialFromName(name: string) {
  return name.trim().charAt(0).toUpperCase() || "S";
}

export function LoginForm({
  user,
  authUnavailable = false,
  unavailableMessage,
}: LoginFormProps) {
  if (authUnavailable) {
    return <AuthServiceUnavailable message={unavailableMessage} />;
  }

  return (
    <div className="mx-auto flex min-h-[calc(100vh-60px)] w-full max-w-[440px] flex-col justify-center px-5 py-12 sm:px-0">
      <div className="rounded-[24px] border border-blue/10 bg-white/90 p-6 shadow-[0_24px_60px_rgba(15,22,36,0.08)] backdrop-blur-sm dark:border-blue-dark/12 dark:bg-navy-800/92 dark:shadow-[0_24px_60px_rgba(0,0,0,0.32)]">
        <div className="mb-8">
          <p className="mb-3 text-[0.72rem] font-medium uppercase tracking-[0.14em] text-blue dark:text-blue-dark">
            Login
          </p>
          <h1 className="font-serif text-[clamp(2rem,6vw,2.8rem)] leading-tight tracking-tight text-ink dark:text-slate-100">
            {user ? "Already signed in." : "Sign in with Google."}
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-ink/60 dark:text-slate-400">
            {user
              ? "Your session is already active."
              : "Continue to access your admin area."}
          </p>
        </div>

        {user ? (
          <div className="space-y-4">
            <div className="flex items-center gap-4 rounded-[22px] border border-blue/10 bg-slate-50 px-4 py-4 dark:border-blue-dark/12 dark:bg-navy-700/80">
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-blue text-base font-semibold text-white dark:bg-blue-dark">
                {initialFromName(user.name)}
              </span>

              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-ink dark:text-slate-100">
                  {user.name}
                </p>
                <p className="truncate text-sm text-ink/55 dark:text-slate-400">
                  {user.email}
                </p>
                <p className="mt-1 text-[0.72rem] uppercase tracking-[0.12em] text-blue dark:text-blue-dark">
                  {user.role}
                </p>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <Link
                href="/"
                className="inline-flex cursor-pointer items-center justify-center rounded-full bg-blue px-5 py-3 text-sm font-medium text-white transition-all hover:-translate-y-0.5 hover:shadow-[0_6px_22px_rgba(47,84,235,.35)] dark:bg-blue-dark"
              >
                Back to home
              </Link>

              <form action="/api/auth/logout" method="post">
                <button
                  type="submit"
                  className="inline-flex w-full cursor-pointer items-center justify-center rounded-full border border-blue/12 px-5 py-3 text-sm font-medium text-ink/70 transition-colors hover:border-blue/20 hover:text-blue dark:border-blue-dark/15 dark:text-slate-300 dark:hover:border-blue-dark/25 dark:hover:text-blue-dark"
                >
                  Sign out
                </button>
              </form>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <GoogleLoginButton />
          </div>
        )}

        <div className="mt-6 flex items-center justify-between gap-3 text-[0.78rem] text-ink/45 dark:text-slate-500">
          <Link
            href="/"
            className="transition-colors hover:text-blue dark:hover:text-blue-dark"
          >
            Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}

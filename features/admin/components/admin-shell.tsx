import type { AuthUser } from "@/features/auth/types";
import { AdminNav } from "@/features/admin/components/admin-nav";
import { ThemeCycleButton } from "@/shared/ui";

type AdminShellProps = {
  user: AuthUser;
  children: React.ReactNode;
};

function initialFromName(name: string) {
  return name.trim().charAt(0).toUpperCase() || "S";
}

export function AdminShell({ user, children }: AdminShellProps) {
  return (
    <div className="min-h-screen pb-16">
      <div className="sticky top-0 z-[1010] border-b border-blue/10 bg-slate-50/90 backdrop-blur-lg dark:border-blue-dark/12 dark:bg-navy-900/92">
        <div className="mx-auto flex max-w-240 flex-col gap-4 px-[clamp(1.25rem,5vw,3.5rem)] py-3">
          <div className="flex items-center justify-between gap-4">
            <div className="min-w-0">
              <p className="text-[0.72rem] font-medium uppercase tracking-[0.14em] text-blue dark:text-blue-dark">
                Admin
              </p>
              <h1 className="truncate font-serif text-[1.7rem] leading-tight text-ink dark:text-slate-100">
                Content workspace
              </h1>
            </div>

            <div className="flex items-center gap-3">
              <div className="hidden items-center gap-3 rounded-full border border-blue/10 bg-white/90 px-3 py-2 dark:border-blue-dark/12 dark:bg-navy-800 sm:flex">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-blue text-sm font-semibold text-white dark:bg-blue-dark">
                  {initialFromName(user.name)}
                </span>
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-ink dark:text-slate-100">
                    {user.name}
                  </p>
                  <p className="truncate text-[0.78rem] text-ink/45 dark:text-slate-500">
                    {user.email}
                  </p>
                </div>
              </div>

              <ThemeCycleButton />

              <form action="/api/auth/logout" method="post">
                <button
                  type="submit"
                  className="inline-flex cursor-pointer items-center justify-center rounded-full border border-blue/12 px-4 py-2.5 text-sm font-medium text-ink/70 transition-colors hover:border-blue/20 hover:text-blue dark:border-blue-dark/15 dark:text-slate-300 dark:hover:border-blue-dark/25 dark:hover:text-blue-dark"
                >
                  Sign out
                </button>
              </form>
            </div>
          </div>

          <AdminNav />
        </div>
      </div>

      <div className="mx-auto max-w-240 px-[clamp(1.25rem,5vw,3.5rem)] py-10">
        {children}
      </div>
    </div>
  );
}

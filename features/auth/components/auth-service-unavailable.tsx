import Link from "next/link";

type AuthServiceUnavailableProps = {
  title?: string;
  message?: string;
};

export function AuthServiceUnavailable({
  title = "Authentication is unavailable right now.",
  message = "The admin session could not be verified. Check the backend auth service, then try again.",
}: AuthServiceUnavailableProps) {
  return (
    <div className="mx-auto flex min-h-[calc(100vh-60px)] w-full max-w-[460px] flex-col justify-center px-5 py-12 sm:px-0">
      <div className="rounded-[24px] border border-amber-200 bg-white/90 p-6 shadow-[0_24px_60px_rgba(15,22,36,0.08)] backdrop-blur-sm dark:border-amber-400/20 dark:bg-navy-800/92 dark:shadow-[0_24px_60px_rgba(0,0,0,0.32)]">
        <p className="mb-3 text-[0.72rem] font-medium uppercase tracking-[0.14em] text-amber-700 dark:text-amber-300">
          Auth service
        </p>
        <h1 className="font-serif text-[clamp(2rem,6vw,2.8rem)] leading-tight tracking-tight text-ink dark:text-slate-100">
          {title}
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-ink/60 dark:text-slate-400">
          {message}
        </p>

        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <Link
            href="/login"
            className="inline-flex cursor-pointer items-center justify-center rounded-full bg-blue px-5 py-3 text-sm font-medium text-white transition-all hover:-translate-y-0.5 hover:shadow-[0_6px_22px_rgba(47,84,235,.35)] dark:bg-blue-dark"
          >
            Try again
          </Link>

          <Link
            href="/"
            className="inline-flex cursor-pointer items-center justify-center rounded-full border border-blue/12 px-5 py-3 text-sm font-medium text-ink/70 transition-colors hover:border-blue/20 hover:text-blue dark:border-blue-dark/15 dark:text-slate-300 dark:hover:border-blue-dark/25 dark:hover:text-blue-dark"
          >
            Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}

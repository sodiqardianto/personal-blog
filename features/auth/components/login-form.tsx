import Link from "next/link";

export function LoginForm() {
  return (
    <div className="mx-auto flex min-h-[calc(100vh-60px)] w-full max-w-[440px] flex-col justify-center px-5 py-12 sm:px-0">
      <div className="rounded-[24px] border border-blue/10 bg-white/90 p-6 shadow-[0_24px_60px_rgba(15,22,36,0.08)] backdrop-blur-sm dark:border-blue-dark/12 dark:bg-navy-800/92 dark:shadow-[0_24px_60px_rgba(0,0,0,0.32)]">
        <div className="mb-8">
          <p className="mb-3 text-[0.72rem] font-medium uppercase tracking-[0.14em] text-blue dark:text-blue-dark">
            Login
          </p>
          <h1 className="font-serif text-[clamp(2rem,6vw,2.8rem)] leading-tight tracking-tight text-ink dark:text-slate-100">
            Welcome back.
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-ink/60 dark:text-slate-400">
            This route is prepared as the entry point for future admin access
            to blog and portfolio CRUD.
          </p>
        </div>

        <form className="space-y-4">
          <label className="block">
            <span className="mb-2 block text-[0.78rem] font-medium uppercase tracking-[0.1em] text-ink/45 dark:text-slate-500">
              Email
            </span>
            <input
              type="email"
              name="email"
              placeholder="you@example.com"
              className="w-full rounded-2xl border border-blue/12 bg-slate-50 px-4 py-3 text-sm text-ink outline-none transition-all placeholder:text-ink/30 focus:border-blue focus:bg-white dark:border-blue-dark/15 dark:bg-navy-700 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:border-blue-dark dark:focus:bg-navy-700"
            />
          </label>

          <label className="block">
            <span className="mb-2 block text-[0.78rem] font-medium uppercase tracking-[0.1em] text-ink/45 dark:text-slate-500">
              Password
            </span>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              className="w-full rounded-2xl border border-blue/12 bg-slate-50 px-4 py-3 text-sm text-ink outline-none transition-all placeholder:text-ink/30 focus:border-blue focus:bg-white dark:border-blue-dark/15 dark:bg-navy-700 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:border-blue-dark dark:focus:bg-navy-700"
            />
          </label>

          <button
            type="submit"
            className="inline-flex w-full cursor-pointer items-center justify-center rounded-full bg-blue px-5 py-3 text-sm font-medium text-white transition-all hover:-translate-y-0.5 hover:shadow-[0_6px_22px_rgba(47,84,235,.35)] dark:bg-blue-dark"
          >
            Sign in
          </button>
        </form>

        <div className="mt-6 flex items-center justify-between gap-3 text-[0.78rem] text-ink/45 dark:text-slate-500">
          <Link
            href="/"
            className="transition-colors hover:text-blue dark:hover:text-blue-dark"
          >
            Back to home
          </Link>
          <button
            type="button"
            className="cursor-pointer transition-colors hover:text-blue dark:hover:text-blue-dark"
          >
            Forgot password?
          </button>
        </div>
      </div>
    </div>
  );
}

import Link from "next/link";
import { ArrowRightIcon } from "@/shared/ui";
import { getAdminNotesOverview } from "@/features/admin/lib/admin-posts";
import {
  dashboardActivity,
  dashboardQuickActions,
  dashboardRecentProjects,
} from "@/features/admin/content/dashboard-data";

export async function DashboardPage() {
  const notesOverview = await getAdminNotesOverview();
  const dashboardStats = [
    {
      label: "Published notes",
      value: String(notesOverview.publishedCount),
      detail:
        notesOverview.publishedCount > 0
          ? "Live across the blog"
          : "No published notes yet",
    },
    {
      label: "Draft notes",
      value: String(notesOverview.draftCount),
      detail:
        notesOverview.draftCount > 0
          ? "Ready to refine later"
          : "No drafts waiting",
    },
    {
      label: "Portfolio projects",
      value: "2",
      detail: "Projects stay local for now",
    },
    {
      label: "Resource areas",
      value: "2",
      detail: "Notes and projects only",
    },
  ] as const;

  return (
    <div className="flex flex-col gap-8">
      <section className="rounded-[2rem] border border-blue/10 bg-white/92 p-6 shadow-[0_24px_60px_rgba(15,22,36,0.06)] dark:border-blue-dark/12 dark:bg-navy-800/92 dark:shadow-[0_24px_60px_rgba(0,0,0,0.24)] sm:p-7">
        <div className="max-w-3xl">
          <p className="text-[0.72rem] font-medium uppercase tracking-[0.14em] text-blue dark:text-blue-dark">
            Overview
          </p>
          <h2 className="mt-2 font-serif text-[clamp(2rem,4vw,3rem)] leading-[1.05] tracking-tight text-ink dark:text-slate-100">
            A focused admin space for notes and projects.
          </h2>
          <p className="mt-4 max-w-2xl text-[0.98rem] leading-8 text-ink/58 dark:text-slate-400">
            This panel is intentionally lightweight. Instead of a heavy
            dashboard with many modules, it centers the two content types you
            actually manage here: Thoughts & notes and Projects.
          </p>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {dashboardStats.map((stat) => (
          <article
            key={stat.label}
            className="rounded-[1.6rem] border border-blue/10 bg-white/90 p-5 dark:border-blue-dark/12 dark:bg-navy-800/92"
          >
            <p className="text-[0.78rem] uppercase tracking-[0.12em] text-ink/38 dark:text-slate-500">
              {stat.label}
            </p>
            <p className="mt-3 font-serif text-[2.4rem] leading-none text-ink dark:text-slate-100">
              {stat.value}
            </p>
            <p className="mt-3 text-sm text-ink/52 dark:text-slate-400">
              {stat.detail}
            </p>
          </article>
        ))}
      </section>

      <section className="grid gap-5 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="grid gap-5">
          <article className="rounded-[1.7rem] border border-blue/10 bg-white/90 p-6 dark:border-blue-dark/12 dark:bg-navy-800/92">
            <div className="mb-5">
              <p className="text-[0.72rem] font-medium uppercase tracking-[0.14em] text-blue dark:text-blue-dark">
                Quick actions
              </p>
              <h3 className="mt-2 text-xl font-medium text-ink dark:text-slate-100">
                Jump straight into your content areas
              </h3>
            </div>

            <div className="grid gap-4 lg:grid-cols-2">
              {dashboardQuickActions.map((action) => (
                <Link
                  key={action.title}
                  href={action.href}
                  className="group rounded-[1.35rem] border border-blue/10 bg-slate-50/80 p-4 transition-all hover:-translate-y-0.5 hover:border-blue/18 dark:border-blue-dark/12 dark:bg-navy-700/70 dark:hover:border-blue-dark/20"
                >
                  <p className="text-base font-medium text-ink dark:text-slate-100">
                    {action.title}
                  </p>
                  <p className="mt-2 text-sm leading-7 text-ink/55 dark:text-slate-400">
                    {action.description}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-2 text-sm text-blue dark:text-blue-dark">
                    Open
                    <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </Link>
              ))}
            </div>
          </article>

          <div className="grid gap-5 lg:grid-cols-2">
            <article className="rounded-[1.7rem] border border-blue/10 bg-white/90 p-6 dark:border-blue-dark/12 dark:bg-navy-800/92">
              <div className="mb-4">
                <p className="text-[0.72rem] font-medium uppercase tracking-[0.14em] text-blue dark:text-blue-dark">
                  Recent notes
                </p>
                <h3 className="mt-2 text-xl font-medium text-ink dark:text-slate-100">
                  Thoughts & notes
                </h3>
              </div>

              <div className="space-y-3">
                {notesOverview.recentNotes.map((note) => (
                  <div
                    key={note.id}
                    className="rounded-[1.1rem] border border-blue/8 px-4 py-3 dark:border-blue-dark/12"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <p className="text-sm font-medium text-ink dark:text-slate-100">
                        {note.title}
                      </p>
                      <span className="rounded-full bg-blue/8 px-2.5 py-1 text-[0.68rem] font-medium uppercase tracking-[0.1em] text-blue dark:bg-blue-dark/10 dark:text-blue-dark">
                        {note.status}
                      </span>
                    </div>
                    <p className="mt-2 text-[0.78rem] text-ink/42 dark:text-slate-500">
                      Updated {note.updatedAt}
                    </p>
                  </div>
                ))}

                {notesOverview.recentNotes.length === 0 ? (
                  <div className="rounded-[1.1rem] border border-dashed border-blue/12 px-4 py-6 text-sm leading-7 text-ink/48 dark:border-blue-dark/12 dark:text-slate-400">
                    No notes are available from the API yet.
                  </div>
                ) : null}
              </div>
            </article>

            <article className="rounded-[1.7rem] border border-blue/10 bg-white/90 p-6 dark:border-blue-dark/12 dark:bg-navy-800/92">
              <div className="mb-4">
                <p className="text-[0.72rem] font-medium uppercase tracking-[0.14em] text-blue dark:text-blue-dark">
                  Projects
                </p>
                <h3 className="mt-2 text-xl font-medium text-ink dark:text-slate-100">
                  Portfolio status
                </h3>
              </div>

              <div className="space-y-3">
                {dashboardRecentProjects.map((project) => (
                  <div
                    key={project.title}
                    className="rounded-[1.1rem] border border-blue/8 px-4 py-3 dark:border-blue-dark/12"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <p className="text-sm font-medium text-ink dark:text-slate-100">
                        {project.title}
                      </p>
                      <span className="rounded-full bg-emerald-500/10 px-2.5 py-1 text-[0.68rem] font-medium uppercase tracking-[0.1em] text-emerald-600 dark:text-emerald-300">
                        {project.status}
                      </span>
                    </div>
                    <p className="mt-2 text-[0.78rem] text-ink/42 dark:text-slate-500">
                      Updated {project.updatedAt}
                    </p>
                  </div>
                ))}
              </div>
            </article>
          </div>
        </div>

        <article className="rounded-[1.7rem] border border-blue/10 bg-white/90 p-6 dark:border-blue-dark/12 dark:bg-navy-800/92">
          <div className="mb-4">
            <p className="text-[0.72rem] font-medium uppercase tracking-[0.14em] text-blue dark:text-blue-dark">
              Recent activity
            </p>
            <h3 className="mt-2 text-xl font-medium text-ink dark:text-slate-100">
              Admin log
            </h3>
          </div>

          <div className="space-y-4">
            {dashboardActivity.map((item, index) => (
              <div key={item} className="flex gap-3">
                <span className="mt-1 inline-flex h-6 w-6 flex-none items-center justify-center rounded-full bg-blue/10 text-[0.72rem] font-medium text-blue dark:bg-blue-dark/12 dark:text-blue-dark">
                  {index + 1}
                </span>
                <p className="text-sm leading-7 text-ink/58 dark:text-slate-400">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </article>
      </section>
    </div>
  );
}

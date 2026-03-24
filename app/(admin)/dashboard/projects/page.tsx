import { ResourceListCard } from "@/features/admin/components/resource-list-card";
import { projectsRows } from "@/features/admin/content/projects-data";

export default function ProjectsPage() {
  return (
    <div className="grid gap-6">
      <section className="rounded-[2rem] border border-blue/10 bg-white/92 p-6 shadow-[0_24px_60px_rgba(15,22,36,0.06)] dark:border-blue-dark/12 dark:bg-navy-800/92 dark:shadow-[0_24px_60px_rgba(0,0,0,0.24)] sm:p-7">
        <p className="text-[0.72rem] font-medium uppercase tracking-[0.14em] text-blue dark:text-blue-dark">
          Projects
        </p>
        <h2 className="mt-2 font-serif text-[clamp(2rem,4vw,3rem)] leading-[1.05] tracking-tight text-ink dark:text-slate-100">
          Keep portfolio content tidy and easy to update.
        </h2>
        <p className="mt-4 max-w-2xl text-[0.98rem] leading-8 text-ink/58 dark:text-slate-400">
          This area is ready for project CRUD, including summary updates,
          gallery management, and SEO copy. The current rows are still dummy
          placeholders for the admin interface.
        </p>
      </section>

      <ResourceListCard
        eyebrow="Projects"
        title="Portfolio entries"
        description="Projects deserve their own focused list because the update flow is different from writing: more metadata, visuals, and structured content."
        items={projectsRows}
        accentClassName="bg-emerald-500/10 text-emerald-600 dark:text-emerald-300"
      />
    </div>
  );
}

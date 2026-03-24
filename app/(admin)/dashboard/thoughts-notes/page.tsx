import { ResourceListCard } from "@/features/admin/components/resource-list-card";
import { listAdminNotes } from "@/features/admin/lib/admin-posts";

export default async function ThoughtsNotesPage() {
  const thoughtsNotesRows = await listAdminNotes({ perPage: 20 });

  return (
    <div className="grid gap-6">
      <section className="rounded-[2rem] border border-blue/10 bg-white/92 p-6 shadow-[0_24px_60px_rgba(15,22,36,0.06)] dark:border-blue-dark/12 dark:bg-navy-800/92 dark:shadow-[0_24px_60px_rgba(0,0,0,0.24)] sm:p-7">
        <p className="text-[0.72rem] font-medium uppercase tracking-[0.14em] text-blue dark:text-blue-dark">
          Thoughts & notes
        </p>
        <h2 className="mt-2 font-serif text-[clamp(2rem,4vw,3rem)] leading-[1.05] tracking-tight text-ink dark:text-slate-100">
          Manage your writing in one focused place.
        </h2>
        <p className="mt-4 max-w-2xl text-[0.98rem] leading-8 text-ink/58 dark:text-slate-400">
          This section now reads from the backend post module, so it is ready to
          evolve into real CRUD for content, publishing flow, and SEO metadata.
        </p>
      </section>

      <ResourceListCard
        eyebrow="Notes"
        title="Drafts and published writing"
        description="A simple list-first layout fits this personal CMS better than a dense admin table. It keeps the writing workflow easy to scan."
        items={thoughtsNotesRows}
      />
    </div>
  );
}

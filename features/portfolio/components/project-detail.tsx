import Link from "next/link";
import { ArrowLeftIcon, ExternalLinkIcon } from "@/shared/ui";
import { projectAccentClasses } from "@/features/portfolio/lib/project-accent";
import type { Project } from "@/features/portfolio/types";
import { ProjectGallery } from "@/features/portfolio/components/project-gallery";
import { cn } from "@/lib/utils";

type ProjectDetailProps = {
  project: Project;
  totalProjects: number;
};

export function ProjectDetail({ project, totalProjects }: ProjectDetailProps) {
  return (
    <div className="pb-24">
      <div className="project-detail-header sticky top-0 z-1010 flex h-15 items-center justify-between border-b border-blue/10 bg-slate-50/90 px-[clamp(1.25rem,5vw,3.5rem)] backdrop-blur-lg dark:border-blue-dark/12 dark:bg-navy-900/92">
        <Link
          href="/#work"
          className="inline-flex cursor-pointer items-center gap-2 bg-transparent text-sm text-ink/50 transition-colors hover:text-blue dark:text-slate-500 dark:hover:text-blue-dark"
        >
          <ArrowLeftIcon className="h-4 w-4 stroke-[2.2]" />
          Back to work
        </Link>

        <span className="text-xs text-ink/40 dark:text-slate-600">
          {project.number} / {String(totalProjects).padStart(2, "0")}
        </span>
      </div>

      <div className="mx-auto max-w-200 px-[clamp(1.25rem,5vw,2rem)]">
        <div className="my-10 flex aspect-video w-full items-center justify-center overflow-hidden rounded-xl bg-slate-100 dark:bg-navy-800">
          {project.hero.imageSrc ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={project.hero.imageSrc}
              alt={project.hero.alt ?? project.title}
              className="h-full w-full object-cover"
            />
          ) : (
            <div
              className={cn(
                "flex h-full w-full items-center justify-center bg-linear-to-br",
                projectAccentClasses[project.accent],
              )}
            >
              <span className="font-serif text-[5rem] text-blue opacity-[0.12] dark:text-blue-dark">
                {project.hero.placeholder}
              </span>
            </div>
          )}
        </div>

        <div className="mb-3 flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="inline-block rounded-full bg-blue/7 px-2 py-0.5 text-[0.68rem] font-medium tracking-wide text-blue dark:bg-blue-dark/10 dark:text-blue-dark"
            >
              {tag}
            </span>
          ))}
        </div>

        <h1 className="mb-8 font-serif text-[clamp(2rem,5vw,3.2rem)] leading-[1.1] tracking-[-0.025em] text-ink dark:text-slate-100">
          {project.title}
        </h1>

        <div className="mb-10 grid grid-cols-2 gap-4 rounded-xl border border-blue/8 bg-slate-100 p-5 sm:grid-cols-4 dark:border-blue-dark/12 dark:bg-navy-800">
          {[
            ["Year", project.year],
            ["Role", project.role],
            ["Client", project.client],
            ["Stack", project.tags.join(", ")],
          ].map(([label, value]) => (
            <div key={label}>
              <p className="mb-1 text-[0.68rem] font-medium uppercase tracking-[0.09em] text-ink/40 dark:text-slate-600">
                {label}
              </p>
              <p className="text-sm font-medium text-ink dark:text-slate-200">
                {value}
              </p>
            </div>
          ))}
        </div>

        <div className="mb-10 space-y-4">
          {project.overview.map((paragraph) => (
            <p
              key={paragraph}
              className="text-[1rem] leading-[1.82] text-ink/60 dark:text-slate-400"
            >
              {paragraph}
            </p>
          ))}
        </div>

        {project.gallery.length > 0 ? (
          <>
            <h2 className="mb-5 font-serif text-[1.5rem] tracking-tight text-ink dark:text-slate-100">
              Project images
            </h2>
            <ProjectGallery items={project.gallery} />
          </>
        ) : null}

        <div className="mt-2 flex flex-wrap gap-3">
          {project.liveUrl ? (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-blue px-5 py-2.5 text-sm font-medium text-white transition-all hover:-translate-y-0.5 hover:shadow-[0_6px_22px_rgba(47,84,235,.35)] dark:bg-blue-dark"
            >
              Visit live site
              <ExternalLinkIcon className="h-4 w-4 stroke-[2.2]" />
            </a>
          ) : null}

          <Link
            href="/projects"
            className="inline-flex items-center gap-2 rounded-full border border-blue/12 bg-transparent px-5 py-2.5 text-sm font-medium text-ink/55 transition-all hover:border-blue hover:bg-blue/6 hover:text-blue dark:border-blue-dark/15 dark:text-slate-400 dark:hover:border-blue-dark dark:hover:text-blue-dark"
          >
            Back to all work
          </Link>
        </div>
      </div>
    </div>
  );
}

import Link from "next/link";
import { ArrowRightIcon, ImageIcon } from "@/shared/ui";
import { projectAccentClasses } from "@/features/portfolio/lib/project-accent";
import type { Project } from "@/features/portfolio/types";
import { cn } from "@/lib/utils";

type ProjectCardProps = {
  project: Project;
};

export function ProjectCard({ project }: ProjectCardProps) {
  const imageCount = project.gallery.length;

  return (
    <Link
      href={`/projects/${project.slug}`}
      className="wc sr block cursor-pointer overflow-hidden rounded-[14px] border border-blue/10 bg-white text-left no-underline dark:border-blue-dark/12 dark:bg-navy-700 dark:hover:border-blue-dark/30 dark:hover:shadow-[0_4px_28px_rgba(0,0,0,.4)]"
    >
      <div className="relative h-52.5 overflow-hidden">
        <div
          className={cn(
            "thumb-inner flex h-full w-full items-center justify-center bg-linear-to-br",
            projectAccentClasses[project.accent],
          )}
        >
          {project.hero.imageSrc ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={project.hero.imageSrc}
              alt={project.hero.alt ?? project.title}
              className="absolute inset-0 h-full w-full object-cover"
            />
          ) : (
            <span className="relative z-1 font-serif text-[3.5rem] text-blue opacity-[0.17] dark:text-blue-dark">
              {project.hero.placeholder}
            </span>
          )}
        </div>

        {imageCount > 0 ? (
          <span className="absolute bottom-2.5 right-2.5 inline-flex items-center gap-1 rounded-full bg-black/40 px-2 py-0.5 text-[0.68rem] font-medium text-white backdrop-blur-sm">
            <ImageIcon className="h-2.75 w-2.75 stroke-2" />
            {imageCount} images
          </span>
        ) : null}
      </div>

      <div className="p-5">
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

        <div className="font-serif text-xl tracking-tight text-ink dark:text-slate-100">
          {project.title}
        </div>
        <p className="mt-2 text-[0.855rem] leading-relaxed text-ink/55 dark:text-slate-400">
          {project.summary}
        </p>

        <span className="wcta mt-3.5 inline-flex items-center gap-1.5 text-[0.78rem] font-medium text-blue dark:text-blue-dark">
          View case study
          <ArrowRightIcon className="h-4 w-4 stroke-[2.2]" />
        </span>
      </div>
    </Link>
  );
}

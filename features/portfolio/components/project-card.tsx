import Link from "next/link";
import type { Project } from "@/features/portfolio/types";
import { BlurImage } from "@/shared/ui";

type ProjectCardProps = {
  project: Project;
  preload?: boolean;
  reveal?: boolean;
};

export function ProjectCard({
  project,
  preload = false,
  reveal = true,
}: ProjectCardProps) {
  const projectMark = project.title
    .split("—")[0]
    .trim()
    .split(/\s+/)
    .filter((word) => /^[A-Za-z]/.test(word))
    .map((word) => word[0])
    .join("")
    .slice(0, 4)
    .toUpperCase();

  return (
    <Link
      href={`/projects/${project.slug}`}
      className={`portfolio-card group block p-5${reveal ? " sr" : ""}`}
    >
      <div className="project-thumb flex h-40 items-center justify-center">
        {project.hero.imageSrc ? (
          <BlurImage
            src={project.hero.imageSrc}
            alt={project.hero.alt ?? project.title}
            fill
            preload={preload}
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        ) : (
          <span className="relative z-1 font-display text-2xl font-bold text-white/90">
            {projectMark || project.hero.placeholder}
          </span>
        )}
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <span key={tag} className="portfolio-tag">{tag}</span>
        ))}
      </div>
      <h3 className="mt-3 font-display text-lg font-semibold">{project.title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-soft">{project.summary}</p>
      <span className="mt-4 inline-block font-mono text-xs text-accent">
        view case study →
      </span>
    </Link>
  );
}

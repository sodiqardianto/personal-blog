import Link from "next/link";
import type { Project } from "@/features/portfolio/types";
import { cn } from "@/lib/utils";
import { cardStyles, revealStyles, tagStyles } from "@/shared/lib/styles";
import { BlurImage } from "@/shared/ui";

type ProjectCardProps = {
  project: Project;
  index?: number;
  preload?: boolean;
  reveal?: boolean;
};

export function ProjectCard({
  project,
  index = 0,
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
    // Reveal lives on a wrapper so its delay and transforms never fight the card's hover.
    <div
      className={reveal ? revealStyles : undefined}
      style={reveal ? { transitionDelay: `${(index % 2) * 60}ms` } : undefined}
    >
      <Link
        href={`/projects/${project.slug}`}
        className={cn(cardStyles, "group block h-full p-5")}
      >
        <div className="relative flex h-40 items-center justify-center overflow-hidden rounded-xl bg-linear-135/srgb from-accent to-accent-2 before:absolute before:inset-0 before:bg-[repeating-linear-gradient(135deg,rgba(255,255,255,0.12)_0_2px,transparent_2px_14px)]">
          {project.hero.imageSrc ? (
            <BlurImage
              src={project.hero.imageSrc}
              alt={project.hero.alt ?? project.title}
              fill
              preload={preload}
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover transition-transform duration-300 ease-out-strong group-hover:scale-[1.03]"
            />
          ) : (
            <span className="relative z-1 font-display text-2xl font-bold text-white/90">
              {projectMark || project.hero.placeholder}
            </span>
          )}
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span key={tag} className={tagStyles}>{tag}</span>
          ))}
        </div>
        <h3 className="mt-3 font-display text-lg font-semibold">{project.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-soft">{project.summary}</p>
        <span className="mt-4 inline-block font-mono text-xs text-accent">
          view case study →
        </span>
      </Link>
    </div>
  );
}

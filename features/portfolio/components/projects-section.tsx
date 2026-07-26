import Link from "next/link";
import { ProjectCard } from "@/features/portfolio/components/project-card";
import type { Project } from "@/features/portfolio/types";

type ProjectsSectionProps = {
  projects: Project[];
};

export function ProjectsSection({ projects }: ProjectsSectionProps) {
  return (
    <section id="work" className="border-t border-line py-24">
      <div className="mx-auto max-w-6xl px-6 md:px-8">
        <div className="sr mb-12 flex items-end justify-between">
          <div>
            <p className="eyebrow mb-3">work</p>
            <h2 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
              Selected projects
            </h2>
          </div>
          <Link href="/projects" className="nav-link hidden font-mono text-sm sm:inline-block">
            view all →
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}

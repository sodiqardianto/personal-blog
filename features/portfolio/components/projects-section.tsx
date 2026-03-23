import Link from "next/link";
import { PageSection, SectionHeading } from "@/shared/ui";
import { ProjectCard } from "@/features/portfolio/components/project-card";
import type { Project } from "@/features/portfolio/types";

type ProjectsSectionProps = {
  projects: Project[];
};

export function ProjectsSection({ projects }: ProjectsSectionProps) {
  return (
    <PageSection id="work" backgroundClassName="bg-slate-100 dark:bg-navy-800">
      <div className="mb-12 flex flex-wrap items-start justify-between gap-4">
        <SectionHeading
          label="Work"
          title="Selected projects"
          className="mb-0 flex-1"
        />

        <Link
          href="/projects"
          className="sr inline-flex items-center gap-2 rounded-full border border-blue/12 bg-white px-4 py-2.5 text-sm font-medium text-ink transition-all hover:border-blue hover:bg-blue/6 hover:text-blue dark:border-blue-dark/15 dark:bg-navy-700 dark:text-slate-200 dark:hover:border-blue-dark dark:hover:text-blue-dark sm:mt-2"
        >
          View all projects
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </PageSection>
  );
}

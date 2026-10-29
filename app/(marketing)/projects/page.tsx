import type { Metadata } from "next";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { revealStyles } from "@/shared/lib/styles";
import { ArrowLeftIcon, PageSection, SectionHeading } from "@/shared/ui";
import { ProjectCard } from "@/features/portfolio/components/project-card";
import { getProjects } from "@/features/portfolio/lib/projects";

export const metadata: Metadata = {
  title: "Projects | Sodiq Ardianto",
  description:
    "Selected software engineering projects by Sodiq Ardianto, covering web systems, internal tools, and product-focused engineering work.",
};

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <main className="relative z-1 pt-15">
      <div className="sticky top-0 z-[1010] flex h-[60px] items-center justify-between border-b border-blue/10 bg-slate-50/90 px-[clamp(1.25rem,5vw,3.5rem)] backdrop-blur-lg dark:border-blue-dark/12 dark:bg-navy-900/92">
        <Link
          href="/#work"
          className="inline-flex cursor-pointer items-center gap-2 bg-transparent text-sm text-soft transition-colors hover:text-accent"
        >
          <ArrowLeftIcon className="h-4 w-4 stroke-[2.2]" />
          Back to work
        </Link>

        <span className="text-xs text-soft">
          {String(projects.length).padStart(2, "0")} projects
        </span>
      </div>

      <PageSection
        id="projects"
        backgroundClassName="bg-slate-100 dark:bg-navy-800"
      >
        <SectionHeading label="Work" title="All projects" />
        <p className={cn(revealStyles, "mb-10 max-w-[620px] leading-[1.8] text-soft")}>
          A collection of projects focused on scalable systems, internal tools,
          and product work across backend, frontend, and platform engineering.
        </p>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              preload={index === 0}
              reveal={index !== 0}
            />
          ))}
        </div>
      </PageSection>
    </main>
  );
}

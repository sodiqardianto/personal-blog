import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProjectDetail } from "@/features/portfolio/components/project-detail";
import { getProjectBySlug, getProjectSlugs, getProjects } from "@/features/portfolio/lib/projects";

type ProjectDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getProjectSlugs();
}

export async function generateMetadata({
  params,
}: ProjectDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return {
      title: "Project not found | Sodiq Ardianto",
    };
  }

  return {
    title: `${project.title} | Sodiq Ardianto`,
    description: project.summary,
  };
}

export default async function ProjectDetailPage({
  params,
}: ProjectDetailPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <main className="relative z-1 pt-15">
      <ProjectDetail project={project} totalProjects={getProjects().length} />
    </main>
  );
}

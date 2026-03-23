import { cache } from "react";
import { projects } from "@/features/portfolio/content/portfolio-content";

export const getProjects = cache(() => projects);

export const getProjectSlugs = cache(() =>
  getProjects().map((project) => ({ slug: project.slug })),
);

export const getProjectBySlug = cache((slug: string) =>
  getProjects().find((project) => project.slug === slug) ?? null,
);

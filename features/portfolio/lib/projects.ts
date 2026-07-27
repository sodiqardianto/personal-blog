import "server-only";

import { cache } from "react";
import { asc, eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { projects } from "@/lib/db/schema";
import type { GalleryItem, Project } from "@/features/portfolio/types";

function toProject(row: typeof projects.$inferSelect): Project {
  return {
    id: row.id,
    number: row.number,
    slug: row.slug,
    accent: row.accent as Project["accent"],
    tags: row.tags,
    title: row.title,
    summary: row.summary,
    year: row.year,
    role: row.role,
    client: row.client,
    liveUrl: row.liveUrl ?? undefined,
    featured: row.featured,
    hero: {
      placeholder: row.heroPlaceholder,
      imageSrc: row.heroImageUrl ?? undefined,
      alt: row.heroAlt ?? undefined,
    },
    overview: row.overview,
    gallery: row.gallery as GalleryItem[],
  };
}

export const getProjects = cache(async () => {
  const rows = await db
    .select()
    .from(projects)
    .orderBy(asc(projects.sortOrder), asc(projects.id));

  return rows.map(toProject);
});

export const getProjectSlugs = cache(async () =>
  (await getProjects()).map((project) => ({ slug: project.slug })),
);

export const getProjectBySlug = cache(async (slug: string) => {
  const [row] = await db
    .select()
    .from(projects)
    .where(eq(projects.slug, slug))
    .limit(1);

  return row ? toProject(row) : null;
});

export const getFeaturedProjects = cache(async () =>
  (await getProjects()).filter((project) => project.featured),
);

import type { PostBlock } from "@/features/portfolio/types";
import type { posts as postsTable } from "./schema";

type PostRow = typeof postsTable.$inferSelect;

function formatDateParts(dateValue: Date) {
  return {
    day: new Intl.DateTimeFormat("en-US", {
      day: "2-digit",
      timeZone: "UTC",
    }).format(dateValue),
    month: new Intl.DateTimeFormat("en-US", {
      month: "short",
      timeZone: "UTC",
    }).format(dateValue),
    year: new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      timeZone: "UTC",
    }).format(dateValue),
  };
}

export function toPreviewDTO(row: PostRow) {
  return {
    id: String(row.id),
    slug: row.slug,
    title: row.title,
    excerpt: row.excerpt,
    authorName: row.authorName,
    date: formatDateParts(row.publishedAt),
    readingTime: row.readingTime,
    tags: row.tags,
    viewsCount: row.viewsCount,
    likesCount: row.likesCount,
    sharesCount: row.sharesCount,
    coverImageUrl: row.coverImageUrl ?? null,
  };
}

export function toPostDTO(row: PostRow) {
  return {
    ...toPreviewDTO(row),
    seoTitle: row.seoTitle ?? null,
    seoDescription: row.seoDescription ?? null,
    canonicalUrl: row.canonicalUrl ?? null,
    body: row.body as PostBlock[],
  };
}

import type { projects as projectsTable } from "./schema";

type ProjectRow = typeof projectsTable.$inferSelect;

export function toProjectDTO(row: ProjectRow) {
  return {
    id: String(row.id),
    number: row.number,
    slug: row.slug,
    accent: row.accent,
    title: row.title,
    summary: row.summary,
    year: row.year,
    role: row.role,
    client: row.client,
    liveUrl: row.liveUrl ?? null,
    featured: row.featured,
    hero: {
      placeholder: row.heroPlaceholder,
      imageSrc: row.heroImageUrl ?? null,
      alt: row.heroAlt ?? null,
    },
    tags: row.tags,
    overview: row.overview,
    gallery: row.gallery,
  };
}

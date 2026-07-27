import "server-only";

import { cache } from "react";
import { desc, eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { posts } from "@/lib/db/schema";
import type { Post, PostBlock, PostPreview } from "@/features/portfolio/types";

type GetPostsOptions = {
  perPage?: number;
  page?: number;
};

type PostPosition = {
  index: number;
  total: number;
};

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

function toPreviewPost(row: typeof posts.$inferSelect): PostPreview {
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

function toPost(row: typeof posts.$inferSelect): Post {
  return {
    ...toPreviewPost(row),
    seoTitle: row.seoTitle,
    seoDescription: row.seoDescription,
    canonicalUrl: row.canonicalUrl,
    body: row.body as PostBlock[],
  };
}

const readPublishedPosts = cache(async () => {
  const rows = await db
    .select()
    .from(posts)
    .where(eq(posts.published, true))
    .orderBy(desc(posts.publishedAt));

  return rows;
});

export async function getPosts(options: GetPostsOptions = {}) {
  const page = Math.max(1, options.page ?? 1);
  const perPage = Math.max(1, options.perPage ?? 12);
  const all = await readPublishedPosts();
  const startIndex = (page - 1) * perPage;

  return all.slice(startIndex, startIndex + perPage).map(toPreviewPost);
}

export async function getPostSlugs() {
  const all = await readPublishedPosts();
  return all.map((post) => ({ slug: post.slug }));
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const [row] = await db
    .select()
    .from(posts)
    .where(eq(posts.slug, slug))
    .limit(1);

  if (!row || !row.published) {
    return null;
  }

  return toPost(row);
}

export async function getPostPosition(slug: string): Promise<PostPosition> {
  const all = await readPublishedPosts();
  const index = all.findIndex((post) => post.slug === slug);

  return {
    index: index >= 0 ? index + 1 : 0,
    total: all.length,
  };
}

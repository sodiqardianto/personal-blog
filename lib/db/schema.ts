import {
  boolean,
  integer,
  jsonb,
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import type { PostBlock } from "@/features/portfolio/types";

export const posts = pgTable("posts", {
  id: serial("id").primaryKey(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  title: varchar("title", { length: 512 }).notNull(),
  excerpt: text("excerpt").notNull().default(""),
  authorName: varchar("author_name", { length: 255 }).notNull().default("Sodiq Ardianto"),
  publishedAt: timestamp("published_at", { withTimezone: true }).notNull().defaultNow(),
  readingTime: varchar("reading_time", { length: 32 }).notNull().default("1 min read"),
  tags: jsonb("tags").$type<string[]>().notNull().default([]),
  coverImageUrl: text("cover_image_url"),
  seoTitle: varchar("seo_title", { length: 512 }),
  seoDescription: text("seo_description"),
  canonicalUrl: text("canonical_url"),
  body: jsonb("body").$type<PostBlock[]>().notNull().default([]),
  viewsCount: integer("views_count").notNull().default(0),
  likesCount: integer("likes_count").notNull().default(0),
  sharesCount: integer("shares_count").notNull().default(0),
  published: boolean("published").notNull().default(true),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

export type PostRow = typeof posts.$inferSelect;
export type NewPostRow = typeof posts.$inferInsert;

export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  number: varchar("number", { length: 8 }).notNull().default(""),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  accent: varchar("accent", { length: 32 }).notNull().default("indigo"),
  title: varchar("title", { length: 512 }).notNull(),
  summary: text("summary").notNull().default(""),
  year: varchar("year", { length: 16 }).notNull().default(""),
  role: varchar("role", { length: 255 }).notNull().default(""),
  client: varchar("client", { length: 255 }).notNull().default(""),
  liveUrl: text("live_url"),
  featured: boolean("featured").notNull().default(false),
  heroImageUrl: text("hero_image_url"),
  heroAlt: text("hero_alt"),
  heroPlaceholder: varchar("hero_placeholder", { length: 8 }).notNull().default(""),
  tags: jsonb("tags").$type<string[]>().notNull().default([]),
  overview: jsonb("overview").$type<string[]>().notNull().default([]),
  gallery: jsonb("gallery")
    .$type<{ caption: string; imageSrc?: string; alt?: string }[]>()
    .notNull()
    .default([]),
  sortOrder: integer("sort_order").notNull().default(0),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

export type ProjectRow = typeof projects.$inferSelect;
export type NewProjectRow = typeof projects.$inferInsert;

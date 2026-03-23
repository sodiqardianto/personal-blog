import "server-only";

import { cache } from "react";
import fs from "node:fs";
import path from "node:path";
import type { Post, PostBlock, TextRun } from "@/features/portfolio/types";

type MarkdownFrontmatter = {
  title?: string;
  description?: string;
  pubDate?: string;
  category?: string;
  tags?: string[] | string;
  draft?: boolean;
};

const BLOG_CONTENT_DIRECTORY = path.join(process.cwd(), "doc");
const WORDS_PER_MINUTE = 200;

function parseFrontmatter(markdown: string) {
  if (!markdown.startsWith("---\n")) {
    return { frontmatter: {} as MarkdownFrontmatter, content: markdown };
  }

  const endIndex = markdown.indexOf("\n---\n", 4);

  if (endIndex === -1) {
    return { frontmatter: {} as MarkdownFrontmatter, content: markdown };
  }

  const rawFrontmatter = markdown.slice(4, endIndex).trim();
  const content = markdown.slice(endIndex + 5).trim();
  const frontmatter: MarkdownFrontmatter = {};

  for (const line of rawFrontmatter.split("\n")) {
    const separatorIndex = line.indexOf(":");

    if (separatorIndex === -1) {
      continue;
    }

    const key = line.slice(0, separatorIndex).trim() as keyof MarkdownFrontmatter;
    const rawValue = line.slice(separatorIndex + 1).trim();

    if (rawValue === "true" || rawValue === "false") {
      frontmatter[key] = (rawValue === "true") as never;
      continue;
    }

    if (rawValue.startsWith("[") && rawValue.endsWith("]")) {
      frontmatter[key] = rawValue
        .slice(1, -1)
        .split(",")
        .map((item) => item.trim().replace(/^['"]|['"]$/g, ""))
        .filter(Boolean) as never;
      continue;
    }

    frontmatter[key] = rawValue.replace(/^['"]|['"]$/g, "") as never;
  }

  return { frontmatter, content };
}

function titleFromSlug(slug: string) {
  return slug
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function normaliseTag(tag: string) {
  const lowered = tag.toLowerCase();

  if (lowered === "devops") {
    return "DevOps";
  }

  if (lowered === "backend") {
    return "Backend";
  }

  if (lowered === "frontend") {
    return "Frontend";
  }

  return tag
    .split(/[\s-]+/)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function parseInlineContent(value: string): TextRun[] {
  const runs: TextRun[] = [];
  const tokenPattern = /(`[^`]+`|\*\*[^*]+\*\*|\*[^*]+\*)/g;
  let lastIndex = 0;

  for (const match of value.matchAll(tokenPattern)) {
    const token = match[0];
    const index = match.index ?? 0;

    if (index > lastIndex) {
      runs.push({ type: "text", value: value.slice(lastIndex, index) });
    }

    if (token.startsWith("`")) {
      runs.push({ type: "code", value: token.slice(1, -1) });
    } else if (token.startsWith("**")) {
      runs.push({ type: "strong", value: token.slice(2, -2) });
    } else {
      runs.push({ type: "emphasis", value: token.slice(1, -1) });
    }

    lastIndex = index + token.length;
  }

  if (lastIndex < value.length) {
    runs.push({ type: "text", value: value.slice(lastIndex) });
  }

  return runs.length > 0 ? runs : [{ type: "text", value }];
}

function stripMarkdown(value: string) {
  return value
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/\*([^*]+)\*/g, "$1")
    .replace(/^#{1,6}\s+/gm, "")
    .replace(/^>\s?/gm, "")
    .replace(/^[-*]\s+/gm, "")
    .replace(/^\d+\.\s+/gm, "")
    .replace(/\s+/g, " ")
    .trim();
}

function parseMarkdownToBlocks(markdown: string, title?: string) {
  const blocks: PostBlock[] = [];
  const lines = markdown.split(/\r?\n/);
  let index = 0;
  let skippedTitleHeading = false;

  const flushParagraph = (paragraphLines: string[]) => {
    const text = paragraphLines.join(" ").trim();

    if (!text) {
      return;
    }

    blocks.push({
      type: "paragraph",
      content: parseInlineContent(text),
    });
  };

  while (index < lines.length) {
    const line = lines[index]?.trimEnd() ?? "";
    const trimmedLine = line.trim();

    if (!trimmedLine) {
      index += 1;
      continue;
    }

    if (/^---+$/.test(trimmedLine)) {
      index += 1;
      continue;
    }

    if (trimmedLine.startsWith("```")) {
      const language = trimmedLine.slice(3).trim() || undefined;
      const codeLines: string[] = [];
      index += 1;

      while (index < lines.length && !lines[index]?.trim().startsWith("```")) {
        codeLines.push(lines[index] ?? "");
        index += 1;
      }

      if (index < lines.length) {
        index += 1;
      }

      blocks.push({
        type: "codeBlock",
        language,
        value: codeLines.join("\n").trimEnd(),
      });
      continue;
    }

    if (/^#{1,6}\s+/.test(trimmedLine)) {
      const headingValue = trimmedLine.replace(/^#{1,6}\s+/, "").trim();

      if (
        !skippedTitleHeading &&
        title &&
        headingValue.toLowerCase() === title.toLowerCase()
      ) {
        skippedTitleHeading = true;
      } else {
        blocks.push({ type: "heading", value: headingValue });
      }

      index += 1;
      continue;
    }

    if (trimmedLine.startsWith(">")) {
      const quoteLines: string[] = [];

      while (index < lines.length && lines[index]?.trim().startsWith(">")) {
        quoteLines.push(lines[index]!.trim().replace(/^>\s?/, ""));
        index += 1;
      }

      blocks.push({
        type: "quote",
        value: quoteLines.join(" ").trim(),
      });
      continue;
    }

    if (/^([-*]|\d+\.)\s+/.test(trimmedLine)) {
      const items: string[] = [];

      while (index < lines.length && /^([-*]|\d+\.)\s+/.test(lines[index]!.trim())) {
        items.push(lines[index]!.trim().replace(/^([-*]|\d+\.)\s+/, ""));
        index += 1;
      }

      blocks.push({ type: "list", items });
      continue;
    }

    const paragraphLines: string[] = [];

    while (index < lines.length) {
      const currentLine = lines[index] ?? "";
      const trimmedCurrentLine = currentLine.trim();

      if (
        !trimmedCurrentLine ||
        /^#{1,6}\s+/.test(trimmedCurrentLine) ||
        trimmedCurrentLine.startsWith(">") ||
        /^([-*]|\d+\.)\s+/.test(trimmedCurrentLine) ||
        trimmedCurrentLine.startsWith("```") ||
        /^---+$/.test(trimmedCurrentLine)
      ) {
        break;
      }

      paragraphLines.push(trimmedCurrentLine);
      index += 1;
    }

    flushParagraph(paragraphLines);
  }

  return blocks;
}

function estimateReadingTime(markdown: string) {
  const wordCount = stripMarkdown(markdown)
    .split(/\s+/)
    .filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(wordCount / WORDS_PER_MINUTE));

  return `${minutes} min read`;
}

function formatDateParts(dateValue?: string) {
  const safeDate = dateValue ? new Date(`${dateValue}T00:00:00Z`) : new Date();

  return {
    day: new Intl.DateTimeFormat("en-US", {
      day: "2-digit",
      timeZone: "UTC",
    }).format(safeDate),
    month: new Intl.DateTimeFormat("en-US", {
      month: "short",
      timeZone: "UTC",
    }).format(safeDate),
    year: new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      timeZone: "UTC",
    }).format(safeDate),
  };
}

function frontmatterTags(frontmatter: MarkdownFrontmatter) {
  if (Array.isArray(frontmatter.tags)) {
    return frontmatter.tags.map(normaliseTag);
  }

  if (typeof frontmatter.tags === "string" && frontmatter.tags.trim()) {
    return [normaliseTag(frontmatter.tags)];
  }

  if (frontmatter.category) {
    return [normaliseTag(frontmatter.category)];
  }

  return ["Writing"];
}

function markdownFiles() {
  if (!fs.existsSync(BLOG_CONTENT_DIRECTORY)) {
    return [];
  }

  return fs
    .readdirSync(BLOG_CONTENT_DIRECTORY)
    .filter((fileName) => fileName.endsWith(".md") || fileName.endsWith(".markdown"))
    .sort();
}

function createPostFromFile(fileName: string, index: number): Post | null {
  const filePath = path.join(BLOG_CONTENT_DIRECTORY, fileName);
  const markdown = fs.readFileSync(filePath, "utf8");
  const { frontmatter, content } = parseFrontmatter(markdown);

  if (frontmatter.draft) {
    return null;
  }

  const slug = fileName.replace(/\.(md|markdown)$/, "");
  const title = frontmatter.title ?? titleFromSlug(slug);
  const blocks = parseMarkdownToBlocks(content, title);
  const firstParagraph = blocks.find((block) => block.type === "paragraph");
  const excerpt =
    frontmatter.description ??
    (firstParagraph ? stripMarkdown(firstParagraph.content.map((item) => item.value).join("")) : title);

  return {
    id: index + 1,
    slug,
    title,
    excerpt,
    date: formatDateParts(frontmatter.pubDate),
    readingTime: estimateReadingTime(content),
    tags: frontmatterTags(frontmatter),
    body: blocks,
  };
}

export const getPosts = cache(() => {
  const postsWithDate = markdownFiles()
    .map((fileName, index) => {
      const filePath = path.join(BLOG_CONTENT_DIRECTORY, fileName);
      const markdown = fs.readFileSync(filePath, "utf8");
      const { frontmatter } = parseFrontmatter(markdown);

      return {
        sortDate: frontmatter.pubDate ?? "1970-01-01",
        post: createPostFromFile(fileName, index),
      };
    })
    .filter((entry): entry is { sortDate: string; post: Post } => entry.post !== null)
    .sort((entryA, entryB) => entryB.sortDate.localeCompare(entryA.sortDate))
    .map((entry, index) => ({
      ...entry.post,
      id: index + 1,
    }));

  return postsWithDate;
});

export const getPostSlugs = cache(() =>
  getPosts().map((post) => ({ slug: post.slug })),
);

export const getPostBySlug = cache((slug: string) =>
  getPosts().find((post) => post.slug === slug) ?? null,
);

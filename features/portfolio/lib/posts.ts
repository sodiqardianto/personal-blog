import "server-only";

import { readFile, readdir } from "node:fs/promises";
import path from "node:path";
import { cache } from "react";
import type {
  Post,
  PostBlock,
  PostPreview,
  TextRun,
} from "@/features/portfolio/types";

type GetPostsOptions = {
  perPage?: number;
  page?: number;
};

type PostPosition = {
  index: number;
  total: number;
};

type PostFrontmatter = {
  title?: string;
  slug?: string;
  excerpt?: string;
  description?: string;
  status?: string;
  published_at?: string;
  pubDate?: string;
  seo_title?: string;
  seo_description?: string;
  canonical_url?: string;
  author_name?: string;
  tags?: string[];
  category?: string;
  draft?: boolean;
};

type MarkdownPostRecord = Post & {
  publishedAtValue: string | null;
};

const WORDS_PER_MINUTE = 200;
const DEFAULT_PUBLIC_PER_PAGE = 12;
const POSTS_DIRECTORY = path.join(process.cwd(), "doc");

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

function formatDateParts(dateValue: string | null) {
  const safeDate = dateValue ? new Date(dateValue) : new Date();

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

function formatReadingTime(minutes: number) {
  return `${Math.max(1, minutes)} min read`;
}

function estimateReadingTime(markdown: string) {
  const wordCount = stripMarkdown(markdown)
    .split(/\s+/)
    .filter(Boolean).length;

  return Math.max(1, Math.ceil(wordCount / WORDS_PER_MINUTE));
}

function sanitizeText(value?: string) {
  const trimmedValue = value?.trim();
  return trimmedValue ? trimmedValue : undefined;
}

function parseFrontmatterValue(rawValue: string) {
  const trimmedValue = rawValue.trim();

  if (!trimmedValue) {
    return "";
  }

  if (
    trimmedValue.startsWith("\"") ||
    trimmedValue.startsWith("[") ||
    trimmedValue === "true" ||
    trimmedValue === "false" ||
    trimmedValue === "null"
  ) {
    try {
      return JSON.parse(trimmedValue);
    } catch {
      return trimmedValue;
    }
  }

  if (trimmedValue.startsWith("'") && trimmedValue.endsWith("'")) {
    return trimmedValue.slice(1, -1);
  }

  return trimmedValue;
}

function parseMarkdownDocument(document: string) {
  if (!document.startsWith("---")) {
    return {
      frontmatter: {} as PostFrontmatter,
      content: document.trim(),
    };
  }

  const lines = document.split(/\r?\n/);
  const frontmatterLines: string[] = [];
  let closingIndex = -1;

  for (let index = 1; index < lines.length; index += 1) {
    if (lines[index]?.trim() === "---") {
      closingIndex = index;
      break;
    }

    frontmatterLines.push(lines[index] ?? "");
  }

  if (closingIndex === -1) {
    return {
      frontmatter: {} as PostFrontmatter,
      content: document.trim(),
    };
  }

  const frontmatter = frontmatterLines.reduce<PostFrontmatter>((result, line) => {
    const separatorIndex = line.indexOf(":");

    if (separatorIndex === -1) {
      return result;
    }

    const key = line.slice(0, separatorIndex).trim() as keyof PostFrontmatter;
    const rawValue = line.slice(separatorIndex + 1);

    result[key] = parseFrontmatterValue(rawValue) as never;
    return result;
  }, {});

  return {
    frontmatter,
    content: lines.slice(closingIndex + 1).join("\n").trim(),
  };
}

function toPreviewPost(post: MarkdownPostRecord): PostPreview {
  return {
    id: post.id,
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    authorName: post.authorName,
    date: post.date,
    readingTime: post.readingTime,
    tags: post.tags,
    viewsCount: post.viewsCount,
    likesCount: post.likesCount,
    sharesCount: post.sharesCount,
  };
}

const readPublishedPosts = cache(async () => {
  const files = await readdir(POSTS_DIRECTORY);

  const posts: Array<MarkdownPostRecord | null> = await Promise.all(
    files
      .filter((fileName) => fileName.endsWith(".md"))
      .map(async (fileName) => {
        const fullPath = path.join(POSTS_DIRECTORY, fileName);
        const fileContent = await readFile(fullPath, "utf8");
        const { frontmatter, content } = parseMarkdownDocument(fileContent);

        const isPublished =
          frontmatter.status === "published" || frontmatter.draft === false;

        if (!isPublished) {
          return null;
        }

        const slug = sanitizeText(frontmatter.slug) ?? fileName.replace(/\.md$/, "");
        const title = sanitizeText(frontmatter.title) ?? slug;
        const excerpt =
          sanitizeText(frontmatter.excerpt) ??
          sanitizeText(frontmatter.description) ??
          `${stripMarkdown(content).slice(0, 160).trim()}...`;
        const publishedAtValue =
          sanitizeText(frontmatter.published_at) ??
          sanitizeText(frontmatter.pubDate) ??
          null;
        const legacyCategory = sanitizeText(frontmatter.category);
        const tags = Array.isArray(frontmatter.tags)
          ? frontmatter.tags.filter((tag): tag is string => Boolean(tag))
          : legacyCategory
            ? [legacyCategory]
            : [];

        return {
          id: slug,
          slug,
          title,
          excerpt,
          authorName: sanitizeText(frontmatter.author_name) ?? "Sodiq Ardianto",
          date: formatDateParts(publishedAtValue),
          readingTime: formatReadingTime(estimateReadingTime(content)),
          tags,
          viewsCount: 0,
          likesCount: 0,
          sharesCount: 0,
          seoTitle: sanitizeText(frontmatter.seo_title) ?? null,
          seoDescription:
            sanitizeText(frontmatter.seo_description) ??
            sanitizeText(frontmatter.description) ??
            null,
          canonicalUrl: sanitizeText(frontmatter.canonical_url) ?? null,
          body: parseMarkdownToBlocks(content, title),
          publishedAtValue,
        };
      }),
  );

  return posts
    .filter((post): post is MarkdownPostRecord => post !== null)
    .sort((left, right) => {
      const leftTime = left.publishedAtValue
        ? new Date(left.publishedAtValue).getTime()
        : 0;
      const rightTime = right.publishedAtValue
        ? new Date(right.publishedAtValue).getTime()
        : 0;

      return rightTime - leftTime;
    });
});

export async function getPosts(options: GetPostsOptions = {}) {
  const page = Math.max(1, options.page ?? 1);
  const perPage = Math.max(1, options.perPage ?? DEFAULT_PUBLIC_PER_PAGE);
  const posts = await readPublishedPosts();
  const startIndex = (page - 1) * perPage;

  return posts.slice(startIndex, startIndex + perPage).map(toPreviewPost);
}

export async function getPostSlugs() {
  const posts = await readPublishedPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const posts = await readPublishedPosts();
  return posts.find((post) => post.slug === slug) ?? null;
}

export async function getPostPosition(slug: string): Promise<PostPosition> {
  const posts = await readPublishedPosts();
  const index = posts.findIndex((post) => post.slug === slug);

  return {
    index: index >= 0 ? index + 1 : 0,
    total: posts.length,
  };
}

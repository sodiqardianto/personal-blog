import { readFile, readdir } from "node:fs/promises";
import path from "node:path";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { posts } from "../lib/db/schema";

const POSTS_DIRECTORY = path.join(process.cwd(), "doc");

const WORDS_PER_MINUTE = 200;

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

function estimateReadingTime(markdown: string) {
  const wordCount = stripMarkdown(markdown).split(/\s+/).filter(Boolean).length;
  return `${Math.max(1, Math.ceil(wordCount / WORDS_PER_MINUTE))} min read`;
}

function sanitizeText(value?: string) {
  const trimmedValue = value?.trim();
  return trimmedValue ? trimmedValue : undefined;
}

function parseMarkdownToBlocks(markdown: string, title?: string) {
  const blocks: unknown[] = [];
  const lines = markdown.split(/\r?\n/);
  let index = 0;
  let skippedTitleHeading = false;

  const flushParagraph = (paragraphLines: string[]) => {
    const text = paragraphLines.join(" ").trim();
    if (!text) return;
    blocks.push({
      type: "paragraph",
      content: text.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/).map((segment) => {
        if (segment.startsWith("**"))
          return { type: "strong", value: segment.slice(2, -2) };
        if (segment.startsWith("*"))
          return { type: "emphasis", value: segment.slice(1, -1) };
        return { type: "text", value: segment };
      }),
    });
  };

  while (index < lines.length) {
    const line = lines[index]?.trimEnd() ?? "";
    const trimmedLine = line.trim();

    if (!trimmedLine || /^---+$/.test(trimmedLine)) {
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
      if (index < lines.length) index += 1;
      blocks.push({ type: "codeBlock", language, value: codeLines.join("\n").trimEnd() });
      continue;
    }

    if (/^#{1,6}\s+/.test(trimmedLine)) {
      const headingValue = trimmedLine.replace(/^#{1,6}\s+/, "").trim();
      if (!(skippedTitleHeading && title && headingValue.toLowerCase() === title.toLowerCase())) {
        blocks.push({ type: "heading", value: headingValue });
      }
      skippedTitleHeading = true;
      index += 1;
      continue;
    }

    if (trimmedLine.startsWith(">")) {
      const quoteLines: string[] = [];
      while (index < lines.length && lines[index]?.trim().startsWith(">")) {
        quoteLines.push(lines[index]!.trim().replace(/^>\s?/, ""));
        index += 1;
      }
      blocks.push({ type: "quote", value: quoteLines.join(" ").trim() });
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
      const trimmedCurrentLine = lines[index]!.trim();
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

function parseFrontmatterValue(rawValue: string) {
  const trimmedValue = rawValue.trim();
  if (!trimmedValue) return "";
  if (
    trimmedValue.startsWith('"') ||
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
    return { frontmatter: {} as PostFrontmatter, content: document.trim() };
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
    return { frontmatter: {} as PostFrontmatter, content: document.trim() };
  }
  const frontmatter = frontmatterLines.reduce<PostFrontmatter>((result, line) => {
    const separatorIndex = line.indexOf(":");
    if (separatorIndex === -1) return result;
    const key = line.slice(0, separatorIndex).trim() as keyof PostFrontmatter;
    result[key] = parseFrontmatterValue(line.slice(separatorIndex + 1)) as never;
    return result;
  }, {});
  return {
    frontmatter,
    content: lines.slice(closingIndex + 1).join("\n").trim(),
  };
}

async function main() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) throw new Error("DATABASE_URL is not set");
  const client = postgres(connectionString);
  const db = drizzle(client, { schema: { posts } });

  const files = await readdir(POSTS_DIRECTORY);
  const markdownFiles = files.filter((f) => f.endsWith(".md"));

  for (const fileName of markdownFiles) {
    const fileContent = await readFile(path.join(POSTS_DIRECTORY, fileName), "utf8");
    const { frontmatter, content } = parseMarkdownDocument(fileContent);

    const isPublished =
      frontmatter.status === "published" || frontmatter.draft === false;
    if (!isPublished) continue;

    const slug = sanitizeText(frontmatter.slug) ?? fileName.replace(/\.md$/, "");
    const title = sanitizeText(frontmatter.title) ?? slug;
    const excerpt =
      sanitizeText(frontmatter.excerpt) ??
      sanitizeText(frontmatter.description) ??
      `${stripMarkdown(content).slice(0, 160).trim()}...`;
    const publishedAtValue =
      sanitizeText(frontmatter.published_at) ??
      sanitizeText(frontmatter.pubDate) ??
      new Date().toISOString();
    const legacyCategory = sanitizeText(frontmatter.category);
    const tags = Array.isArray(frontmatter.tags)
      ? frontmatter.tags.filter((t): t is string => Boolean(t))
      : legacyCategory
        ? [legacyCategory]
        : [];

    await db
      .insert(posts)
      .values({
        slug,
        title,
        excerpt,
        authorName: sanitizeText(frontmatter.author_name) ?? "Sodiq Ardianto",
        publishedAt: new Date(publishedAtValue),
        readingTime: estimateReadingTime(content),
        tags,
        seoTitle: sanitizeText(frontmatter.seo_title) ?? null,
        seoDescription:
          sanitizeText(frontmatter.seo_description) ??
          sanitizeText(frontmatter.description) ??
          null,
        canonicalUrl: sanitizeText(frontmatter.canonical_url) ?? null,
        body: parseMarkdownToBlocks(content, title) as never,
        published: true,
      })
      .onConflictDoUpdate({
        target: posts.slug,
        set: {
          title,
          excerpt,
          authorName: sanitizeText(frontmatter.author_name) ?? "Sodiq Ardianto",
          publishedAt: new Date(publishedAtValue),
          readingTime: estimateReadingTime(content),
          tags,
          seoTitle: sanitizeText(frontmatter.seo_title) ?? null,
          seoDescription:
            sanitizeText(frontmatter.seo_description) ??
            sanitizeText(frontmatter.description) ??
            null,
          canonicalUrl: sanitizeText(frontmatter.canonical_url) ?? null,
          body: parseMarkdownToBlocks(content, title) as never,
        },
      });

    console.log(`Seeded: ${slug}`);
  }

  await client.end();
  console.log("Done.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});

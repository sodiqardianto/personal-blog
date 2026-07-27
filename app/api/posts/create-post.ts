import { randomUUID } from "crypto";
import Busboy from "busboy";
import type { PostBlock } from "@/features/portfolio/types";
import { db } from "@/lib/db";
import { posts } from "@/lib/db/schema";
import { uploadImage } from "@/lib/minio/upload";
import { toPostDTO } from "@/lib/db/dto";

type FieldMap = Record<string, string>;

export async function createPost(request: Request) {
  const headers: Record<string, string> = {};
  request.headers.forEach((value, key) => {
    headers[key] = value;
  });
  const busboy = Busboy({ headers });
  const fields: FieldMap = {};
  let coverImageUrl: string | null = null;
  let pendingFiles = 0;
  let finished = false;
  let rejectPromise: (err: unknown) => void = () => {};

  const maybeResolve = (resolve: () => void) => {
    if (finished && pendingFiles === 0) resolve();
  };

  await new Promise<void>((resolve, reject) => {
    rejectPromise = reject;

    busboy.on("field", (name, value) => {
      fields[name] = value;
    });

    busboy.on("file", (name, file, info) => {
      if (name !== "image") {
        file.resume();
        return;
      }
      pendingFiles++;
      const chunks: Buffer[] = [];
      file.on("data", (chunk: Buffer) => chunks.push(chunk));
      file.on("end", async () => {
        try {
          const blob = new File([Buffer.concat(chunks)], info.filename, { type: info.mimeType });
          coverImageUrl = await uploadImage(blob);
        } catch (err) {
          reject(err);
        } finally {
          pendingFiles--;
          maybeResolve(resolve);
        }
      });
    });

    busboy.on("error", reject);
    busboy.on("close", () => {
      finished = true;
      maybeResolve(resolve);
    });

    if (request.body) {
      const reader = request.body.getReader();
      const decoder = new TextDecoder();
      const pump = async (): Promise<void> => {
        const { done, value } = await reader.read();
        if (done) {
          busboy.end();
          return;
        }
        busboy.write(Buffer.from(value));
        await pump();
      };
      pump().catch(reject);
    } else {
      busboy.end();
    }
  });

  const slug = fields.slug?.trim() || randomUUID().slice(0, 8);
  let body: PostBlock[] = [];
  if (fields.body) {
    try {
      body = JSON.parse(fields.body) as PostBlock[];
    } catch {
      body = [];
    }
  }
  let tags: string[] = [];
  if (fields.tags) {
    tags = fields.tags
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);
  }

  const [row] = await db
    .insert(posts)
    .values({
      slug,
      title: fields.title?.trim() || "Untitled",
      excerpt: fields.excerpt?.trim() ?? "",
      authorName: fields.authorName?.trim() || "Sodiq Ardianto",
      publishedAt: fields.publishedAt ? new Date(fields.publishedAt) : new Date(),
      readingTime: fields.readingTime?.trim() || "1 min read",
      tags,
      coverImageUrl,
      seoTitle: fields.seoTitle?.trim() || null,
      seoDescription: fields.seoDescription?.trim() || null,
      canonicalUrl: fields.canonicalUrl?.trim() || null,
      body,
      published: fields.published === "false" ? false : true,
    })
    .returning();

  return { post: toPostDTO(row) };
}

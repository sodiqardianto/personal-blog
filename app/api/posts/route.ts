import { NextResponse } from "next/server";
import { desc, eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { posts } from "@/lib/db/schema";
import { toPreviewDTO } from "@/lib/db/dto";
import { createPost } from "./create-post";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = Math.max(1, Number(searchParams.get("page") ?? "1"));
  const perPage = Math.max(1, Number(searchParams.get("perPage") ?? "50"));

  const rows = await db
    .select()
    .from(posts)
    .where(eq(posts.published, true))
    .orderBy(desc(posts.publishedAt))
    .limit(perPage)
    .offset((page - 1) * perPage);

  return NextResponse.json({ posts: rows.map(toPreviewDTO), page, perPage });
}

export async function POST(request: Request) {
  try {
    const result = await createPost(request);
    return NextResponse.json(result, { status: 201 });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to create post";
    const status = message.includes("Unsupported") || message.includes("exceeds") ? 400 : 500;
    return NextResponse.json({ error: message }, { status });
  }
}

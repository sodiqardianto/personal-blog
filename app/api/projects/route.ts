import { NextResponse } from "next/server";
import { asc } from "drizzle-orm";
import { db } from "@/lib/db";
import { projects } from "@/lib/db/schema";
import { toProjectDTO } from "@/lib/db/dto";

export async function GET() {
  const rows = await db
    .select()
    .from(projects)
    .orderBy(asc(projects.sortOrder), asc(projects.id));

  return NextResponse.json({ projects: rows.map(toProjectDTO) });
}

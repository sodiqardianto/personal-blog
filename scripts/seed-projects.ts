import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { projects } from "../lib/db/schema";
import { projects as sourceProjects } from "./seed-projects-data";

async function main() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) throw new Error("DATABASE_URL is not set");
  const client = postgres(connectionString);
  const db = drizzle(client, { schema: { projects } });

  for (const project of sourceProjects) {
    await db
      .insert(projects)
      .values({
        number: project.number,
        slug: project.slug,
        accent: project.accent,
        title: project.title,
        summary: project.summary,
        year: project.year,
        role: project.role,
        client: project.client,
        liveUrl: project.liveUrl ?? null,
        featured: project.featured,
        heroImageUrl: project.hero.imageSrc ?? null,
        heroAlt: project.hero.alt ?? null,
        heroPlaceholder: project.hero.placeholder,
        tags: project.tags,
        overview: project.overview,
        gallery: project.gallery,
        sortOrder: project.id,
      })
      .onConflictDoUpdate({
        target: projects.slug,
        set: {
          number: project.number,
          accent: project.accent,
          title: project.title,
          summary: project.summary,
          year: project.year,
          role: project.role,
          client: project.client,
          liveUrl: project.liveUrl ?? null,
          featured: project.featured,
          heroImageUrl: project.hero.imageSrc ?? null,
          heroAlt: project.hero.alt ?? null,
          heroPlaceholder: project.hero.placeholder,
          tags: project.tags,
          overview: project.overview,
          gallery: project.gallery,
          sortOrder: project.id,
        },
      });

    console.log(`Seeded: ${project.slug}`);
  }

  await client.end();
  console.log("Done.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});

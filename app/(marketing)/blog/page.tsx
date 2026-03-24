import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeftIcon, PageSection, SectionHeading } from "@/shared/ui";
import { PostListItem } from "@/features/portfolio/components/post-list-item";
import { getPosts } from "@/features/portfolio/lib/posts";

export const metadata: Metadata = {
  title: "Blog | Sodiq Ardianto",
  description:
    "Thoughts and notes by Sodiq Ardianto on software engineering, backend architecture, TypeScript, and product development.",
};

export default async function BlogPage() {
  const posts = await getPosts({ perPage: 50 });

  return (
    <main className="relative z-1 pt-15">
      <div className="sticky top-0 z-[1010] flex h-[60px] items-center justify-between border-b border-blue/10 bg-slate-50/90 px-[clamp(1.25rem,5vw,3.5rem)] backdrop-blur-lg dark:border-blue-dark/12 dark:bg-navy-900/92">
        <Link
          href="/#blog"
          className="inline-flex cursor-pointer items-center gap-2 bg-transparent text-sm text-ink/50 transition-colors hover:text-blue dark:text-slate-500 dark:hover:text-blue-dark"
        >
          <ArrowLeftIcon className="h-4 w-4 stroke-[2.2]" />
          Back to writing
        </Link>

        <span className="text-xs text-ink/40 dark:text-slate-600">
          {String(posts.length).padStart(2, "0")} posts
        </span>
      </div>

      <PageSection
        id="blog-list"
        backgroundClassName="bg-slate-50 dark:bg-navy-900"
      >
        <SectionHeading label="Writing" title="All notes" />
        <p className="sr mb-10 max-w-[620px] leading-[1.8] text-ink/60 dark:text-slate-400">
          Short essays and practical notes on software engineering, backend
          systems, frontend work, and the kinds of decisions that make products
          easier to build and maintain.
        </p>

        <div className="flex flex-col">
          {posts.map((post) => (
            <PostListItem key={post.id} post={post} />
          ))}
        </div>
      </PageSection>
    </main>
  );
}

import Link from "next/link";
import { ArrowLeftIcon } from "@/shared/ui";
import { PostBody } from "@/features/portfolio/components/post-body";
import { PostEngagement } from "@/features/portfolio/components/post-engagement";
import type { Post } from "@/features/portfolio/types";

type PostDetailProps = {
  author: string;
  post: Post;
  totalPosts: number;
  postIndex: number;
};

export function PostDetail({
  author,
  post,
  totalPosts,
  postIndex,
}: PostDetailProps) {
  return (
    <div className="pb-24">
      <div className="sticky top-0 z-1010 flex h-15 items-center justify-between border-b border-blue/10 bg-slate-50/90 px-[clamp(1.25rem,5vw,3.5rem)] backdrop-blur-lg dark:border-blue-dark/12 dark:bg-navy-900/92">
        <Link
          href="/#blog"
          className="inline-flex cursor-pointer items-center gap-2 bg-transparent text-sm text-ink/50 transition-colors hover:text-blue dark:text-slate-500 dark:hover:text-blue-dark"
        >
          <ArrowLeftIcon className="h-4 w-4 stroke-[2.2]" />
          Back to writing
        </Link>

        <span className="text-xs text-ink/40 dark:text-slate-600">
          {String(postIndex).padStart(2, "0")} /{" "}
          {String(totalPosts).padStart(2, "0")}
        </span>
      </div>

      <div className="mx-auto max-w-165 px-[clamp(1.25rem,5vw,2rem)] py-12 pb-24">
        <div className="mb-4 flex flex-wrap gap-1.5">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="inline-block rounded-full bg-blue/7 px-2 py-0.5 text-[0.68rem] font-medium tracking-wide text-blue dark:bg-blue-dark/10 dark:text-blue-dark"
            >
              {tag}
            </span>
          ))}
        </div>

        <h1 className="mb-4 font-serif text-[clamp(1.9rem,5vw,3rem)] leading-[1.12] tracking-[-0.025em] text-ink dark:text-slate-100">
          {post.title}
        </h1>

        <div className="mb-8 flex flex-wrap items-center gap-2 text-[0.855rem] text-ink/40 dark:text-slate-600">
          <span>{author}</span>
          <span className="opacity-30">•</span>
          <span>
            {post.date.day} {post.date.month} {post.date.year}
          </span>
          <span className="opacity-30">•</span>
          <span>{post.readingTime}</span>
        </div>

        <div className="mb-8 h-px bg-blue/10 dark:bg-blue-dark/12" />
        <PostBody blocks={post.body} />

        <div className="mt-14 rounded-[1.35rem] border border-blue/10 bg-slate-100 px-6 py-6 dark:border-blue-dark/12 dark:bg-navy-800 sm:px-8 sm:py-7">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <PostEngagement slug={post.slug} />

            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-[1.02rem] text-ink/65 transition-colors hover:text-blue dark:text-slate-400 dark:hover:text-blue-dark"
            >
              <ArrowLeftIcon className="h-4 w-4 stroke-[2.2]" />
              Back to all notes
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

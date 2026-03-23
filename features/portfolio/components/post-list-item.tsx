import Link from "next/link";
import type { Post } from "@/features/portfolio/types";

type PostListItemProps = {
  post: Post;
};

export function PostListItem({ post }: PostListItemProps) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="brow sr block cursor-pointer border-b border-blue/10 py-7 text-left no-underline first:border-t dark:border-blue-dark/12"
    >
      <div className="grid grid-cols-[84px_1fr] gap-7">
        <div className="pt-0.5 text-[0.72rem] leading-snug text-ink/40 dark:text-slate-600">
          <span className="mb-1 block font-serif text-[1.7rem] leading-none text-ink opacity-20 dark:text-slate-200">
            {post.date.day}
          </span>
          {post.date.month} {post.date.year}
        </div>

        <div>
          <h3 className="btt mb-1.5 font-serif text-[1.2rem] leading-snug tracking-tight text-ink transition-colors dark:text-slate-100">
            {post.title}
          </h3>
          <p className="line-clamp-2 text-[0.855rem] leading-relaxed text-ink/50 dark:text-slate-500">
            {post.excerpt}
          </p>
          <div className="mt-2.5 flex flex-wrap items-center gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="inline-block rounded-full bg-blue/7 px-2 py-0.5 text-[0.68rem] font-medium tracking-wide text-blue dark:bg-blue-dark/10 dark:text-blue-dark"
              >
                {tag}
              </span>
            ))}
            <span className="text-[0.72rem] text-ink/40 dark:text-slate-600">
              {post.readingTime}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

import Link from "next/link";
import { PostListItem } from "@/features/portfolio/components/post-list-item";
import type { PostPreview } from "@/features/portfolio/types";
import { cn } from "@/lib/utils";
import { eyebrowStyles, navLinkStyles, revealStyles } from "@/shared/lib/styles";

type BlogSectionProps = {
  posts: PostPreview[];
};

export function BlogSection({ posts }: BlogSectionProps) {
  return (
    <section id="blog" className="border-t border-line py-24">
      <div className="mx-auto max-w-6xl px-6 md:px-8">
        <div
          className={cn(revealStyles, "mb-10 flex items-end justify-between gap-6")}
        >
          <div>
            <p className={cn(eyebrowStyles, "mb-3")}>writing</p>
            <h2 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
              Thoughts &amp; notes
            </h2>
          </div>
          <Link href="/blog" className={cn(
              navLinkStyles,
              "hidden shrink-0 font-mono text-sm sm:inline-block",
            )}>
            view all →
          </Link>
        </div>

        <div className={revealStyles}>
          {posts.map((post) => (
            <PostListItem key={post.id} post={post} />
          ))}
        </div>
      </div>
    </section>
  );
}

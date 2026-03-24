import Link from "next/link";
import { PageSection, SectionHeading } from "@/shared/ui";
import { PostListItem } from "@/features/portfolio/components/post-list-item";
import type { PostPreview } from "@/features/portfolio/types";

type BlogSectionProps = {
  posts: PostPreview[];
};

export function BlogSection({ posts }: BlogSectionProps) {
  return (
    <PageSection id="blog" backgroundClassName="bg-slate-50 dark:bg-navy-900">
      <div className="mb-12 flex flex-wrap items-start justify-between gap-4">
        <SectionHeading
          label="Writing"
          title="Thoughts & notes"
          className="mb-0 flex-1"
        />

        <Link
          href="/blog"
          className="sr inline-flex items-center gap-2 rounded-full border border-blue/12 bg-white px-4 py-2.5 text-sm font-medium text-ink transition-all hover:border-blue hover:bg-blue/6 hover:text-blue dark:border-blue-dark/15 dark:bg-navy-700 dark:text-slate-200 dark:hover:border-blue-dark dark:hover:text-blue-dark sm:mt-2"
        >
          View all notes
        </Link>
      </div>

      <div className="flex flex-col">
        {posts.map((post) => (
          <PostListItem key={post.id} post={post} />
        ))}
      </div>
    </PageSection>
  );
}

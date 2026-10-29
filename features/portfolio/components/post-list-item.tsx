import Link from "next/link";
import type { PostPreview } from "@/features/portfolio/types";
import { tagStyles } from "@/shared/lib/styles";

type PostListItemProps = {
  post: PostPreview;
};

const monthNumbers: Record<string, string> = {
  Jan: "01", Feb: "02", Mar: "03", Apr: "04", May: "05", Jun: "06",
  Jul: "07", Aug: "08", Sep: "09", Oct: "10", Nov: "11", Dec: "12",
};

export function PostListItem({ post }: PostListItemProps) {
  const formattedDate = `${post.date.day}.${monthNumbers[post.date.month] ?? post.date.month}.${post.date.year}`;

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="-mx-2 flex flex-col gap-2 rounded-lg border-b border-line px-2 py-5 transition-[background-color,padding-left] duration-250 hover:bg-accent/6 hover:pl-2.5 sm:flex-row sm:items-center sm:gap-6"
    >
      <span className="w-24 shrink-0 font-mono text-xs text-soft">{formattedDate}</span>
      <span className="flex-1 font-display font-medium">{post.title}</span>
      <span className="flex flex-wrap gap-2">
        {post.tags.map((tag) => (
          <span key={tag} className={tagStyles}>{tag}</span>
        ))}
      </span>
    </Link>
  );
}

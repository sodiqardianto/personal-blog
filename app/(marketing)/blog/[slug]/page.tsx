import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PostDetail } from "@/features/portfolio/components/post-detail";
import {
  getPostBySlug,
  getPostPosition,
  getPostSlugs,
} from "@/features/portfolio/lib/posts";

type PostDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getPostSlugs();
}

export async function generateMetadata({
  params,
}: PostDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return {
      title: "Post not found | Sodiq Ardianto",
    };
  }

  return {
    title: post.seoTitle ?? `${post.title} | Sodiq Ardianto`,
    description: post.seoDescription ?? post.excerpt,
    alternates: post.canonicalUrl
      ? {
          canonical: post.canonicalUrl,
        }
      : undefined,
  };
}

export default async function PostDetailPage({ params }: PostDetailPageProps) {
  const { slug } = await params;
  const [position, post] = await Promise.all([
    getPostPosition(slug),
    getPostBySlug(slug),
  ]);

  if (!post) {
    notFound();
  }

  return (
    <main className="relative z-1 pt-15">
      <PostDetail
        post={post}
        totalPosts={position.total}
        postIndex={position.index}
      />
    </main>
  );
}

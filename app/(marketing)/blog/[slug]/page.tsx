import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PostDetail } from "@/features/portfolio/components/post-detail";
import { siteMetadata } from "@/features/portfolio/content/portfolio-content";
import {
  getPostBySlug,
  getPostSlugs,
  getPosts,
} from "@/features/portfolio/lib/posts";

type PostDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getPostSlugs();
}

export async function generateMetadata({
  params,
}: PostDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {
      title: "Post not found | Sodiq Ardianto",
    };
  }

  return {
    title: `${post.title} | Sodiq Ardianto`,
    description: post.excerpt,
  };
}

export default async function PostDetailPage({ params }: PostDetailPageProps) {
  const { slug } = await params;
  const posts = getPosts();
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const postIndex =
    posts.findIndex((currentPost) => currentPost.slug === slug) + 1;

  return (
    <main className="relative z-1 pt-15">
      <PostDetail
        author={siteMetadata.author}
        post={post}
        totalPosts={posts.length}
        postIndex={postIndex}
      />
    </main>
  );
}

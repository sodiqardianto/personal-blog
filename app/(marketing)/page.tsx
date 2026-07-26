import {
  AboutSection,
  BlogSection,
  ContactSection,
  contactLinks,
  currentFocus,
  getPosts,
  HeroSection,
  getFeaturedProjects,
  ProjectsSection,
  stackItems,
} from "@/features/portfolio";

export default async function Home() {
  const posts = await getPosts({ perPage: 5 });
  const featuredProjects = getFeaturedProjects();

  return (
    <main className="relative z-1">
      <HeroSection />
      <AboutSection stackItems={stackItems} currentFocus={currentFocus} />
      <ProjectsSection projects={featuredProjects} />
      <BlogSection posts={posts} />
      <ContactSection contactLinks={contactLinks} />
    </main>
  );
}

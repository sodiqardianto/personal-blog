import {
  AboutSection,
  BlogSection,
  ContactSection,
  contactLinks,
  currentFocus,
  getPosts,
  HeroSection,
  projects,
  ProjectsSection,
  stackItems,
} from "@/features/portfolio";

export default function Home() {
  const posts = getPosts();

  return (
    <main className="relative z-1 pt-15">
      <HeroSection />
      <AboutSection stackItems={stackItems} currentFocus={currentFocus} />
      <ProjectsSection projects={projects} />
      <BlogSection posts={posts} />
      <ContactSection contactLinks={contactLinks} />
    </main>
  );
}

import { ArrowRightIcon } from "@/shared/ui";
import { PageSection } from "@/shared/ui";

export function HeroSection() {
  return (
    <PageSection
      id="hero"
      className="hero-glow relative min-h-[calc(100vh-60px)] overflow-x-clip"
      contentClassName="relative flex min-h-[calc(100vh-60px)] flex-col justify-center"
      disableVerticalPadding
    >
      <div className="eyebrow-line relative z-1 mb-6 flex items-center gap-3 text-[0.78rem] font-medium uppercase tracking-widest text-blue opacity-0 animate-fade-up-d1 dark:text-blue-dark">
        Available for projects
      </div>

      <h1 className="relative z-1 mb-6 font-serif text-[clamp(2rem,11vw,3.4rem)] leading-[1.02] tracking-[-0.025em] text-ink opacity-0 animate-fade-up-d2 sm:text-[clamp(2.8rem,7vw,5.4rem)] sm:leading-[1.08] dark:text-slate-100">
        Hi, I&apos;m
        <br />
        <em className="text-blue dark:text-blue-dark">Sodiq Ardianto</em>
        <br />a software engineer.
      </h1>

      <p className="relative z-1 mb-10 max-w-120 text-[clamp(0.975rem,2vw,1.1rem)] leading-[1.75] text-ink/60 opacity-0 animate-fade-up-d3 dark:text-slate-400">
        I build web and mobile applications with Laravel, Express,
        React/Next.js, and Flutter. My approach is simple: keep the architecture
        clean, keep the code maintainable, and build products that work well for
        both users and teams.
      </p>

      <div className="relative z-1 flex flex-wrap gap-3 opacity-0 animate-fade-up-d4">
        <a
          href="#work"
          className="inline-flex items-center gap-2 rounded-full bg-blue px-5 py-2.5 text-sm font-medium text-white transition-all hover:-translate-y-0.5 hover:shadow-[0_6px_22px_rgba(47,84,235,.35)] dark:bg-blue-dark"
        >
          View my work
          <ArrowRightIcon className="h-4 w-4 stroke-[2.2]" />
        </a>
        <a
          href="#contact"
          className="inline-flex items-center gap-2 rounded-full border border-blue/15 bg-transparent px-5 py-2.5 text-sm font-medium text-ink/60 transition-all hover:border-blue hover:bg-blue/6 hover:text-ink dark:border-blue-dark/20 dark:text-slate-400 dark:hover:border-blue-dark dark:hover:text-slate-200"
        >
          Get in touch
        </a>
      </div>

      <div className="relative z-1 mt-14 flex items-center gap-2 text-[0.78rem] text-ink/40 opacity-0 animate-fade-up-d6 dark:text-slate-600">
        <div className="relative flex h-8 w-5 justify-center rounded-full border border-blue/20 dark:border-blue-dark/20">
          <span className="absolute top-1.25 h-1.5 w-0.75 rounded-full bg-blue animate-bounce-dot dark:bg-blue-dark" />
        </div>
        <span>Scroll to explore</span>
      </div>
    </PageSection>
  );
}

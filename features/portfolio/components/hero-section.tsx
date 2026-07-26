import { TypingRole } from "@/features/portfolio/components/typing-role";

export function HeroSection() {
  return (
    <section
      id="top"
      className="relative overflow-hidden pb-20 pt-28 sm:pb-24 sm:pt-36 md:pb-32 md:pt-44"
    >
      <div className="ambient-grid pointer-events-none absolute inset-0" />

      <div className="relative mx-auto grid min-w-0 max-w-6xl items-center gap-12 px-6 md:grid-cols-2 md:gap-14 md:px-8">
        <div className="min-w-0">
          <div className="relative mb-6 inline-flex items-center gap-2">
            <span className="status-dot relative" />
            <span className="eyebrow">available for projects</span>
          </div>

          <h1 className="font-display text-[clamp(2.25rem,10vw,2.6rem)] font-semibold leading-[1.08] tracking-tight sm:text-5xl md:text-[3.4rem]">
            I build software
            <br />
            that stays <span className="text-accent">reliable</span>
            <br />
            as it grows.
          </h1>

          <p className="mt-6 min-h-10 font-mono text-sm text-soft sm:min-h-0 sm:text-base md:text-lg">
            Hi, I&apos;m Sodiq — a <TypingRole />
          </p>

          <p className="mt-6 max-w-md text-[15px] leading-relaxed text-soft">
            I work across backend, frontend, and mobile — Laravel, Express,
            React/Next.js, and Flutter. My focus is clean architecture,
            maintainable code, and shipping products that actually hold up in
            production.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
            <a
              href="#work"
              className="button-primary inline-flex w-full rounded-full px-6 py-3 font-mono text-sm sm:w-auto"
            >
              View my work
            </a>
            <a
              href="#contact"
              className="button-ghost inline-flex w-full rounded-full px-6 py-3 font-mono text-sm sm:w-auto"
            >
              Get in touch
            </a>
          </div>
        </div>

        <div className="terminal-card sr min-w-0 max-w-full overflow-hidden">
          <div className="terminal-bar">
            <span className="terminal-dot bg-[#FF5F57]" />
            <span className="terminal-dot bg-[#FEBC2E]" />
            <span className="terminal-dot bg-[#28C840]" />
            <span className="ml-2 font-mono text-xs text-soft">about.ts</span>
          </div>
          <pre className="block max-w-full overflow-x-auto p-4 font-mono text-xs leading-6 sm:p-5 sm:text-[13px]">
            <span className="token-comment">{"// who's building this"}</span>
            {"\n"}
            <span className="token-key">const</span>
            {" sodiq = {\n  role: "}
            <span className="token-string">&quot;Software Engineer&quot;</span>
            {",\n  base: "}
            <span className="token-string">&quot;Indonesia&quot;</span>
            {",\n  stack: ["}
            <span className="token-string">&quot;Laravel&quot;</span>
            {", "}
            <span className="token-string">&quot;Next.js&quot;</span>
            {", "}
            <span className="token-string">&quot;Flutter&quot;</span>
            {"],\n  values: ["}
            <span className="token-string">&quot;clean architecture&quot;</span>
            {", "}
            <span className="token-string">&quot;maintainable code&quot;</span>
            {"],\n  "}
            <span className="token-function">isOpenToWork</span>
            {": "}
            <span className="token-key">true</span>
            {",\n};\n\n"}
            <span className="token-function">connect</span>
            {"(sodiq);"}
          </pre>
        </div>
      </div>
    </section>
  );
}

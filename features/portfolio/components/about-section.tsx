type AboutSectionProps = {
  stackItems: string[];
  currentFocus: string[];
};

function PillList({ items }: { items: string[] }) {
  return (
    <ul className="flex list-none flex-wrap gap-2">
      {items.map((item) => (
        <li key={item} className="portfolio-tag cursor-default">
          {item}
        </li>
      ))}
    </ul>
  );
}

export function AboutSection({
  stackItems,
  currentFocus,
}: AboutSectionProps) {
  return (
    <section id="about" className="border-t border-line py-24">
      <div className="mx-auto grid max-w-6xl gap-14 px-6 md:grid-cols-[1fr_1.3fr] md:px-8">
        <div className="sr">
          <p className="eyebrow mb-3">about</p>
          <h2 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
            A bit about me
          </h2>
        </div>

        <div className="sr">
          <p className="text-[15px] leading-relaxed text-soft md:text-base">
            I&apos;m Sodiq Ardianto, a software engineer from Indonesia who
            works across backend, frontend, and mobile development. I enjoy
            building products with Laravel, Express, React/Next.js, and
            Flutter, especially when the goal is to create systems that are
            reliable, scalable, and easy to maintain.
          </p>
          <p className="mt-4 text-[15px] leading-relaxed text-soft md:text-base">
            I care a lot about clean architecture, practical engineering
            decisions, and development workflows that stay efficient as
            products grow. I&apos;m comfortable working with Linux, Docker,
            MySQL, and PostgreSQL, and I always try to choose tools based on
            what the product actually needs, not just what is popular.
          </p>

          <div className="mt-10 grid gap-3 sm:grid-cols-2">
            <div className="portfolio-card p-5">
              <p className="mb-3 font-mono text-xs text-soft">what I work with</p>
              <PillList items={stackItems} />
            </div>
            <div className="portfolio-card p-5">
              <p className="mb-3 font-mono text-xs text-soft">currently</p>
              <PillList items={currentFocus} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

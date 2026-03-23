import { PageSection } from "@/shared/ui";
import { SectionHeading } from "@/shared/ui";

type AboutSectionProps = {
  stackItems: string[];
  currentFocus: string[];
};

function PillList({ items }: { items: string[] }) {
  return (
    <ul className="list-none flex flex-wrap gap-1.5">
      {items.map((item) => (
        <li
          key={item}
          className="cursor-default rounded-full border border-transparent bg-blue/7 px-3 py-1 text-[0.78rem] text-blue transition-all hover:border-blue dark:bg-blue-dark/10 dark:text-blue-dark dark:hover:border-blue-dark"
        >
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
    <PageSection id="about" backgroundClassName="bg-slate-50 dark:bg-navy-900">
      <SectionHeading label="About" title="A bit about me" />

      <div className="grid grid-cols-1 items-start gap-10 md:grid-cols-2 md:gap-12">
        <div className="sr" style={{ transitionDelay: ".06s" }}>
          <p className="mb-4 leading-[1.8] text-ink/60 dark:text-slate-400">
            I&apos;m Sodiq Ardianto, a software engineer from Indonesia who
            works across backend, frontend, and mobile development. I enjoy
            building products with Laravel, Express, React/Next.js, and
            Flutter, especially when the goal is to create systems that are
            reliable, scalable, and easy to maintain.
          </p>
          <p className="mb-4 leading-[1.8] text-ink/60 dark:text-slate-400">
            I care a lot about clean architecture, practical engineering
            decisions, and development workflows that stay efficient as
            products grow. I&apos;m comfortable working with Linux, Docker,
            MySQL, and PostgreSQL, and I always try to choose tools based on
            what the product actually needs, not just what is popular.
          </p>
        </div>

        <div className="sr" style={{ transitionDelay: ".13s" }}>
          <div>
            <h3 className="mb-3 text-[0.72rem] font-medium uppercase tracking-[0.09em] text-ink/40 dark:text-slate-600">
              What I work with
            </h3>
            <PillList items={stackItems} />
          </div>

          <div className="mt-6">
            <h3 className="mb-3 text-[0.72rem] font-medium uppercase tracking-[0.09em] text-ink/40 dark:text-slate-600">
              Currently
            </h3>
            <PillList items={currentFocus} />
          </div>
        </div>
      </div>
    </PageSection>
  );
}

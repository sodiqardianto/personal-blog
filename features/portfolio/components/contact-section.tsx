import {
  GitHubIcon,
  InstagramIcon,
  LinkedInIcon,
  MailIcon,
} from "@/shared/ui";
import { PageSection } from "@/shared/ui";
import { SectionHeading } from "@/shared/ui";
import type { ContactLink } from "@/features/portfolio/types";

type ContactSectionProps = {
  contactLinks: ContactLink[];
};

const iconMap = {
  mail: MailIcon,
  linkedin: LinkedInIcon,
  github: GitHubIcon,
  instagram: InstagramIcon,
} as const;

export function ContactSection({ contactLinks }: ContactSectionProps) {
  return (
    <PageSection
      id="contact"
      backgroundClassName="bg-slate-100 dark:bg-navy-800"
    >
      <SectionHeading label="Contact" title="Let's talk" />

      <div className="max-w-125 sr" style={{ transitionDelay: ".08s" }}>
        <h3 className="mb-4 font-serif text-[clamp(1.55rem,4vw,2.4rem)] leading-tight tracking-tight">
          Got a product to
          <br />
          build, improve, or scale?
        </h3>

        <p className="mb-9 leading-[1.75] text-ink/60 dark:text-slate-400">
          I&apos;m open to software engineering opportunities, freelance
          collaborations, and technical product work where clean architecture,
          maintainable code, and thoughtful execution really matter. If that
          sounds like what you need, feel free to reach out.
        </p>

        <div className="flex flex-wrap gap-2.5">
          {contactLinks.map((link) => {
            const Icon = iconMap[link.icon];

            return (
              <a
                key={link.label}
                href={link.href}
                {...(link.external
                  ? { target: "_blank", rel: "noreferrer" }
                  : undefined)}
                className="c-link inline-flex items-center gap-2 rounded-full border border-blue/12 bg-white px-4 py-2.5 text-sm font-medium text-ink transition-all hover:border-blue hover:bg-blue/6 hover:text-blue dark:border-blue-dark/15 dark:bg-navy-700 dark:text-slate-200 dark:hover:border-blue-dark dark:hover:text-blue-dark"
              >
                <Icon className="h-3.25 w-3.25 stroke-2" />
                {link.label}
              </a>
            );
          })}
        </div>
      </div>
    </PageSection>
  );
}

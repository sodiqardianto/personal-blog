import {
  GitHubIcon,
  InstagramIcon,
  LinkedInIcon,
  MailIcon,
} from "@/shared/ui";
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
    <section id="contact" className="border-t border-line py-24">
      <div className="mx-auto max-w-6xl px-6 md:px-8">
        <div className="terminal-card sr mx-auto max-w-3xl">
          <div className="terminal-bar">
            <span className="terminal-dot bg-[#FF5F57]" />
            <span className="terminal-dot bg-[#FEBC2E]" />
            <span className="terminal-dot bg-[#28C840]" />
            <span className="ml-2 font-mono text-xs text-soft">contact.ts</span>
          </div>
          <div className="p-8 md:p-10">
            <p className="eyebrow mb-3">contact</p>
            <h2 className="mb-7 font-display text-3xl font-semibold tracking-tight md:text-4xl">
              Let&apos;s talk
            </h2>
            <pre className="mb-6 font-mono text-[13px] leading-6"><span className="token-key">function</span>{" "}<span className="token-function">contact</span>{"(you) {\n  "}<span className="token-key">return</span>{" sodiq."}<span className="token-function">reply</span>{"(you);\n}"}</pre>
            <h3 className="font-display text-2xl font-semibold md:text-3xl">
              Got a product to build, improve, or scale?
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-soft md:text-base">
              I&apos;m open to software engineering opportunities, freelance
              collaborations, and technical product work where clean
              architecture, maintainable code, and thoughtful execution really
              matter. If that sounds like what you need, feel free to reach
              out.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              {contactLinks.map((link, index) => {
                const Icon = iconMap[link.icon];

                return (
                  <a
                    key={link.label}
                    href={link.href}
                    {...(link.external
                      ? { target: "_blank", rel: "noreferrer" }
                      : undefined)}
                    className={index === 0
                      ? "button-primary inline-flex gap-2 rounded-full px-6 py-3 font-mono text-sm"
                      : "button-ghost inline-flex gap-2 rounded-full px-5 py-3 font-mono text-sm"}
                  >
                    <Icon className="h-3.5 w-3.5 stroke-2" />
                    {link.label}
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

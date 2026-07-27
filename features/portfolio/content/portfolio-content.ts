import type {
  ContactLink,
  NavItem,
  SiteMetadata,
} from "@/features/portfolio/types";

export const siteMetadata: SiteMetadata = {
  author: "Sodiq Ardianto",
  location: "Indonesia",
  cvHref: "#",
};

export const navItems: NavItem[] = [
  { label: "About", href: "#about", sectionId: "about" },
  { label: "Work", href: "#work", sectionId: "work" },
  { label: "Blog", href: "#blog", sectionId: "blog" },
  { label: "Contact", href: "#contact", sectionId: "contact" },
];

export const stackItems = [
  "Laravel",
  "PHP",
  "Express",
  "Node.js",
  "React",
  "Next.js",
  "Flutter",
  "TypeScript",
  "Linux",
  "Docker",
  "MySQL",
  "PostgreSQL",
];

export const currentFocus = [
  "Scalable web systems",
  "Clean architecture",
  "Developer workflows",
  "Continuous learning",
];

export const contactLinks: ContactLink[] = [
  {
    label: "Email",
    href: "mailto:gmail@sodiqardianto.com",
    icon: "mail",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/sodiqardianto/",
    icon: "linkedin",
    external: true,
  },
  {
    label: "GitHub",
    href: "https://github.com/sodiqardianto",
    icon: "github",
    external: true,
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/sodiqardianto/",
    icon: "instagram",
    external: true,
  },
];

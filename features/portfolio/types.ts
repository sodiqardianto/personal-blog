export type ThemeMode = "light" | "system" | "dark";

export type NavItem = {
  label: string;
  href: `#${string}`;
  sectionId: string;
};

export type ProjectAccent = "indigo" | "sky" | "violet" | "blue";

export type GalleryItem = {
  caption: string;
  imageSrc?: string;
  alt?: string;
};

export type Project = {
  id: number;
  number: string;
  slug: string;
  accent: ProjectAccent;
  tags: string[];
  title: string;
  summary: string;
  year: string;
  role: string;
  client: string;
  liveUrl?: string;
  hero: {
    placeholder: string;
    imageSrc?: string;
    alt?: string;
  };
  overview: string[];
  gallery: GalleryItem[];
};

export type TextRun =
  | { type: "text"; value: string }
  | { type: "code"; value: string }
  | { type: "strong"; value: string }
  | { type: "emphasis"; value: string };

export type PostBlock =
  | { type: "paragraph"; content: TextRun[] }
  | { type: "heading"; value: string }
  | { type: "quote"; value: string }
  | { type: "list"; items: string[] }
  | { type: "codeBlock"; value: string; language?: string };

export type Post = {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  date: {
    day: string;
    month: string;
    year: string;
  };
  readingTime: string;
  tags: string[];
  body: PostBlock[];
};

export type ContactLink = {
  label: string;
  href: string;
  icon: "mail" | "linkedin" | "github" | "instagram";
  external?: boolean;
};

export type SiteMetadata = {
  author: string;
  location: string;
  cvHref: string;
};

import type {
  ContactLink,
  NavItem,
  Post,
  Project,
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

export const projects: Project[] = [
  {
    id: 1,
    number: "01",
    slug: "document-management-system-ypii",
    accent: "indigo",
    tags: ["Laravel 12", "React", "Inertia.js", "TypeScript"],
    title: "Document Management System — YPII",
    summary:
      "A document management platform built for YPII to centralise archival workflows, multi-level approvals, access control, and reporting across several document modules.",
    year: "2025",
    role: "Full-stack Engineer",
    client: "YPII",
    hero: {
      placeholder: "D",
      imageSrc: "/images/projects/document-management-system/dashboard.png",
      alt: "Dashboard overview of the Document Management System for YPII",
    },
    overview: [
      "This project was built for Yayasan Pendidikan Islam Ibuku (YPII) to replace scattered document handling with a single system for archiving, approval flows, and role-based access. The scope covered document management for general, special, daily, and audit-related records, along with the supporting master data, reporting, and user administration needed to run it properly.",
      "One of the main challenges was translating operational rules into software that still felt straightforward to use. Documents move across layered approvals, visibility depends on roles and groups, and every important action needs to be traceable. I worked on the system with Laravel 12, React, Inertia.js, and TypeScript so the backend rules and frontend workflows could stay closely aligned.",
      "The result is an admin-focused application where teams can upload, review, preview, publish, monitor, and report on documents in one place. It also includes activity logging, approval interfaces, and reporting views that make day-to-day document operations feel much more organised and reliable.",
    ],
    gallery: [
      {
        caption: "Dashboard overview",
        imageSrc: "/images/projects/document-management-system/dashboard.png",
        alt: "Main dashboard of the YPII document management system",
      },
      {
        caption: "Dokumen umum index",
        imageSrc: "/images/projects/document-management-system/dokumen-umum.png",
        alt: "General documents index in the YPII document management system",
      },
      {
        caption: "Published document view",
        imageSrc:
          "/images/projects/document-management-system/dokumen-umum-published.png",
        alt: "Published documents screen in the YPII document management system",
      },
      {
        caption: "Approval modal flow",
        imageSrc:
          "/images/projects/document-management-system/dokumen-umum-approval-modal.png",
        alt: "Approval modal for general documents in the YPII document management system",
      },
      {
        caption: "Activity log",
        imageSrc: "/images/projects/document-management-system/activity-log.png",
        alt: "Activity log screen showing traceable user actions in the YPII document management system",
      },
      {
        caption: "Reporting module",
        imageSrc: "/images/projects/document-management-system/laporan.png",
        alt: "Reporting screen in the YPII document management system",
      },
    ],
  },
  {
    id: 2,
    number: "02",
    slug: "procurement-and-inventory-system-ypii",
    accent: "sky",
    tags: ["Laravel 11", "Blade", "Tailwind CSS", "MySQL"],
    title: "Procurement & Inventory System — YPII",
    summary:
      "A web-based internal system for handling procurement requests, procurement tracking, inventory records, disposal workflows, and operational audit logs in one place.",
    year: "2025",
    role: "Full-stack Engineer",
    client: "YPII",
    hero: {
      placeholder: "P",
      imageSrc: "/images/projects/procurement-inventory/dashboard.png",
      alt: "Dashboard overview of the Procurement and Inventory System for YPII",
    },
    overview: [
      "This project was built to help Yayasan Pendidikan Islam Ibuku (YPII) manage the flow from procurement planning into operational inventory management. Instead of treating procurement requests, purchasing progress, and asset records as separate processes, the system brings them together into one admin application with clearer visibility for each stage.",
      "The application covers procurement submission, approval tracking, purchasing progress, inventory registration, disposal requests, and activity logs. It also applies role-based access so each user only sees the units and actions that match their responsibilities.",
      "I worked on the project as a full-stack engineer using Laravel 11, Blade, Tailwind CSS, and MySQL. A big part of the work was keeping the CRUD-heavy flows maintainable while still reflecting the business rules around approvals, unit access, and inventory lifecycle management.",
    ],
    gallery: [
      {
        caption: "Dashboard overview",
        imageSrc: "/images/projects/procurement-inventory/dashboard.png",
        alt: "Dashboard of the procurement and inventory system for YPII",
      },
      {
        caption: "Pengajuan RAB",
        imageSrc: "/images/projects/procurement-inventory/pengajuan-rab.png",
        alt: "Procurement request table in the procurement and inventory system for YPII",
      },
      {
        caption: "Pengadaan tracking",
        imageSrc: "/images/projects/procurement-inventory/pengadaan.png",
        alt: "Procurement tracking table in the procurement and inventory system for YPII",
      },
      {
        caption: "Inventaris management",
        imageSrc: "/images/projects/procurement-inventory/inventaris.png",
        alt: "Inventory management table in the procurement and inventory system for YPII",
      },
      {
        caption: "Activity log",
        imageSrc: "/images/projects/procurement-inventory/activity-log.png",
        alt: "Activity log screen in the procurement and inventory system for YPII",
      },
    ],
  },
];

export const posts: Post[] = [
  {
    id: 1,
    slug: "shipping-features-safely-in-nextjs",
    title: "Shipping features safely in Next.js",
    excerpt:
      "A few practical rules I use to keep feature work fast without turning a Next.js codebase into something fragile.",
    date: { day: "12", month: "Mar", year: "2026" },
    readingTime: "5 min read",
    tags: ["Next.js", "Engineering"],
    body: [
      {
        type: "paragraph",
        content: [
          {
            type: "text",
            value:
              "Shipping quickly is important, but I have learned that speed only helps if the code stays understandable after the feature is merged. In Next.js projects, I try to keep routing, data access, and UI boundaries obvious from the start.",
          },
        ],
      },
      { type: "heading", value: "Keep the boundaries obvious" },
      {
        type: "paragraph",
        content: [
          {
            type: "text",
            value:
              "Pages should explain the route, components should explain the UI, and data helpers should explain the source of truth. When those responsibilities stay separate, refactors become much less risky.",
          },
        ],
      },
      {
        type: "quote",
        value:
          "Fast delivery feels much better when the next engineer can still follow the code on the first read.",
      },
      { type: "heading", value: "Make risk visible early" },
      {
        type: "paragraph",
        content: [
          {
            type: "text",
            value:
              "I prefer adding small verification steps while building: check empty states, confirm loading behavior, and make sure interactive components only own the client-side logic they truly need.",
          },
        ],
      },
      { type: "heading", value: "The takeaway" },
      {
        type: "paragraph",
        content: [
          { type: "code", value: "bun run build" },
          {
            type: "text",
            value:
              " should be boring. If a feature adds uncertainty, I try to reduce that before calling it done.",
          },
        ],
      },
      {
        type: "list",
        items: [
          "Keep server and client responsibilities explicit.",
          "Prefer small reusable components over giant route files.",
          "Build with verification in mind, not only with delivery speed in mind.",
        ],
      },
    ],
  },
  {
    id: 2,
    slug: "what-i-look-for-when-designing-backend-apis",
    title: "What I look for when designing backend APIs",
    excerpt:
      "A good API does more than return data. It reduces confusion for the people who need to build on top of it.",
    date: { day: "01", month: "Mar", year: "2026" },
    readingTime: "4 min read",
    tags: ["Backend", "API Design"],
    body: [
      {
        type: "paragraph",
        content: [
          {
            type: "text",
            value:
              "When I work on backend APIs, I optimize for predictability first. A consumer should be able to guess how an endpoint behaves before reading too much documentation.",
          },
        ],
      },
      { type: "heading", value: "Consistency matters more than cleverness" },
      {
        type: "paragraph",
        content: [
          {
            type: "text",
            value:
              "Naming, pagination, status codes, and error structures should feel consistent across the system. That consistency is what makes an API easy to consume in the long run.",
          },
        ],
      },
      {
        type: "quote",
        value:
          "An API becomes expensive the moment every integration has to remember a special case.",
      },
      { type: "heading", value: "Error handling is part of the product" },
      {
        type: "paragraph",
        content: [
          {
            type: "text",
            value:
              "Clear errors save engineering time. They make debugging faster, reduce support loops, and help frontend teams recover gracefully when something goes wrong.",
          },
        ],
      },
      { type: "heading", value: "A small checklist" },
      {
        type: "paragraph",
        content: [
          {
            type: "text",
            value:
              "Before finalizing an endpoint, I usually check whether it is easy to name, easy to document, and easy to reason about when it fails.",
          },
        ],
      },
    ],
  },
  {
    id: 3,
    slug: "making-dashboard-performance-feel-instant",
    title: "Making dashboard performance feel instant",
    excerpt:
      "Perceived performance often matters just as much as raw speed, especially for internal dashboards used all day long.",
    date: { day: "19", month: "Feb", year: "2026" },
    readingTime: "6 min read",
    tags: ["Performance", "Frontend"],
    body: [
      {
        type: "paragraph",
        content: [
          {
            type: "text",
            value:
              "Users notice slow dashboards immediately, but they also notice unclear loading states, layout jumps, and interactions that make them second-guess whether something worked.",
          },
        ],
      },
      { type: "heading", value: "Clarity first, then optimization" },
      {
        type: "paragraph",
        content: [
          {
            type: "text",
            value:
              "I try to start with stable skeleton states, clear empty states, and predictable filters. That alone improves how fast a product feels before deeper optimization work begins.",
          },
        ],
      },
      { type: "heading", value: "Reduce unnecessary work" },
      {
        type: "paragraph",
        content: [
          {
            type: "text",
            value:
              "On the technical side, I usually look at over-fetching, expensive re-renders, and components doing too much at once. Cleaning those up often improves both performance and readability.",
          },
        ],
      },
      {
        type: "quote",
        value:
          "Good performance is often a series of small decisions that remove friction one layer at a time.",
      },
      { type: "heading", value: "The outcome" },
      {
        type: "paragraph",
        content: [
          {
            type: "text",
            value:
              "The best dashboard experiences feel direct. Data appears where users expect it, interactions stay responsive, and the interface explains what is happening without making users wait in confusion.",
          },
        ],
      },
    ],
  },
  {
    id: 4,
    slug: "practical-notes-on-typescript-in-teams",
    title: "Practical notes on TypeScript in teams",
    excerpt:
      "TypeScript helps the most when it makes collaboration safer, not when it turns every file into a puzzle.",
    date: { day: "05", month: "Feb", year: "2026" },
    readingTime: "6 min read",
    tags: ["TypeScript", "Team Workflow"],
    body: [
      {
        type: "paragraph",
        content: [
          {
            type: "text",
            value:
              "I like TypeScript most when it supports teamwork: clearer contracts, safer refactors, and fewer assumptions between backend and frontend code.",
          },
        ],
      },
      { type: "heading", value: "Prefer simple types over impressive ones" },
      {
        type: "paragraph",
        content: [
          {
            type: "text",
            value:
              "Complex type systems can be powerful, but they can also slow a team down. I usually prefer types that are boring, explicit, and easy to reuse across modules.",
          },
        ],
      },
      {
        type: "quote",
        value:
          "A type definition is most useful when another engineer can understand it quickly.",
      },
      { type: "heading", value: "Shared contracts are the biggest win" },
      {
        type: "paragraph",
        content: [
          {
            type: "text",
            value:
              "The strongest TypeScript benefit in team environments is shared confidence. When route params, API payloads, and component props align cleanly, the entire codebase becomes easier to change.",
          },
        ],
      },
      { type: "heading", value: "What I try to avoid" },
      {
        type: "paragraph",
        content: [
          {
            type: "text",
            value:
              "I try to avoid over-abstracted generic helpers, duplicated types, and patterns that look smart but hide intent. Good TypeScript should reduce ambiguity, not increase it.",
          },
        ],
      },
    ],
  },
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

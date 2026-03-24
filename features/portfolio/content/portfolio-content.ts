import type {
  ContactLink,
  NavItem,
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

export const dashboardQuickActions = [
  {
    title: "Manage thoughts & notes",
    description:
      "Review post content, slugs, SEO fields, and publishing state from one place.",
    href: "/dashboard/thoughts-notes",
  },
  {
    title: "Manage projects",
    description:
      "Keep project summaries, galleries, and supporting metadata tidy as the portfolio grows.",
    href: "/dashboard/projects",
  },
] as const;

export const dashboardRecentProjects = [
  {
    title: "Document Management System — YPII",
    status: "Live",
    updatedAt: "12 Mar 2026",
  },
  {
    title: "Procurement & Inventory System — YPII",
    status: "Live",
    updatedAt: "18 Mar 2026",
  },
] as const;

export const dashboardActivity = [
  "Prepared the admin workspace around just two resources: thoughts & notes and projects.",
  "Aligned Google login so the frontend handles sign-in and the backend keeps the session in an httpOnly cookie.",
  "Connected public notes to the backend API while keeping the current reading flow intact.",
] as const;

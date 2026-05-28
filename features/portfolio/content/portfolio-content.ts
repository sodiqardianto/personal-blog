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
  {
    id: 3,
    number: "03",
    slug: "sip-universitas-paramadina",
    accent: "blue",
    tags: ["Next.js", "Laravel", "TypeScript", "Tailwind CSS", "Next Auth", "MySQL"],
    title: "System Information Paramadina — Universitas Paramadina",
    summary:
      "A web application for managing student academic and financial data at Universitas Paramadina, featuring payment tracking, re-registration workflows, and role-based access for staff and students.",
    year: "2024",
    role: "Full-stack Engineer",
    client: "Universitas Paramadina",
    hero: {
      placeholder: "S",
      imageSrc: "/images/projects/sip-universitas-paramadina/referensi-akademik.jpg",
      alt: "SIP academic reference management interface for Universitas Paramadina showing period configuration and academic data tables",
    },
    overview: [
      "Universitas Paramadina needed a centralised system to manage student academic and financial data across multiple departments. The existing manual processes for handling student payments, re-registration, and academic references were prone to delays and data inconsistencies. SIP was built to digitise these workflows, providing a single source of truth for student records, payment tracking, and academic administration.",
      "The application uses a Laravel REST API backend connected to a Next.js frontend, with Next Auth handling secure authentication via Google G Suite integration. Role-based access control ensures that lecturers, administrative staff, and students each see only the data and functions relevant to their responsibilities. Key modules include academic period management, tuition fee configuration, billing and payment processing, and student record reporting.",
      "Built with TypeScript throughout the frontend for type safety and maintainability, and Tailwind CSS for responsive UI development. The Laravel backend exposes a clean RESTful API that handles business logic, data validation, and database operations via MySQL. The system is designed for reliability and ease of use by non-technical administrative staff.",
    ],
    gallery: [
      {
        caption: "Academic reference management — configure academic periods and track student enrollment status",
        imageSrc: "/images/projects/sip-universitas-paramadina/referensi-akademik.jpg",
        alt: "SIP academic reference page showing Jenis Periode table with academic period codes, year periods, and active/inactive status for Universitas Paramadina",
      },
      {
        caption: "Login portal — secure authentication via Google G Suite for Paramadina staff and students",
        imageSrc: "/images/projects/sip-universitas-paramadina/login-page.jpg",
        alt: "SIP login page for Universitas Paramadina Information System with Google G Suite sign-in option",
      },
    ],
  },
  {
    id: 4,
    number: "04",
    slug: "movieman",
    accent: "violet",
    tags: ["React", "Redux Toolkit", "React Router", "Tailwind CSS", "Vite"],
    title: "Movieman — Movie & TV Discovery",
    summary:
      "A movie and TV show discovery app that lets users explore trending, popular, and top-rated content with search, infinite scroll, and detailed information pages.",
    year: "2024",
    role: "Frontend Engineer",
    client: "Personal Project",
    liveUrl: "https://movieman-git-main-sodiqardiantos-projects.vercel.app/",
    hero: {
      placeholder: "M",
      imageSrc: "/images/projects/movieman/explore-movies.png",
      alt: "Movieman movie discovery app explore page showing movie grid with genre filters",
    },
    overview: [
      "Movieman is a personal project built to explore React patterns at scale — specifically state management with Redux Toolkit, routing with React Router, and performance optimisation with lazy loading and infinite scroll. The app connects to a movie database API to fetch trending, popular, and top-rated content, then presents it in a clean, dark-themed interface.",
      "Key features include an infinite-scroll carousel for trending content, a search function across movies and TV shows, detailed content pages with metadata like ratings, genres, and release information, and a responsive layout that works across devices. Lazy loading images and components keep the experience smooth even with many items on screen.",
      "This project served as a practical exercise in building a data-heavy frontend with React, managing complex state slices with Redux Toolkit, and optimising render performance with techniques like lazy loading and memoisation.",
    ],
    gallery: [
      {
        caption: "Explore page with genre filter and movie grid",
        imageSrc: "/images/projects/movieman/explore-movies.png",
        alt: "Movieman explore page with genre dropdown, sort options, and movie poster grid",
      },
      {
        caption: "Trending & What's Popular sections",
        imageSrc: "/images/projects/movieman/trending-popular.png",
        alt: "Movieman home page showing trending movies and what's popular sections with movie posters",
      },
      {
        caption: "Movie detail page — Mortal Kombat II",
        imageSrc: "/images/projects/movieman/mk2-detail.png",
        alt: "Movieman movie detail page showing Mortal Kombat II with cast, ratings, and overview",
      },
      {
        caption: "Explore page with trending carousel",
        imageSrc: "/images/projects/movieman/explore.png",
        alt: "Movieman explore page showing trending movies carousel with day/week toggle",
      },
    ],
  },
  {
    id: 5,
    number: "05",
    slug: "fullstack-laravel-vuejs-course",
    accent: "violet",
    tags: ["PHP", "Laravel", "Vue.js", "MySQL", "HTML", "CSS"],
    title: "Fullstack Developer — PHP Laravel & Vue.js",
    summary:
      "An online course covering fullstack web development with PHP Laravel and Vue.js, building a complete e-commerce application from scratch.",
    year: "2024",
    role: "Self-paced Learner",
    client: "Online Course",
    hero: {
      placeholder: "F",
      imageSrc: "/images/projects/fullstack-laravel-vuejs-course/shayna-ecommerce.jpg",
      alt: "Shayna e-commerce website built with Laravel and Vue.js featuring product catalog, shopping cart, and Black Friday promotional banner",
    },
    overview: [
      "After building a solid foundation in backend development with PHP, I enrolled in an online fullstack course to bridge the gap between backend and frontend engineering. The course focused on the Laravel PHP framework for server-side logic and Vue.js for building reactive, interactive user interfaces — a stack widely used in production environments for its balance of robustness and developer experience.",
      "Throughout the course, I built a complete e-commerce application from the ground up. This included product catalog management, shopping cart functionality, user authentication and authorization, order processing, and payment integration. The project covered both the admin panel for managing products and the customer-facing storefront with dynamic product filtering and search.",
      "The course reinforced the importance of clean code architecture, RESTful API design, and responsive frontend implementation. I gained hands-on experience with Laravel's Eloquent ORM, Blade templating engine, Vue.js component-based architecture, and integration of third-party libraries such as Owl Carousel for interactive product carousels.",
    ],
    gallery: [
      {
        caption: "Shayna e-commerce storefront — product catalog with dynamic filtering and promotional banners",
        imageSrc: "/images/projects/fullstack-laravel-vuejs-course/shayna-ecommerce.jpg",
        alt: "Shayna e-commerce website homepage showing product catalog with Black Friday promotional section and Owl Carousel product sliders",
      },
      {
        caption: "Product catalog — multi-brand product grid with lifestyle images and brand showcase section",
        imageSrc: "/images/projects/fullstack-laravel-vuejs-course/product-catalog-lifestyle.jpg",
        alt: "Shayna product catalog page showing multi-brand product grid with lifestyle photos and brand logos including banToni, vCorp, Alitume, zukata, and vicinck",
      },
    ],
  },
  {
    id: 6,
    number: "06",
    slug: "easyform-engineering",
    accent: "indigo",
    tags: ["PHP", "Laravel", "MySQL", "JavaScript", "HTML", "CSS"],
    title: "EasyForm Engineering — PT. Petra Sejahtera Abadi",
    summary:
      "A paperless engineering form management platform that streamlines machine condition checks and maintenance reporting across multiple facility locations.",
    year: "2023",
    role: "Full-stack Engineer",
    client: "PT. Petra Sejahtera Abadi",
    hero: {
      placeholder: "E",
      imageSrc: "/images/projects/easyform-list-form.jpg",
      alt: "EasyForm Engineering dashboard showing list of maintenance forms with machine codes, equipment names, and location data for PT. Petra Sejahtera Abadi facilities",
    },
    overview: [
      "PT. Petra Sejahtera Abadi operates multiple production facilities across Serpong where engineering teams perform routine machine condition checks using paper-based forms. Tracking which machines had been inspected, by whom, and when became increasingly difficult as the operation scaled. EasyForm Engineering replaced the paper-driven process with a centralised digital form management system, enabling engineers to complete and submit condition reports from any device connected to the facility network.",
      "The platform handles the full lifecycle of engineering forms — from master data setup (machines, locations, lanes, check points, and standard inspection criteria) to daily form submissions and reporting. Each form is linked to a specific machine, assigned a unique code, and tracked by location. Supervisors and maintenance managers can review submission status, inspect historical data, and generate reports without chasing paper records. Role-based access control ensures that only authorised personnel can approve or modify critical inspection standards.",
      "Built on PHP with the Laravel framework and MySQL, the system prioritises reliability in a manufacturing environment where downtime is costly and data accuracy is non-negotiable. The interface is deliberately clean and task-focused — minimal navigation depth, clear form layouts, and straightforward action patterns designed for engineers who need to complete inspections quickly without getting lost in software complexity.",
    ],
    gallery: [
      {
        caption: "Form management — machine condition check forms by location",
        imageSrc: "/images/projects/easyform-list-form.jpg",
        alt: "List Form page showing engineering check forms for equipment including Automatic Gas Steamer, Sausage Cutter, Stuffer Helper, Bun Sealer, and Automatic Tray Aligning Machine across PT. Petra Sejahtera Abadi Serpong locations",
      },
      {
        caption: "Machine report list — pull and track maintenance reports by machine and location",
        imageSrc: "/images/projects/easyform-list-laporan.jpg",
        alt: "List Laporan page showing machine report cards with machine IDs, equipment names, models, lanes, and locations for PT. Petra Sejahtera Abadi production facilities",
      },
    ],
  },
  {
    id: 7,
    number: "07",
    slug: "hr-recruitment-pt-petra-sejahtera-abadi",
    accent: "blue",
    tags: ["PHP", "CodeIgniter 3", "MySQL", "JavaScript", "HTML", "CSS"],
    title: "HR Recruitment & Assessment Platform — PT. Petra Sejahtera Abadi",
    summary:
      "A comprehensive recruitment management system that handles the full applicant lifecycle — from registration, psychometric testing, to final interview decisions — all in one centralised platform.",
    year: "2023",
    role: "Full-stack Engineer",
    client: "PT. Petra Sejahtera Abadi",
    hero: {
      placeholder: "H",
      imageSrc: "/images/projects/hr-recruitment-dashboard.jpg",
      alt: "HR Recruitment dashboard showing applicant metrics and test completion rates for PT. Petra Sejahtera Abadi",
    },
    overview: [
      "PT. Petra Sejahtera Abadi needed a centralised system to manage the entire recruitment pipeline — from initial applicant registration through psychological assessments and structured interviews. What started as a tool for tracking test results grew into a fully-featured HR platform that handles multiple assessment types, interviewer assignments, and outcome reporting across 8 operational areas.",
      "The system supports five distinct psychometric instruments: IQ tests, DISC profiling, Papikostick assessments, Mathematics tests, and Elimination tests. Each module records completion status, scores, and results, giving the HR team real-time visibility into how each applicant is progressing through the pipeline. The Master Interview module enables structured interview scheduling, interviewer assignment, and detailed outcome recording with recommendation statuses.",
      "Built on PHP with CodeIgniter 3 and MySQL, the platform prioritises reliability and ease of use for non-technical HR staff. The interface was designed to minimise training time — clear navigation, breadcrumb trails, and consistent action patterns across every module. Version 2.1 reflects a mature, stable product that has processed thousands of applicant records across multiple operational areas.",
    ],
    gallery: [
      {
        caption: "Dashboard overview with key recruitment metrics",
        imageSrc: "/images/projects/hr-recruitment-dashboard.jpg",
        alt: "HR Recruitment dashboard showing 31 registered users, 8 areas, and test completion counts across IQ, DISC, Papikostick, Mathematics, and Elimination tests for PT. Petra Sejahtera Abadi",
      },
      {
        caption: "Interview results management module",
        imageSrc: "/images/projects/hr-recruitment-hasil-interview.jpg",
        alt: "Hasil Interview page showing applicant interview results with status tracking, interviewer assignment, and date filtering for PT. Petra Sejahtera Abadi",
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

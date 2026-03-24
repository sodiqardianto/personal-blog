"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { adminNavItems } from "@/features/admin/content/admin-nav";

export function AdminNav() {
  const pathname = usePathname();

  return (
    <nav className="flex flex-wrap gap-2">
      {adminNavItems.map((item) => {
        const active =
          pathname === item.href ||
          (item.href !== "/dashboard" && pathname.startsWith(item.href));

        return (
          <Link
            key={item.href}
            href={item.href}
            className={`inline-flex rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              active
                ? "bg-blue text-white dark:bg-blue-dark"
                : "border border-blue/10 text-ink/55 hover:border-blue/18 hover:text-blue dark:border-blue-dark/12 dark:text-slate-400 dark:hover:border-blue-dark/20 dark:hover:text-blue-dark"
            }`}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}

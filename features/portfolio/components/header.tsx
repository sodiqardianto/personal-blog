"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ThemeCycleButton } from "@/shared/ui";
import type { NavItem } from "@/features/portfolio/types";
import { cn } from "@/lib/utils";

type HeaderProps = {
  navItems: NavItem[];
};

export function Header({ navItems }: HeaderProps) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("hero");

  useEffect(() => {
    const revealTargets = document.querySelectorAll<HTMLElement>(".sr");

    if (!("IntersectionObserver" in window)) {
      revealTargets.forEach((element) => element.classList.add("on"));
      return;
    }

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("on");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.06,
        rootMargin: "0px 0px -20px 0px",
      },
    );

    revealTargets.forEach((element) => revealObserver.observe(element));

    return () => revealObserver.disconnect();
  }, [pathname]);

  useEffect(() => {
    const sectionIds = ["hero", ...navItems.map((item) => item.sectionId)];
    const sections = sectionIds
      .map((sectionId) => document.getElementById(sectionId))
      .filter((element): element is HTMLElement => element !== null);

    if (sections.length === 0) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (entryA, entryB) =>
              entryB.intersectionRatio - entryA.intersectionRatio,
          )[0];

        if (visibleEntry) {
          setActiveSection(visibleEntry.target.id);
        }
      },
      {
        threshold: [0.2, 0.4, 0.65],
        rootMargin: "-88px 0px -45% 0px",
      },
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, [navItems, pathname]);

  useEffect(() => {
    const closeMenuOnDesktop = () => {
      if (window.innerWidth >= 768) {
        setMobileOpen(false);
      }
    };

    window.addEventListener("resize", closeMenuOnDesktop);

    return () => window.removeEventListener("resize", closeMenuOnDesktop);
  }, []);

  return (
    <>
      <nav
        id="site-header"
        className="fixed top-0 left-0 right-0 z-200 flex h-15 items-center justify-between border-b border-blue/10 bg-slate-50/85 px-[clamp(1.25rem,5vw,3.5rem)] backdrop-blur-lg transition-colors duration-300 dark:border-blue-dark/10 dark:bg-navy-900/90"
      >
        <Link
          href="/"
          className="font-serif text-[1.15rem] tracking-tight text-ink no-underline dark:text-slate-200"
          onClick={() => setMobileOpen(false)}
        >
          Sodiq<span className="text-blue dark:text-blue-dark">.</span>
        </Link>

        <div className="flex items-center gap-1">
          <div className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => (
              <Link
                key={item.sectionId}
                href={pathname === "/" ? item.href : `/${item.href}`}
                className={cn(
                  "nl block rounded-lg px-3 py-1.5 text-sm text-ink/60 transition-all hover:bg-blue/6 hover:text-ink dark:text-slate-400 dark:hover:text-slate-200",
                  pathname === "/" &&
                    activeSection === item.sectionId &&
                    "font-medium text-blue dark:text-blue-dark",
                )}
              >
                {item.label}
              </Link>
            ))}
          </div>

          <ThemeCycleButton className="ml-3" />

          <button
            type="button"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((currentValue) => !currentValue)}
            className="ml-2 flex cursor-pointer flex-col gap-1.25 bg-transparent p-1 md:hidden"
          >
            <span
              className={cn(
                "block h-0.5 w-5.5 rounded-sm bg-ink transition-all dark:bg-slate-200",
                mobileOpen && "translate-y-1.75 rotate-45",
              )}
            />
            <span
              className={cn(
                "block h-0.5 w-5.5 rounded-sm bg-ink transition-all dark:bg-slate-200",
                mobileOpen && "opacity-0",
              )}
            />
            <span
              className={cn(
                "block h-0.5 w-5.5 rounded-sm bg-ink transition-all dark:bg-slate-200",
                mobileOpen && "-translate-y-1.75 -rotate-45",
              )}
            />
          </button>
        </div>
      </nav>

      <div
        id="site-mobile-menu"
        className={cn(
          "fixed top-15 left-0 right-0 z-199 flex-col gap-0.5 border-b border-blue/10 bg-slate-50/90 px-[clamp(1.25rem,5vw,3.5rem)] py-3 backdrop-blur-lg dark:border-blue-dark/10 dark:bg-navy-900/94",
          mobileOpen ? "flex animate-slide-down md:hidden" : "hidden md:hidden",
        )}
      >
        <nav className="flex flex-col gap-1">
          {navItems.map((item) => (
            <Link
              key={item.sectionId}
              href={pathname === "/" ? item.href : `/${item.href}`}
              onClick={() => setMobileOpen(false)}
              className={cn(
                "rounded-lg px-2 py-2.5 text-[0.95rem] text-ink/60 transition-all hover:bg-blue/6 hover:text-ink dark:text-slate-400 dark:hover:text-slate-200",
                pathname === "/" &&
                  activeSection === item.sectionId &&
                  "font-medium text-blue dark:text-blue-dark",
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
}

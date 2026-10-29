"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { CloseIcon, MenuIcon, ThemeSwitcher } from "@/shared/ui";
import type { NavItem } from "@/features/portfolio/types";
import { cn } from "@/lib/utils";
import {
  buttonStyles,
  iconButtonStyles,
  navLinkStyles,
} from "@/shared/lib/styles";

type HeaderProps = {
  navItems: NavItem[];
};

function getSectionFromPathname(pathname: string) {
  if (pathname.startsWith("/blog")) return "blog";
  if (pathname.startsWith("/projects")) return "work";

  return null;
}

export function Header({ navItems }: HeaderProps) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(() =>
    getSectionFromPathname(pathname),
  );

  useEffect(() => {
    const syncActiveSection = () => {
      const hashSection = window.location.hash.slice(1);
      const hasMatchingHash = navItems.some(
        (item) => item.sectionId === hashSection,
      );

      setActiveSection(
        pathname === "/" && hasMatchingHash
          ? hashSection
          : getSectionFromPathname(pathname),
      );
    };

    syncActiveSection();
    window.addEventListener("hashchange", syncActiveSection);

    return () => window.removeEventListener("hashchange", syncActiveSection);
  }, [navItems, pathname]);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 8);
    const frameId = requestAnimationFrame(onScroll);
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    const revealTargets = document.querySelectorAll<HTMLElement>(".sr");

    if (!("IntersectionObserver" in window)) {
      revealTargets.forEach((element) => element.classList.add("on"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("on");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 },
    );

    revealTargets.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [pathname]);

  useEffect(() => {
    const closeMenuOnDesktop = () => {
      if (window.innerWidth >= 768) setMobileOpen(false);
    };

    window.addEventListener("resize", closeMenuOnDesktop);
    return () => window.removeEventListener("resize", closeMenuOnDesktop);
  }, []);

  const sectionHref = (item: NavItem) =>
    pathname === "/" ? item.href : `/${item.href}`;

  return (
    <header
      id="site-header"
      className={cn(
        "fixed inset-x-0 top-0 z-50 w-full max-w-[100vw] overflow-x-clip border-b bg-paper/78 backdrop-blur-[10px] transition-[border-color,box-shadow] duration-300",
        isScrolled
          ? "border-line shadow-[0_8px_24px_-20px_rgba(0,0,0,0.4)]"
          : "border-transparent",
      )}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6 md:px-8">
        <Link
          href={pathname === "/" ? "#top" : "/#top"}
          onClick={() => setMobileOpen(false)}
          className="font-display text-lg font-semibold tracking-tight"
        >
          sodiqardianto
        </Link>

        <nav
          aria-label="Primary navigation"
          className="hidden items-center gap-8 font-mono text-sm md:flex"
        >
          {navItems.map((item) => {
            const isActive = activeSection === item.sectionId;

            return (
              <Link
                key={item.sectionId}
                href={sectionHref(item)}
                aria-current={isActive ? "location" : undefined}
                className={cn(navLinkStyles, "lowercase")}
                onClick={() => setActiveSection(item.sectionId)}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href={pathname === "/" ? "#contact" : "/#contact"}
            className={cn(
              buttonStyles.primary,
              "hidden rounded-full px-4 py-2 font-mono text-sm sm:inline-flex",
            )}
          >
            say hi
          </Link>
          <ThemeSwitcher />
          <button
            type="button"
            onClick={() => setMobileOpen((open) => !open)}
            className={cn(iconButtonStyles, "hidden max-md:flex")}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? (
              <CloseIcon className="h-4 w-4 stroke-2" />
            ) : (
              <MenuIcon className="h-4 w-4 stroke-2" />
            )}
          </button>
        </div>
      </div>

      <div
        id="site-mobile-menu"
        className={cn(
          "absolute inset-x-0 top-full w-full max-w-[100vw] overflow-x-clip border-b border-line bg-paper px-6 py-4 transition-[opacity,translate,visibility] ease-out-strong md:hidden",
          mobileOpen
            ? "duration-200"
            : "pointer-events-none invisible -translate-y-2 opacity-0 duration-150",
        )}
      >
        <nav
          aria-label="Mobile navigation"
          className="flex flex-col gap-4 font-mono text-sm"
        >
          {navItems.map((item) => {
            const isActive = activeSection === item.sectionId;

            return (
              <Link
                key={item.sectionId}
                href={sectionHref(item)}
                aria-current={isActive ? "location" : undefined}
                className={cn(navLinkStyles, "w-fit lowercase")}
                onClick={() => {
                  setActiveSection(item.sectionId);
                  setMobileOpen(false);
                }}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}

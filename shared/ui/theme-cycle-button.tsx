"use client";

import { useEffect, useSyncExternalStore } from "react";
import { MonitorIcon, MoonIcon, SunIcon } from "@/shared/ui/icons";
import type { ThemeMode } from "@/features/portfolio/types";
import {
  applyThemeMode,
  getNextThemeMode,
  getServerThemeSnapshot,
  getThemeSnapshot,
  setThemeMode,
  subscribeToThemeStore,
} from "@/shared/lib/theme";

type ThemeCycleButtonProps = {
  className?: string;
};

const themeOptions: Record<
  ThemeMode,
  {
    label: string;
  }
> = {
  light: { label: "Light" },
  system: { label: "System" },
  dark: { label: "Dark" },
};

export function ThemeCycleButton({ className = "" }: ThemeCycleButtonProps) {
  const themeMode = useSyncExternalStore(
    subscribeToThemeStore,
    getThemeSnapshot,
    getServerThemeSnapshot,
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const syncTheme = () => applyThemeMode(themeMode);

    syncTheme();
    mediaQuery.addEventListener("change", syncTheme);

    return () => mediaQuery.removeEventListener("change", syncTheme);
  }, [themeMode]);

  const currentTheme = themeOptions[themeMode];
  const nextThemeMode = getNextThemeMode(themeMode);
  const nextTheme = themeOptions[nextThemeMode];

  return (
    <button
      type="button"
      data-theme-mode={themeMode}
      aria-label={`Cycle theme mode. Current ${currentTheme.label}, next ${nextTheme.label}.`}
      onClick={() => setThemeMode(nextThemeMode)}
      title={`Current: ${currentTheme.label}. Click for ${nextTheme.label}.`}
      className={`theme-cycle-btn inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-blue/10 bg-white/85 text-ink/65 shadow-sm backdrop-blur-sm transition-all hover:-translate-y-0.5 hover:border-blue/20 hover:bg-white dark:border-blue-dark/15 dark:bg-navy-800/88 dark:text-slate-300 dark:hover:border-blue-dark/30 dark:hover:bg-navy-700 ${className}`.trim()}
    >
      <span className="theme-cycle-orb" aria-hidden="true">
        <span className="theme-glyph theme-glyph-light">
          <SunIcon className="h-3.25 w-3.25 stroke-[2.2]" />
        </span>
        <span className="theme-glyph theme-glyph-system">
          <MonitorIcon className="h-3.25 w-3.25 stroke-[2.2]" />
        </span>
        <span className="theme-glyph theme-glyph-dark">
          <MoonIcon className="h-3.25 w-3.25 stroke-[2.2]" />
        </span>
      </span>
    </button>
  );
}

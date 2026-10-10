"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import { MonitorIcon, MoonIcon, SunIcon } from "@/shared/ui/icons";
import type { ThemeMode } from "@/features/portfolio/types";
import {
  applyThemeMode,
  getNextThemeMode,
  getServerThemeSnapshot,
  getThemeSnapshot,
  subscribeToThemeStore,
  transitionThemeMode,
} from "@/shared/lib/theme";

const themeOptions: Record<ThemeMode, { label: string; Icon: typeof SunIcon }> =
  {
    light: { label: "Light", Icon: SunIcon },
    dark: { label: "Dark", Icon: MoonIcon },
    system: { label: "System", Icon: MonitorIcon },
  };

export function ThemeSwitcher() {
  const themeMode = useSyncExternalStore(
    subscribeToThemeStore,
    getThemeSnapshot,
    getServerThemeSnapshot,
  );
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Follow the OS preference live while in "system" mode.
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const syncTheme = () => applyThemeMode(themeMode);

    syncTheme();
    mediaQuery.addEventListener("change", syncTheme);

    return () => mediaQuery.removeEventListener("change", syncTheme);
  }, [themeMode]);

  const cycleTheme = () => {
    const rect = buttonRef.current?.getBoundingClientRect();
    const origin = rect
      ? { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 }
      : { x: window.innerWidth / 2, y: 0 };

    transitionThemeMode(getNextThemeMode(themeMode), origin);
  };

  const { label, Icon } = themeOptions[themeMode];

  return (
    <button
      ref={buttonRef}
      type="button"
      onClick={cycleTheme}
      className="theme-toggle flex items-center justify-center"
      aria-label={`Color theme: ${label}. Click to change.`}
      title={`Theme: ${label}`}
    >
      <Icon key={themeMode} className="theme-icon h-4 w-4 stroke-2" />
    </button>
  );
}

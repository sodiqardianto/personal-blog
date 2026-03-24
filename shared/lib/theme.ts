import type { ThemeMode } from "@/features/portfolio/types";

const THEME_STORAGE_KEY = "theme";
const themeModes: ThemeMode[] = ["light", "system", "dark"];
const themeListeners = new Set<() => void>();

export const themeCycleOrder: ThemeMode[] = ["dark", "light", "system"];

export function isThemeMode(value: string | null): value is ThemeMode {
  return value !== null && themeModes.includes(value as ThemeMode);
}

export function subscribeToThemeStore(listener: () => void) {
  themeListeners.add(listener);

  return () => {
    themeListeners.delete(listener);
  };
}

function emitThemeStoreChange() {
  themeListeners.forEach((listener) => listener());
}

export function getThemeSnapshot(): ThemeMode {
  if (typeof window === "undefined") {
    return "light";
  }

  const storedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);
  return isThemeMode(storedTheme) ? storedTheme : "light";
}

export function getServerThemeSnapshot(): ThemeMode {
  return "light";
}

export function applyThemeMode(themeMode: ThemeMode) {
  if (typeof window === "undefined") {
    return;
  }

  const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
  const isDark =
    themeMode === "dark" || (themeMode === "system" && mediaQuery.matches);

  document.documentElement.classList.toggle("dark", isDark);
}

export function setThemeMode(mode: ThemeMode) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(THEME_STORAGE_KEY, mode);
  emitThemeStoreChange();
}

export function getNextThemeMode(currentMode: ThemeMode) {
  const currentIndex = themeCycleOrder.indexOf(currentMode);

  return themeCycleOrder[(currentIndex + 1) % themeCycleOrder.length] ?? "dark";
}

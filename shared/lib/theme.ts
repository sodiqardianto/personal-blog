import type { ThemeMode } from "@/features/portfolio/types";

const THEME_STORAGE_KEY = "theme";
const DEFAULT_THEME_MODE: ThemeMode = "system";
const THEME_TRANSITION_DURATION = 600;
const themeModes: ThemeMode[] = ["light", "system", "dark"];
const themeListeners = new Set<() => void>();

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
    return DEFAULT_THEME_MODE;
  }

  try {
    const storedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);
    return isThemeMode(storedTheme) ? storedTheme : DEFAULT_THEME_MODE;
  } catch {
    return DEFAULT_THEME_MODE;
  }
}

export function getServerThemeSnapshot(): ThemeMode {
  return DEFAULT_THEME_MODE;
}

function resolveIsDark(themeMode: ThemeMode) {
  return (
    themeMode === "dark" ||
    (themeMode === "system" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches)
  );
}

export function applyThemeMode(themeMode: ThemeMode) {
  if (typeof window === "undefined") {
    return;
  }

  document.documentElement.classList.toggle("dark", resolveIsDark(themeMode));
}

export function setThemeMode(mode: ThemeMode) {
  if (typeof window === "undefined") {
    return;
  }

  try {
    window.localStorage.setItem(THEME_STORAGE_KEY, mode);
  } catch {}

  emitThemeStoreChange();
}

/**
 * Cycles light → dark → system. From "system" it jumps to whichever explicit
 * theme is opposite the current one, so the first click always flips colors.
 */
export function getNextThemeMode(currentMode: ThemeMode): ThemeMode {
  if (currentMode === "light") return "dark";
  if (currentMode === "dark") return "system";

  return resolveIsDark("system") ? "light" : "dark";
}

type TransitionOrigin = {
  x: number;
  y: number;
};

/** Switches the theme with a circular reveal that grows from `origin`. */
export function transitionThemeMode(mode: ThemeMode, origin: TransitionOrigin) {
  const root = document.documentElement;
  const willChangeColors = resolveIsDark(mode) !== root.classList.contains("dark");
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  const commit = () => {
    setThemeMode(mode);
    applyThemeMode(mode);
  };

  if (
    !willChangeColors ||
    prefersReducedMotion ||
    typeof document.startViewTransition !== "function"
  ) {
    commit();
    return;
  }

  const radius = Math.hypot(
    Math.max(origin.x, window.innerWidth - origin.x),
    Math.max(origin.y, window.innerHeight - origin.y),
  );

  // Color transitions would fight the snapshot animation, so pause them.
  root.classList.add("theme-switching");

  const transition = document.startViewTransition(commit);

  transition.ready
    .then(() => {
      root.animate(
        {
          clipPath: [
            `circle(0px at ${origin.x}px ${origin.y}px)`,
            `circle(${radius}px at ${origin.x}px ${origin.y}px)`,
          ],
        },
        {
          duration: THEME_TRANSITION_DURATION,
          easing: "cubic-bezier(0.65, 0, 0.35, 1)",
          pseudoElement: "::view-transition-new(root)",
        },
      );
    })
    .catch(() => {});

  transition.finished.finally(() => {
    root.classList.remove("theme-switching");
  });
}

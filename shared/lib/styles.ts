/*
 * Shared utility compositions. Kept as plain class strings so they work on
 * any element (<a>, <button>, <Link>) and stay visible to Tailwind's scanner.
 */

const buttonBase =
  "items-center justify-center [transition:translate_250ms_ease,opacity_250ms_ease,border-color_250ms_ease,scale_160ms_cubic-bezier(0.23,1,0.32,1)] motion-safe:hover:-translate-y-0.5 motion-safe:active:scale-[0.97]";

export const buttonStyles = {
  primary: `${buttonBase} bg-ink text-paper hover:opacity-90`,
  ghost: `${buttonBase} border border-line text-ink hover:border-accent`,
} as const;

/** Round icon button used for the theme and menu toggles. */
export const iconButtonStyles =
  "size-[38px] cursor-pointer items-center justify-center rounded-full border border-line [transition:border-color_250ms_ease,scale_160ms_cubic-bezier(0.23,1,0.32,1)] hover:border-accent motion-safe:active:scale-[0.97]";

/** Underline grows on hover; `aria-current` keeps it drawn for the active link. */
export const navLinkStyles =
  "relative text-soft transition-colors duration-250 after:absolute after:-bottom-1 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-accent after:transition-[scale] after:duration-200 after:ease-out-strong hover:text-ink hover:after:scale-x-100 aria-[current=location]:text-ink aria-[current=location]:after:scale-x-100";

/** Section eyebrow rendered as a code comment: `// label`. */
export const eyebrowStyles =
  "font-mono text-[0.8rem] tracking-[0.02em] text-accent-2 before:text-soft before:content-['//_']";

export const cardStyles =
  "rounded-2xl border border-line bg-surface [transition:translate_200ms_ease,border-color_200ms_ease,box-shadow_200ms_ease,scale_160ms_cubic-bezier(0.23,1,0.32,1)] motion-safe:hover:-translate-y-1 hover:border-accent hover:shadow-[0_24px_48px_-28px_rgba(20,23,26,0.35)] motion-safe:active:scale-[0.985]";

export const tagStyles =
  "rounded-full border border-line px-2 py-0.5 font-mono text-[0.72rem] text-soft";

/** Code-editor window chrome used by the hero and contact cards. */
export const terminalStyles = {
  card: "min-w-0 max-w-full overflow-hidden rounded-[14px] border border-line bg-surface shadow-[0_1px_2px_rgba(0,0,0,0.03),0_20px_45px_-25px_rgba(20,23,26,0.35)]",
  bar: "flex items-center gap-2 border-b border-line px-3.5 py-2.5",
  dot: "size-2.5 rounded-full",
} as const;

/** Syntax colors for the hand-written code snippets. */
export const tokenStyles = {
  key: "text-accent",
  string: "text-accent-2",
  comment: "text-soft",
  function: "text-amber",
} as const;

/*
 * Scroll reveal. The `sr` marker is picked up by the IntersectionObserver in
 * the header, which adds `on` once the element enters the viewport.
 */
export const revealStyles =
  "sr motion-safe:translate-y-[18px] opacity-0 transition-[opacity,translate] duration-550 ease-out-strong [&.on]:translate-none [&.on]:opacity-100";

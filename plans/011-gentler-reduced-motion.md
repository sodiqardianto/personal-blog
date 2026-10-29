# 011 — Reduced motion: keep the fades, drop the movement

- **Status**: DONE
- **Commit**: df153a2
- **Severity**: MEDIUM
- **Category**: Accessibility
- **Estimated scope**: 9 files, token prefixes plus one CSS block
- **Depends on**: run LAST, after 001–010. The tokens below are the ones those plans introduce.

## Problem

When the visitor's OS asks for reduced motion, one global rule cuts every
animation and transition to 1ms:

```css
/* app/globals.css:215-228 — current */
@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto;
  }

  *,
  *::before,
  *::after {
    animation-duration: 1ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 1ms !important;
    scroll-behavior: auto !important;
  }
}
```

Reduced motion should mean fewer, gentler animations, not none. This rule also
removes the fades and colour changes that help people follow what changed
(sections fading in, menus fading, hover tints).

## Target

- Remove the global 1ms override. Keep `scroll-behavior: auto` under reduced motion.
- Make each *movement* (translate, scale, rotation, looping decoration) apply only
  when motion is allowed, using Tailwind's `motion-safe:` variant
  (`@media (prefers-reduced-motion: no-preference)`). Opacity, colour, blur and
  the nav underline (`scale-x`, which reads as a line drawing, not movement) keep
  working under reduced motion.
- Prefer `motion-safe:` on the movement over adding `motion-reduce:` overrides: it
  avoids two utilities fighting over the same property.

```css
/* target — app/globals.css, replacing the block above */
@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto;
  }
}
```

Already handled elsewhere, no change needed: `shared/lib/theme.ts` skips the circle
reveal under reduced motion, and `typing-role.tsx` doesn't start typing under
reduced motion.

## Repo conventions to follow

- Utilities in markup, shared strings in `shared/lib/styles.ts`.

## Steps

1. `app/globals.css`: replace the `@media (prefers-reduced-motion: reduce) { ... }`
   block at the end of the file with the target block.
2. Prefix each of these exact tokens with `motion-safe:` (for example,
   `hover:-translate-y-0.5` becomes `motion-safe:hover:-translate-y-0.5`). Change
   only these tokens:

| File | Where | Tokens to prefix |
| --- | --- | --- |
| `shared/lib/styles.ts` | `buttonBase` | `hover:-translate-y-0.5`, `active:scale-[0.97]` |
| `shared/lib/styles.ts` | `cardStyles` | `hover:-translate-y-1`, `active:scale-[0.985]` |
| `shared/lib/styles.ts` | `iconButtonStyles` | `active:scale-[0.97]` |
| `shared/lib/styles.ts` | `revealStyles` | `translate-y-[18px]` |
| `features/portfolio/components/post-list-item.tsx` | the 3 child spans | `group-hover:translate-x-0.5` |
| `features/portfolio/components/project-card.tsx` | image className | `group-hover:scale-[1.03]` |
| `features/portfolio/components/hero-section.tsx` | status dot span | `after:animate-status-pulse` |
| `features/portfolio/components/typing-role.tsx` | cursor `cn(...)` | `animate-typing-blink` |
| `shared/ui/theme-switcher.tsx` | icon className | `animate-theme-icon-in` |
| `features/portfolio/components/header.tsx` | mobile menu closed classes | `-translate-y-2` |
| `features/portfolio/components/post-engagement.tsx` | share menu closed classes | `-translate-y-1`, `scale-[0.97]` |
| `features/portfolio/components/post-engagement.tsx` | toast hidden classes | `translate-y-1` |
| `features/portfolio/components/post-engagement.tsx` | share and like buttons | `active:scale-[0.97]` (both) |
| `features/portfolio/components/post-engagement.tsx` | `cn` conditionals | `"animate-engagement-share"`, `"animate-engagement-like-btn"`, `"animate-engagement-like"` → `"motion-safe:animate-engagement-share"` etc. |
| `features/portfolio/components/project-detail.tsx` | primary CTA | `hover:-translate-y-0.5`, `active:scale-[0.97]` |
| `features/portfolio/components/project-detail.tsx` | secondary CTA | `active:scale-[0.97]` |
| `features/portfolio/components/project-gallery.tsx` | thumbnail image | `hover:scale-[1.05]` |
| `features/portfolio/components/project-gallery.tsx` | close / prev / next buttons | `active:scale-[0.95]` (all 3) |
| `features/portfolio/components/project-gallery.tsx` | lightbox image frame | `starting:scale-[0.96]` |

If a listed token is missing because an earlier plan wasn't applied, skip that
row and report it; do not invent the token.

## Boundaries

- Do NOT prefix opacity, colour, blur, border, shadow, or `scale-x` underline utilities.
- Do NOT prefix centring translates (`-translate-x-1/2`, `-translate-y-1/2`); they position elements, they don't animate.
- Do NOT add new dependencies.
- If a step doesn't match the code you find (drift since the commit stamp), STOP and report instead of improvising.

## Verification

- **Mechanical**: `npx tsc --noEmit -p .` passes; `bun run build` succeeds; the
  built CSS has no `animation-duration: 1ms`.
- **Feel check**: DevTools → Rendering → "Emulate CSS media feature
  prefers-reduced-motion: reduce", then reload `/`:
  - Sections still fade in on scroll, but don't rise.
  - Buttons and cards don't lift on hover or shrink on press; hover tints and the
    nav underline still work.
  - The status dot doesn't pulse; the typing role shows "software engineer" with no
    blinking cursor; the theme icon swaps instantly.
  - Mobile menu, share menu and toast fade in and out without sliding.
  - Gallery lightbox fades in without growing.
  - Turn the emulation off and confirm all motion returns.
- **Done when**: under reduced motion, no element moves, scales, rotates or loops,
  and all fades still play.

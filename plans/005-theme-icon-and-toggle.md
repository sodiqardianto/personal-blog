# 005 — Calm the theme icon swap and the toggle's hover spin

- **Status**: DONE
- **Commit**: df153a2
- **Severity**: MEDIUM
- **Category**: Physicality & origin / Easing & duration
- **Estimated scope**: 2 files, ~10 lines

## Problem

When the theme changes, the new icon is remounted (`key={themeMode}`) and plays a
keyframe that starts at `scale(0.4) rotate(-90deg)` and lasts 400ms. Starting
from 40% size is close to appearing from nothing, the quarter-turn is busy for a
16px icon, and 400ms is over budget:

```css
/* app/globals.css:42 — current */
--animate-theme-icon-in: theme-icon-in 0.4s cubic-bezier(0.22, 1, 0.36, 1);
```

```css
/* app/globals.css:87-97 — current */
@keyframes theme-icon-in {
  from {
    opacity: 0;
    transform: scale(0.4) rotate(-90deg);
  }

  to {
    opacity: 1;
    transform: none;
  }
}
```

The round icon buttons (theme toggle and mobile menu toggle) also spin 20° on every
hover, which is decorative motion on a frequently-hovered control. They have no
press feedback either:

```ts
// shared/lib/styles.ts:15-16 — current
export const iconButtonStyles =
  "size-[38px] cursor-pointer items-center justify-center rounded-full border border-line transition-[border-color,rotate] duration-250 hover:rotate-20 hover:border-accent";
```

## Target

- Icon swap: 200ms, strong ease-out `cubic-bezier(0.23, 1, 0.32, 1)`, from
  `opacity: 0; transform: scale(0.8); filter: blur(2px)`. The blur blends the two
  icon shapes so the swap reads as one morph instead of two objects.
- Icon buttons: no hover rotation; hover only changes the border colour. Pressing
  scales to 0.97 over 160ms with the same strong ease-out.

```css
/* target */
--animate-theme-icon-in: theme-icon-in 200ms cubic-bezier(0.23, 1, 0.32, 1);

@keyframes theme-icon-in {
  from {
    opacity: 0;
    transform: scale(0.8);
    filter: blur(2px);
  }

  to {
    opacity: 1;
    transform: none;
    filter: none;
  }
}
```

```ts
// target
export const iconButtonStyles =
  "size-[38px] cursor-pointer items-center justify-center rounded-full border border-line [transition:border-color_250ms_ease,scale_160ms_cubic-bezier(0.23,1,0.32,1)] hover:border-accent active:scale-[0.97]";
```

A keyframe is correct here (not a transition) because each theme change mounts a
fresh icon element; there is nothing to interrupt.

## Repo conventions to follow

- Animation tokens and their `@keyframes` live together in the second `@theme`
  block of `app/globals.css`, with literal `cubic-bezier(...)` values.
- `shared/ui/theme-switcher.tsx:62` already applies `animate-theme-icon-in`; no
  markup change is needed.

## Steps

1. `app/globals.css`: replace the `--animate-theme-icon-in` line with the target line.
2. `app/globals.css`: replace the whole `@keyframes theme-icon-in { ... }` block with
   the target block.
3. `shared/lib/styles.ts`: replace the `iconButtonStyles` string with the target string.

## Boundaries

- Do NOT change `shared/lib/theme.ts` (the circle reveal belongs to plan 001).
- Do NOT change `theme-switcher.tsx` or `header.tsx` markup.
- Do NOT add new dependencies.
- If a step doesn't match the code you find (drift since the commit stamp), STOP and report instead of improvising.

## Verification

- **Mechanical**: `npx tsc --noEmit -p .` passes; `bun run build` succeeds;
  `grep -n "rotate(-90deg)\|hover:rotate-20" app shared` prints nothing.
- **Feel check**:
  - Click the theme toggle several times: each new icon blooms in quickly, slightly
    blurred at first, with no spin.
  - Hover the toggle: only the border colour changes.
  - Press and hold the toggle (and, at mobile width, the menu button): it shrinks
    slightly and springs back.
  - In DevTools at 10% playback, the icon starts at ~80% size, never tiny.
- **Done when**: the icon animation is 200ms from `scale(0.8)` with blur, and icon
  buttons have press feedback and no hover rotation.

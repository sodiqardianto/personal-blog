# 004 — Add press feedback to shared buttons and project cards

- **Status**: DONE
- **Commit**: df153a2
- **Severity**: MEDIUM
- **Category**: Physicality & origin
- **Estimated scope**: 1 file, 2 lines
- **Depends on**: 003 (the `cardStyles` string below assumes 003's `duration-200`)

## Problem

Nothing on the site reacts when pressed. Buttons and cards only respond to hover,
so on click (and on touch, where there is no hover) the interface gives no
acknowledgement:

```ts
// shared/lib/styles.ts:6-7 — current
const buttonBase =
  "items-center justify-center transition-[translate,opacity,border-color] duration-250 hover:-translate-y-0.5";
```

```ts
// shared/lib/styles.ts:26-27 — current, after plan 003
export const cardStyles =
  "rounded-2xl border border-line bg-surface transition-[translate,border-color,box-shadow] duration-200 hover:-translate-y-1 hover:border-accent hover:shadow-[0_24px_48px_-28px_rgba(20,23,26,0.35)]";
```

`buttonBase` is used by every primary/ghost button (header "say hi", hero CTAs,
contact links). `cardStyles` is used by project cards and the two "about" cards.

## Target

- Buttons: `scale(0.97)` while pressed. Cards: `scale(0.985)`, because they're large.
- The press uses 160ms with the strong ease-out curve
  `cubic-bezier(0.23, 1, 0.32, 1)`, while the existing hover transitions keep
  their current duration and `ease`. Tailwind's `duration-*` sets one duration for
  every property, so use an arbitrary `[transition:...]` value with
  per-property timing.

```ts
// target
const buttonBase =
  "items-center justify-center [transition:translate_250ms_ease,opacity_250ms_ease,border-color_250ms_ease,scale_160ms_cubic-bezier(0.23,1,0.32,1)] hover:-translate-y-0.5 active:scale-[0.97]";

export const cardStyles =
  "rounded-2xl border border-line bg-surface [transition:translate_200ms_ease,border-color_200ms_ease,box-shadow_200ms_ease,scale_160ms_cubic-bezier(0.23,1,0.32,1)] hover:-translate-y-1 hover:border-accent hover:shadow-[0_24px_48px_-28px_rgba(20,23,26,0.35)] active:scale-[0.985]";
```

`translate` and `scale` are separate CSS properties in Tailwind 4, so the hover
lift and the press scale combine without overriding each other.

## Repo conventions to follow

- All shared class strings live in `shared/lib/styles.ts`.
- Underscores in Tailwind arbitrary values become spaces
  (`[transition:scale_160ms_ease]` → `transition: scale 160ms ease`).

## Steps

1. `shared/lib/styles.ts`: replace the `buttonBase` string with the target above.
2. `shared/lib/styles.ts`: replace the `cardStyles` string with the target above.

## Boundaries

- Do NOT touch `iconButtonStyles` (plan 005 adds press feedback there).
- Do NOT touch buttons in `post-engagement.tsx`, `project-detail.tsx` or
  `project-gallery.tsx` (plan 007).
- Do NOT add new dependencies.
- If a step doesn't match the code you find (drift since the commit stamp), STOP and report instead of improvising.

## Verification

- **Mechanical**: `npx tsc --noEmit -p .` passes; `bun run build` succeeds; the built
  CSS contains `scale 160ms cubic-bezier(0.23,1,0.32,1)` (spacing may differ).
- **Feel check**:
  - Press and hold "View my work": it shrinks slightly at once; release springs back.
  - Press a project card: a subtle shrink, and the hover lift is still present.
  - Hover without pressing: lift and opacity timing feel exactly as before.
  - In DevTools at 10% playback, the press scale starts on the first frame
    (no slow start).
- **Done when**: both strings match the target exactly and every primary/ghost
  button and card visibly responds to `:active`.

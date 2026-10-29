# 001 — Add strong easing tokens and use them for entrances

- **Status**: DONE
- **Commit**: df153a2
- **Severity**: MEDIUM
- **Category**: Easing & duration / Cohesion & tokens
- **Estimated scope**: 3 files, ~10 lines

## Problem

The project has no shared easing curves. The default transition timing is the
built-in `ease`, which is too weak for things entering the screen, and three
different hand-typed cubic-beziers are scattered around.

```css
/* app/globals.css:36 — current */
--default-transition-timing-function: ease;
```

```css
/* app/globals.css:43-45 — current (three engagement animations) */
--animate-engagement-like: engagement-like 0.42s cubic-bezier(0.22, 1, 0.36, 1);
--animate-engagement-like-btn: engagement-like-btn 0.42s cubic-bezier(0.22, 1, 0.36, 1);
--animate-engagement-share: engagement-share 0.46s cubic-bezier(0.22, 1, 0.36, 1);
```

```ts
// shared/lib/styles.ts:51-52 — current (scroll reveal, an entrance, on plain ease)
export const revealStyles =
  "sr translate-y-[18px] opacity-0 transition-[opacity,translate] duration-550 [&.on]:translate-none [&.on]:opacity-100";
```

```ts
// shared/lib/theme.ts:5 and :129 — current (theme circle reveal)
const THEME_TRANSITION_DURATION = 600;
          easing: "cubic-bezier(0.65, 0, 0.35, 1)",
```

## Target

Two tokens in the Tailwind theme, which generate the utilities
`ease-out-strong` and `ease-in-out-strong`:

```css
--ease-out-strong: cubic-bezier(0.23, 1, 0.32, 1);
--ease-in-out-strong: cubic-bezier(0.77, 0, 0.175, 1);
```

- Scroll reveal (an entrance) uses `ease-out-strong`.
- The engagement animations use the same strong ease-out curve,
  `cubic-bezier(0.23, 1, 0.32, 1)`.
- The theme circle reveal (on-screen morph) uses
  `cubic-bezier(0.77, 0, 0.175, 1)` at 500ms.
- `--default-transition-timing-function: ease;` stays as it is: hover and colour
  changes should keep using `ease`.

## Repo conventions to follow

- Theme tokens live in the second `@theme { ... }` block of `app/globals.css`
  (starts at line 34), next to `--default-transition-timing-function`.
- Shared class strings live in `shared/lib/styles.ts` as plain strings.
- Inside `--animate-*` values, write curves as literal `cubic-bezier(...)`
  values, as the existing lines do. Do not use `var(...)` there.

## Steps

1. `app/globals.css`: directly below line 36
   (`--default-transition-timing-function: ease;`), add:
   ```css

     /* Strong curves: the built-in keywords are too weak to feel intentional. */
     --ease-out-strong: cubic-bezier(0.23, 1, 0.32, 1);
     --ease-in-out-strong: cubic-bezier(0.77, 0, 0.175, 1);
   ```
2. `app/globals.css`: in the three `--animate-engagement-*` lines, replace
   `cubic-bezier(0.22, 1, 0.36, 1)` with `cubic-bezier(0.23, 1, 0.32, 1)`. Do NOT
   touch the `--animate-theme-icon-in` line (plan 005 owns it).
3. `shared/lib/styles.ts`: change `revealStyles` to:
   ```ts
   export const revealStyles =
     "sr translate-y-[18px] opacity-0 transition-[opacity,translate] duration-550 ease-out-strong [&.on]:translate-none [&.on]:opacity-100";
   ```
4. `shared/lib/theme.ts`: set `const THEME_TRANSITION_DURATION = 500;` and change
   the `easing` line to `easing: "cubic-bezier(0.77, 0, 0.175, 1)",`.

## Boundaries

- Do NOT change `--default-transition-timing-function`.
- Do NOT touch `--animate-theme-icon-in`, `--animate-slide-down` or
  `--animate-fade-in` (other plans own them).
- Do NOT change any markup.
- If a step doesn't match the code you find (drift since the commit stamp), STOP and report instead of improvising.

## Verification

- **Mechanical**: `npx tsc --noEmit -p .` passes; `bun run build` succeeds.
  Compile check: the built CSS contains `--ease-out-strong` and the
  `.ease-out-strong` utility.
- **Feel check**: run the site and scroll the homepage.
  - Sections now start moving immediately and settle softly, instead of easing
    in slowly.
  - Click the theme toggle: the circle reveal accelerates and decelerates
    smoothly, and finishes slightly faster.
  - In DevTools Animations panel at 10% playback, the reveal's first frames
    already show visible movement.
- **Done when**: both tokens exist, `revealStyles` contains `ease-out-strong`, and no
  `cubic-bezier(0.22, 1, 0.36, 1)` or `cubic-bezier(0.65, 0, 0.35, 1)` remain in
  the repo (`grep -rn "0.22, 1, 0.36\|0.65, 0, 0.35" app shared features` prints nothing).

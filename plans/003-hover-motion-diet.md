# 003 — Stop animating layout on hover and shorten frequent hover motion

- **Status**: DONE
- **Commit**: df153a2
- **Severity**: MEDIUM
- **Category**: Performance / Purpose & frequency
- **Estimated scope**: 3 files, ~10 lines
- **Depends on**: 001 (uses the `ease-out-strong` utility)

## Problem

These hovers happen dozens of times per visit, and two of them animate layout
properties (they re-run layout and paint on every frame):

```tsx
// features/portfolio/components/post-list-item.tsx:20 — current (animates padding-left)
className="-mx-2 flex flex-col gap-2 rounded-lg border-b border-line px-2 py-5 transition-[background-color,padding-left] duration-250 hover:bg-accent/6 hover:pl-2.5 sm:flex-row sm:items-center sm:gap-6"
```

```ts
// shared/lib/styles.ts:19-20 — current (nav underline animates width)
export const navLinkStyles =
  "relative text-soft transition-colors duration-250 after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0 after:bg-accent after:transition-[width] after:duration-250 hover:text-ink hover:after:w-full aria-[current=location]:text-ink aria-[current=location]:after:w-full";
```

The card hover lift takes 350ms, which is over the 300ms UI budget for something
hovered constantly, and the project image zoom takes 500ms:

```ts
// shared/lib/styles.ts:26-27 — current
export const cardStyles =
  "rounded-2xl border border-line bg-surface transition-[translate,border-color,box-shadow] duration-350 hover:-translate-y-1 hover:border-accent hover:shadow-[0_24px_48px_-28px_rgba(20,23,26,0.35)]";
```

```tsx
// features/portfolio/components/project-card.tsx:41 — current
className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
```

## Target

- Blog row: the background still tints on hover; the row's content shifts 2px to
  the right with `translate` (GPU) instead of changing `padding-left`.
- Nav underline: a full-width line scaled from 0 to 1 on the x axis from the left
  edge (`scale`, GPU), 200ms, strong ease-out. Looks the same as growing the width.
- Card lift: 200ms. Image zoom: 300ms with strong ease-out.

## Repo conventions to follow

- Shared strings live in `shared/lib/styles.ts`; component-only classes stay inline.
- The `ease-out-strong` utility comes from plan 001 (`--ease-out-strong:
  cubic-bezier(0.23, 1, 0.32, 1)` in `app/globals.css`).
- Tailwind 4 `translate-*` / `scale-*` utilities set the CSS `translate` / `scale`
  properties, so transition them by those names (`transition-[translate]`).

## Steps

1. `features/portfolio/components/post-list-item.tsx`:
   - Change the `<Link>` className to:
     ```
     group -mx-2 flex flex-col gap-2 rounded-lg border-b border-line px-2 py-5 transition-[background-color] duration-250 hover:bg-accent/6 sm:flex-row sm:items-center sm:gap-6
     ```
   - Add `transition-[translate] duration-200 ease-out-strong group-hover:translate-x-0.5`
     to the start of the className of each of the three direct child `<span>`s:
     the date span (`w-24 shrink-0 ...`), the title span (`flex-1 ...`), and the
     tags wrapper span (`flex flex-wrap gap-2`). Do not change the inner tag spans.
2. `shared/lib/styles.ts`, `navLinkStyles`: replace
   `after:w-0 after:bg-accent after:transition-[width] after:duration-250 hover:text-ink hover:after:w-full aria-[current=location]:text-ink aria-[current=location]:after:w-full`
   with
   `after:w-full after:origin-left after:scale-x-0 after:bg-accent after:transition-[scale] after:duration-200 after:ease-out-strong hover:text-ink hover:after:scale-x-100 aria-[current=location]:text-ink aria-[current=location]:after:scale-x-100`.
   Keep the rest of the string as it is.
3. `shared/lib/styles.ts`, `cardStyles`: change `duration-350` to `duration-200`.
   Nothing else in that string changes.
4. `features/portfolio/components/project-card.tsx:41`: change the image className to
   `object-cover transition-transform duration-300 ease-out-strong group-hover:scale-[1.03]`.

## Boundaries

- Do NOT change colours, sizes, or the hover distance (row shift stays 2px, card lift stays 4px).
- Do NOT touch `buttonStyles`, `iconButtonStyles` or `revealStyles` (other plans).
- Do NOT add new dependencies.
- If a step doesn't match the code you find (drift since the commit stamp), STOP and report instead of improvising.

## Verification

- **Mechanical**: `npx tsc --noEmit -p .` passes; `bun run build` succeeds;
  `grep -n "padding-left\|after:w-0\|duration-350" shared features` prints nothing.
- **Feel check**:
  - Hover a blog row in "Thoughts & notes": the tint appears and the text nudges
    2px right; nothing else on the page moves.
  - Hover nav links: the underline grows from the left edge as before. The active
    link keeps its full underline.
  - Hover a project card: the lift feels snappier, the image zoom is smooth.
  - DevTools → Performance: record a few row hovers; there should be no Layout
    entries caused by the hover.
- **Done when**: no hover transitions `padding-left` or `width`, and card lift is 200ms.

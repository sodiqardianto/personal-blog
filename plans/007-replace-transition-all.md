# 007 — Replace `transition-all` with explicit properties, and add press feedback to those buttons

- **Status**: DONE
- **Commit**: df153a2
- **Severity**: LOW
- **Category**: Performance / Physicality & origin
- **Estimated scope**: 3 files, 8 class strings

## Problem

`transition-all` transitions every property that changes, including ones nobody
meant to animate, and keeps more work off the fast GPU path. Seven places use it:

```tsx
// features/portfolio/components/post-engagement.tsx:366 — like button (excerpt)
"inline-flex cursor-pointer items-center gap-2 rounded-full ... text-ink/60 transition-all hover:border-blue/20 hover:text-blue ..."
// features/portfolio/components/post-engagement.tsx:381 — heart icon
"h-4 w-4 stroke-2 transition-all duration-200",
// features/portfolio/components/project-detail.tsx:113 — "live" CTA (excerpt)
"... text-white transition-all hover:-translate-y-0.5 hover:shadow-[0_6px_22px_rgba(47,84,235,.35)] dark:bg-blue-dark"
// features/portfolio/components/project-detail.tsx:122 — secondary CTA (excerpt)
"... text-ink/55 transition-all hover:border-blue hover:bg-blue/6 hover:text-blue ..."
// features/portfolio/components/project-gallery.tsx:157, 173, 184 — lightbox close / prev / next (excerpt)
"... rounded-full bg-white/12 text-white transition-all hover:bg-white/22"
```

These buttons, plus the share button
(`post-engagement.tsx:295`, which uses `transition-colors`), also have no press
feedback.

## Target

Each `transition-all` names only what actually changes. Where a button gains press
feedback, the press scale uses 160ms with the strong ease-out
`cubic-bezier(0.23, 1, 0.32, 1)`, while colour changes keep Tailwind's 150ms
default and `ease`.

| Location | Replace | With |
| --- | --- | --- |
| `post-engagement.tsx:295` (share button) | `transition-colors` | `[transition:border-color_150ms_ease,color_150ms_ease,scale_160ms_cubic-bezier(0.23,1,0.32,1)] active:scale-[0.97]` |
| `post-engagement.tsx:366` (like button) | `transition-all` | `[transition:border-color_150ms_ease,color_150ms_ease,scale_160ms_cubic-bezier(0.23,1,0.32,1)] active:scale-[0.97]` |
| `post-engagement.tsx:381` (heart icon) | `transition-all duration-200` | `transition-[color,fill,stroke] duration-200` |
| `project-detail.tsx:113` (primary CTA) | `transition-all` | `[transition:translate_150ms_ease,box-shadow_150ms_ease,scale_160ms_cubic-bezier(0.23,1,0.32,1)] active:scale-[0.97]` |
| `project-detail.tsx:122` (secondary CTA) | `transition-all` | `[transition:border-color_150ms_ease,background-color_150ms_ease,color_150ms_ease,scale_160ms_cubic-bezier(0.23,1,0.32,1)] active:scale-[0.97]` |
| `project-gallery.tsx:157` (close) | `transition-all` | `[transition:background-color_150ms_ease,scale_160ms_cubic-bezier(0.23,1,0.32,1)] active:scale-[0.95]` |
| `project-gallery.tsx:173` (previous) | `transition-all` | `[transition:background-color_150ms_ease,scale_160ms_cubic-bezier(0.23,1,0.32,1)] active:scale-[0.95]` |
| `project-gallery.tsx:184` (next) | `transition-all` | `[transition:background-color_150ms_ease,scale_160ms_cubic-bezier(0.23,1,0.32,1)] active:scale-[0.95]` |

Notes:
- The like button also gets the `animate-engagement-like-btn` keyframe, which
  animates `transform`. `active:scale-*` sets the separate `scale` property, so
  they don't conflict.
- The gallery prev/next buttons keep `-translate-y-1/2` for centring; `scale` and
  `translate` are separate properties, so centring is unaffected.

## Repo conventions to follow

- Underscores in Tailwind arbitrary values become spaces.
- The same press pattern is used for shared buttons in `shared/lib/styles.ts`
  (`buttonBase`, after plan 004).

## Steps

1. Apply each row of the table: in that file, at that line, replace exactly the
   "Replace" token(s) with the "With" text. Change nothing else in the class string.

## Boundaries

- Only the 8 class strings in the table. Do NOT touch the share menu items
  (`post-engagement.tsx:322-352`, `transition-colors`, fine as is) or the share
  menu / toast markup (plan 006).
- Do NOT change hover colours, sizes, or the like/share keyframe logic.
- Do NOT add new dependencies.
- If a step doesn't match the code you find (drift since the commit stamp), STOP and report instead of improvising.

## Verification

- **Mechanical**: `grep -rn "transition-all" app features shared` prints nothing;
  `npx tsc --noEmit -p .` passes; `bun run build` succeeds.
- **Feel check**:
  - Blog post: press "shares" and "likes" — each dips slightly. Liking still plays
    the heart pop; the heart fills with colour smoothly.
  - Project page: hover the primary CTA — it still lifts with its glow; press it —
    it dips. The secondary CTA tints on hover and dips on press.
  - Open a gallery image: hover the close/prev/next buttons — background brightens;
    press — they dip without shifting off their vertical centre.
- **Done when**: no `transition-all` remains and all 8 controls respond to `:active`.

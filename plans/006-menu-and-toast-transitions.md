# 006 — Give the mobile menu, share menu and "URL copied" toast interruptible enter and exit

- **Status**: DONE
- **Commit**: df153a2
- **Severity**: MEDIUM
- **Category**: Interruptibility / Physicality & origin
- **Estimated scope**: 2 files, ~40 lines
- **Depends on**: 001 (uses the `ease-out-strong` utility)

## Problem

All three are mounted/unmounted and animate in with keyframes. They have no exit
(they vanish instantly), a keyframe restarts from zero if toggled quickly, and the
share menu fades without coming from its button.

```tsx
// features/portfolio/components/header.tsx:168-174 — current (mobile menu)
<div
  id="site-mobile-menu"
  className={cn(
    "w-full max-w-[100vw] overflow-x-clip border-t border-line bg-paper px-6 py-4 md:hidden",
    mobileOpen ? "block animate-slide-down" : "hidden",
  )}
>
```

```tsx
// features/portfolio/components/post-engagement.tsx:283-287 — current (toast)
{copyToastVisible ? (
  <span className="pointer-events-none absolute -top-11 left-1/2 z-30 -translate-x-1/2 whitespace-nowrap rounded-full border border-blue/12 bg-white px-3 py-1.5 text-[0.76rem] font-medium text-blue shadow-[0_10px_28px_rgba(47,84,235,0.14)] animate-fade-in dark:border-blue-dark/15 dark:bg-navy-800 dark:text-blue-dark">
    URL copied
  </span>
) : null}
```

```tsx
// features/portfolio/components/post-engagement.tsx:311-316 — current (share menu)
{shareMenuOpen ? (
  <div
    role="menu"
    aria-label="Share article"
    className="absolute left-0 top-[calc(100%+0.65rem)] z-20 w-[min(18rem,calc(100vw-2.5rem))] animate-fade-in rounded-[1.1rem] border border-blue/10 bg-white p-2.5 shadow-[0_18px_48px_rgba(15,22,36,0.12)] dark:border-blue-dark/12 dark:bg-navy-800 dark:shadow-[0_18px_48px_rgba(0,0,0,0.34)]"
  >
    ...
  </div>
) : null}
```

## Target

Each element stays mounted and switches between an open and a closed set of
utilities, so CSS **transitions** (which reverse smoothly mid-way) do the work:

- Easing: `ease-out-strong` (`cubic-bezier(0.23, 1, 0.32, 1)`).
- Asymmetric timing: opening 200ms, closing 150ms. Put `duration-200` on the open
  state and `duration-150` on the closed state; a transition uses the duration of
  the state it's moving *to*.
- `visibility` is in the transition list, so when closing the element stays
  visible until the fade ends, then becomes hidden (not focusable or clickable).
- Mobile menu: slides down 8px (`-translate-y-2`) + fade, as today. It becomes
  `absolute inset-x-0 top-full` so the closed (invisible) menu doesn't take up
  space inside the fixed header. Its `border-t` becomes `border-b` so the dividing
  lines still read the same.
- Share menu: grows from its button, `origin-top-left`, from `scale-[0.97]` +
  `-translate-y-1` + fade. Closed menu gets `inert` so it can't be focused.
- Toast: fade + 4px rise (`translate-y-1` when hidden). It keeps
  `-translate-x-1/2` for centring; Tailwind combines the x and y translates.

## Repo conventions to follow

- Conditional classes use `cn(...)` from `@/lib/utils`; both files already import it.
- Tailwind 4 `translate-*`/`scale-*` set the CSS `translate`/`scale` properties,
  so the transition list names `translate` and `scale`.

## Steps

1. `features/portfolio/components/header.tsx`, mobile menu `<div id="site-mobile-menu">`:
   replace its `className={cn(...)}` with
   ```tsx
   className={cn(
     "absolute inset-x-0 top-full w-full max-w-[100vw] overflow-x-clip border-b border-line bg-paper px-6 py-4 transition-[opacity,translate,visibility] ease-out-strong md:hidden",
     mobileOpen
       ? "duration-200"
       : "pointer-events-none invisible -translate-y-2 opacity-0 duration-150",
   )}
   ```
2. `features/portfolio/components/post-engagement.tsx`, toast: replace the whole
   `{copyToastVisible ? ( <span ...>URL copied</span> ) : null}` expression with
   ```tsx
   <span
     aria-hidden={!copyToastVisible}
     className={cn(
       "pointer-events-none absolute -top-11 left-1/2 z-30 -translate-x-1/2 whitespace-nowrap rounded-full border border-blue/12 bg-white px-3 py-1.5 text-[0.76rem] font-medium text-blue shadow-[0_10px_28px_rgba(47,84,235,0.14)] transition-[opacity,translate] ease-out-strong dark:border-blue-dark/15 dark:bg-navy-800 dark:text-blue-dark",
       copyToastVisible ? "duration-200" : "translate-y-1 opacity-0 duration-150",
     )}
   >
     URL copied
   </span>
   ```
3. `features/portfolio/components/post-engagement.tsx`, share menu: remove the
   `{shareMenuOpen ? (` wrapper and its matching `) : null}` so the `<div role="menu">`
   always renders (its children stay exactly as they are). Give the div
   `inert={!shareMenuOpen}` and replace its className with
   ```tsx
   className={cn(
     "absolute left-0 top-[calc(100%+0.65rem)] z-20 w-[min(18rem,calc(100vw-2.5rem))] origin-top-left rounded-[1.1rem] border border-blue/10 bg-white p-2.5 shadow-[0_18px_48px_rgba(15,22,36,0.12)] transition-[opacity,scale,translate,visibility] ease-out-strong dark:border-blue-dark/12 dark:bg-navy-800 dark:shadow-[0_18px_48px_rgba(0,0,0,0.34)]",
     shareMenuOpen
       ? "duration-200"
       : "pointer-events-none invisible -translate-y-1 scale-[0.97] opacity-0 duration-150",
   )}
   ```
4. `app/globals.css`: `animate-slide-down` and `animate-fade-in` are now unused.
   Delete the lines `--animate-slide-down: slide-down 0.2s ease forwards;` and
   `--animate-fade-in: fade-in 0.28s ease forwards;`, and delete the whole
   `@keyframes slide-down { ... }` and `@keyframes fade-in { ... }` blocks. First
   confirm with `grep -rn "animate-slide-down\|animate-fade-in" app features shared`
   that nothing else uses them; if something does, keep that token and report it.

## Boundaries

- Do NOT change the menus' contents, links, click/escape/outside-click logic, or
  the `showCopyToast` timer.
- Do NOT change `id="site-mobile-menu"` (a global rule hides it when the gallery
  lightbox is open).
- Do NOT add new dependencies.
- If a step doesn't match the code you find (drift since the commit stamp), STOP and report instead of improvising.

## Verification

- **Mechanical**: `npx tsc --noEmit -p .` and `npx eslint app features shared` pass
  (only the 3 pre-existing warnings); `bun run build` succeeds.
- **Feel check**:
  - Mobile width (375px): tap the menu button — the panel slides down 8px and fades
    in; tap again — it slides back up and fades out slightly faster. Tap rapidly:
    it reverses mid-way, never jumping back to the start. With the menu closed, the
    area under the header is clickable and the page shows no blurred band.
  - Blog post: click "shares" — the menu grows from its top-left corner; click
    outside or press Escape — it shrinks away. Tab key never lands inside the
    closed menu.
  - Choose "Copy URL" — "URL copied" rises in; after it times out it fades away
    instead of vanishing.
  - DevTools at 10% playback: open and close both menus and confirm the exit is
    shorter than the entrance.
- **Done when**: all three elements fade both ways, toggling never restarts an
  animation from zero, and `slide-down`/`fade-in` no longer exist in `globals.css`.

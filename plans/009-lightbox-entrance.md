# 009 — Animate the gallery lightbox opening

- **Status**: DONE
- **Commit**: df153a2
- **Severity**: LOW
- **Category**: Missed opportunities
- **Estimated scope**: 1 file, 2 class strings
- **Depends on**: 001 (uses the `ease-out-strong` utility)

## Problem

Clicking a gallery thumbnail on a project page makes the full-screen lightbox
appear in a single frame: the black backdrop and the large image just pop in.
A lightbox is an occasional modal, so a short standard entrance is appropriate
and makes the change feel less abrupt.

```tsx
// features/portfolio/components/project-gallery.tsx:151-152 — current
{lightboxIndex !== null && lightboxImages[lightboxIndex] ? (
  <div className="fixed inset-0 z-1200 flex items-center justify-center bg-black/92">
```

```tsx
// features/portfolio/components/project-gallery.tsx:191-192 — current (image frame)
<div className="flex min-h-screen items-center justify-center px-5 py-20">
    <div className="relative h-[88vh] w-[92vw]">
```

## Target

Use Tailwind 4's `starting:` variant, which maps to CSS `@starting-style`: it
defines the style an element transitions *from* when it first appears, with no
JavaScript.

- Backdrop: fades in from `opacity: 0` over 250ms, `ease-out-strong`
  (`cubic-bezier(0.23, 1, 0.32, 1)`).
- Image frame: fades in and grows from `scale(0.96)` to `1` over 250ms,
  `ease-out-strong`. It's a modal, so it grows from the centre (default
  `transform-origin`), which is correct.
- Switching images with the arrow keys or prev/next buttons must stay **instant**:
  the frame `<div>` is not remounted (no `key`), so `@starting-style` only applies
  on open. Do not add a `key`.
- Closing stays instant (unmount). That's acceptable: the system's response to
  "close" should be immediate, and adding an exit needs a delayed unmount, which is
  out of scope.

```tsx
// target
<div className="fixed inset-0 z-1200 flex items-center justify-center bg-black/92 transition-opacity duration-250 ease-out-strong starting:opacity-0">
...
    <div className="relative h-[88vh] w-[92vw] transition-[opacity,scale] duration-250 ease-out-strong starting:scale-[0.96] starting:opacity-0">
```

Browsers without `@starting-style` support simply show the lightbox with no
animation, which is the current behaviour.

## Repo conventions to follow

- Utility classes inline; the `ease-out-strong` utility comes from plan 001.

## Steps

1. `features/portfolio/components/project-gallery.tsx:152`: append
   `transition-opacity duration-250 ease-out-strong starting:opacity-0` to the
   backdrop div's className.
2. `features/portfolio/components/project-gallery.tsx:192`: append
   `transition-[opacity,scale] duration-250 ease-out-strong starting:scale-[0.96] starting:opacity-0`
   to the image frame div's className (`relative h-[88vh] w-[92vw]`).

## Boundaries

- Do NOT add a `key` to the frame or image.
- Do NOT change keyboard handling, the close/prev/next buttons (plan 007 owns their
  classes), or the counter text.
- Do NOT add new dependencies.
- If a step doesn't match the code you find (drift since the commit stamp), STOP and report instead of improvising.

## Verification

- **Mechanical**: `npx tsc --noEmit -p .` passes; `bun run build` succeeds; the
  built CSS contains `@starting-style`.
- **Feel check** (Chrome or Safari 17.5+):
  - Open a project page with a gallery and click a thumbnail: the backdrop fades
    in and the image grows slightly into place from the centre.
  - Press → and ← repeatedly: images change instantly, with no re-animation.
  - Press Escape: the lightbox closes immediately.
  - DevTools at 10% playback: the image starts at 96% size, never smaller.
- **Done when**: opening the lightbox animates, and image switching and closing stay instant.

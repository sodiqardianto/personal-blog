# 008 — Lighten and speed up the image fade-in

- **Status**: DONE
- **Commit**: df153a2
- **Severity**: LOW
- **Category**: Performance / Easing & duration
- **Estimated scope**: 1 file, 1 class string
- **Depends on**: 001 (uses the `ease-out-strong` utility)

## Problem

Every image on the site (project cards, project gallery, lightbox) fades in from a
24px blur (`blur-xl`) over 700ms. Animating a blur that large is expensive,
especially in Safari, and several cards loading at once multiply the cost. 700ms
also feels slow for an image that has already loaded.

```tsx
// shared/ui/blur-image.tsx:21-23 — current
className={`transition-[opacity,filter] duration-700 ease-out ${
  loaded ? "opacity-100 blur-0" : "opacity-0 blur-xl"
} ${className}`}
```

## Target

- Start blur: `blur-sm` (8px). Blur during a transition should stay well under 20px.
- Duration 400ms with the strong ease-out curve (`ease-out-strong` =
  `cubic-bezier(0.23, 1, 0.32, 1)`).

```tsx
// target
className={`transition-[opacity,filter] duration-400 ease-out-strong ${
  loaded ? "opacity-100 blur-0" : "opacity-0 blur-sm"
} ${className}`}
```

## Repo conventions to follow

- `BlurImage` builds its className with a template string; keep that form.

## Steps

1. `shared/ui/blur-image.tsx`: change `duration-700 ease-out` to
   `duration-400 ease-out-strong`, and `blur-xl` to `blur-sm`. Nothing else changes.

## Boundaries

- Do NOT change the `placeholder` / `blurDataURL` logic or the `onLoad` handler.
- Do NOT touch callers of `BlurImage`.
- If a step doesn't match the code you find (drift since the commit stamp), STOP and report instead of improvising.

## Verification

- **Mechanical**: `npx tsc --noEmit -p .` passes; `bun run build` succeeds.
- **Feel check**:
  - DevTools → Network → throttle to "Fast 4G", disable cache, reload `/`. Project
    images sharpen in quickly from a light blur rather than a heavy smear.
  - Open a project page with a gallery and confirm the same.
  - Safari, if available: scroll through the cards while they load; no stutter.
- **Done when**: the class string matches the target.

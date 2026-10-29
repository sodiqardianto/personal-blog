# 002 — Move the project card's scroll reveal to a wrapper and stagger it

- **Status**: DONE
- **Commit**: df153a2
- **Severity**: MEDIUM
- **Category**: Cohesion & tokens (stagger) / Interruptibility (style collision)
- **Estimated scope**: 3 files, ~20 lines

## Problem

`ProjectCard` puts the card styles and the scroll-reveal styles on the same `<Link>`:

```tsx
// features/portfolio/components/project-card.tsx:29-32 — current
<Link
  href={`/projects/${project.slug}`}
  className={cn(cardStyles, "group block p-5", reveal && revealStyles)}
>
```

Both class strings (from `shared/lib/styles.ts`) set the same CSS properties:

```ts
// shared/lib/styles.ts:26-27
export const cardStyles =
  "rounded-2xl border border-line bg-surface transition-[translate,border-color,box-shadow] duration-350 hover:-translate-y-1 hover:border-accent hover:shadow-[0_24px_48px_-28px_rgba(20,23,26,0.35)]";
// shared/lib/styles.ts:51-52
export const revealStyles =
  "sr translate-y-[18px] opacity-0 transition-[opacity,translate] duration-550 [&.on]:translate-none [&.on]:opacity-100";
```

In the compiled CSS, the rule order decides who wins (this was confirmed in the
built stylesheet):
- `[&.on]:translate-none` comes after `hover:-translate-y-1`, so **revealed cards
  never lift on hover**.
- `transition-[translate,border-color,box-shadow]` comes after
  `transition-[opacity,translate]`, so **the reveal's opacity is not transitioned**:
  it snaps in.
- `duration-550` comes after `duration-350`, so the hover border/shadow change
  takes 550ms.

Separately, the two cards in a row reveal at exactly the same moment. A short
stagger reads better.

## Target

- The reveal classes and a stagger delay sit on a wrapper `<div>`. The `<Link>`
  keeps only the card styles, and fills the wrapper's height (`h-full`) so cards in
  a row stay equal height.
- Stagger: `transition-delay` of `(index % 2) * 60ms`, so the left card in a row
  waits 0ms and the right card 60ms (within the 30–80ms stagger range). The delay
  is on the wrapper only, so it never delays hover or press on the card.

```tsx
// target — project-card.tsx return
return (
  // Reveal lives on a wrapper so its delay and transforms never fight the card's hover.
  <div
    className={reveal ? revealStyles : undefined}
    style={reveal ? { transitionDelay: `${(index % 2) * 60}ms` } : undefined}
  >
    <Link
      href={`/projects/${project.slug}`}
      className={cn(cardStyles, "group block h-full p-5")}
    >
      {/* children unchanged */}
    </Link>
  </div>
);
```

## Repo conventions to follow

- `cn` from `@/lib/utils` joins class strings; shared strings come from
  `@/shared/lib/styles`.
- Props use a `type XProps = {...}` declaration above the component, with defaults
  in the destructuring, e.g. `preload = false` in `project-card.tsx:15`.

## Steps

1. `features/portfolio/components/project-card.tsx`:
   - Add `index?: number;` to `ProjectCardProps` (after `project: Project;`).
   - Add `index = 0,` to the destructured props (after `project,`).
   - Replace the returned `<Link ...>...</Link>` with the wrapper structure from
     **Target**. Keep every child of the `<Link>` exactly as it is.
2. `features/portfolio/components/projects-section.tsx:28-30`: change the map to
   ```tsx
   {projects.map((project, index) => (
     <ProjectCard key={project.id} project={project} index={index} />
   ))}
   ```
3. `app/(marketing)/projects/page.tsx`: in the `<ProjectCard ... />` call inside
   `projects.map((project, index) => ...)`, add the prop `index={index}`. Keep the
   existing `preload` and `reveal` props.

## Boundaries

- Do NOT edit `shared/lib/styles.ts` (other plans change `cardStyles` and `revealStyles`).
- Do NOT change the card's children, image, tags, or text.
- Do NOT add new dependencies.
- If a step doesn't match the code you find (drift since the commit stamp), STOP and report instead of improvising.

## Verification

- **Mechanical**: `npx tsc --noEmit -p .` and `npx eslint app features shared` pass
  (only the 3 pre-existing warnings); `bun run build` succeeds.
- **Feel check**: open `/` and scroll to "Selected projects".
  - The two cards in a row fade and rise in, the right one ~60ms after the left.
  - The fade is smooth (it no longer snaps to full opacity).
  - Hovering a revealed card lifts it 4px with the accent border and shadow; the
    lift starts immediately with no 60ms lag.
  - Cards in the same row have equal heights.
  - Visit `/projects`: the first card (rendered with `reveal={false}`) is visible
    immediately; the rest reveal with the same stagger.
- **Done when**: no element has both `cardStyles` and `revealStyles`, hover lift
  works on every card, and cards in a row are equal height.

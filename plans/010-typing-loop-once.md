# 010 — Make the hero typing animation run through once, then rest

- **Status**: DONE
- **Commit**: df153a2
- **Severity**: LOW
- **Category**: Purpose & frequency
- **Estimated scope**: 1 file, ~15 lines
- **Note**: this is a taste call. Get the site owner's OK after the feel check.

## Problem

The hero line "Hi, I'm Sodiq — a ___" deletes and retypes four roles forever, with
a blinking cursor, right next to the paragraph people are trying to read. Constant
motion that never stops pulls the eye back again and again; its purpose (showing
the range of roles) is served after one pass.

```tsx
// features/portfolio/components/typing-role.tsx:12-43 — current (excerpt)
export function TypingRole() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [visibleLength, setVisibleLength] = useState(roles[0].length);
  const [deleting, setDeleting] = useState(false);
  const currentRole = roles[roleIndex];

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const isComplete = visibleLength === currentRole.length;
    const isEmpty = visibleLength === 0;
    const delay = !deleting && isComplete ? 1400 : deleting ? 40 : 70;

    const timeoutId = window.setTimeout(() => {
      if (!deleting && isComplete) {
        setDeleting(true);
        return;
      }

      if (deleting && isEmpty) {
        setDeleting(false);
        setRoleIndex((index) => (index + 1) % roles.length);
        return;
      }

      setVisibleLength((length) => length + (deleting ? -1 : 1));
    }, delay);

    return () => window.clearTimeout(timeoutId);
  }, [currentRole, deleting, visibleLength]);
```

```tsx
// features/portfolio/components/typing-role.tsx:50 — current (cursor)
<span className="ml-[3px] inline-block h-[1.05em] w-2 animate-typing-blink bg-accent align-[-2px]" />
```

## Target

- Cycle through all four roles once, ending back on "software engineer", then stop.
- When it stops, the cursor fades out over 300ms (`transition-opacity duration-300`)
  and its blink stops.
- Timings while typing stay the same (70ms per character, 40ms per deletion, 1400ms pause).

```tsx
// target — state and effect
const [roleIndex, setRoleIndex] = useState(0);
const [visibleLength, setVisibleLength] = useState(roles[0].length);
const [deleting, setDeleting] = useState(false);
const [hasLooped, setHasLooped] = useState(false);
const currentRole = roles[roleIndex];
// One full pass, then rest on the first role so the hero stops moving.
const isDone =
  hasLooped && roleIndex === 0 && visibleLength === roles[0].length;

useEffect(() => {
  if (isDone || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return;
  }

  const isComplete = visibleLength === currentRole.length;
  const isEmpty = visibleLength === 0;
  const delay = !deleting && isComplete ? 1400 : deleting ? 40 : 70;

  const timeoutId = window.setTimeout(() => {
    if (!deleting && isComplete) {
      setDeleting(true);
      return;
    }

    if (deleting && isEmpty) {
      const nextIndex = (roleIndex + 1) % roles.length;

      setDeleting(false);
      setRoleIndex(nextIndex);
      if (nextIndex === 0) setHasLooped(true);
      return;
    }

    setVisibleLength((length) => length + (deleting ? -1 : 1));
  }, delay);

  return () => window.clearTimeout(timeoutId);
}, [currentRole, deleting, isDone, roleIndex, visibleLength]);
```

```tsx
// target — cursor
<span
  className={cn(
    "ml-[3px] inline-block h-[1.05em] w-2 bg-accent align-[-2px] transition-opacity duration-300",
    isDone ? "opacity-0" : "animate-typing-blink",
  )}
/>
```

## Repo conventions to follow

- Import `cn` with `import { cn } from "@/lib/utils";` (used the same way in
  `features/portfolio/components/header.tsx`).
- Keep the `sr-only` "software engineer" text and `aria-hidden` wrapper as they are.

## Steps

1. `features/portfolio/components/typing-role.tsx`: add `import { cn } from "@/lib/utils";`
   below the React import.
2. Replace the state declarations and the `useEffect` (lines 13-43) with the target
   "state and effect" block.
3. Replace the cursor `<span>` (line 50) with the target "cursor" block.

## Boundaries

- Do NOT change the `roles` list, the typing speeds, or the hero markup.
- Do NOT add new dependencies.
- If a step doesn't match the code you find (drift since the commit stamp), STOP and report instead of improvising.

## Verification

- **Mechanical**: `npx tsc --noEmit -p .` and `npx eslint app features shared` pass
  (only the 3 pre-existing warnings); `bun run build` succeeds.
- **Feel check**:
  - Load `/` and watch: it shows "software engineer", then types through Laravel
    developer → React & Next.js builder → Flutter developer → software engineer,
    and stops. The cursor fades out and the hero is still.
  - Reload: it plays again (state isn't persisted, by design).
  - Read the hero paragraph after it stops: nothing pulls your eye.
- **Done when**: the animation completes exactly one pass and the cursor stops
  blinking and disappears.

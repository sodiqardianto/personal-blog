# Animation plans

Produced by an animation audit of the portfolio (Emil Kowalski's animation
principles), against commit `df153a2` on branch `refactor/utilities-first`.
All plans were executed as commits `d0bc36c`..`1f5597f` (one `anim(NNN)` commit per plan)
and feel-checked on a production build.

Each plan is self-contained: it quotes the current code, gives exact target
values, and ends with a mechanical check and a feel check. Plans are numbered in
the order they should run.

| # | Plan | Severity | Depends on | Status |
| --- | --- | --- | --- | --- |
| 001 | [Add strong easing tokens and use them for entrances](001-easing-tokens.md) | MEDIUM | — | DONE |
| 002 | [Move the project card's scroll reveal to a wrapper and stagger it](002-project-card-reveal-wrapper.md) | MEDIUM | — | DONE |
| 003 | [Stop animating layout on hover and shorten frequent hover motion](003-hover-motion-diet.md) | MEDIUM | 001 | DONE |
| 004 | [Add press feedback to shared buttons and project cards](004-press-feedback.md) | MEDIUM | 003 | DONE |
| 005 | [Calm the theme icon swap and the toggle's hover spin](005-theme-icon-and-toggle.md) | MEDIUM | — | DONE |
| 006 | [Interruptible enter/exit for the mobile menu, share menu and toast](006-menu-and-toast-transitions.md) | MEDIUM | 001 | DONE |
| 007 | [Replace `transition-all` and add press feedback to those buttons](007-replace-transition-all.md) | LOW | — | DONE |
| 008 | [Lighten and speed up the image fade-in](008-lighter-image-fade-in.md) | LOW | 001 | DONE |
| 009 | [Animate the gallery lightbox opening](009-lightbox-entrance.md) | LOW | 001 | DONE |
| 010 | [Make the hero typing animation run through once, then rest](010-typing-loop-once.md) | LOW | — | DONE |
| 011 | [Reduced motion: keep the fades, drop the movement](011-gentler-reduced-motion.md) | MEDIUM | 001–010 | DONE |

## Recommended order

1. **001** first: it adds the `ease-out-strong` / `ease-in-out-strong` tokens most
   other plans use.
2. **002** next: it fixes a real bug (revealed project cards never lift on hover,
   and their reveal fade snaps) and must land before card hover/press changes are
   judged.
3. **003 → 004** in that order: both edit `cardStyles` and `buttonBase` in
   `shared/lib/styles.ts`; 004's target strings assume 003 is done.
4. **005, 006, 007, 008, 009, 010** in any order; they touch separate lines.
5. **011** last: it prefixes the movement utilities introduced by all the others
   with `motion-safe:`.

## Files touched per plan

| File | Plans |
| --- | --- |
| `app/globals.css` | 001, 005, 006, 011 |
| `shared/lib/styles.ts` | 001, 003, 004, 005, 011 |
| `shared/lib/theme.ts` | 001 |
| `shared/ui/blur-image.tsx` | 008 |
| `shared/ui/theme-switcher.tsx` | 011 |
| `features/portfolio/components/project-card.tsx` | 002, 003, 011 |
| `features/portfolio/components/projects-section.tsx` | 002 |
| `app/(marketing)/projects/page.tsx` | 002 |
| `features/portfolio/components/post-list-item.tsx` | 003, 011 |
| `features/portfolio/components/header.tsx` | 006, 011 |
| `features/portfolio/components/post-engagement.tsx` | 006, 007, 011 |
| `features/portfolio/components/project-detail.tsx` | 007, 011 |
| `features/portfolio/components/project-gallery.tsx` | 007, 009, 011 |
| `features/portfolio/components/typing-role.tsx` | 010, 011 |
| `features/portfolio/components/hero-section.tsx` | 011 |

## Not planned

- The image shimmer placeholder in `shared/ui/blur-image.tsx` is invisible,
  because the whole `<img>` starts at `opacity-0`. Making it show would change
  how images load visually, so it needs a design decision first.

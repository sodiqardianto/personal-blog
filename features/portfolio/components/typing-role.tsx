"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const roles = [
  "software engineer",
  "Laravel developer",
  "React & Next.js builder",
  "Flutter developer",
] as const;

export function TypingRole() {
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

  return (
    <>
      <span className="sr-only">software engineer</span>
      <span aria-hidden="true">
        {currentRole.slice(0, visibleLength)}
        <span
          className={cn(
            "ml-[3px] inline-block h-[1.05em] w-2 bg-accent align-[-2px] transition-opacity duration-300",
            isDone ? "opacity-0" : "motion-safe:animate-typing-blink",
          )}
        />
      </span>
    </>
  );
}

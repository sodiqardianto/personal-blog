"use client";

import { useEffect, useState } from "react";

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

  return (
    <>
      <span className="sr-only">software engineer</span>
      <span aria-hidden="true">
        {currentRole.slice(0, visibleLength)}
        <span className="ml-[3px] inline-block h-[1.05em] w-2 animate-typing-blink bg-accent align-[-2px]" />
      </span>
    </>
  );
}

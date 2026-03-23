import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type PageSectionProps = {
  id: string;
  children: ReactNode;
  className?: string;
  contentClassName?: string;
  backgroundClassName?: string;
  disableVerticalPadding?: boolean;
};

export function PageSection({
  id,
  children,
  className,
  contentClassName,
  backgroundClassName,
  disableVerticalPadding = false,
}: PageSectionProps) {
  return (
    <section
      id={id}
      className={cn("scroll-mt-24", backgroundClassName, className)}
    >
      <div
        className={cn(
          "mx-auto max-w-210 px-[clamp(1.25rem,5vw,2rem)]",
          !disableVerticalPadding && "py-[clamp(4rem,9vw,7rem)]",
          contentClassName,
        )}
      >
        {children}
      </div>
    </section>
  );
}

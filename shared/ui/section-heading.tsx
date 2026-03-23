import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  label: string;
  title: string;
  className?: string;
};

export function SectionHeading({
  label,
  title,
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "sh mb-12 flex flex-wrap items-end gap-x-4 gap-y-3 sr sm:flex-nowrap sm:items-center",
        className,
      )}
    >
      <span className="whitespace-nowrap text-[0.72rem] font-medium uppercase tracking-[0.12em] text-blue dark:text-blue-dark">
        {label}
      </span>
      <h2 className="min-w-0 text-balance font-serif text-[clamp(1.8rem,4vw,2.6rem)] leading-tight tracking-tight sm:whitespace-nowrap">
        {title}
      </h2>
      <div className="h-px basis-full bg-blue/10 dark:bg-blue-dark/15 sm:min-w-4 sm:flex-1" />
    </div>
  );
}

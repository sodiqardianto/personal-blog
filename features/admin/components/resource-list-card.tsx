import Link from "next/link";
import { ArrowRightIcon } from "@/shared/ui";

type ResourceListItem = {
  title: string;
  status: string;
  updatedAt: string;
};

type ResourceListCardProps = {
  eyebrow: string;
  title: string;
  description: string;
  ctaLabel?: string;
  ctaHref?: string;
  items: readonly ResourceListItem[];
  accentClassName?: string;
};

export function ResourceListCard({
  eyebrow,
  title,
  description,
  ctaLabel,
  ctaHref,
  items,
  accentClassName = "bg-blue/8 text-blue dark:bg-blue-dark/10 dark:text-blue-dark",
}: ResourceListCardProps) {
  return (
    <article className="rounded-[1.7rem] border border-blue/10 bg-white/90 p-6 dark:border-blue-dark/12 dark:bg-navy-800/92">
      <div className="mb-4 flex items-start justify-between gap-4">
        <div>
          <p className="text-[0.72rem] font-medium uppercase tracking-[0.14em] text-blue dark:text-blue-dark">
            {eyebrow}
          </p>
          <h3 className="mt-2 text-xl font-medium text-ink dark:text-slate-100">
            {title}
          </h3>
          <p className="mt-2 max-w-md text-sm leading-7 text-ink/55 dark:text-slate-400">
            {description}
          </p>
        </div>

        {ctaLabel && ctaHref ? (
          <Link
            href={ctaHref}
            className="inline-flex items-center gap-2 rounded-full border border-blue/10 px-4 py-2 text-sm font-medium text-ink/60 transition-colors hover:border-blue/18 hover:text-blue dark:border-blue-dark/12 dark:text-slate-400 dark:hover:border-blue-dark/20 dark:hover:text-blue-dark"
          >
            {ctaLabel}
            <ArrowRightIcon className="h-4 w-4" />
          </Link>
        ) : null}
      </div>

      <div className="space-y-3">
        {items.length > 0 ? (
          items.map((item) => (
            <div
              key={`${item.title}-${item.updatedAt}`}
              className="rounded-[1.1rem] border border-blue/8 px-4 py-3 dark:border-blue-dark/12"
            >
              <div className="flex items-start justify-between gap-3">
                <p className="text-sm font-medium text-ink dark:text-slate-100">
                  {item.title}
                </p>
                <span
                  className={`rounded-full px-2.5 py-1 text-[0.68rem] font-medium uppercase tracking-[0.1em] ${accentClassName}`}
                >
                  {item.status}
                </span>
              </div>
              <p className="mt-2 text-[0.78rem] text-ink/42 dark:text-slate-500">
                Updated {item.updatedAt}
              </p>
            </div>
          ))
        ) : (
          <div className="rounded-[1.1rem] border border-dashed border-blue/12 px-4 py-6 text-sm leading-7 text-ink/48 dark:border-blue-dark/12 dark:text-slate-400">
            Nothing has been created here yet.
          </div>
        )}
      </div>
    </article>
  );
}

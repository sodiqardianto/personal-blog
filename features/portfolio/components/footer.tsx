type FooterProps = {
  author: string;
  location: string;
};

export function Footer({ author, location }: FooterProps) {
  return (
    <footer className="relative z-1 flex flex-wrap items-center justify-between gap-3 border-t border-blue/10 px-[clamp(1.25rem,5vw,3.5rem)] py-7 text-[0.78rem] text-ink/40 dark:border-blue-dark/12 dark:text-slate-600">
      <div className="flex w-full flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <span>© 2025 {author}. Made with care.</span>
        <span>
          {location} ·{" "}
          <a
            href="#"
            className="transition-colors hover:text-blue dark:hover:text-blue-dark"
          >
            Download CV
          </a>
        </span>
      </div>
    </footer>
  );
}

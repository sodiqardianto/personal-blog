type FooterProps = {
  author: string;
  location: string;
  cvHref: string;
};

export function Footer({ author, location, cvHref }: FooterProps) {
  return (
    <footer className="border-t border-line py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-6 font-mono text-xs text-soft sm:flex-row md:px-8">
        <span>© 2025 {author}. Made with care.</span>
        <span>
          {location} ·{" "}
          <a href={cvHref} className="transition-colors hover:text-accent">
            Download CV
          </a>
        </span>
      </div>
    </footer>
  );
}

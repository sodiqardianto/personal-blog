import type { Metadata } from "next";
import { DM_Sans, Instrument_Serif } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body",
});

const instrumentSerif = Instrument_Serif({
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-display",
});

export const metadata: Metadata = {
  title: "Sodiq Ardianto — Software Engineer",
  description:
    "Portfolio and writing site for Sodiq Ardianto, a software engineer focused on building reliable web products.",
};

const themeInitScript = `
  try {
    var storedTheme = localStorage.getItem("theme");
    var prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    var shouldUseDark = storedTheme === "dark" || (storedTheme === "system" && prefersDark);
    document.documentElement.classList.toggle("dark", shouldUseDark);
  } catch (_) {}
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${dmSans.variable} ${instrumentSerif.variable} scroll-smooth`}
    >
      <body className="grid-bg bg-slate-50 font-sans text-ink transition-colors duration-300 dark:bg-navy-900 dark:text-slate-200">
        <Script id="theme-init" strategy="beforeInteractive">
          {themeInitScript}
        </Script>
        {children}
      </body>
    </html>
  );
}

import type { ReactNode } from "react";
import { Footer, Header, navItems, siteMetadata } from "@/features/portfolio";

export default function MarketingLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <>
      <Header navItems={navItems} />
      {children}
      <Footer author={siteMetadata.author} location={siteMetadata.location} />
    </>
  );
}

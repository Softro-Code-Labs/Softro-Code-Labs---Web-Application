import type { Metadata } from "next";
import { NotFoundShell } from "@/components/NotFoundShell";
import { site } from "@/content/site";
import { fontClasses, themeScript } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: `Page not found | ${site.name}`,
};

/** Shown for any address that matches no page, in either language. */
export default function GlobalNotFound() {
  return (
    <html lang="en" className={fontClasses} data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <NotFoundShell />
      </body>
    </html>
  );
}

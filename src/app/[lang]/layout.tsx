import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Footer } from "@/components/Footer";
import { Motion } from "@/components/Motion";
import { Header, PhoneBar } from "@/components/SiteChrome";
import { getContent } from "@/content";
import { site } from "@/content/site";
import { isLang, langs, type Lang } from "@/i18n";
import { shareCard, shareImage } from "@/seo";
import { fontClasses, themeScript } from "../fonts";
import "../globals.css";

type Props = { children: ReactNode; params: Promise<{ lang: string }> };

/** Both languages are built ahead of time. */
export const generateStaticParams = () => langs.map((lang) => ({ lang }));

/**
 * Any other first part of an address is a real "page not found".
 * Without this, a stray request such as /old-page.html would show the English home page instead.
 */
export const dynamicParams = false;

/** src/proxy.ts only ever sends "en" or "si" here; anything else falls back to English. */
const pick = (value: string): Lang => (isLang(value) ? value : "en");

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const lang = pick((await params).lang);
  const { ui } = getContent(lang);
  return {
    metadataBase: new URL(site.url),
    title: { default: ui.meta.siteTitle, template: `%s | ${site.name}` },
    description: ui.meta.description,
    openGraph: shareCard(lang),
    twitter: { card: "summary_large_image", images: [shareImage] },
  };
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#070b14" },
    { media: "(prefers-color-scheme: light)", color: "#f5f6fa" },
  ],
  // Lets the phone action bar sit clear of the home indicator on modern phones.
  viewportFit: "cover",
};

export default async function RootLayout({ children, params }: Props) {
  const lang = pick((await params).lang);
  const { ui } = getContent(lang);
  return (
    // data-scroll-behavior: smooth scrolling for links within a page, but instant jumps between pages.
    <html lang={lang} className={fontClasses} data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <a className="skip" href="#main">
          {ui.chrome.skip}
        </a>
        <Header lang={lang} t={ui.chrome} whatsappLabel={ui.home.whatsapp} />
        <main id="main">{children}</main>
        <Footer lang={lang} t={ui.chrome} address={ui.address} />
        <PhoneBar lang={lang} t={ui.chrome} />
        <Motion />
      </body>
    </html>
  );
}

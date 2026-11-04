import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Footer, Header, PhoneBar } from "@/components/SiteChrome";
import { getContent } from "@/content";
import { site } from "@/content/site";
import { isLang, langs, type Lang } from "@/i18n";
import { fontClasses, themeScript } from "../fonts";
import "../globals.css";

type Props = { children: ReactNode; params: Promise<{ lang: string }> };

/** Both languages are built ahead of time. */
export const generateStaticParams = () => langs.map((lang) => ({ lang }));

/** src/proxy.ts only ever sends "en" or "si" here; anything else falls back to English. */
const pick = (value: string): Lang => (isLang(value) ? value : "en");

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const lang = pick((await params).lang);
  const { ui } = getContent(lang);
  return {
    metadataBase: new URL(site.url),
    title: { default: ui.meta.siteTitle, template: `%s | ${site.name}` },
    description: ui.meta.description,
    openGraph: { siteName: site.name, type: "website", locale: ui.meta.locale, images: ["/og.png"] },
    twitter: { card: "summary_large_image", images: ["/og.png"] },
  };
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0b1220" },
    { media: "(prefers-color-scheme: light)", color: "#eef1f6" },
  ],
};

export default async function RootLayout({ children, params }: Props) {
  const lang = pick((await params).lang);
  const { ui } = getContent(lang);
  return (
    <html lang={lang} className={fontClasses} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <a className="skip" href="#main">
          {ui.chrome.skip}
        </a>
        <Header lang={lang} t={ui.chrome} />
        <main id="main">{children}</main>
        <Footer lang={lang} t={ui.chrome} address={ui.address} />
        <PhoneBar lang={lang} t={ui.chrome} />
      </body>
    </html>
  );
}

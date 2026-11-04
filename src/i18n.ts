import type { Metadata } from "next";

/**
 * The site's two languages. English lives at the plain addresses (/work),
 * Sinhala under /si (/si/work). src/proxy.ts sends each request to the right one.
 */
export const langs = ["en", "si"] as const;
export type Lang = (typeof langs)[number];

export const isLang = (value: string): value is Lang => (langs as readonly string[]).includes(value);

/** The address of a page in a language: localize("si", "/work") is "/si/work". */
export function localize(lang: Lang, path: string) {
  if (lang === "en") return path;
  return path === "/" ? "/si" : `/si${path}`;
}

/** The language of a visible address. */
export const langOf = (pathname: string): Lang => (pathname === "/si" || pathname.startsWith("/si/") ? "si" : "en");

/** The same page in the other language, for the language switch. */
export function otherLanguagePath(pathname: string) {
  if (langOf(pathname) === "si") return pathname.slice(3) || "/";
  return localize("si", pathname);
}

/** Search engine hints that link each page to its translation. */
export function languageAlternates(lang: Lang, path: string) {
  return {
    canonical: localize(lang, path),
    languages: { en: path, si: localize("si", path), "x-default": path },
  };
}

/** What every page under app/[lang] receives. */
export type LangParams = { params: Promise<{ lang: string }> };

/** The page's language. src/proxy.ts only sends "en" or "si"; anything else falls back to English. */
export async function resolveLang(params: Promise<{ lang: string }>): Promise<Lang> {
  const { lang } = await params;
  return isLang(lang) ? lang : "en";
}

/** Title, description and language links for one page. */
export function pageMetadata(lang: Lang, path: string, title: string | undefined, description: string): Metadata {
  return {
    ...(title ? { title } : {}),
    description,
    alternates: languageAlternates(lang, path),
    openGraph: { url: localize(lang, path) },
  };
}

/** Fills {name} style placeholders in a translated string. */
export const fill = (text: string, values: Record<string, string>) => text.replace(/\{(\w+)\}/g, (_, key: string) => values[key] ?? `{${key}}`);

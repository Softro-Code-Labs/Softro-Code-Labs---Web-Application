import type { Metadata } from "next";
import { getContent } from "@/content";
import { site } from "@/content/site";
import { langs, languageAlternates, localize, type Lang } from "@/i18n";

/** The full address of a page, for sitemaps and structured data: absoluteUrl("/si/work"). */
export const absoluteUrl = (path: string) => `${site.url}${path === "/" ? "" : path}`;

/** The picture shown when a page is shared on WhatsApp, Facebook, LinkedIn or X (public/og.png). */
export const shareImage = { url: "/og.png", width: 1200, height: 630, alt: `${site.name}: Software that fits the people using it.` };

/**
 * The parts of a shared link's preview card that are the same on every page.
 * Next.js replaces the layout's card with a page's card instead of merging the two,
 * so each page repeats these through pageMetadata.
 */
export function shareCard(lang: Lang, withImage = true) {
  return {
    type: "website" as const,
    siteName: site.name,
    locale: getContent(lang).ui.meta.locale,
    alternateLocale: langs.filter((other) => other !== lang).map((other) => getContent(other).ui.meta.locale),
    ...(withImage ? { images: [shareImage] } : {}),
  };
}

/**
 * Title, description, language links and share card for one page.
 * `ownImage`: the page has its own opengraph-image file (a case study or a Lab page), so the site-wide
 * picture is left out here; otherwise it would win over the page's own. X falls back to that same picture.
 */
export function pageMetadata(lang: Lang, path: string, title: string | undefined, description: string, { ownImage = false } = {}): Metadata {
  return {
    ...(title ? { title } : {}),
    description,
    alternates: languageAlternates(lang, path),
    openGraph: { ...shareCard(lang, !ownImage), ...(title ? { title } : {}), description, url: localize(lang, path) },
    ...(ownImage ? { twitter: { card: "summary_large_image", ...(title ? { title } : {}), description } } : {}),
  };
}

/** Who we are and what we build, for search engines. On the home page in both languages. */
export function businessJsonLd(lang: Lang) {
  const { ui, services, capabilities } = getContent(lang);
  const business = `${site.url}/#business`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "LocalBusiness",
        "@id": business,
        name: site.name,
        legalName: site.legalName,
        url: site.url,
        logo: absoluteUrl("/brand/softro-mark.svg"),
        image: absoluteUrl(shareImage.url),
        description: ui.meta.description,
        email: site.email,
        telephone: site.phoneIntl,
        address: {
          "@type": "PostalAddress",
          streetAddress: site.address.street,
          addressLocality: site.address.town,
          addressCountry: site.address.country,
        },
        areaServed: { "@type": "Country", name: "Sri Lanka" },
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "sales",
          telephone: site.phoneIntl,
          email: site.email,
          availableLanguage: ["English", "Sinhala"],
        },
        knowsLanguage: ["en", "si"],
        knowsAbout: [...services.map((service) => service.name), ...capabilities.flatMap((group) => group.items.map((item) => item.name))],
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: ui.chrome.services,
          itemListElement: services.map((service) => ({
            "@type": "Offer",
            itemOffered: { "@type": "Service", name: service.name, description: service.short },
          })),
        },
      },
      {
        "@type": "WebSite",
        "@id": `${site.url}/#website`,
        url: site.url,
        name: site.name,
        inLanguage: [...langs],
        publisher: { "@id": business },
      },
    ],
  };
}

/** One step in a page's breadcrumb trail. */
export type Crumb = { name: string; path: string };

/** Where a page sits in the site (Home › Work › Baileyn), so search results can show the trail. */
export function breadcrumbJsonLd(lang: Lang, trail: Crumb[]) {
  const crumbs = [{ name: getContent(lang).ui.chrome.home, path: "/" }, ...trail];
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: absoluteUrl(localize(lang, crumb.path)),
    })),
  };
}

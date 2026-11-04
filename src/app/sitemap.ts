import type { MetadataRoute } from "next";
import { projects } from "@/content/projects";
import { site } from "@/content/site";
import { langs, localize } from "@/i18n";
import { absoluteUrl } from "@/seo";

/** Every page in both languages, each pointing to its translation, with the date the content last changed (site.updated). */
export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["/", "/work", "/services", "/lab", "/about", "/contact", "/privacy", "/terms", ...projects.map((p) => `/work/${p.slug}`)];
  return langs.flatMap((lang) =>
    paths.map((path) => ({
      url: absoluteUrl(localize(lang, path)),
      lastModified: site.updated,
      alternates: { languages: { en: absoluteUrl(path), si: absoluteUrl(localize("si", path)) } },
    })),
  );
}

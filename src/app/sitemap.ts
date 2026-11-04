import type { MetadataRoute } from "next";
import { projects } from "@/content/projects";
import { site } from "@/content/site";
import { langs, localize } from "@/i18n";

/** Every page in both languages, each pointing to its translation. */
export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["/", "/work", "/services", "/lab", "/about", "/contact", "/privacy", "/terms", ...projects.map((p) => `/work/${p.slug}`)];
  const url = (path: string) => `${site.url}${path === "/" ? "" : path}`;
  return langs.flatMap((lang) =>
    paths.map((path) => ({
      url: url(localize(lang, path)),
      alternates: { languages: { en: url(path), si: url(localize("si", path)) } },
    })),
  );
}

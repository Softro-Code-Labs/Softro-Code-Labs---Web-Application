import type { MetadataRoute } from "next";
import { labApps, labShots, projects } from "@/content/projects";
import { site } from "@/content/site";
import { langs, localize } from "@/i18n";
import { absoluteUrl } from "@/seo";

/** The screenshots each page shows, so Google Images can find them and link back to the page. */
const images: Record<string, string[]> = {
  "/lab": Object.values(labShots).map((shot) => shot.src),
  ...Object.fromEntries(projects.map((project) => [`/work/${project.slug}`, project.gallery.map((shot) => shot.src)])),
  ...Object.fromEntries(labApps.map((app) => [`/lab/${app.slug}`, app.gallery.map((shot) => shot.src)])),
};

/**
 * Every page in both languages, each pointing to its translation, with the date the content last changed (site.updated)
 * and the screenshots it shows.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["/", "/work", ...projects.map((p) => `/work/${p.slug}`), "/services", "/lab", ...labApps.map((app) => `/lab/${app.slug}`), "/about", "/contact", "/privacy", "/terms"];
  return langs.flatMap((lang) =>
    paths.map((path) => ({
      url: absoluteUrl(localize(lang, path)),
      lastModified: site.updated,
      alternates: { languages: { en: absoluteUrl(path), si: absoluteUrl(localize("si", path)) } },
      ...(images[path] ? { images: [...new Set(images[path])].map(absoluteUrl) } : {}),
    })),
  );
}

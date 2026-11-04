import type { MetadataRoute } from "next";
import { projects } from "@/content/projects";
import { site } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["", "/work", "/services", "/lab", "/about", "/contact", "/privacy", "/terms", ...projects.map((p) => `/work/${p.slug}`)];
  return paths.map((path) => ({ url: `${site.url}${path}` }));
}

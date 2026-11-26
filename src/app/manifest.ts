import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { en } from "@/content/ui";

/** Tells browsers and search engines the site's name, colours and icons, for example when it's added to a phone's home screen. */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.name,
    short_name: "Softro",
    description: en.meta.description,
    start_url: "/",
    display: "browser",
    background_color: "#070b14",
    theme_color: "#070b14",
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml" },
      { src: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  };
}

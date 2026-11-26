import { labApps } from "@/content/projects";
import { en } from "@/content/ui";
import { shareCard, shareSize } from "@/share-card";

/** The picture shown when a Lab app's page is shared: its icon, name, tagline and a desktop screenshot. */
export function generateImageMetadata({ params }: { params: { lang: string; app: string } }) {
  const app = labApps.find((item) => item.slug === params.app);
  return [{ id: "card", size: shareSize, contentType: "image/png", alt: app ? `${app.name}: ${en.apps[app.slug].tagline}, by Softro Code Labs` : "Softro Code Labs" }];
}

export default async function Image({ params }: { params: Promise<{ lang: string; app: string }> }) {
  const { app: slug } = await params;
  const app = labApps.find((item) => item.slug === slug) ?? labApps[0];
  const shot = app.gallery.find((item) => item.frame === "browser") ?? app.screen;
  return shareCard({ eyebrow: "From our Lab", title: app.name, subtitle: en.apps[app.slug].tagline, shot, icon: app.icon, tint: app.tint });
}

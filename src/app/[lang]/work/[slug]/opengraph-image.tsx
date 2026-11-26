import { projects } from "@/content/projects";
import { shareCard, shareSize } from "@/share-card";

/** The picture shown when a case study is shared: the project's name, what it is, and its first screenshot. */
export function generateImageMetadata({ params }: { params: { lang: string; slug: string } }) {
  const project = projects.find((item) => item.slug === params.slug);
  return [{ id: "card", size: shareSize, contentType: "image/png", alt: project ? `${project.name}: ${project.kind}, a project by Softro Code Labs` : "Softro Code Labs" }];
}

export default async function Image({ params }: { params: Promise<{ lang: string; slug: string }> }) {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug) ?? projects[0];
  return shareCard({ eyebrow: "Case study", title: project.name, subtitle: project.kind, shot: project.gallery[0], tint: project.tint });
}

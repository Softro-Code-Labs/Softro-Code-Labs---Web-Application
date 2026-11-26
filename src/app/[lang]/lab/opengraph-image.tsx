import { labShots } from "@/content/projects";
import { shareCard, shareSize } from "@/share-card";

/** The picture shown when The Lab page is shared: Swift Converter Hub, the product the page opens with. */
export function generateImageMetadata() {
  return [{ id: "card", size: shareSize, contentType: "image/png", alt: "Swift Converter Hub: 46 free file tools that run in your browser, from the Softro Code Labs Lab" }];
}

export default async function Image() {
  return shareCard({
    eyebrow: "The Lab",
    title: "Swift Converter Hub",
    subtitle: "46 free file tools that run right in your browser",
    shot: labShots.home,
    tint: "#ef4c5b",
  });
}

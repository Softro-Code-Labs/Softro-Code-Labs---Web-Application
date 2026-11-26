import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import sharp from "sharp";
import type { Shot } from "@/content/projects";
import { site } from "@/content/site";

/**
 * The picture shown when a project or app page is shared on WhatsApp, Facebook, LinkedIn or X:
 * the project's name and a real screenshot, instead of the site-wide public/og.png.
 * Made once at build time by the opengraph-image files next to those pages.
 * The words are in English on both versions of the site: the built-in font has no Sinhala letters.
 */
export const shareSize = { width: 1200, height: 630 };

/**
 * A file in public/ as a data address the image renderer can draw.
 * The renderer can't read WebP, so screenshots and icons are turned into PNG first, with sharp.
 * sharp must stay in package.json's dependencies: pnpm (which Vercel uses) won't find it through Next.js.
 */
async function asDataUrl(publicPath: string, width?: number) {
  const data = await readFile(join(process.cwd(), "public", publicPath));
  if (publicPath.endsWith(".svg")) return `data:image/svg+xml;base64,${data.toString("base64")}`;
  if (publicPath.endsWith(".png")) return `data:image/png;base64,${data.toString("base64")}`;
  const png = await sharp(data).resize({ width, withoutEnlargement: true }).png().toBuffer();
  return `data:image/png;base64,${png.toString("base64")}`;
}

export async function shareCard({ eyebrow, title, subtitle, shot, icon, tint }: { eyebrow: string; title: string; subtitle: string; shot: Shot; icon?: string; tint: string }) {
  const [mark, screen, appIcon] = await Promise.all([
    asDataUrl("/brand/softro-mark.svg"),
    asDataUrl(shot.src, shot.frame === "phone" ? 600 : 1280),
    icon ? asDataUrl(icon, 168) : Promise.resolve(undefined),
  ]);

  // The screenshot sits on the right, bleeding off the edge, at its own shape.
  const phone = shot.frame === "phone";
  const shotWidth = phone ? 300 : 640;
  const shotHeight = Math.round((shot.height / shot.width) * shotWidth);

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", position: "relative", background: "#0b0b0d", color: "#f3efe8", overflow: "hidden" }}>
        <div
          style={{
            position: "absolute",
            right: -160,
            top: -120,
            width: 900,
            height: 900,
            borderRadius: 900,
            background: `radial-gradient(circle, ${tint}55 0%, ${tint}00 65%)`,
          }}
        />
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", width: phone ? 760 : 560, padding: "60px 0 56px 64px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            {mark && <img src={mark} width={40} height={40} alt="" />}
            <div style={{ fontSize: 26, fontWeight: 600 }}>{site.name}</div>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 22, letterSpacing: 4, textTransform: "uppercase", color: "#f04a5c" }}>{eyebrow}</div>
            <div style={{ display: "flex", alignItems: "center", gap: 22, marginTop: 18 }}>
              {appIcon && <img src={appIcon} width={84} height={84} style={{ borderRadius: 20 }} alt="" />}
              <div style={{ fontSize: title.length > (appIcon ? 8 : 14) ? 64 : 80, lineHeight: 1.05, letterSpacing: -2 }}>{title}</div>
            </div>
            <div style={{ fontSize: 30, lineHeight: 1.35, color: "#a8a39b", marginTop: 20, maxWidth: 520 }}>{subtitle}</div>
          </div>
          <div style={{ fontSize: 22, color: "#8a857e" }}>{site.url.replace("https://", "")}</div>
        </div>
        {screen && (
        <img
          src={screen}
          width={shotWidth}
          height={shotHeight}
          alt=""
          style={{
            position: "absolute",
            right: phone ? 90 : -40,
            top: Math.max(40, Math.round((shareSize.height - shotHeight) / 2)),
            borderRadius: phone ? 28 : 16,
            border: "2px solid rgba(243, 239, 232, 0.14)",
            boxShadow: "0 30px 80px rgba(0, 0, 0, 0.6)",
          }}
        />
        )}
      </div>
    ),
    shareSize,
  );
}

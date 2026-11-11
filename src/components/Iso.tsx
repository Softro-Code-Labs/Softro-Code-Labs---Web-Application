import { vars } from "./ui";

/*
  Block illustrations. Each picture is a handful of boxes drawn in the same
  corner-on view as the logo, so the site's drawings and its mark feel like one family.
  A box is just three flat shapes (top, left face, right face); the colours and the
  light come from the .iso classes in globals.css, so they follow the theme.
*/

type Tone = "accent" | "deep" | "bone" | "soft";
type Box = {
  /** Where the box stands: right, forward, up. */
  at: [number, number, number];
  /** Its width, depth and height. */
  size: [number, number, number];
  tone?: Tone;
  /** How far it rises when the row is hovered, in pixels. */
  lift?: number;
};

const UNIT = 10;
const COS30 = Math.sqrt(3) / 2;
const project = (x: number, y: number, z: number): [number, number] => [(x - y) * COS30 * UNIT, ((x + y) / 2 - z) * UNIT];
const path = (points: [number, number][]) => `M${points.map(([x, y]) => `${x.toFixed(1)} ${y.toFixed(1)}`).join("L")}Z`;

/** Draws the boxes in the order given, so list the farthest ones first. */
export function Iso({ boxes, className = "" }: { boxes: Box[]; className?: string }) {
  const drawn = boxes.map(({ at: [x, y, z], size: [w, d, h], tone, lift = 0 }) => ({
    tone,
    lift,
    top: [project(x, y, z + h), project(x + w, y, z + h), project(x + w, y + d, z + h), project(x, y + d, z + h)],
    left: [project(x, y + d, z + h), project(x + w, y + d, z + h), project(x + w, y + d, z), project(x, y + d, z)],
    right: [project(x + w, y, z + h), project(x + w, y + d, z + h), project(x + w, y + d, z), project(x + w, y, z)],
  }));
  const all = drawn.flatMap((box) => [...box.top, ...box.left, ...box.right]);
  const xs = all.map(([x]) => x);
  const ys = all.map(([, y]) => y);
  const pad = 12;
  const [minX, minY] = [Math.min(...xs) - pad, Math.min(...ys) - pad];
  const [width, height] = [Math.max(...xs) + pad - minX, Math.max(...ys) + pad - minY];
  return (
    <svg className={`iso ${className}`} viewBox={`${minX.toFixed(1)} ${minY.toFixed(1)} ${width.toFixed(1)} ${height.toFixed(1)}`} aria-hidden="true" focusable="false">
      {drawn.map((box, index) => (
        <g key={index} className={`iso-box ${box.tone ? `tone-${box.tone}` : ""}`} style={vars({ "--i": index, "--lift": box.lift })}>
          <path className="f-top" d={path(box.top as [number, number][])} />
          <path className="f-left" d={path(box.left as [number, number][])} />
          <path className="f-right" d={path(box.right as [number, number][])} />
        </g>
      ))}
    </svg>
  );
}

/** A phone standing up, with app tiles in front of it. */
const phone: Box[] = [
  { at: [0, 2, 0], size: [5, 0.9, 9.4] },
  { at: [0.5, 2.9, 0.9], size: [4, 0.14, 7.6], tone: "accent" },
  { at: [1.1, 2.94, 6.4], size: [2.8, 0.14, 1.3], tone: "bone", lift: 3 },
  { at: [0.6, 5.2, 0], size: [1.7, 1.7, 1.7], tone: "bone", lift: 7 },
  { at: [3.4, 5.6, 0], size: [1.4, 1.4, 1.4], tone: "soft", lift: 12 },
  { at: [6.4, 3.2, 3.4], size: [1.2, 1.2, 1.2], tone: "accent", lift: 18 },
];

/** A small shop with an awning, and parcels ready to go. */
const shop: Box[] = [
  { at: [0, 0, 0], size: [6.4, 5, 3.6], tone: "soft" },
  { at: [-0.4, -0.4, 3.6], size: [7.2, 5.8, 0.55], tone: "bone" },
  { at: [2.3, 5, 0], size: [1.8, 0.14, 2.3], tone: "deep" },
  { at: [-0.4, 5, 2.7], size: [7.2, 1.5, 0.5], tone: "accent", lift: 4 },
  { at: [8, 3.4, 0], size: [1.9, 1.9, 1.9], tone: "bone", lift: 6 },
  { at: [8.4, 3.8, 1.9], size: [1.2, 1.2, 1.2], tone: "accent", lift: 16 },
];

/** A browser window standing up, with its page laid out in blocks. */
const browser: Box[] = [
  { at: [0, 2, 0], size: [9.4, 0.7, 6.6] },
  { at: [0.5, 2.7, 5.4], size: [8.4, 0.14, 0.7], tone: "bone" },
  { at: [0.5, 2.7, 2.5], size: [5, 0.14, 2.5], tone: "accent", lift: 4 },
  { at: [5.9, 2.7, 3.9], size: [3, 0.14, 1.1], tone: "soft", lift: 8 },
  { at: [5.9, 2.7, 2.5], size: [3, 0.14, 1], tone: "soft", lift: 8 },
  { at: [0.5, 2.7, 0.6], size: [8.4, 0.14, 1.5], tone: "soft" },
  { at: [7.4, 5.4, 0.8], size: [1.2, 1.2, 1.2], tone: "bone", lift: 16 },
];

/** Four blocks, and the piece that fits on top: software made to measure. */
const blocks: Box[] = [
  { at: [0, 0, 0], size: [3, 3, 3], tone: "soft" },
  { at: [3.25, 0, 0], size: [3, 3, 3] },
  { at: [0, 3.25, 0], size: [3, 3, 3] },
  { at: [3.25, 3.25, 0], size: [3, 3, 3], tone: "bone" },
  { at: [1.6, 1.6, 4.3], size: [3, 3, 3], tone: "accent", lift: 14 },
];

/** Each core service's illustration, keyed by the example it links to (the same in both languages). */
export const serviceArt: Record<string, Box[]> = {
  "/work/ola-kids": phone,
  "/work/baileyn": shop,
  "/work/tourvista-tours": browser,
  "/lab": blocks,
};

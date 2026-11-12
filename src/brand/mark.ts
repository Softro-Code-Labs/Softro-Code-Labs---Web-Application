/**
 * The Softro mark, exactly as in the logo files (public/brand/softro-mark.svg).
 *
 * Its outline is kept here once, so the logo in the header and footer (components/Logo.tsx)
 * and the 3D model in the hero (components/Hero3D.tsx) are always the same shape as the logo.
 * If the logo ever changes, change these points to match the new file.
 */
export type Point = [number, number];

/** The area of the logo's drawing: left, top, width, height. */
export const markBox = { x: 40, y: 17, width: 110, height: 167 };

/** The outer edge of the mark. */
export const markOutline: Point[] = [
  [111.5, 24],
  [47, 54.5],
  [47, 102],
  [98.5, 121.5],
  [98.5, 154],
  [83, 146],
  [83, 121.4],
  [69, 116.3],
  [69, 154.6],
  [112.6, 177],
  [112.6, 78],
  [98.3, 83.2],
  [98.3, 105.9],
  [83, 100.4],
  [83, 83.4],
  [129, 66.4],
  [129, 117],
  [117, 113],
  [117, 127.5],
  [143.3, 137],
  [143.3, 46.8],
  [112.6, 57],
  [112.6, 24],
];

/** The opening cut out of its upper half. */
export const markHole: Point[] = [
  [98.3, 45.4],
  [98.3, 62.4],
  [69, 73.2],
  [69, 95.2],
  [61.2, 92.8],
  [61.2, 63.5],
];

const toPath = (points: Point[]) => `M${points.map(([x, y]) => `${x} ${y}`).join(" L")} Z`;

/** SVG path data for the whole mark (drawn with fill-rule "evenodd", so the opening stays open). */
export const markPath = `${toPath(markOutline)} ${toPath(markHole)}`;

/** The logo's crimson: deep at the top, running to bright at the bottom (from y 40 to y 170). */
export const markColors = { deep: "#a70b21", bright: "#ef4c5b", from: 40, to: 170 };

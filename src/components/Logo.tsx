import { useId } from "react";
import { markBox, markColors, markPath } from "@/brand/mark";

/**
 * The Softro mark, drawn inline so it costs no download. `height` sets its size;
 * the width follows the logo's own proportions.
 */
export function Mark({ height = 34, className = "" }: { height?: number; className?: string }) {
  const id = useId();
  return (
    <svg
      width={(height * markBox.width) / markBox.height}
      height={height}
      viewBox={`${markBox.x} ${markBox.y} ${markBox.width} ${markBox.height}`}
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id={id} x1="0" y1={markColors.from} x2="0" y2={markColors.to} gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor={markColors.deep} />
          <stop offset="1" stopColor={markColors.bright} />
        </linearGradient>
      </defs>
      <path fill={`url(#${id})`} fillRule="evenodd" d={markPath} />
    </svg>
  );
}

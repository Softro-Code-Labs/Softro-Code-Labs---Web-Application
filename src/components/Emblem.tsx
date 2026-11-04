import { vars } from "./ui";

/*
  The Softro mark as a solid 3D object, built from flat slices of the logo stacked
  in depth, like cut acrylic. Each slice is the logo file used as a mask, so the
  page carries no extra drawing data. Slices darken toward the back, so the edges
  read as thickness when the mark turns.
*/
const shades = ["#c3132e", "#b0112a", "#9e0f25", "#8c0d21", "#7c0b1d", "#6d0a1a", "#600916", "#530813", "#470711", "#3c060e", "#32050c", "#29040a"];

export function Emblem({ className = "", interactive = false }: { className?: string; interactive?: boolean }) {
  return (
    <div className={`emblem ${className}`} aria-hidden="true">
      <div className="emblem-body" data-tilt={interactive ? 12 : undefined}>
        <div className="emblem-spin">
          {shades
            .map((color, index) => ({ color, depth: index + 1 }))
            .reverse()
            .map(({ color, depth }) => (
              <div key={depth} className="emblem-slice" style={vars({ "--d": depth, "--c": color })} />
            ))}
          <div className="emblem-slice emblem-face" style={vars({ "--d": 0 })} />
          <div className="emblem-shine" />
        </div>
      </div>
    </div>
  );
}

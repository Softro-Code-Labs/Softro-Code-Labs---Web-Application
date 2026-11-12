import Image from "next/image";
import type { CSSProperties, ReactNode } from "react";
import type { Project, Shot } from "@/content/projects";
import { vars } from "./ui";

/*
  Device frames and 3D stages.
  A stage is a box of fixed proportions holding "layers": screens placed at a depth
  (translateZ) inside a perspective. Motion.tsx tilts the stage toward the pointer,
  so nearer screens move more than farther ones. Sizes use container units (cqw),
  so a stage looks the same at any width.
*/

type ShotProps = {
  shot: Shot;
  sizes: string;
  /** Load straight away, for screens near the top of the page. */
  eager?: boolean;
  /** Hide from screen readers when the same screen is described elsewhere. */
  decorative?: boolean;
  className?: string;
};

function Screenshot({ shot, sizes, eager, decorative }: ShotProps) {
  return (
    <Image
      className="block h-auto w-full"
      src={shot.src}
      width={shot.width}
      height={shot.height}
      alt={decorative ? "" : shot.alt}
      sizes={sizes}
      loading={eager ? "eager" : "lazy"}
    />
  );
}

export function BrowserFrame(props: ShotProps) {
  return (
    <div className={`device device-browser ${props.className ?? ""}`}>
      <div className="device-bar" aria-hidden="true" />
      <div className="screen">
        <Screenshot {...props} />
      </div>
    </div>
  );
}

export function PhoneFrame(props: ShotProps) {
  return (
    <div className={`device-phone ${props.className ?? ""}`}>
      <div className="screen">
        <div className="status" aria-hidden="true" />
        <Screenshot {...props} />
      </div>
    </div>
  );
}

export function WideFrame(props: ShotProps) {
  return (
    <div className={`device-wide ${props.className ?? ""}`}>
      <div className="screen">
        <Screenshot {...props} />
      </div>
    </div>
  );
}

export function Frame(props: ShotProps) {
  if (props.shot.frame === "phone") return <PhoneFrame {...props} />;
  if (props.shot.frame === "phone-wide") return <WideFrame {...props} />;
  return <BrowserFrame {...props} />;
}

type Layer = {
  node: ReactNode;
  /** Position inside the stage, in percentages. */
  place: CSSProperties;
  /** Depth: positive comes toward the viewer. */
  z: string;
  /** Gentle floating: seconds per swing, and a start offset. */
  bob?: [number, number];
};

/**
 * A 3D stage. `tilt` is the most it turns toward the pointer, in degrees.
 * rx and ry are its resting angles.
 */
export function Stage({
  layers,
  ratio,
  rx = "6deg",
  ry = "-10deg",
  tilt = 7,
  className = "",
  children,
}: {
  layers: Layer[];
  ratio: string;
  rx?: string;
  ry?: string;
  tilt?: number;
  className?: string;
  children?: ReactNode;
}) {
  return (
    <div className={`stage-box ${className}`} style={{ aspectRatio: ratio }}>
      <div className="stage-persp">
        <div className="stage" data-tilt={tilt} style={vars({ "--rx0": rx, "--ry0": ry })}>
          {layers.map((layer, index) => (
            <div
              key={index}
              className={`layer ${layer.bob ? "bob" : ""}`}
              style={{ ...layer.place, ...vars(layer.bob ? { "--z": layer.z, "--bob-t": `${layer.bob[0]}s`, "--bob-d": `${layer.bob[1]}s` } : { "--z": layer.z }) }}
            >
              {layer.node}
            </div>
          ))}
        </div>
      </div>
      {children}
    </div>
  );
}

/** The project's screens arranged in depth: a phone in front of a page, or two pages staggered. */
export function ProjectStage({
  project,
  eager = false,
  decorative = false,
  flip = false,
  className = "",
}: {
  project: Pick<Project, "screen" | "accent">;
  eager?: boolean;
  decorative?: boolean;
  /** Turn the other way, for stages on the left of the text. */
  flip?: boolean;
  className?: string;
}) {
  const { screen: main, accent } = project;
  const shared = { eager, decorative };
  const phoneSizes = "(max-width: 1023px) 34vw, 220px";
  const pageSizes = "(max-width: 1023px) 80vw, 560px";
  let layers: Layer[];

  if (main.frame === "phone" && accent?.frame === "phone-wide") {
    layers = [
      { node: <WideFrame shot={accent} sizes={pageSizes} {...shared} />, place: { left: "5%", top: "38%", width: "66%" }, z: "0cqw", bob: [10, -4] },
      { node: <PhoneFrame shot={main} sizes={phoneSizes} {...shared} />, place: { right: "8%", top: "7%", width: "27%" }, z: "9cqw", bob: [8, -1] },
    ];
  } else if (main.frame === "phone" && accent) {
    layers = [
      { node: <BrowserFrame shot={accent} sizes={pageSizes} {...shared} />, place: { left: "5%", top: "12%", width: "71%" }, z: "0cqw", bob: [11, -5] },
      { node: <PhoneFrame shot={main} sizes={phoneSizes} {...shared} />, place: { right: "7%", top: "15%", width: "25%" }, z: "10cqw", bob: [8, -2] },
    ];
  } else if (main.frame === "phone") {
    layers = [{ node: <PhoneFrame shot={main} sizes={phoneSizes} {...shared} />, place: { left: "35%", top: "6%", width: "30%" }, z: "4cqw", bob: [9, -2] }];
  } else if (main.frame === "phone-wide") {
    layers = [{ node: <WideFrame shot={main} sizes={pageSizes} {...shared} />, place: { left: "8%", top: "26%", width: "84%" }, z: "4cqw", bob: [10, -3] }];
  } else {
    layers = [
      ...(accent
        ? [{ node: <Frame shot={accent} sizes={pageSizes} {...shared} />, place: { right: "4%", top: "6%", width: "60%" }, z: "-6cqw", bob: [12, -6] } as Layer]
        : []),
      {
        node: <BrowserFrame shot={main} sizes={pageSizes} {...shared} />,
        place: accent ? { left: "4%", top: "25%", width: "70%" } : { left: "7%", top: "12%", width: "86%" },
        z: "5cqw",
        bob: [9, -2],
      },
    ];
  }

  return <Stage layers={layers} ratio="1 / 0.74" rx="5deg" ry={flip ? "9deg" : "-9deg"} tilt={6} className={className} />;
}

/** A gallery of every screen for a case study or product, with captions. */
export function ScreenGallery({ shots }: { shots: Shot[] }) {
  return (
    <div className="grid grid-cols-2 gap-x-4 gap-y-12 min-[1024px]:grid-cols-12 min-[1024px]:gap-x-8 min-[1024px]:gap-y-16">
      {shots.map((shot, index) => (
        <figure
          key={shot.src}
          data-reveal
          style={vars({ "--i": index % 2 })}
          className={
            shot.frame === "phone"
              ? "col-span-1 max-w-[300px] min-[1024px]:col-span-3"
              : shot.wide
                ? "col-span-2 min-[1024px]:col-span-9"
                : "col-span-2 min-[1024px]:col-span-6"
          }
        >
          {/* A container, so the frame's bezel scales with the figure. */}
          <div className="stage-box">
            <Frame
              shot={shot}
              sizes={shot.frame === "phone" ? "(max-width: 1023px) 50vw, 300px" : shot.wide ? "(max-width: 1023px) 100vw, 900px" : "(max-width: 1023px) 100vw, 600px"}
            />
          </div>
          <figcaption className="mt-4 max-w-[52ch] text-[15px] leading-relaxed text-muted">{shot.caption}</figcaption>
        </figure>
      ))}
    </div>
  );
}

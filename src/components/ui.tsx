import { ViewTransition, type CSSProperties, type ReactNode } from "react";

/** Inline CSS custom properties, such as vars({ "--i": 2 }) for an animation delay step. */
export const vars = (values: Record<`--${string}`, string | number>) => values as CSSProperties;

/** Wraps a page so that moving between pages fades the old one out and lifts the new one in. */
export function Page({ children }: { children: ReactNode }) {
  return (
    <ViewTransition enter="page-in" exit="page-out" default="none">
      <div>{children}</div>
    </ViewTransition>
  );
}

/** Renders text with the words between *asterisks* highlighted. */
export function Emphasis({ text }: { text: string }) {
  const parts = text.split("*");
  return <>{parts.map((part, index) => (index % 2 ? <span key={index} className="em">{part}</span> : part))}</>;
}

export function Eyebrow({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <p className={`eyebrow ${className}`}>{children}</p>;
}

/**
 * The backdrop behind a page's opening: faint dot paper, and a soft crimson light in the top corner.
 * The home page passes `light={false}`, because its 3D logo brings its own glow.
 */
export function Backdrop({ light = true }: { light?: boolean }) {
  return (
    <div className="hero-bg" aria-hidden="true">
      <div className="grid-bg" />
      {light ? (
        <div className="glow glow-crimson top-[-30%] right-[-12%] h-[70vw] max-h-[940px] w-[70vw] max-w-[940px]" />
      ) : (
        <div className="glow glow-soft top-[-30%] left-[-20%] h-[60vw] max-h-[800px] w-[60vw] max-w-[800px]" />
      )}
    </div>
  );
}

/** Eyebrow, heading and optional lead for a section, with an optional link on the right. */
export function SectionHeader({
  eyebrow,
  title,
  lead,
  action,
  id,
  as: Heading = "h2",
}: {
  eyebrow?: ReactNode;
  title: ReactNode;
  lead?: ReactNode;
  action?: ReactNode;
  id?: string;
  as?: "h1" | "h2";
}) {
  return (
    // Heading on the left; the lead and any link sit on the right, level with its last line.
    <div className="mb-12 grid items-end gap-x-16 gap-y-6 min-[1024px]:mb-20 min-[1024px]:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)]" data-reveal>
      <div className="max-w-[820px]">
        {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
        <Heading id={id} className={`display-2 ${eyebrow ? "mt-5" : ""}`}>
          {title}
        </Heading>
      </div>
      {(lead || action) && (
        <div className="grid max-w-[560px] gap-6 justify-self-start min-[1024px]:justify-self-end">
          {lead && <p className="lead text-muted">{lead}</p>}
          {action}
        </div>
      )}
    </div>
  );
}

/** The opening of an inner page: eyebrow, page title, lead, and an optional visual on the right. */
export function PageHero({
  eyebrow,
  title,
  lead,
  children,
  aside,
}: {
  eyebrow?: ReactNode;
  title: ReactNode;
  lead?: ReactNode;
  children?: ReactNode;
  aside?: ReactNode;
}) {
  return (
    // With a visual beside the text, the whole opening is the area that tilts it.
    <section className="hero" data-tilt-scope={aside ? "" : undefined}>
      <Backdrop />
      <div
        className={`wrap grid items-center gap-x-16 gap-y-12 pt-12 pb-16 min-[1024px]:pt-24 min-[1024px]:pb-28 ${aside ? "min-[1024px]:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]" : ""}`}
      >
        <div className="max-w-[900px]">
          {eyebrow && (
            <Eyebrow className="enter">
              {eyebrow}
            </Eyebrow>
          )}
          <h1 className="display-1 mt-6">{title}</h1>
          {lead && (
            <p className="lead enter mt-7 max-w-[640px] text-muted" style={vars({ "--i": 1 })}>
              {lead}
            </p>
          )}
          {children && (
            <div className="enter mt-9" style={vars({ "--i": 2 })} data-cta>
              {children}
            </div>
          )}
        </div>
        {aside}
      </div>
    </section>
  );
}

/** "Live" or a similar status, with a coloured dot. */
export function StatusBadge({ label, live }: { label: string; live: boolean }) {
  return (
    <span className="chip">
      <span className={`dot ${live ? "dot-pulse" : "dot-wait"}`} aria-hidden="true" />
      <span className="text-fg">{label}</span>
    </span>
  );
}

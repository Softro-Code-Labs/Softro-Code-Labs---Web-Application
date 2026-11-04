import type { CSSProperties, ReactNode } from "react";

type Variant = "first" | "last";

export function Rail({ variant }: { variant?: Variant }) {
  const extra = variant === "first" ? " spine-first" : variant === "last" ? " spine-last" : "";
  return (
    <>
      <div className="rail" aria-hidden="true">
        <div className={`spine${extra}`} />
      </div>
      <div className="gut" />
    </>
  );
}

/** A full-width row of text beside the spine. */
export function RibbonRow({
  id,
  children,
  variant,
  className = "",
  as: Tag = "section",
}: {
  id?: string;
  children: ReactNode;
  variant?: Variant;
  className?: string;
  as?: "section" | "div";
}) {
  return (
    <Tag id={id} className="rows">
      <div className={`span-text ${className}`}>{children}</div>
      <Rail variant={variant} />
    </Tag>
  );
}

/** Text on the left, a sloped panel on the right, folding off the spine. */
export function FoldRow({
  id,
  text,
  art,
  panelClass = "bg-raised",
  minHeight,
  className = "",
}: {
  id?: string;
  text: ReactNode;
  art: ReactNode;
  panelClass?: string;
  minHeight?: number;
  className?: string;
}) {
  return (
    <article id={id} className={`rows ${className}`}>
      <div className="pt-12 pb-10 min-[981px]:py-[72px] min-[981px]:pr-16">{text}</div>
      <div className="fold" style={minHeight ? ({ "--fold-min": `${minHeight}px` } as CSSProperties) : undefined}>
        <div className="band" />
        <div className={`panel ${panelClass}`}>{art}</div>
      </div>
      <Rail />
    </article>
  );
}

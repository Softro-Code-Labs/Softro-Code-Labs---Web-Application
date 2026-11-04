import Image from "next/image";
import type { CSSProperties } from "react";
import type { Project, Shot } from "@/content/projects";

/* The device frames are the one place rounded corners appear: they draw real hardware, not site UI. */
const bezel = "border-[#05080f] bg-[#05080f]";

/*
  The panel shows the main screen, plus an accent screen from 640px up:
  - main phone + sideways accent: the sideways screen sits in front, lower left.
  - main phone + browser accent: the browser sits behind, to the left.
  - main browser + browser accent: the accent sits behind, higher up and to the right.
  On phones the panel is too narrow for two, so only the main screen shows.
*/
const accentOnly = "hidden min-[640px]:block";

/** The project's screens, placed in the sloped panel. */
export function ProjectScreen({ project }: { project: Project }) {
  const { screen: main, accent } = project;

  if (main.frame === "phone") {
    return (
      <>
        {accent?.frame === "browser" && (
          <Browser shot={accent} className={`left-6 z-0 ${accentOnly}`} style={{ width: "min(460px, 72%)", bottom: 0 }} cut />
        )}
        {/* An upright phone rising out of the bottom of the panel; the lower part is cut off on purpose. */}
        <div
          className={`panel-art z-10 overflow-hidden rounded-t-[34px] border-[10px] border-b-0 ${accent?.frame === "browser" ? "min-[981px]:right-6!" : "min-[981px]:right-16!"} ${bezel}`}
          // Slimmer beside a browser, so more of the page behind stays visible.
          style={accent?.frame === "browser" ? { width: 240, height: 400 } : { width: 280, height: 420 }}
        >
          <Image className="h-full w-full object-cover object-top" src={main.src} width={main.width} height={main.height} alt={main.alt} sizes="280px" />
        </div>
        {accent?.frame === "phone-wide" && (
          <div className={`absolute bottom-8 left-6 z-20 overflow-hidden rounded-[22px] border-[8px] ${bezel} ${accentOnly}`} style={{ width: "min(360px, 58%)" }}>
            <Image className="block h-auto w-full rounded-[14px]" src={accent.src} width={accent.width} height={accent.height} alt={accent.alt} sizes="360px" />
          </div>
        )}
      </>
    );
  }

  if (main.frame === "phone-wide") {
    return (
      <div className={`panel-art overflow-hidden rounded-[26px] border-[10px] ${bezel}`} style={{ bottom: 48, width: "min(540px, calc(100% - 32px))" }}>
        <Image className="block h-auto w-full rounded-[16px]" src={main.src} width={main.width} height={main.height} alt={main.alt} sizes="(max-width: 980px) 100vw, 540px" />
      </div>
    );
  }

  return (
    <>
      {accent?.frame === "browser" && (
        <Browser shot={accent} className={`right-6 z-0 ${accentOnly}`} style={{ width: "min(400px, 62%)", bottom: 200 }} />
      )}
      <Browser
        shot={main}
        className={`z-10 right-4 ${accent ? "min-[640px]:right-[120px]" : "min-[981px]:right-10"}`}
        style={{ width: accent ? "min(500px, calc(100% - 32px))" : "min(560px, calc(100% - 32px))", bottom: 0 }}
        cut
      />
    </>
  );
}

/** A single desktop screenshot rising out of a sloped panel. */
export function PanelShot({ shot }: { shot: Shot }) {
  return <Browser shot={shot} className="right-4 z-10 min-[981px]:right-10" style={{ width: "min(560px, calc(100% - 32px))", bottom: 0 }} cut />;
}

/** A desktop browser window. `cut` drops the bottom edge so the window rises out of the panel. */
function Browser({ shot, className, style, cut = false }: { shot: Shot; className: string; style: CSSProperties; cut?: boolean }) {
  return (
    <div className={`absolute overflow-hidden border-[6px] border-t-[16px] ${cut ? "rounded-t-[10px] border-b-0" : "rounded-[10px]"} ${bezel} ${className}`} style={style}>
      <Image className="block h-auto w-full" src={shot.src} width={shot.width} height={shot.height} alt={shot.alt} sizes="(max-width: 980px) 100vw, 500px" />
    </div>
  );
}

/** Every screen for a case study, with captions. Wide screens take more room than upright phones. */
export function ScreenGallery({ shots }: { shots: Shot[] }) {
  return (
    // Two columns on phones (upright screens sit side by side), twelve on desktop.
    <div className="grid grid-cols-2 gap-x-4 gap-y-10 min-[981px]:grid-cols-12 min-[981px]:gap-x-10 min-[981px]:gap-y-12">
      {shots.map((shot) => (
        <figure
          key={shot.src}
          className={
            shot.frame === "phone"
              ? "col-span-1 max-w-[300px] min-[981px]:col-span-3"
              : shot.wide
                ? "col-span-2 min-[981px]:col-span-9"
                : "col-span-2 min-[981px]:col-span-6"
          }
        >
          <Framed shot={shot} />
          <figcaption className="mt-3 max-w-[48ch] text-[15px] text-muted">{shot.caption}</figcaption>
        </figure>
      ))}
    </div>
  );
}

function Framed({ shot }: { shot: Shot }) {
  const radius = shot.frame === "phone" ? "rounded-[30px] border-[9px]" : shot.frame === "phone-wide" ? "rounded-[22px] border-[9px]" : "rounded-t-[8px] border-[6px] border-t-[18px]";
  const sizes = shot.frame === "phone" ? "(max-width: 980px) 50vw, 300px" : shot.wide ? "(max-width: 980px) 100vw, 900px" : "(max-width: 980px) 100vw, 560px";
  return (
    <div className={`overflow-hidden ${radius} ${bezel}`}>
      <Image className={`block h-auto w-full ${shot.frame === "browser" ? "" : "rounded-[14px]"}`} src={shot.src} width={shot.width} height={shot.height} alt={shot.alt} sizes={sizes} />
    </div>
  );
}

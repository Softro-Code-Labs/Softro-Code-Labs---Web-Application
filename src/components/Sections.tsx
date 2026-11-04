import Link from "next/link";
import { ContactForm } from "@/components/ContactForm";
import { FoldRow, RibbonRow } from "@/components/Ribbon";
import { PanelShot, ProjectScreen } from "@/components/ProjectScreen";
import type { Project } from "@/content/projects";
import { labShots, studios } from "@/content/projects";
import { site } from "@/content/site";
import { testimonials } from "@/content/testimonials";

export function ProjectRow({ project }: { project: Project }) {
  return (
    <FoldRow
      art={<ProjectScreen project={project} />}
      text={
        <>
          <h3 className="display-m">{project.name}</h3>
          <p className="mt-2 text-sm text-muted">{project.kind}</p>
          <p className="lead mt-6 max-w-[460px]">{project.summary}</p>
          <p className="mt-6 text-sm text-muted">{project.tech.join(", ")}</p>
          <p className="mt-6">
            <Link className="link" href={`/work/${project.slug}`} aria-label={`See the ${project.name} case study`}>
              See the case study
            </Link>
          </p>
        </>
      }
    />
  );
}

export function StudioBars() {
  const most = Math.max(...studios.map((studio) => studio.tools));
  return (
    <div className="panel-art grid gap-3.5 text-[15px] leading-tight text-paper" style={{ bottom: 56, width: "min(440px, calc(100% - 32px))" }}>
      <p className="mb-1 font-display text-2xl font-semibold">Tools in each studio</p>
      {studios.map((studio) => (
        <div key={studio.name} className="grid grid-cols-[96px_minmax(0,1fr)_24px] items-center gap-3">
          <span>{studio.name}</span>
          <span className="block h-3.5 bg-crimson" style={{ width: `${(studio.tools / most) * 100}%` }} />
          <span>{studio.tools}</span>
        </div>
      ))}
    </div>
  );
}

export function LabRow({ id, pageTitle = false }: { id?: string; pageTitle?: boolean }) {
  const Title = pageTitle ? "h1" : "h2";
  const Name = pageTitle ? "h2" : "h3";
  return (
    <FoldRow
      id={id}
      className="on-paper bg-paper text-night"
      panelClass="bg-night"
      minHeight={760}
      // The Lab page shows the real product; the Home page keeps the quick chart.
      art={pageTitle ? <PanelShot shot={labShots.home} /> : <StudioBars />}
      text={
        <>
          <Title className="display-l">What we build when nobody asks</Title>
          <p className="mt-6 max-w-[480px] text-muted-paper">
            The Lab is where we build our own products. It keeps our skills sharp and lets us test ideas with real users.
          </p>
          <Name className="display-m mt-10">Swift Converter Hub</Name>
          <p className="lead mt-3 max-w-[460px]">46 free file tools that run inside your browser, so your files never leave your device.</p>
          <p className="mt-6 text-sm text-muted-paper">Next.js, WebAssembly, ImageMagick, FFmpeg</p>
          <p className="mt-6">
            <a className="link" href="https://www.swiftconverterhub.com/">
              Try Swift Converter Hub
            </a>
          </p>
        </>
      }
    />
  );
}

/** Stays hidden until real client words are added to content/testimonials.ts. */
export function Testimonials() {
  if (testimonials.length === 0) return null;
  return (
    <RibbonRow className="pt-14 pb-12">
      <h2 className="display-l mb-10">What clients say</h2>
      <div className="grid gap-10 min-[981px]:grid-cols-2 min-[981px]:pr-16">
        {testimonials.map((item) => (
          <figure key={item.name}>
            <blockquote className="lead">“{item.quote}”</blockquote>
            <figcaption className="mt-3 text-sm text-muted">
              {item.name}, {item.role}, {item.project}
            </figcaption>
          </figure>
        ))}
      </div>
    </RibbonRow>
  );
}

export function ClosingEnquiry() {
  return (
    <RibbonRow id="enquiry" variant="last" className="pt-16 pb-24">
      <div className="grid items-start gap-12 min-[981px]:grid-cols-2 min-[981px]:pr-16">
        <div>
          <h2 className="font-display text-[clamp(46px,5.2vw,76px)] leading-[1.02] font-semibold">Have something you want built?</h2>
          <p className="lead mt-6 max-w-[460px] text-muted">Tell us what it needs to do, and we&apos;ll tell you how we&apos;d build it.</p>
          <p className="mt-6">
            <a className="link" href={site.whatsapp}>
              Prefer WhatsApp? Message us
            </a>
          </p>
        </div>
        <ContactForm />
      </div>
    </RibbonRow>
  );
}

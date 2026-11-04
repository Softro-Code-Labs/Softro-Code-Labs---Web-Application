import Link from "next/link";
import { ContactForm } from "@/components/ContactForm";
import { FoldRow, RibbonRow } from "@/components/Ribbon";
import { PanelShot, ProjectScreen } from "@/components/ProjectScreen";
import { getContent } from "@/content";
import type { Project, Step } from "@/content/projects";
import { whatsapp } from "@/content/site";
import { testimonials } from "@/content/testimonials";
import { fill, localize, type Lang } from "@/i18n";

export function ProjectRow({ project, lang }: { project: Project; lang: Lang }) {
  const { ui } = getContent(lang);
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
            <Link className="link" href={localize(lang, `/work/${project.slug}`)} aria-label={fill(ui.projectRow.ctaLabel, { name: project.name })}>
              {ui.projectRow.cta}
            </Link>
          </p>
        </>
      }
    />
  );
}

export function StudioBars({ lang }: { lang: Lang }) {
  const { ui, studios } = getContent(lang);
  const most = Math.max(...studios.map((studio) => studio.tools));
  return (
    <div className="panel-art grid gap-3.5 text-[15px] leading-tight text-paper" style={{ bottom: 56, width: "min(440px, calc(100% - 32px))" }}>
      <p className="mb-1 font-display text-2xl font-semibold">{ui.lab.barsHeading}</p>
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

export function LabRow({ id, lang, pageTitle = false }: { id?: string; lang: Lang; pageTitle?: boolean }) {
  const { ui, labShots } = getContent(lang);
  const Title = pageTitle ? "h1" : "h2";
  const Name = pageTitle ? "h2" : "h3";
  return (
    <FoldRow
      id={id}
      className="on-paper bg-paper text-night"
      panelClass="bg-night"
      minHeight={760}
      // The Lab page shows the real product; the Home page keeps the quick chart.
      art={pageTitle ? <PanelShot shot={labShots.home} /> : <StudioBars lang={lang} />}
      text={
        <>
          <Title className="display-l">{ui.lab.heading}</Title>
          <p className="mt-6 max-w-[480px] text-muted-paper">{ui.lab.intro}</p>
          <Name className="display-m mt-10">Swift Converter Hub</Name>
          <p className="lead mt-3 max-w-[460px]">{ui.lab.productLead}</p>
          <p className="mt-6 text-sm text-muted-paper">Next.js, WebAssembly, ImageMagick, FFmpeg</p>
          <p className="mt-6">
            <a className="link" href="https://www.swiftconverterhub.com/">
              {ui.lab.tryIt}
            </a>
          </p>
        </>
      }
    />
  );
}

/** Stays hidden until real client words are added to content/testimonials.ts. */
export function Testimonials({ lang }: { lang: Lang }) {
  if (testimonials.length === 0) return null;
  const { ui } = getContent(lang);
  return (
    <RibbonRow className="pt-14 pb-12">
      <h2 className="display-l mb-10">{ui.testimonialsHeading}</h2>
      <div className="grid gap-10 min-[981px]:grid-cols-2 min-[981px]:pr-16">
        {testimonials.map((item) => (
          // Quotes are shown in the words the client used.
          <figure key={item.name} lang="en">
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

export function ClosingEnquiry({ lang }: { lang: Lang }) {
  const { ui } = getContent(lang);
  return (
    <RibbonRow id="enquiry" variant="last" className="pt-16 pb-24">
      <div className="grid items-start gap-12 min-[981px]:grid-cols-2 min-[981px]:pr-16">
        <div>
          <h2 className="closing-heading font-display text-[clamp(46px,5.2vw,76px)] leading-[1.02] font-semibold">{ui.closing.heading}</h2>
          <p className="lead mt-6 max-w-[460px] text-muted">{ui.closing.lead}</p>
          <p className="mt-6">
            <a className="link" href={whatsapp(lang)}>
              {ui.closing.whatsapp}
            </a>
          </p>
        </div>
        <ContactForm lang={lang} t={ui.form} replyTime={ui.replyTime} />
      </div>
    </RibbonRow>
  );
}

/** The four steps of a project, used on the Home and About pages. */
export function Steps({ steps }: { steps: Step[] }) {
  return (
    <ol className="grid gap-8 min-[640px]:grid-cols-2 min-[981px]:grid-cols-4 min-[981px]:pr-16">
      {steps.map((step, index) => (
        <li key={step.name}>
          <p aria-hidden="true" className="font-display text-[56px] leading-none font-semibold text-crimson">
            {index + 1}
          </p>
          <h3 className="mt-3 text-[21px] leading-snug font-semibold">{step.name}</h3>
          <p className="mt-2 text-muted">{step.text}</p>
        </li>
      ))}
    </ol>
  );
}

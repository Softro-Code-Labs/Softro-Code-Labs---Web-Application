import Link from "next/link";
import type { ComponentType, SVGProps } from "react";
import { ContactForm } from "@/components/ContactForm";
import { BrowserFrame, HeroStage, ProjectStage, Stage } from "@/components/Devices";
import { getContent } from "@/content";
import type { CapabilityGroupId, CapabilityId, Project, Step } from "@/content/projects";
import { site, whatsapp } from "@/content/site";
import { testimonials } from "@/content/testimonials";
import { fill, localize, type Lang } from "@/i18n";
import {
  ArrowRight,
  ArrowUpRight,
  Bag,
  Briefcase,
  Browser,
  Building,
  Calendar,
  Chat,
  Check,
  Cloud,
  Code,
  Dashboard,
  Globe,
  GraduationCap,
  Layers,
  Mail,
  Monitor,
  Phone,
  Plug,
  Plus,
  Quote,
  Receipt,
  Server,
  Shield,
  Smartphone,
  Sparkles,
  Users,
  Wrench,
  Zap,
} from "./icons";
import { Emphasis, Eyebrow, SectionHeader, StatusBadge, vars } from "./ui";

type IconType = ComponentType<SVGProps<SVGSVGElement> & { size?: number }>;

/* ---------------------------------------------------------------- Hero */

export function Hero({ lang }: { lang: Lang }) {
  const { ui, projects } = getContent(lang);
  const t = ui.home;
  return (
    <section className="hero" data-tilt-scope>
      <div className="hero-bg" aria-hidden="true">
        <div className="grid-bg" />
        <div className="glow glow-crimson top-[-22%] right-[-14%] h-[78vw] max-h-[1040px] w-[78vw] max-w-[1040px]" />
        <div className="glow glow-indigo top-[-30%] left-[-20%] h-[60vw] max-h-[800px] w-[60vw] max-w-[800px]" />
      </div>

      <div className="wrap grid items-center gap-x-10 gap-y-12 pt-10 pb-12 min-[1024px]:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] min-[1024px]:pt-16 min-[1024px]:pb-14">
        <div>
          <p className="chip enter">
            <span className="dot dot-pulse" aria-hidden="true" />
            <span className="text-fg">{t.availability}</span>
          </p>
          {/* No entrance animation on the heading: it is the first thing worth reading, so it paints at once. */}
          <h1 className="display-hero mt-7 max-w-[780px]">
            <Emphasis text={t.heading} />
          </h1>
          <p className="lead enter mt-7 max-w-[560px] text-muted" style={vars({ "--i": 1 })}>
            {t.lead}
          </p>
          <div className="enter mt-10 flex flex-wrap items-center gap-3" style={vars({ "--i": 2 })} data-cta>
            <Link href={localize(lang, "/contact")} className="btn btn-primary">
              {ui.chrome.start}
              <ArrowRight size={18} className="arrow" />
            </Link>
            <a href={whatsapp(lang)} className="btn btn-secondary">
              <Chat size={18} />
              {t.whatsapp}
            </a>
          </div>
          <ul className="enter mt-8 flex flex-wrap gap-x-6 gap-y-2.5 text-[14.5px] text-muted" style={vars({ "--i": 3 })}>
            {t.assurances.map((item) => (
              <li key={item} className="flex items-center gap-2">
                <Check size={16} className="flex-none text-accent" />
                {fill(item, { time: ui.replyTime })}
              </li>
            ))}
          </ul>
        </div>

        {/* The screens are real client work; selecting them goes to the work section. */}
        <a href="#work" aria-label={t.seeWork} className="-mx-2 block rounded-[28px] px-2 min-[1024px]:mx-0 min-[1024px]:px-0">
          <HeroStage projects={projects} />
        </a>
      </div>

      <div className="wrap pb-6">
        <Stats stats={t.stats} />
      </div>
    </section>
  );
}

/** Real numbers only. Each counts up from zero (CSS only); screen readers get the plain number. */
function Stats({ stats }: { stats: { value: number; label: string }[] }) {
  const borders = [
    "border-r border-b min-[1024px]:border-b-0",
    "border-b min-[1024px]:border-r min-[1024px]:border-b-0",
    "border-r",
    "",
  ];
  return (
    <dl className="card enter grid grid-cols-2 overflow-hidden min-[1024px]:grid-cols-4" style={vars({ "--i": 4 })}>
      {stats.map((stat, index) => (
        <div key={stat.label} className={`flex flex-col-reverse justify-end gap-2 border-line p-5 min-[640px]:p-7 ${borders[index] ?? ""}`}>
          <dt className="text-[14px] leading-snug text-muted min-[640px]:text-[15px]">{stat.label}</dt>
          <dd className="font-display text-[clamp(2.1rem,1.5rem+2vw,3.2rem)] leading-none font-bold tracking-[-0.036em]">
            <span className="sr-only">{stat.value}</span>
            <span aria-hidden="true" className="count" style={vars({ "--to": stat.value })} />
          </dd>
        </div>
      ))}
    </dl>
  );
}

/* ---------------------------------------------------------------- Work */

export function ProjectCard({
  project,
  lang,
  index,
  eager = false,
  as: Heading = "h3",
}: {
  project: Project;
  lang: Lang;
  index: number;
  eager?: boolean;
  as?: "h2" | "h3";
}) {
  const { ui } = getContent(lang);
  const flip = index % 2 === 1;
  return (
    <article className="card project-card spot p-2.5 min-[1024px]:p-3" data-tilt-scope data-spot data-reveal>
      <div className="grid items-center gap-6 min-[1024px]:grid-cols-12 min-[1024px]:gap-4">
        <div className={`px-4 pt-5 pb-3 min-[640px]:px-6 min-[1024px]:col-span-5 min-[1024px]:px-9 min-[1024px]:py-10 ${flip ? "min-[1024px]:order-2" : ""}`}>
          <div className="flex flex-wrap items-center gap-2">
            <StatusBadge label={project.status} live={Boolean(project.link)} />
            <span className="chip">{project.kind}</span>
          </div>
          <Heading className="display-2 mt-6" lang="en">
            {project.name}
          </Heading>
          <p className="mt-4 text-[17px] leading-relaxed text-muted">{project.summary}</p>
          <ul className="mt-6 flex flex-wrap gap-2">
            {project.tech.map((item) => (
              <li key={item} className="chip chip-mono">
                {item}
              </li>
            ))}
          </ul>
          <Link
            href={localize(lang, `/work/${project.slug}`)}
            className="link-arrow stretch mt-8"
            aria-label={fill(ui.projectRow.ctaLabel, { name: project.name })}
          >
            {ui.projectRow.cta}
            <span className="ring">
              <ArrowRight size={16} className="arrow" />
            </span>
          </Link>
        </div>
        <div className={`project-stage min-[1024px]:col-span-7 ${flip ? "min-[1024px]:order-1" : ""}`} style={vars({ "--tint": project.tint })}>
          <div className="grid-bg" aria-hidden="true" />
          <ProjectStage project={project} flip={flip} eager={eager} />
        </div>
      </div>
    </article>
  );
}

/** `eagerFirst` loads the first project's screens straight away, for pages where it is near the top. */
export function WorkList({ projects, lang, as, eagerFirst = false }: { projects: Project[]; lang: Lang; as?: "h2" | "h3"; eagerFirst?: boolean }) {
  return (
    <div className="grid gap-6 min-[1024px]:gap-8">
      {projects.map((project, index) => (
        <ProjectCard key={project.slug} project={project} lang={lang} index={index} as={as} eager={eagerFirst && index === 0} />
      ))}
    </div>
  );
}

/* ---------------------------------------------------------------- The Lab */

export function LabFeature({ lang, pageTitle = false }: { lang: Lang; pageTitle?: boolean }) {
  const { ui, labShots, studios } = getContent(lang);
  const t = ui.lab;
  const Title = pageTitle ? "h1" : "h2";
  const Name = pageTitle ? "h2" : "h3";
  const most = Math.max(...studios.map((studio) => studio.tools));

  const stage = (
    <Stage
      ratio="1 / 0.86"
      rx="6deg"
      ry="-12deg"
      tilt={7}
      layers={[
        {
          node: <BrowserFrame shot={labShots.convert} sizes="(max-width: 1023px) 84vw, 520px" eager={pageTitle} />,
          place: { left: "0%", top: "4%", width: "84%" },
          z: "0cqw",
          bob: [11, -4],
        },
        {
          node: (
            <div className="float-card bars rounded-[max(12px,2.4cqw)] p-[max(12px,3cqw)]">
              <p className="text-[max(12px,2.5cqw)] leading-tight font-semibold text-fg">{t.barsHeading}</p>
              <ul className="mt-[max(8px,2cqw)] grid gap-[max(6px,1.3cqw)]">
                {studios.map((studio, index) => (
                  <li key={studio.name} className="grid grid-cols-[max(64px,13.5cqw)_1fr_max(18px,3.4cqw)] items-center gap-[max(6px,1.4cqw)] text-[max(11px,2.1cqw)] leading-none text-muted">
                    <span>{studio.name}</span>
                    <span className="block">
                      <span className="bar-fill block" style={{ ...vars({ "--i": index }), width: `${(studio.tools / most) * 100}%` }} />
                    </span>
                    <span className="text-right font-mono text-fg">{studio.tools}</span>
                  </li>
                ))}
              </ul>
            </div>
          ),
          place: { right: "0%", top: "47%", width: "47%" },
          z: "10cqw",
          bob: [8, -2],
        },
        {
          node: (
            <p className="float-card flex max-w-[52cqw] items-center gap-[1.6cqw] rounded-[max(12px,2cqw)] px-[max(10px,2.2cqw)] py-[max(8px,1.6cqw)] text-[max(11px,2.1cqw)] leading-snug font-semibold text-fg">
              <Shield className="h-[max(16px,3cqw)] w-[max(16px,3cqw)] flex-none text-ok" />
              {t.chip}
            </p>
          ),
          place: { left: "3%", top: "80%" },
          z: "16cqw",
          bob: [7, -5],
        },
      ]}
    />
  );

  const text = (
    <div>
      <Eyebrow className={pageTitle ? "enter" : ""}>{ui.chrome.lab}</Eyebrow>
      <Title className={`${pageTitle ? "display-1" : "display-2"} mt-5`}>{t.heading}</Title>
      <p className="lead mt-6 max-w-[540px] text-muted">{t.intro}</p>
      <div className="hairline my-9 max-w-[540px]" />
      <Name className="title" lang="en">
        Swift Converter Hub
      </Name>
      <p className="mt-3 max-w-[520px] text-[17.5px] leading-relaxed">{t.productLead}</p>
      <ul className="mt-6 flex flex-wrap gap-2">
        {["Next.js", "WebAssembly", "ImageMagick", "FFmpeg"].map((item) => (
          <li key={item} className="chip chip-mono" lang="en">
            {item}
          </li>
        ))}
      </ul>
      <a className="btn btn-primary mt-9" href="https://www.swiftconverterhub.com/">
        {t.tryIt}
        <ArrowUpRight size={18} className="arrow arrow-ne" />
      </a>
    </div>
  );

  if (pageTitle) {
    return (
      <section className="hero" data-tilt-scope>
        <div className="hero-bg" aria-hidden="true">
          <div className="grid-bg" />
          <div className="glow glow-crimson top-[-25%] right-[-12%] h-[70vw] max-h-[960px] w-[70vw] max-w-[960px]" />
          <div className="glow glow-indigo top-[10%] left-[-25%] h-[50vw] max-h-[700px] w-[50vw] max-w-[700px]" />
        </div>
        <div className="wrap grid items-center gap-x-14 gap-y-14 pt-14 pb-20 min-[1024px]:grid-cols-2 min-[1024px]:pt-24 min-[1024px]:pb-28">
          {text}
          <div className="stage-enter">{stage}</div>
        </div>
      </section>
    );
  }

  return (
    <section id="lab" className="section defer" aria-label={ui.chrome.lab}>
      <div className="wrap">
        <div className="card relative overflow-hidden" data-tilt-scope data-reveal>
          <div className="cta-glow" aria-hidden="true" />
          <div className="relative grid items-center gap-x-12 gap-y-12 p-6 min-[640px]:p-10 min-[1024px]:grid-cols-2 min-[1024px]:p-14">
            {text}
            {stage}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- What we build */

/** Each core service's icon, keyed by the example it links to (the same in both languages). */
export const serviceIcons: Record<string, IconType> = {
  "/work/tourvista-tours": Browser,
  "/work/baileyn": Bag,
  "/work/ola-kids": Smartphone,
  "/lab": Wrench,
};

const groupIcons: Record<CapabilityGroupId, IconType> = { run: Briefcase, online: Globe, smarter: Sparkles, bespoke: Code };

const capabilityIcons: Record<CapabilityId, IconType> = {
  "erp-crm": Users,
  business: Building,
  "inventory-pos": Receipt,
  booking: Calendar,
  saas: Layers,
  "web-platforms": Dashboard,
  lms: GraduationCap,
  cloud: Cloud,
  ai: Sparkles,
  automation: Zap,
  integrations: Plug,
  custom: Code,
  desktop: Monitor,
  enterprise: Server,
};

/**
 * Two bands naming everything we build, right under the opening. They slide sideways as the
 * page scrolls (only while scrolling, never on their own). Decorative: the same list follows below.
 */
export function CapabilityRibbons({ lang }: { lang: Lang }) {
  const { services, capabilities } = getContent(lang);
  const names = [...services.map((service) => service.name), ...capabilities.flatMap((group) => group.items.map((item) => item.name))];
  const half = Math.ceil(names.length / 2);
  return (
    <div className="ribbons defer" style={vars({ "--defer-h": "180px" })} aria-hidden="true">
      {[names.slice(0, half), names.slice(half)].map((row, band) => (
        <div key={band} className={`ribbon-band ${band ? "ribbon-band-alt" : ""}`}>
          <div className="ribbon-track">
            {[0, 1, 2].flatMap((copy) =>
              row.map((name) => (
                <span key={`${copy}-${name}`} className="ribbon-item">
                  {name}
                </span>
              )),
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

/** The core services: what we build every day, each with a real project to look at. */
function ServiceCards({ lang }: { lang: Lang }) {
  const { ui, services } = getContent(lang);
  return (
    <div className="grid gap-4 min-[768px]:grid-cols-2 min-[1024px]:gap-5">
      {services.map((service, index) => {
        const Icon = serviceIcons[service.example.href] ?? Browser;
        return (
          <article key={service.name} className="card spot flex flex-col p-7 min-[1024px]:p-9" data-spot data-reveal style={vars({ "--i": index % 2 })}>
            <div className="flex items-start justify-between gap-4">
              <span className="icon-tile">
                <Icon size={22} />
              </span>
              <span className="font-mono text-[12px] tracking-[0.12em] text-subtle" aria-hidden="true">
                0{index + 1}
              </span>
            </div>
            <h3 className="title mt-8">{service.name}</h3>
            <p className="mt-3 text-muted">{service.short}</p>
            <p className="mt-auto pt-7 text-[15px] text-subtle">
              {ui.services.example}{" "}
              <Link className="link" href={localize(lang, service.example.href)}>
                {service.example.label}
              </Link>
            </p>
          </article>
        );
      })}
    </div>
  );
}

/**
 * Everything else we can build, in four groups. Compact on the Home page (names only);
 * `detailed` on the Services page adds a line about each.
 */
export function CapabilityGroups({ lang, detailed = false, as: Heading = "h4" }: { lang: Lang; detailed?: boolean; as?: "h3" | "h4" }) {
  const { capabilities } = getContent(lang);
  const ItemHeading = Heading === "h3" ? "h4" : "h5";
  return (
    <div className={`grid gap-4 min-[1024px]:gap-5 ${detailed ? "" : "min-[900px]:grid-cols-2"}`}>
      {capabilities.map((group, index) => {
        const Icon = groupIcons[group.id];
        const intro = (
          <div>
            <div className="flex items-center gap-4">
              <span className="icon-tile">
                <Icon size={22} />
              </span>
              <Heading className="title">{group.name}</Heading>
            </div>
            <p className="mt-4 text-muted">{group.text}</p>
          </div>
        );
        return detailed ? (
          // Full width: the group on the left, a line about each kind of software on the right.
          <article
            key={group.id}
            className="card spot grid items-start gap-x-10 gap-y-7 p-7 min-[1024px]:grid-cols-[minmax(0,0.75fr)_minmax(0,1.5fr)] min-[1024px]:p-9"
            data-spot
            data-reveal
          >
            {intro}
            <ul className="grid gap-3 min-[640px]:grid-cols-2">
              {group.items.map((item) => {
                const ItemIcon = capabilityIcons[item.id];
                return (
                  <li key={item.id} className="cap-item">
                    <span className="cap-icon">
                      <ItemIcon size={18} />
                    </span>
                    <div className="min-w-0">
                      <ItemHeading className="leading-snug font-semibold">{item.name}</ItemHeading>
                      <p className="mt-1 text-[15px] leading-relaxed text-muted">{item.text}</p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </article>
        ) : (
          <article key={group.id} className="card spot p-7 min-[1024px]:p-9" data-spot data-reveal style={vars({ "--i": index % 2 })}>
            {intro}
            <ul className="mt-6 flex flex-wrap gap-2">
              {group.items.map((item) => {
                const ItemIcon = capabilityIcons[item.id];
                return (
                  <li key={item.id} className="chip chip-cap">
                    <ItemIcon size={15} className="flex-none text-accent" />
                    {item.name}
                  </li>
                );
              })}
            </ul>
          </article>
        );
      })}
    </div>
  );
}

/** The open slot at the end of the list: an invitation to bring any other idea. */
export function IdeaCard({ lang }: { lang: Lang }) {
  const { ui } = getContent(lang);
  const t = ui.build;
  return (
    <div className="idea-card mt-5" data-reveal data-cta>
      <span className="idea-plus" aria-hidden="true">
        <Plus size={26} strokeWidth={2.2} />
      </span>
      <div className="min-w-0">
        <p className="title">{t.ideaTitle}</p>
        <p className="mt-2 max-w-[640px] text-muted">{t.ideaText}</p>
      </div>
      <Link href={localize(lang, "/contact")} className="btn btn-primary">
        {t.ideaCta}
        <ArrowRight size={18} className="arrow" />
      </Link>
    </div>
  );
}

/** The Home page's "What we build": core services first, then the wider range, then the open invitation. */
export function WhatWeBuild({ lang }: { lang: Lang }) {
  const { ui } = getContent(lang);
  const t = ui.build;
  return (
    <section id="what-we-build" className="section defer" style={vars({ "--defer-h": "2000px" })} aria-labelledby="build-heading">
      <div className="wrap">
        <SectionHeader
          id="build-heading"
          eyebrow={t.eyebrow}
          title={<Emphasis text={t.heading} />}
          lead={t.lead}
          action={
            <Link className="link-arrow" href={localize(lang, "/services")}>
              {t.servicesLink}
              <span className="ring">
                <ArrowRight size={16} className="arrow" />
              </span>
            </Link>
          }
        />
        <ServiceCards lang={lang} />

        <div className="mt-20 min-[1024px]:mt-24">
          <div className="mb-10 max-w-[720px]" data-reveal>
            <Eyebrow>{t.moreEyebrow}</Eyebrow>
            <h3 className="display-3 mt-4">{t.moreHeading}</h3>
            <p className="lead mt-4 text-muted">{t.moreLead}</p>
          </div>
          <CapabilityGroups lang={lang} />
          <IdeaCard lang={lang} />
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- Process */

/** The four steps of a project, used on the Home, Services and About pages. */
export function Process({ steps, eyebrow, title }: { steps: Step[]; eyebrow: string; title: string }) {
  return (
    <section className="section defer" style={vars({ "--defer-h": "600px" })} aria-labelledby="process-heading">
      <div className="wrap">
        <SectionHeader id="process-heading" eyebrow={eyebrow} title={title} />
        <ol className="grid gap-9 min-[1024px]:grid-cols-4 min-[1024px]:gap-10">
          {steps.map((step, index) => (
            <li key={step.name} className="step grid grid-cols-[56px_minmax(0,1fr)] gap-5 min-[1024px]:block" data-reveal style={vars({ "--i": index })}>
              <span className="step-node" aria-hidden="true">
                0{index + 1}
              </span>
              {index < steps.length - 1 && <span className="step-link" aria-hidden="true" />}
              <div className="pt-3 min-[1024px]:pt-8">
                <h3 className="title">{step.name}</h3>
                <p className="mt-2.5 text-muted">{step.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- Testimonials */

/** Stays hidden until real client words are added to content/testimonials.ts. */
export function Testimonials({ lang }: { lang: Lang }) {
  if (testimonials.length === 0) return null;
  const { ui } = getContent(lang);
  return (
    <section className="section defer" aria-labelledby="testimonials-heading">
      <div className="wrap">
        <SectionHeader id="testimonials-heading" title={ui.testimonialsHeading} />
        <div className="grid gap-5 min-[1024px]:grid-cols-2">
          {testimonials.map((item, index) => (
            // Quotes are shown in the words the client used.
            <figure key={item.name} lang="en" className="card p-8 min-[1024px]:p-10" data-reveal style={vars({ "--i": index % 2 })}>
              <Quote size={28} className="text-accent" />
              <blockquote className="lead mt-5">“{item.quote}”</blockquote>
              <figcaption className="mt-6 text-sm text-muted">
                <span className="font-semibold text-fg">{item.name}</span>, {item.role}, {item.project}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- Closing call to action */

/** What happens after an enquiry, in three plain steps. Shared by the closing panel and the Contact page. */
export function NextSteps({ lang, as: Heading = "h3" }: { lang: Lang; as?: "h2" | "h3" }) {
  const { ui } = getContent(lang);
  return (
    <div>
      <Heading className="foot-label">{ui.closing.nextHeading}</Heading>
      <ol className="space-y-4">
        {ui.closing.next.map((step, index) => (
          <li key={step} className="flex items-start gap-4">
            <span className="num" aria-hidden="true">
              {index + 1}
            </span>
            <span className="pt-0.5">{fill(step, { time: ui.replyTime })}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}

/** Direct ways to reach us, as large tap targets. */
export function DirectContact({ lang, showAddress = false }: { lang: Lang; showAddress?: boolean }) {
  const { ui } = getContent(lang);
  const row = "group flex items-center gap-4 rounded-2xl py-2 pr-3 transition-colors";
  return (
    <div>
      <p className="foot-label">{ui.closing.direct}</p>
      <ul className="space-y-1.5">
        <li>
          <a className={row} href={whatsapp(lang)}>
            <span className="icon-tile">
              <Chat size={20} />
            </span>
            <span className="font-semibold group-hover:text-accent">{ui.closing.whatsapp}</span>
          </a>
        </li>
        <li>
          <a className={row} href={`mailto:${site.email}`}>
            <span className="icon-tile">
              <Mail size={20} />
            </span>
            <span className="font-semibold break-all group-hover:text-accent">{site.email}</span>
          </a>
        </li>
        <li>
          <a className={row} href={`tel:${site.phoneIntl}`}>
            <span className="icon-tile">
              <Phone size={20} />
            </span>
            <span className="font-semibold group-hover:text-accent">{site.phoneDisplay}</span>
          </a>
        </li>
        {showAddress && <li className="max-w-[420px] pt-3 pl-16 text-[15px] leading-relaxed text-muted">{ui.address}</li>}
      </ul>
    </div>
  );
}

export function ClosingCTA({ lang }: { lang: Lang }) {
  const { ui } = getContent(lang);
  const t = ui.closing;
  return (
    <section id="enquiry" className="section defer" style={vars({ "--defer-h": "1000px" })} aria-labelledby="enquiry-heading">
      <div className="wrap">
        <div className="card relative overflow-hidden" data-reveal>
          <div className="cta-grid" aria-hidden="true" />
          <div className="cta-glow" aria-hidden="true" />
          <div className="relative grid gap-12 p-5 min-[640px]:p-10 min-[1024px]:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] min-[1024px]:gap-14 min-[1024px]:p-14">
            <div className="px-1 pt-3 min-[640px]:px-0 min-[640px]:pt-0">
              <Eyebrow>{ui.chrome.contact}</Eyebrow>
              <h2 id="enquiry-heading" className="display-2 mt-4">
                <Emphasis text={t.heading} />
              </h2>
              <p className="lead mt-5 max-w-[480px] text-muted">{t.lead}</p>
              <div className="mt-10 grid gap-10">
                <NextSteps lang={lang} />
                <DirectContact lang={lang} />
              </div>
            </div>
            <div className="card self-start p-5 min-[640px]:p-8 min-[1024px]:p-9">
              <ContactForm lang={lang} t={ui.form} replyTime={ui.replyTime} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

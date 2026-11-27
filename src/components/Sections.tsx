import Image from "next/image";
import Link from "next/link";
import type { ComponentProps, ComponentType, SVGProps } from "react";
import { ContactForm } from "@/components/ContactForm";
import { BrowserFrame, ProjectStage, Stage } from "@/components/Devices";
import { Hero3D } from "@/components/Hero3D";
import { Iso, serviceArt } from "@/components/Iso";
import { LabProducts } from "@/components/LabProducts";
import { getContent } from "@/content";
import type { CapabilityGroupId, CapabilityId, Project, Step } from "@/content/projects";
import { site, whatsapp } from "@/content/site";
import type { StatCount } from "@/content/ui";
import { testimonials, type Testimonial } from "@/content/testimonials";
import { fill, localize, type Lang } from "@/i18n";
import {
  ArrowRight,
  ArrowUpRight,
  Briefcase,
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
  Sparkles,
  Users,
  Zap,
} from "./icons";
import { Backdrop, Emphasis, Eyebrow, SectionHeader, StatusBadge, vars } from "./ui";

type IconType = ComponentType<SVGProps<SVGSVGElement> & { size?: number }>;

/* ---------------------------------------------------------------- Hero */

export function Hero({ lang }: { lang: Lang }) {
  const { ui } = getContent(lang);
  const t = ui.home;
  return (
    <section className="hero">
      <Backdrop light={false} />

      <div className="wrap hero-grid">
        <div>
          <p className="chip enter">
            <span className="dot dot-pulse" aria-hidden="true" />
            <span className="text-fg">{t.availability}</span>
          </p>
          {/* No entrance animation on the heading: it is the first thing worth reading, so it paints at once. */}
          <h1 className="display-hero mt-7 max-w-[860px]">
            <Emphasis text={t.heading} />
          </h1>
          <p className="lead enter mt-8 max-w-[580px] text-muted" style={vars({ "--i": 1 })}>
            {t.lead}
          </p>
          <div className="enter mt-10 flex flex-wrap items-center gap-x-3 gap-y-4" style={vars({ "--i": 2 })} data-cta>
            <Link href={localize(lang, "/contact")} className="btn btn-primary">
              {ui.chrome.start}
              <ArrowRight size={18} className="arrow" />
            </Link>
            <a href={whatsapp(lang)} className="btn btn-secondary">
              <Chat size={18} />
              {t.whatsapp}
            </a>
            <a href="#work" className="link-arrow ml-2 max-[520px]:hidden">
              {t.seeWork}
              <span className="ring">
                <ArrowRight size={16} className="rotate-90" />
              </span>
            </a>
          </div>
          <ul className="enter mt-9 flex flex-wrap gap-x-6 gap-y-2.5 text-[14.5px] text-muted" style={vars({ "--i": 3 })}>
            {t.assurances.map((item) => (
              <li key={item} className="flex items-center gap-2">
                <Check size={16} className="flex-none text-accent" />
                {fill(item, { time: ui.replyTime })}
              </li>
            ))}
          </ul>
        </div>

        {/* The logo as a 3D model. Decorative: it adds nothing a screen reader needs. */}
        <Hero3D hint={t.dragHint} />
      </div>

      <div className="wrap pb-10">
        <Stats lang={lang} />
      </div>
    </section>
  );
}

/**
 * Real numbers only, worked out from the content, so they stay right as projects and Lab products are added.
 * Each counts up from zero (CSS only); screen readers get the plain number.
 */
function Stats({ lang }: { lang: Lang }) {
  const { ui, projects, labApps, studios } = getContent(lang);
  const counts: Record<StatCount, number> = {
    projects: projects.length,
    // Swift Converter Hub, plus the commercial apps.
    labProducts: 1 + labApps.length,
    tools: studios.reduce((total, studio) => total + studio.tools, 0),
    // The number in the reply time ("2 working days"), so it always matches the "We reply within" line above.
    replyDays: Number(ui.replyTime.match(/\d+/)?.[0]),
  };
  return (
    <dl className="stats enter" style={vars({ "--i": 4 })}>
      {ui.home.stats.map((stat) => {
        const value = counts[stat.count];
        return (
          <div key={stat.label} className="stat">
            <dt>{stat.label}</dt>
            <dd>
              <span className="sr-only">{value}</span>
              <span aria-hidden="true" className="count" style={vars({ "--to": value })} />
            </dd>
          </div>
        );
      })}
    </dl>
  );
}

/* ---------------------------------------------------------------- Work */

/** One project as a large panel: the story on the left, its real screens on the right. */
export function ProjectCard({
  project,
  lang,
  index,
  total,
  eager = false,
  as: Heading = "h3",
}: {
  project: Project;
  lang: Lang;
  index: number;
  total: number;
  eager?: boolean;
  as?: "h2" | "h3";
}) {
  const { ui } = getContent(lang);
  return (
    <article className="case spot" style={vars({ "--tint": project.tint, "--n": index })} data-tilt-scope data-spot data-reveal>
      <div className="case-copy">
        <div className="flex flex-wrap items-center gap-2">
          <span className="case-index mr-2" aria-hidden="true">
            0{index + 1} / 0{total}
          </span>
          <StatusBadge label={project.status} live={Boolean(project.link)} />
          <span className="chip">{project.kind}</span>
        </div>
        <Heading className="display-2 mt-7" lang="en">
          {project.name}
        </Heading>
        <p className="mt-5 max-w-[440px] text-[17px] leading-relaxed text-muted">{project.summary}</p>
        <ul className="mt-6 flex flex-wrap gap-2">
          {project.tech.map((item) => (
            <li key={item} className="chip chip-mono">
              {item}
            </li>
          ))}
        </ul>
        <Link href={localize(lang, `/work/${project.slug}`)} className="link-arrow stretch mt-9" aria-label={fill(ui.projectRow.ctaLabel, { name: project.name })}>
          {ui.projectRow.cta}
          <span className="ring">
            <ArrowRight size={16} className="arrow" />
          </span>
        </Link>
      </div>
      <div className="project-stage" style={vars({ "--tint": project.tint })}>
        <ProjectStage project={project} eager={eager} />
      </div>
    </article>
  );
}

/**
 * The projects, one panel each. On a desktop each panel stays in place while the next slides over it.
 * `eagerFirst` loads the first project's screens straight away, for pages where it is near the top.
 */
export function WorkList({ projects, lang, as, eagerFirst = false }: { projects: Project[]; lang: Lang; as?: "h2" | "h3"; eagerFirst?: boolean }) {
  return (
    <div className="case-stack">
      {projects.map((project, index) => (
        <ProjectCard key={project.slug} project={project} lang={lang} index={index} total={projects.length} as={as} eager={eagerFirst && index === 0} />
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
          node: <BrowserFrame shot={labShots.home} sizes="(max-width: 1023px) 84vw, 520px" eager={pageTitle} />,
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
      <LabProducts lang={lang} current="swift" className="mt-8" />
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
        <Backdrop />
        <div className="wrap grid items-center gap-x-14 gap-y-14 pt-12 pb-20 min-[1024px]:grid-cols-2 min-[1024px]:pt-24 min-[1024px]:pb-28">
          {text}
          <div className="stage-enter">{stage}</div>
        </div>
      </section>
    );
  }

  return (
    <section id="lab" className="section defer" aria-label={ui.chrome.lab}>
      <div className="wrap">
        {/* An "ink" panel: it keeps the dark colours in the light theme too. */}
        <div className="panel ink" data-tilt-scope data-reveal>
          <div className="glow glow-crimson top-[-40%] right-[-18%] h-[60vw] max-h-[820px] w-[60vw] max-w-[820px]" aria-hidden="true" />
          <div className="relative grid items-center gap-x-12 gap-y-12 p-6 min-[640px]:p-10 min-[1024px]:grid-cols-2 min-[1024px]:p-16">
            {text}
            {stage}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- What we build */

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

/** The core services: what we build every day, each with its own illustration and a real project to look at. */
function ServiceList({ lang }: { lang: Lang }) {
  const { ui, services } = getContent(lang);
  return (
    <ol className="svc-list">
      {services.map((service, index) => (
        <li key={service.name} className="svc-row spot" data-spot data-reveal>
          <span className="svc-num" aria-hidden="true">
            0{index + 1}
          </span>
          <h3 className="display-3">{service.name}</h3>
          <div className="svc-text">
            <p className="text-muted">{service.short}</p>
            <p className="mt-4 text-[15px] text-subtle">
              {ui.services.example}{" "}
              <Link className="link" href={localize(lang, service.example.href)}>
                {service.example.label}
              </Link>
            </p>
          </div>
          <Iso boxes={serviceArt[service.example.href] ?? serviceArt["/lab"]} className="svc-art" />
        </li>
      ))}
    </ol>
  );
}

/**
 * Everything else we can build, in four groups. Compact on the Home page (names only);
 * `detailed` on the Services page adds a line about each.
 */
export function CapabilityGroups({ lang, detailed = false, as: Heading = "h4" }: { lang: Lang; detailed?: boolean; as?: "h3" | "h4" }) {
  const { capabilities } = getContent(lang);
  const ItemHeading = Heading === "h3" ? "h4" : "h5";

  if (detailed) {
    return (
      <div>
        {capabilities.map((group) => {
          const Icon = groupIcons[group.id];
          return (
            // One group per row: the group on the left, a line about each kind of software on the right.
            <article key={group.id} className="cap-row" data-reveal>
              <div>
                <span className="icon-tile">
                  <Icon size={22} />
                </span>
                <Heading className="display-3 mt-6">{group.name}</Heading>
                <p className="mt-4 max-w-[420px] text-muted">{group.text}</p>
              </div>
              <ul className="grid gap-x-10 min-[640px]:grid-cols-2">
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
          );
        })}
      </div>
    );
  }

  return (
    <div className="cap-grid">
      {capabilities.map((group, index) => {
        const Icon = groupIcons[group.id];
        return (
          <article key={group.id} className="cap-col" data-reveal style={vars({ "--i": index })}>
            <Icon size={26} className="text-accent" />
            <Heading className="title mt-5">{group.name}</Heading>
            <p className="mt-3 text-[15.5px] leading-relaxed text-muted">{group.text}</p>
            <ul className="cap-list mt-6">
              {group.items.map((item) => {
                const ItemIcon = capabilityIcons[item.id];
                return (
                  <li key={item.id}>
                    <ItemIcon size={17} className="flex-none text-subtle" />
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
    <div className="idea-card mt-14" data-reveal data-cta>
      <span className="idea-plus" aria-hidden="true">
        <Plus size={26} strokeWidth={2} />
      </span>
      <div className="min-w-0">
        <p className="display-3">{t.ideaTitle}</p>
        <p className="idea-text mt-2 max-w-[640px]">{t.ideaText}</p>
      </div>
      <Link href={localize(lang, "/contact")} className="btn btn-light">
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
        <ServiceList lang={lang} />

        <div className="mt-24 min-[1024px]:mt-32">
          <div className="mb-12 grid items-end gap-x-16 gap-y-5 min-[1024px]:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)]" data-reveal>
            <div>
              <Eyebrow>{t.moreEyebrow}</Eyebrow>
              <h3 className="display-2 mt-5">{t.moreHeading}</h3>
            </div>
            <p className="lead max-w-[560px] text-muted min-[1024px]:justify-self-end">{t.moreLead}</p>
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
        <ol className="steps">
          {steps.map((step, index) => (
            <li key={step.name} className="step" data-reveal style={vars({ "--i": index })}>
              <span className="step-link" aria-hidden="true" />
              <span className="step-node" aria-hidden="true">
                0{index + 1}
              </span>
              <h3 className="title mt-6">{step.name}</h3>
              <p className="mt-2.5 text-muted">{step.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- Testimonials */

/** The client's photo, name and company, under their words. */
function ClientName({ item }: { item: Testimonial }) {
  return (
    <span className="flex items-center gap-4" lang="en">
      {item.photo && (
        <Image
          className="h-12 w-12 flex-none rounded-full object-cover shadow-[0_0_0_3px_var(--surface),0_0_0_4px_var(--line-strong)]"
          src={item.photo}
          width={48}
          height={48}
          alt=""
        />
      )}
      <span>
        <span className="block font-semibold text-fg">{item.name ?? item.role}</span>
        <span className="block text-sm text-muted">{item.name ? `${item.role}, ${item.company}` : item.company}</span>
      </span>
    </span>
  );
}

/** The project a client is talking about, as a small card that leads to its case study. */
function ProjectLink({ lang, slug }: { lang: Lang; slug: Testimonial["project"] }) {
  const { ui, projects } = getContent(lang);
  const project = projects.find((entry) => entry.slug === slug);
  if (!project) return null;
  return (
    <Link
      href={localize(lang, `/work/${project.slug}`)}
      aria-label={fill(ui.projectRow.ctaLabel, { name: project.name })}
      className="card spot group flex flex-wrap items-center justify-between gap-x-6 gap-y-4 p-5 min-[1024px]:p-6"
      data-spot
    >
      <span>
        <span className="block font-semibold text-fg" lang="en">
          {project.name}
        </span>
        <span className="block text-sm text-muted">{project.kind}</span>
      </span>
      <span className="link-arrow text-muted group-hover:text-fg">
        {ui.projectRow.cta}
        <span className="ring">
          <ArrowRight size={16} />
        </span>
      </span>
    </Link>
  );
}

/**
 * Client words. One quote is laid out as a feature: the heading and the project it's about on the left,
 * the words on the right with the first paragraph pulled out larger. Two or more sit side by side as cards.
 * Quotes always stay in the words, and the language, the client used.
 */
export function TestimonialSection({
  lang,
  items,
  eyebrow,
  linkProject = false,
  id = "testimonials-heading",
}: {
  lang: Lang;
  items: Testimonial[];
  eyebrow?: string;
  /** Link to the case study the words are about. Not wanted on that case study itself. */
  linkProject?: boolean;
  id?: string;
}) {
  if (items.length === 0) return null;
  const { ui, projects } = getContent(lang);

  if (items.length > 1) {
    return (
      <section className="section defer" aria-labelledby={id}>
        <div className="wrap">
          <SectionHeader id={id} eyebrow={eyebrow} title={ui.testimonialsHeading} />
          <div className="grid gap-5 min-[1024px]:grid-cols-2">
            {items.map((item, index) => {
              const project = projects.find((entry) => entry.slug === item.project);
              return (
                // A column, so the names line up at the foot of each card however long the words are.
                <figure key={item.quote[0]} className="card flex flex-col p-7 min-[640px]:p-10" data-reveal style={vars({ "--i": index % 2 })}>
                  <Quote size={28} className="text-accent" />
                  <blockquote lang="en" className="mt-5 mb-8 space-y-4 text-[17.5px] leading-relaxed">
                    {item.quote.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </blockquote>
                  <figcaption className="mt-auto flex flex-wrap items-center justify-between gap-x-6 gap-y-4 border-t border-line pt-6">
                    <ClientName item={item} />
                    {linkProject && project && (
                      <Link
                        className="link-arrow text-[15px] text-muted hover:text-fg"
                        href={localize(lang, `/work/${project.slug}`)}
                        aria-label={fill(ui.projectRow.ctaLabel, { name: project.name })}
                      >
                        {ui.projectRow.cta}
                        <span className="ring">
                          <ArrowRight size={16} />
                        </span>
                      </Link>
                    )}
                  </figcaption>
                </figure>
              );
            })}
          </div>
        </div>
      </section>
    );
  }

  const [item] = items;
  const [lead, ...rest] = item.quote;
  return (
    <section className="section defer" style={vars({ "--defer-h": "640px" })} aria-labelledby={id}>
      <div className="wrap grid items-start gap-x-16 gap-y-10 min-[1024px]:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
        <div className="min-[1024px]:sticky min-[1024px]:top-[calc(var(--header-h)+32px)]" data-reveal>
          {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
          <h2 id={id} className={`display-2 ${eyebrow ? "mt-5" : ""}`}>
            {ui.testimonialsHeading}
          </h2>
          {linkProject && (
            <div className="mt-10 max-w-[440px]">
              <ProjectLink lang={lang} slug={item.project} />
            </div>
          )}
        </div>
        <figure className="card p-7 min-[640px]:p-10 min-[1024px]:p-12" data-reveal style={vars({ "--i": 1 })}>
          <Quote size={36} className="text-accent" />
          <blockquote lang="en" className="mt-6">
            <p className="text-[20px] leading-[1.45] font-medium text-fg min-[1024px]:text-[24px]">{lead}</p>
            {rest.map((paragraph) => (
              <p key={paragraph} className="mt-5 text-[17px] leading-relaxed text-muted">
                {paragraph}
              </p>
            ))}
          </blockquote>
          <figcaption className="mt-9 border-t border-line pt-7">
            <ClientName item={item} />
          </figcaption>
        </figure>
      </div>
    </section>
  );
}

/** On the home page. Stays hidden until real client words are added to content/testimonials.ts. */
export function Testimonials({ lang }: { lang: Lang }) {
  return <TestimonialSection lang={lang} items={testimonials} linkProject />;
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

/**
 * The enquiry section at the foot of most pages. A product page passes its own heading and lead,
 * and an `interest` so the form opens with that product already picked.
 */
export function ClosingCTA({
  lang,
  heading,
  lead,
  interest,
}: {
  lang: Lang;
  heading?: string;
  lead?: string;
  interest?: ComponentProps<typeof ContactForm>["interest"];
}) {
  const { ui } = getContent(lang);
  const t = ui.closing;
  return (
    <section id="enquiry" className="section closing defer" style={vars({ "--defer-h": "1000px" })} aria-labelledby="enquiry-heading">
      <div className="wrap grid gap-x-16 gap-y-12 min-[1024px]:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
        <div data-reveal>
          <Eyebrow>{ui.chrome.contact}</Eyebrow>
          <h2 id="enquiry-heading" className="display-1 mt-5">
            <Emphasis text={heading ?? t.heading} />
          </h2>
          <p className="lead mt-6 max-w-[480px] text-muted">{lead ?? t.lead}</p>
          <div className="mt-12 grid gap-10">
            <NextSteps lang={lang} />
            <DirectContact lang={lang} />
          </div>
        </div>
        <div className="card self-start p-5 min-[640px]:p-8 min-[1024px]:sticky min-[1024px]:top-[calc(var(--header-h)+24px)] min-[1024px]:p-10" data-reveal style={vars({ "--i": 1 })}>
          <ContactForm lang={lang} t={ui.form} replyTime={ui.replyTime} interest={interest} />
        </div>
      </div>
    </section>
  );
}

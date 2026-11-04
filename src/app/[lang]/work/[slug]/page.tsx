import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProjectStage, ScreenGallery } from "@/components/Devices";
import { ArrowLeft, ArrowRight, ArrowUpRight, Check } from "@/components/icons";
import { JsonLd } from "@/components/JsonLd";
import { ClosingCTA } from "@/components/Sections";
import { Eyebrow, Page, SectionHeader, StatusBadge, vars } from "@/components/ui";
import { getContent } from "@/content";
import { projects as allProjects } from "@/content/projects";
import { fill, langs, localize, resolveLang } from "@/i18n";
import { breadcrumbJsonLd, pageMetadata } from "@/seo";

type Props = { params: Promise<{ lang: string; slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return langs.flatMap((lang) => allProjects.map((project) => ({ lang, slug: project.slug })));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const lang = await resolveLang(params);
  const { slug } = await params;
  const { ui, projects } = getContent(lang);
  const project = projects.find((item) => item.slug === slug);
  if (!project) return {};
  return pageMetadata(lang, `/work/${slug}`, fill(ui.caseStudy.title, { name: project.name, kind: project.kind }), project.summary);
}

export default async function CaseStudy({ params }: Props) {
  const lang = await resolveLang(params);
  const { slug } = await params;
  const { ui, projects } = getContent(lang);
  const t = ui.caseStudy;
  const index = projects.findIndex((item) => item.slug === slug);
  if (index < 0) notFound();
  const project = projects[index];
  const next = projects[(index + 1) % projects.length];
  const facts = [
    { label: t.kindLabel, value: project.kind },
    { label: t.techLabel, value: project.tech.join(", ") },
    { label: t.stands, value: project.stands },
  ];

  return (
    <Page>
      <JsonLd
        data={breadcrumbJsonLd(lang, [
          { name: ui.chrome.work, path: "/work" },
          { name: project.name, path: `/work/${project.slug}` },
        ])}
      />
      <section className="hero" data-tilt-scope>
        <div className="hero-bg" aria-hidden="true">
          <div className="grid-bg" />
          <div className="glow glow-crimson top-[-30%] right-[-12%] h-[72vw] max-h-[980px] w-[72vw] max-w-[980px]" />
          <div className="glow glow-indigo top-[-20%] left-[-22%] h-[50vw] max-h-[700px] w-[50vw] max-w-[700px]" />
        </div>
        <div className="wrap pt-8 pb-14 min-[1024px]:pt-12 min-[1024px]:pb-20">
          <Link className="link-arrow text-muted hover:text-fg" href={localize(lang, "/work")}>
            <span className="ring">
              <ArrowLeft size={16} />
            </span>
            {t.allWork}
          </Link>

          <div className="mt-10 grid items-center gap-x-14 gap-y-12 min-[1024px]:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
            <div>
              <div className="enter flex flex-wrap items-center gap-2">
                <StatusBadge label={project.status} live={Boolean(project.link)} />
                <span className="chip">{project.kind}</span>
              </div>
              <div className="mt-7 flex items-center gap-5">
                {project.slug === "ola-kids" && (
                  <Image className="rounded-[18px] shadow-lg" src="/work/ola-kids-icon.webp" width={64} height={64} alt="" loading="eager" />
                )}
                <h1 className="display-1" lang="en">
                  {project.name}
                </h1>
              </div>
              <p className="lead enter mt-6 max-w-[540px] text-muted" style={vars({ "--i": 1 })}>
                {project.summary}
              </p>
              <div className="enter mt-9 flex flex-wrap gap-3" style={vars({ "--i": 2 })} data-cta>
                {project.link && (
                  <a className="btn btn-primary" href={project.link.href}>
                    {project.link.label}
                    <ArrowUpRight size={18} className="arrow arrow-ne" />
                  </a>
                )}
                <Link className={`btn ${project.link ? "btn-secondary" : "btn-primary"}`} href={localize(lang, "/contact")}>
                  {ui.chrome.start}
                  <ArrowRight size={18} className="arrow" />
                </Link>
              </div>
            </div>
            <div className="project-stage stage-enter" style={vars({ "--tint": project.tint })}>
              <div className="grid-bg" aria-hidden="true" />
              <ProjectStage project={project} eager />
            </div>
          </div>

          <dl className="card enter mt-12 grid overflow-hidden min-[768px]:grid-cols-[1fr_1fr_1.6fr]" style={vars({ "--i": 3 })}>
            {facts.map((fact, factIndex) => (
              <div key={fact.label} className={`border-line p-6 min-[1024px]:p-8 ${factIndex < facts.length - 1 ? "max-[767px]:border-b min-[768px]:border-r" : ""}`}>
                <dt className="foot-label mb-2!">{fact.label}</dt>
                <dd className="text-[16.5px] leading-relaxed">{fact.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="section defer">
        <div className="wrap grid gap-5 min-[1024px]:grid-cols-2">
          <div className="card p-7 min-[640px]:p-10 min-[1024px]:p-12" data-reveal>
            <Eyebrow>01</Eyebrow>
            <h2 className="display-2 mt-4">{t.needed}</h2>
            <div className="mt-6 space-y-4 text-[17.5px] leading-relaxed text-muted">
              {project.need.map((text) => (
                <p key={text}>{text}</p>
              ))}
            </div>
          </div>
          <div className="card p-7 min-[640px]:p-10 min-[1024px]:p-12" data-reveal style={vars({ "--i": 1 })}>
            <Eyebrow>02</Eyebrow>
            <h2 className="display-2 mt-4">{t.built}</h2>
            <ul className="mt-6 space-y-3.5">
              {project.built.map((item) => (
                <li key={item} className="flex items-start gap-3.5 leading-relaxed">
                  <span className="mt-0.5 grid h-6 w-6 flex-none place-items-center rounded-full bg-accent/12 text-accent">
                    <Check size={14} strokeWidth={2.4} />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="section defer" style={vars({ "--defer-h": "1600px" })} aria-labelledby="screens">
        <div className="wrap">
          <SectionHeader id="screens" eyebrow="03" title={project.slug === "ola-kids" ? t.screensApp : t.screensSite} />
          <ScreenGallery shots={project.gallery} />
        </div>
      </section>

      <section className="section defer" style={vars({ "--defer-h": "560px" })}>
        <div className="wrap">
          <Link href={localize(lang, `/work/${next.slug}`)} className="card spot group block overflow-hidden p-2.5 min-[1024px]:p-3" data-spot data-tilt-scope>
            <div className="grid items-center gap-6 min-[1024px]:grid-cols-2">
              <div className="px-5 pt-6 pb-2 min-[1024px]:px-10 min-[1024px]:py-10">
                <span className="chip">{next.kind}</span>
                <p className="display-2 mt-6 flex items-center gap-4">
                  {fill(t.next, { name: next.name })}
                  <span className="grid h-12 w-12 flex-none place-items-center rounded-full shadow-[inset_0_0_0_1px_var(--line-strong)] transition-colors duration-300 group-hover:bg-accent group-hover:text-white group-hover:shadow-none">
                    <ArrowRight size={20} className="transition-transform duration-300 group-hover:translate-x-0.5" />
                  </span>
                </p>
                <p className="mt-4 max-w-[460px] text-muted">{next.summary}</p>
              </div>
              <div className="project-stage" style={vars({ "--tint": next.tint })}>
                <div className="grid-bg" aria-hidden="true" />
                <ProjectStage project={next} decorative />
              </div>
            </div>
          </Link>
        </div>
      </section>

      <ClosingCTA lang={lang} />
    </Page>
  );
}

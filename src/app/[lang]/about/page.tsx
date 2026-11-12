import type { Metadata } from "next";
import Link from "next/link";
import { LogoModel } from "@/components/Hero3D";
import { ArrowRight, Chat, LifeBuoy, Puzzle, Shield } from "@/components/icons";
import { JsonLd } from "@/components/JsonLd";
import { ClosingCTA, Process } from "@/components/Sections";
import { Eyebrow, Page, PageHero, SectionHeader, vars } from "@/components/ui";
import { getContent } from "@/content";
import { localize, resolveLang, type LangParams } from "@/i18n";
import { breadcrumbJsonLd, pageMetadata } from "@/seo";

/** Fit, care with data, straight talk, long-run support: in the order of about.values. */
const valueIcons = [Puzzle, Shield, Chat, LifeBuoy];

export async function generateMetadata({ params }: LangParams): Promise<Metadata> {
  const lang = await resolveLang(params);
  const { about } = getContent(lang).ui;
  return pageMetadata(lang, "/about", about.title, about.description);
}

export default async function AboutPage({ params }: LangParams) {
  const lang = await resolveLang(params);
  const { ui, steps } = getContent(lang);
  const t = ui.about;
  const [opening, ...story] = t.story;
  return (
    <Page>
      <JsonLd data={breadcrumbJsonLd(lang, [{ name: ui.chrome.about, path: "/about" }])} />
      <PageHero
        eyebrow={ui.chrome.about}
        title={t.heading}
        lead={t.lead}
        aside={
          <div className="stage-enter flex justify-center py-4 min-[1024px]:py-0">
            <LogoModel solo className="w-[min(56vw,300px)] min-[1024px]:w-[340px]" />
          </div>
        }
      >
        <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
          <Link href={localize(lang, "/contact")} className="btn btn-primary">
            {ui.chrome.start}
            <ArrowRight size={18} className="arrow" />
          </Link>
          <Link href={localize(lang, "/work")} className="link-arrow">
            {ui.home.seeWork}
            <span className="ring">
              <ArrowRight size={16} className="arrow" />
            </span>
          </Link>
        </div>
      </PageHero>

      <section className="section defer" aria-labelledby="story-heading">
        <div className="wrap grid gap-x-16 gap-y-10 min-[1024px]:grid-cols-[minmax(0,0.75fr)_minmax(0,1.25fr)]">
          <div data-reveal>
            <div className="min-[1024px]:sticky min-[1024px]:top-[calc(var(--header-h)+40px)]">
              <Eyebrow>01</Eyebrow>
              <h2 id="story-heading" className="display-2 mt-4">
                {t.storyHeading}
              </h2>
            </div>
          </div>
          <div className="max-w-[680px]">
            <p className="lead" data-reveal>
              {opening}
            </p>
            <div className="mt-8 space-y-5 text-[17.5px] leading-relaxed text-muted">
              {story.map((paragraph, index) => (
                <p key={paragraph} data-reveal style={vars({ "--i": index })}>
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section defer" style={vars({ "--defer-h": "600px" })} aria-labelledby="values-heading">
        <div className="wrap">
          <SectionHeader id="values-heading" eyebrow="02" title={t.valuesHeading} />
          <div className="grid gap-5 min-[768px]:grid-cols-2 min-[1200px]:grid-cols-4">
            {t.values.map((value, index) => {
              const Icon = valueIcons[index] ?? Puzzle;
              return (
                <article key={value.name} className="card spot p-7 min-[1024px]:p-9" data-spot data-reveal style={vars({ "--i": index })}>
                  <span className="icon-tile">
                    <Icon size={22} />
                  </span>
                  <h3 className="title mt-8">{value.name}</h3>
                  <p className="mt-3 text-muted">{value.text}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <Process steps={steps} eyebrow="03" title={t.processHeading} />
      <ClosingCTA lang={lang} />
    </Page>
  );
}

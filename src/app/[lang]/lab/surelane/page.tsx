import type { Metadata } from "next";
import Link from "next/link";
import { ScreenGallery } from "@/components/Devices";
import { ArrowLeft, ArrowRight, Calendar, Check, Mail, Plus, Shield, Sparkles } from "@/components/icons";
import { JsonLd } from "@/components/JsonLd";
import { LabProducts } from "@/components/LabProducts";
import { ClosingCTA } from "@/components/Sections";
import { SurelaneLogo, SurelaneStage } from "@/components/Surelane";
import { Backdrop, Page, SectionHeader, vars } from "@/components/ui";
import { getContent } from "@/content";
import { site } from "@/content/site";
import { fill, localize, resolveLang, type LangParams } from "@/i18n";
import { absoluteUrl, breadcrumbJsonLd, pageMetadata } from "@/seo";

const stepIcons = [Plus, Calendar, Sparkles, Mail];

export async function generateMetadata({ params }: LangParams): Promise<Metadata> {
  const lang = await resolveLang(params);
  const { surelane } = getContent(lang).ui;
  return pageMetadata(lang, "/lab/surelane", surelane.title, surelane.description);
}

/** Surelane, our commercial job-search agent. People who want to use it ask through the form at the foot of the page. */
export default async function SurelanePage({ params }: LangParams) {
  const lang = await resolveLang(params);
  const { ui, surelaneShots } = getContent(lang);
  const t = ui.surelane;
  const shots = surelaneShots;

  return (
    <Page>
      <JsonLd
        data={breadcrumbJsonLd(lang, [
          { name: ui.chrome.lab, path: "/lab" },
          { name: "Surelane", path: "/lab/surelane" },
        ])}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          name: "Surelane",
          applicationCategory: "BusinessApplication",
          operatingSystem: "Web",
          description: t.description,
          url: absoluteUrl(localize(lang, "/lab/surelane")),
          image: absoluteUrl(shots.today.src),
          inLanguage: lang,
          publisher: { "@type": "Organization", name: site.name, url: site.url },
        }}
      />

      <section className="hero" data-tilt-scope>
        <Backdrop />
        <div className="wrap pt-8 pb-14 min-[1024px]:pt-12 min-[1024px]:pb-20">
          <div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-6">
            <Link className="link-arrow text-muted hover:text-fg" href={localize(lang, "/lab")}>
              <span className="ring">
                <ArrowLeft size={16} />
              </span>
              {ui.chrome.lab}
            </Link>
            <LabProducts lang={lang} current="surelane" className="max-[519px]:w-full" />
          </div>

          <div className="mt-10 grid items-center gap-x-14 gap-y-12 min-[1024px]:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
            <div>
              <div className="enter flex flex-wrap items-center gap-2">
                <span className="chip">{t.kind}</span>
                <span className="chip">{t.tagline}</span>
              </div>
              <div className="mt-7 flex items-center gap-5">
                <SurelaneLogo size={64} eager />
                <h1 className="display-1" lang="en">
                  Surelane
                </h1>
              </div>
              <p className="lead enter mt-6 max-w-[540px] text-muted" style={vars({ "--i": 1 })}>
                {t.lead}
              </p>
              <p className="enter mt-6 flex max-w-[540px] items-start gap-3 leading-relaxed" style={vars({ "--i": 2 })}>
                <Shield size={20} className="mt-0.5 flex-none text-ok" />
                {t.note}
              </p>
              <div className="enter mt-9 flex flex-wrap gap-3" style={vars({ "--i": 2 })} data-cta>
                <a className="btn btn-primary" href="#enquiry">
                  {t.ask}
                  <ArrowRight size={18} className="arrow" />
                </a>
              </div>
            </div>
            <div className="stage-enter">
              <SurelaneStage lang={lang} eager />
            </div>
          </div>

          <dl className="card enter mt-12 grid overflow-hidden min-[768px]:grid-cols-3" style={vars({ "--i": 3 })}>
            {t.facts.map((fact, index) => (
              <div key={fact.label} className={`border-line p-6 min-[1024px]:p-8 ${index < t.facts.length - 1 ? "max-[767px]:border-b min-[768px]:border-r" : ""}`}>
                <dt className="foot-label mb-2!">{fact.label}</dt>
                <dd className="text-[16.5px] leading-relaxed">{fact.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="section defer" style={vars({ "--defer-h": "640px" })} aria-labelledby="steps-heading">
        <div className="wrap">
          <SectionHeader id="steps-heading" title={t.stepsHeading} />
          <ol className="grid gap-5 min-[768px]:grid-cols-2 min-[1280px]:grid-cols-4">
            {t.steps.map((step, index) => {
              const Icon = stepIcons[index] ?? Sparkles;
              return (
                <li key={step.title} className="card spot p-7 min-[1024px]:p-8" data-spot data-reveal style={vars({ "--i": index })}>
                  <div className="flex items-start justify-between gap-4">
                    <span className="icon-tile">
                      <Icon size={22} />
                    </span>
                    <span className="font-mono text-[12px] tracking-[0.12em] text-subtle" aria-hidden="true">
                      0{index + 1}
                    </span>
                  </div>
                  <h3 className="title mt-8">{step.title}</h3>
                  <p className="mt-3 text-muted">{step.text}</p>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      <section className="section defer" style={vars({ "--defer-h": "720px" })}>
        <div className="wrap grid gap-5 min-[1024px]:grid-cols-2">
          {[
            { heading: t.doesHeading, items: t.does },
            { heading: t.trustHeading, items: t.trust },
          ].map((list, listIndex) => (
            <div key={list.heading} className="card p-7 min-[640px]:p-10 min-[1024px]:p-12" data-reveal style={vars({ "--i": listIndex })}>
              <h2 className="display-2">{list.heading}</h2>
              <ul className="mt-6 space-y-3.5">
                {list.items.map((item) => (
                  <li key={item} className="flex items-start gap-3.5 leading-relaxed">
                    <span className="mt-0.5 grid h-6 w-6 flex-none place-items-center rounded-full bg-accent/12 text-accent">
                      <Check size={14} strokeWidth={2.4} />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="section defer" style={vars({ "--defer-h": "1600px" })} aria-labelledby="screens">
        <div className="wrap">
          <SectionHeader id="screens" eyebrow="Surelane" title={t.screensHeading} />
          <ScreenGallery shots={[shots.today, shots.applications, shots.sources, shots.storage, shots.jobs, shots.match, shots.insights, shots.settings]} />
        </div>
      </section>

      <ClosingCTA lang={lang} heading={t.ctaHeading} lead={fill(t.ctaText, { time: ui.replyTime })} interest="surelane" />
    </Page>
  );
}

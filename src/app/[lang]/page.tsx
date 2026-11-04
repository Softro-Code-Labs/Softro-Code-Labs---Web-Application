import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "@/components/icons";
import { JsonLd } from "@/components/JsonLd";
import { CapabilityRibbons, ClosingCTA, Hero, LabFeature, Process, Testimonials, WhatWeBuild, WorkList } from "@/components/Sections";
import { Page, SectionHeader, vars } from "@/components/ui";
import { getContent } from "@/content";
import { localize, resolveLang, type LangParams } from "@/i18n";
import { businessJsonLd, pageMetadata } from "@/seo";

export async function generateMetadata({ params }: LangParams): Promise<Metadata> {
  const lang = await resolveLang(params);
  return pageMetadata(lang, "/", undefined, getContent(lang).ui.meta.description);
}

export default async function Home({ params }: LangParams) {
  const lang = await resolveLang(params);
  const { ui, projects, steps } = getContent(lang);

  return (
    <Page>
      <JsonLd data={businessJsonLd(lang)} />

      <Hero lang={lang} />
      <CapabilityRibbons lang={lang} />
      <WhatWeBuild lang={lang} />

      <section id="work" className="section defer" style={vars({ "--defer-h": "2200px" })} aria-labelledby="work-heading">
        <div className="wrap">
          <SectionHeader
            id="work-heading"
            eyebrow={ui.home.workEyebrow}
            title={ui.home.workHeading}
            lead={ui.home.workLead}
            action={
              <Link className="link-arrow" href={localize(lang, "/work")}>
                {ui.caseStudy.allWork}
                <span className="ring">
                  <ArrowRight size={16} className="arrow" />
                </span>
              </Link>
            }
          />
          <WorkList projects={projects} lang={lang} />
        </div>
      </section>

      <LabFeature lang={lang} />
      <Process steps={steps} eyebrow={ui.home.processEyebrow} title={ui.home.processHeading} />
      <Testimonials lang={lang} />
      <ClosingCTA lang={lang} />
    </Page>
  );
}

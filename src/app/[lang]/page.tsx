import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "@/components/icons";
import { CapabilityRibbons, ClosingCTA, Hero, LabFeature, Process, Testimonials, WhatWeBuild, WorkList } from "@/components/Sections";
import { Page, SectionHeader, vars } from "@/components/ui";
import { getContent } from "@/content";
import { site } from "@/content/site";
import { localize, pageMetadata, resolveLang, type LangParams } from "@/i18n";

export async function generateMetadata({ params }: LangParams): Promise<Metadata> {
  const lang = await resolveLang(params);
  return pageMetadata(lang, "/", undefined, getContent(lang).ui.meta.description);
}

export default async function Home({ params }: LangParams) {
  const lang = await resolveLang(params);
  const { ui, projects, steps, services, capabilities } = getContent(lang);

  // Tells search engines who we are and everything we build.
  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.name,
    url: site.url,
    logo: `${site.url}/brand/softro-mark.svg`,
    description: ui.meta.description,
    email: site.email,
    telephone: site.phoneIntl,
    address: { "@type": "PostalAddress", streetAddress: "No. 30, Robert De Zoysa Mawatha, Walagedara", addressLocality: "Balapitiya", addressCountry: "LK" },
    knowsLanguage: ["en", "si"],
    knowsAbout: [...services.map((service) => service.name), ...capabilities.flatMap((group) => group.items.map((item) => item.name))],
  };

  return (
    <Page>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }} />

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

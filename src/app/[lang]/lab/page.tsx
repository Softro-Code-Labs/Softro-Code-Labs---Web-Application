import type { Metadata } from "next";
import { ScreenGallery } from "@/components/Devices";
import { Cpu, Download, Save } from "@/components/icons";
import { JsonLd } from "@/components/JsonLd";
import { ClosingCTA, LabFeature } from "@/components/Sections";
import { SurelaneTeaser } from "@/components/Surelane";
import { Page, SectionHeader, vars } from "@/components/ui";
import { getContent } from "@/content";
import { resolveLang, type LangParams } from "@/i18n";
import { breadcrumbJsonLd, pageMetadata } from "@/seo";

const stepIcons = [Download, Cpu, Save];

export async function generateMetadata({ params }: LangParams): Promise<Metadata> {
  const lang = await resolveLang(params);
  const { lab } = getContent(lang).ui;
  return pageMetadata(lang, "/lab", lab.title, lab.description);
}

export default async function LabPage({ params }: LangParams) {
  const lang = await resolveLang(params);
  const { ui, labShots } = getContent(lang);
  return (
    <Page>
      <JsonLd data={breadcrumbJsonLd(lang, [{ name: ui.chrome.lab, path: "/lab" }])} />
      <LabFeature pageTitle lang={lang} />

      <section className="section defer" style={vars({ "--defer-h": "600px" })} aria-labelledby="how-heading">
        <div className="wrap">
          <SectionHeader id="how-heading" title={ui.lab.howHeading} />
          <ol className="grid gap-5 min-[1024px]:grid-cols-3">
            {ui.lab.how.map((step, index) => {
              const Icon = stepIcons[index] ?? Cpu;
              return (
                <li key={step.title} className="card spot p-7 min-[1024px]:p-9" data-spot data-reveal style={vars({ "--i": index })}>
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

      <section className="section defer" style={vars({ "--defer-h": "1600px" })} aria-labelledby="screens">
        <div className="wrap">
          <SectionHeader id="screens" title={ui.lab.screensHeading} />
          <ScreenGallery shots={[labShots.home, labShots.menu, labShots.privacy, labShots.docs, labShots.search, labShots.nav, labShots.convert, labShots.password]} />
        </div>
      </section>

      <SurelaneTeaser lang={lang} />

      <ClosingCTA lang={lang} />
    </Page>
  );
}

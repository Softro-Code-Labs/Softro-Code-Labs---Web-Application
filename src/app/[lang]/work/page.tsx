import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { ClosingCTA, WorkList } from "@/components/Sections";
import { Page, PageHero } from "@/components/ui";
import { getContent } from "@/content";
import { resolveLang, type LangParams } from "@/i18n";
import { breadcrumbJsonLd, pageMetadata } from "@/seo";

export async function generateMetadata({ params }: LangParams): Promise<Metadata> {
  const lang = await resolveLang(params);
  const { work } = getContent(lang).ui;
  return pageMetadata(lang, "/work", work.title, work.description);
}

export default async function WorkPage({ params }: LangParams) {
  const lang = await resolveLang(params);
  const { ui, projects } = getContent(lang);
  return (
    <Page>
      <JsonLd data={breadcrumbJsonLd(lang, [{ name: ui.chrome.work, path: "/work" }])} />
      <PageHero eyebrow={ui.chrome.work} title={ui.work.heading} lead={ui.work.lead} />
      <section className="section pt-0!">
        <div className="wrap">
          <WorkList projects={projects} lang={lang} as="h2" eagerFirst />
        </div>
      </section>
      <ClosingCTA lang={lang} />
    </Page>
  );
}

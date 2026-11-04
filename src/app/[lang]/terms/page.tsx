import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { Legal } from "@/components/Legal";
import { getContent } from "@/content";
import { site } from "@/content/site";
import { fill, resolveLang, type LangParams } from "@/i18n";
import { breadcrumbJsonLd, pageMetadata } from "@/seo";

export async function generateMetadata({ params }: LangParams): Promise<Metadata> {
  const lang = await resolveLang(params);
  const doc = getContent(lang).legal.terms;
  return pageMetadata(lang, "/terms", doc.title, fill(doc.description, { name: site.name }));
}

export default async function TermsPage({ params }: LangParams) {
  const lang = await resolveLang(params);
  const { ui, legal } = getContent(lang);
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(lang, [{ name: ui.chrome.terms, path: "/terms" }])} />
      <Legal doc={legal.terms} lang={lang} />
    </>
  );
}

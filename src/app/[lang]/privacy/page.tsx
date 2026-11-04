import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { Legal } from "@/components/Legal";
import { getContent } from "@/content";
import { site } from "@/content/site";
import { fill, resolveLang, type LangParams } from "@/i18n";
import { breadcrumbJsonLd, pageMetadata } from "@/seo";

export async function generateMetadata({ params }: LangParams): Promise<Metadata> {
  const lang = await resolveLang(params);
  const doc = getContent(lang).legal.privacy;
  return pageMetadata(lang, "/privacy", doc.title, fill(doc.description, { name: site.name }));
}

export default async function PrivacyPage({ params }: LangParams) {
  const lang = await resolveLang(params);
  const { ui, legal } = getContent(lang);
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(lang, [{ name: ui.chrome.privacy, path: "/privacy" }])} />
      <Legal doc={legal.privacy} lang={lang} />
    </>
  );
}

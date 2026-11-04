import type { Metadata } from "next";
import { Legal } from "@/components/Legal";
import { getContent } from "@/content";
import { pageMetadata, resolveLang, type LangParams } from "@/i18n";

export async function generateMetadata({ params }: LangParams): Promise<Metadata> {
  const lang = await resolveLang(params);
  const doc = getContent(lang).legal.terms;
  return pageMetadata(lang, "/terms", doc.title, getContent(lang).ui.meta.description);
}

export default async function TermsPage({ params }: LangParams) {
  const lang = await resolveLang(params);
  return <Legal doc={getContent(lang).legal.terms} lang={lang} />;
}

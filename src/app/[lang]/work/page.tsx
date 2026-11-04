import type { Metadata } from "next";
import { RibbonRow } from "@/components/Ribbon";
import { ClosingEnquiry, ProjectRow } from "@/components/Sections";
import { getContent } from "@/content";
import { pageMetadata, resolveLang, type LangParams } from "@/i18n";

export async function generateMetadata({ params }: LangParams): Promise<Metadata> {
  const lang = await resolveLang(params);
  const { work } = getContent(lang).ui;
  return pageMetadata(lang, "/work", work.title, work.description);
}

export default async function WorkPage({ params }: LangParams) {
  const lang = await resolveLang(params);
  const { ui, projects } = getContent(lang);
  return (
    <>
      <RibbonRow variant="first" className="pt-14 pb-14 min-[981px]:pt-20">
        <h1 className="display-xl">{ui.work.heading}</h1>
        <p className="lead mt-6 max-w-[620px] text-muted">{ui.work.lead}</p>
      </RibbonRow>
      {projects.map((project) => (
        <ProjectRow key={project.slug} project={project} lang={lang} />
      ))}
      <ClosingEnquiry lang={lang} />
    </>
  );
}

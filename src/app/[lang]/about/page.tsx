import type { Metadata } from "next";
import { RibbonRow } from "@/components/Ribbon";
import { ClosingEnquiry, Steps } from "@/components/Sections";
import { getContent } from "@/content";
import { pageMetadata, resolveLang, type LangParams } from "@/i18n";

export async function generateMetadata({ params }: LangParams): Promise<Metadata> {
  const lang = await resolveLang(params);
  const { about } = getContent(lang).ui;
  return pageMetadata(lang, "/about", about.title, about.description);
}

export default async function AboutPage({ params }: LangParams) {
  const lang = await resolveLang(params);
  const { ui, steps } = getContent(lang);
  const t = ui.about;
  return (
    <>
      <RibbonRow variant="first" className="pt-14 pb-14 min-[981px]:pt-20">
        <h1 className="display-xl max-w-[900px]">{t.heading}</h1>
        <p className="lead mt-6 max-w-[620px] text-muted">{t.lead}</p>
      </RibbonRow>
      <RibbonRow className="pt-6 pb-12">
        <h2 className="display-l mb-8">{t.storyHeading}</h2>
        <div className="max-w-[640px] space-y-4 text-muted">
          {t.story.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </RibbonRow>
      <RibbonRow className="pt-6 pb-12">
        <h2 className="display-l mb-10">{t.valuesHeading}</h2>
        <div className="min-[981px]:pr-16">
          {t.values.map((value) => (
            <div key={value.name} className="grid gap-x-12 gap-y-2 border-t border-line py-6 min-[981px]:grid-cols-[1fr_1.4fr]">
              <h3 className="card-title font-display text-[32px] leading-tight font-semibold">{value.name}</h3>
              <p className="text-muted">{value.text}</p>
            </div>
          ))}
        </div>
      </RibbonRow>
      <RibbonRow className="pt-6 pb-12">
        <h2 className="display-l mb-10">{t.processHeading}</h2>
        <Steps steps={steps} />
      </RibbonRow>
      <ClosingEnquiry lang={lang} />
    </>
  );
}

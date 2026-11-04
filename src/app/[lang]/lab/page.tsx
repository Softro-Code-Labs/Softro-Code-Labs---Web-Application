import type { Metadata } from "next";
import { ScreenGallery } from "@/components/ProjectScreen";
import { RibbonRow } from "@/components/Ribbon";
import { ClosingEnquiry, LabRow } from "@/components/Sections";
import { getContent } from "@/content";
import { pageMetadata, resolveLang, type LangParams } from "@/i18n";

export async function generateMetadata({ params }: LangParams): Promise<Metadata> {
  const lang = await resolveLang(params);
  const { lab } = getContent(lang).ui;
  return pageMetadata(lang, "/lab", lab.title, lab.description);
}

export default async function LabPage({ params }: LangParams) {
  const lang = await resolveLang(params);
  const { ui, labShots } = getContent(lang);
  return (
    <>
      <LabRow pageTitle lang={lang} />
      <RibbonRow className="pt-14 pb-12 min-[981px]:pt-[104px]">
        <h2 className="display-l max-w-[760px]">{ui.lab.howHeading}</h2>
        <ol className="mt-10 grid gap-8 min-[981px]:grid-cols-3 min-[981px]:pr-16">
          {ui.lab.how.map((step, index) => (
            <li key={step.title}>
              <p aria-hidden="true" className="font-display text-[56px] leading-none font-semibold text-crimson">
                {index + 1}
              </p>
              <h3 className="mt-3 text-[21px] leading-snug font-semibold">{step.title}</h3>
              <p className="mt-2 text-muted">{step.text}</p>
            </li>
          ))}
        </ol>
      </RibbonRow>
      <section aria-labelledby="screens" className="px-(--gutter) pt-10 pb-16 min-[981px]:pb-24">
        <div className="max-w-[1194px]">
          <h2 id="screens" className="display-m mb-10">
            {ui.lab.screensHeading}
          </h2>
          <ScreenGallery shots={[labShots.menu, labShots.phone, labShots.convert, labShots.password]} />
        </div>
      </section>
      <ClosingEnquiry lang={lang} />
    </>
  );
}

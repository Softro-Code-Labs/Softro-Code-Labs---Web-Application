import type { Metadata } from "next";
import Link from "next/link";
import { RibbonRow } from "@/components/Ribbon";
import { ClosingEnquiry } from "@/components/Sections";
import { getContent } from "@/content";
import { localize, pageMetadata, resolveLang, type LangParams } from "@/i18n";

export async function generateMetadata({ params }: LangParams): Promise<Metadata> {
  const lang = await resolveLang(params);
  const { services } = getContent(lang).ui;
  return pageMetadata(lang, "/services", services.title, services.description);
}

export default async function ServicesPage({ params }: LangParams) {
  const lang = await resolveLang(params);
  const { ui, services } = getContent(lang);
  return (
    <>
      <RibbonRow variant="first" className="pt-14 pb-10 min-[981px]:pt-20">
        <h1 className="display-xl max-w-[900px]">{ui.services.heading}</h1>
        <p className="lead mt-6 max-w-[620px] text-muted">{ui.services.lead}</p>
      </RibbonRow>
      <RibbonRow className="pb-16">
        {services.map((service) => (
          <section key={service.name} className="grid gap-x-12 gap-y-3 border-t border-line pt-6 pb-10 min-[981px]:grid-cols-[1fr_1.4fr] min-[981px]:pr-16">
            <h2 className="display-m">{service.name}</h2>
            <div>
              <p>{service.long}</p>
              <p className="mt-4 text-[15px] text-muted">
                {ui.services.example}{" "}
                <Link className="link" href={localize(lang, service.example.href)}>
                  {service.example.label}
                </Link>
              </p>
            </div>
          </section>
        ))}
      </RibbonRow>
      <ClosingEnquiry lang={lang} />
    </>
  );
}

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { RibbonRow } from "@/components/Ribbon";
import { ClosingEnquiry, LabRow, ProjectRow, Steps, Testimonials } from "@/components/Sections";
import { getContent } from "@/content";
import { site, whatsapp } from "@/content/site";
import { localize, pageMetadata, resolveLang, type LangParams } from "@/i18n";

const organization = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: site.name,
  url: site.url,
  logo: `${site.url}/brand/softro-mark.svg`,
  email: site.email,
  telephone: site.phoneIntl,
  address: { "@type": "PostalAddress", streetAddress: "No. 30, Robert De Zoysa Mawatha, Walagedara", addressLocality: "Balapitiya", addressCountry: "LK" },
  knowsLanguage: ["en", "si"],
};

export async function generateMetadata({ params }: LangParams): Promise<Metadata> {
  const lang = await resolveLang(params);
  return pageMetadata(lang, "/", undefined, getContent(lang).ui.meta.description);
}

export default async function Home({ params }: LangParams) {
  const lang = await resolveLang(params);
  const { ui, projects, services, steps } = getContent(lang);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }} />

      <section className="hero">
        <h1 className="display-xl max-w-[960px]">{ui.home.heading}</h1>
        <p className="lead mt-8 max-w-[620px] text-muted">{ui.home.lead}</p>
        <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
          <Link href={localize(lang, "/contact")} className="btn">
            {ui.chrome.start}
          </Link>
          <a href={whatsapp(lang)} className="link">
            {ui.home.whatsapp}
          </a>
          <a href="#work" className="link">
            {ui.home.seeWork}
          </a>
        </div>
        <p className="mt-10 max-w-[620px] text-sm text-muted">{ui.home.note}</p>
        <Image className="hero-mark" src="/brand/softro-mark.svg" alt="" width={352} height={534} priority />
      </section>

      <RibbonRow id="work" variant="first" as="div" className="pt-10 pb-16">
        <h2 className="display-l">{ui.home.workHeading}</h2>
      </RibbonRow>

      {projects.map((project) => (
        <ProjectRow key={project.slug} project={project} lang={lang} />
      ))}

      <LabRow id="lab" lang={lang} />

      <RibbonRow className="pt-14 pb-12 min-[981px]:pt-[104px]">
        <h2 className="display-l mb-10">{ui.home.servicesHeading}</h2>
        <div className="grid gap-x-12 min-[981px]:grid-cols-2 min-[981px]:pr-16">
          {services.map((service) => (
            <div key={service.name} className="border-t border-line pt-6 pb-8">
              <h3 className="card-title font-display text-[32px] leading-tight font-semibold">{service.name}</h3>
              <p className="mt-2 text-muted">{service.short}</p>
            </div>
          ))}
        </div>
      </RibbonRow>

      <Testimonials lang={lang} />

      <RibbonRow className="pt-10 pb-16">
        <h2 className="display-l mb-10">{ui.home.processHeading}</h2>
        <Steps steps={steps} />
      </RibbonRow>

      <ClosingEnquiry lang={lang} />
    </>
  );
}


import type { Metadata } from "next";
import Link from "next/link";
import { ProjectStage } from "@/components/Devices";
import { ArrowRight, Browser, Chat } from "@/components/icons";
import { CapabilityGroups, ClosingCTA, IdeaCard, Process, serviceIcons } from "@/components/Sections";
import { Page, PageHero, SectionHeader, vars } from "@/components/ui";
import { getContent } from "@/content";
import { whatsapp } from "@/content/site";
import { localize, pageMetadata, resolveLang, type LangParams } from "@/i18n";

export async function generateMetadata({ params }: LangParams): Promise<Metadata> {
  const lang = await resolveLang(params);
  const { services } = getContent(lang).ui;
  return pageMetadata(lang, "/services", services.title, services.description);
}

export default async function ServicesPage({ params }: LangParams) {
  const lang = await resolveLang(params);
  const { ui, services, projects, labShots, steps } = getContent(lang);

  /** The real example behind each service: a client project, or our own product in the Lab. */
  const example = (href: string) => {
    const project = projects.find((item) => `/work/${item.slug}` === href);
    if (project) return { screen: project.screen, accent: project.accent, tint: project.tint };
    return { screen: labShots.phone, accent: labShots.convert, tint: "#ef4c5b" };
  };

  return (
    <Page>
      <PageHero eyebrow={ui.chrome.services} title={ui.services.heading} lead={ui.services.lead}>
        <div className="flex flex-wrap gap-3">
          <Link href={localize(lang, "/contact")} className="btn btn-primary">
            {ui.chrome.start}
            <ArrowRight size={18} className="arrow" />
          </Link>
          <a href={whatsapp(lang)} className="btn btn-secondary">
            <Chat size={18} />
            {ui.home.whatsapp}
          </a>
        </div>
      </PageHero>

      <section className="section pt-0!">
        <div className="wrap grid gap-6 min-[1024px]:gap-8">
          {services.map((service, index) => {
            const Icon = serviceIcons[service.example.href] ?? Browser;
            const visual = example(service.example.href);
            const flip = index % 2 === 1;
            return (
              <article key={service.name} className="card spot overflow-hidden p-2.5 min-[1024px]:p-3" data-spot data-tilt-scope data-reveal>
                <div className="grid items-center gap-6 min-[1024px]:grid-cols-2 min-[1024px]:gap-4">
                  <div className={`px-4 pt-5 pb-3 min-[640px]:px-6 min-[1024px]:px-10 min-[1024px]:py-12 ${flip ? "min-[1024px]:order-2" : ""}`}>
                    <div className="flex items-center gap-4">
                      <span className="icon-tile">
                        <Icon size={22} />
                      </span>
                      <span className="font-mono text-[12px] tracking-[0.12em] text-subtle" aria-hidden="true">
                        0{index + 1}
                      </span>
                    </div>
                    <h2 className="display-2 mt-7">{service.name}</h2>
                    <p className="mt-5 text-[17.5px] leading-relaxed text-muted">{service.long}</p>
                    <p className="mt-7 text-[15px] text-subtle">
                      {ui.services.example}{" "}
                      <Link className="link" href={localize(lang, service.example.href)}>
                        {service.example.label}
                      </Link>
                    </p>
                  </div>
                  <div className={`project-stage ${flip ? "min-[1024px]:order-1" : ""}`} style={vars({ "--tint": visual.tint })}>
                    <div className="grid-bg" aria-hidden="true" />
                    <ProjectStage project={visual} flip={flip} decorative />
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* Beyond the core: everything else we can build, with a line about each. */}
      <section className="section defer" style={vars({ "--defer-h": "1500px" })} aria-labelledby="more-heading">
        <div className="wrap">
          <SectionHeader id="more-heading" eyebrow={ui.build.moreEyebrow} title={ui.build.moreHeading} lead={ui.build.moreLead} />
          <CapabilityGroups lang={lang} detailed as="h3" />
          <IdeaCard lang={lang} />
        </div>
      </section>

      <Process steps={steps} eyebrow={ui.home.processEyebrow} title={ui.home.processHeading} />
      <ClosingCTA lang={lang} />
    </Page>
  );
}

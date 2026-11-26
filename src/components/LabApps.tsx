import Image from "next/image";
import Link from "next/link";
import { BrowserFrame, ProjectStage } from "@/components/Devices";
import { ArrowRight } from "@/components/icons";
import { SectionHeader, vars } from "@/components/ui";
import { getContent } from "@/content";
import type { LabApp, LabAppSlug } from "@/content/projects";
import { localize, type Lang } from "@/i18n";

/** The enquiry form with this app already picked. */
export const appContact = (lang: Lang, slug: LabAppSlug) => `${localize(lang, "/contact")}?interest=${slug}`;

/** An app's icon. Decorative: the app's name always sits beside it. */
export function AppIcon({ app, size, eager = false }: { app: LabApp; size: number; eager?: boolean }) {
  return <Image className="flex-none rounded-[22%] shadow-lg" src={app.icon} width={size} height={size} alt="" loading={eager ? "eager" : "lazy"} />;
}

/** The app's screens in depth, on a glow of its own colour. */
export function AppStage({ app, eager = false, decorative = false }: { app: LabApp; eager?: boolean; decorative?: boolean }) {
  return (
    <div className="project-stage" style={vars({ "--tint": app.tint })}>
      <div className="grid-bg" aria-hidden="true" />
      <ProjectStage project={app} eager={eager} decorative={decorative} />
    </div>
  );
}

/** The commercial apps on The Lab page: a card for each, leading to the app's own page. */
export function LabAppsSection({ lang }: { lang: Lang }) {
  const { ui, labApps } = getContent(lang);
  const t = ui.lab;
  return (
    <section id="apps" className="section defer" style={vars({ "--defer-h": "900px" })} aria-labelledby="apps-heading">
      <div className="wrap">
        <SectionHeader id="apps-heading" eyebrow={t.appsEyebrow} title={t.appsHeading} lead={t.appsLead} />
        <ul className="grid gap-5 min-[768px]:grid-cols-2 min-[1200px]:grid-cols-3">
          {labApps.map((app, index) => {
            const text = ui.apps[app.slug];
            // A desktop screen reads best at card size, so use the app's first one.
            const shot = app.gallery.find((item) => item.frame === "browser") ?? app.screen;
            return (
              <li key={app.slug} className="card flex flex-col overflow-hidden p-2.5" data-reveal style={vars({ "--i": index })}>
                {/* One shape for every card, so the names and buttons line up even though the screenshots differ. */}
                <div className="project-stage flex aspect-[16/11] items-center px-5" style={vars({ "--tint": app.tint })}>
                  <div className="grid-bg" aria-hidden="true" />
                  <div className="stage-box w-full">
                    <BrowserFrame shot={shot} sizes="(max-width: 767px) 90vw, (max-width: 1199px) 45vw, 380px" decorative />
                  </div>
                </div>
                <div className="flex flex-1 flex-col px-4 pt-6 pb-4 min-[1024px]:px-5">
                  <div className="flex items-center gap-3.5">
                    <AppIcon app={app} size={44} />
                    <div>
                      <h3 className="title" lang="en">
                        {app.name}
                      </h3>
                      <p className="mt-0.5 text-sm text-muted">{text.tagline}</p>
                    </div>
                  </div>
                  <p className="mt-5 leading-relaxed text-muted">{text.summary}</p>
                  <div className="mt-auto flex flex-wrap items-center gap-x-6 gap-y-3 pt-7">
                    <Link className="btn btn-secondary" href={localize(lang, `/lab/${app.slug}`)}>
                      {text.more}
                      <ArrowRight size={18} className="arrow" />
                    </Link>
                    <Link className="link text-[15px]" href={appContact(lang, app.slug)}>
                      {text.ask}
                    </Link>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

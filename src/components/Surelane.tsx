import Image from "next/image";
import Link from "next/link";
import { ProjectStage } from "@/components/Devices";
import { ArrowRight } from "@/components/icons";
import { vars } from "@/components/ui";
import { getContent } from "@/content";
import { localize, type Lang } from "@/i18n";

/** Surelane's own violet, used for the glow behind its screens. */
export const surelaneTint = "#6f5cf0";

/** The enquiry form with Surelane already picked. */
export const surelaneContact = (lang: Lang) => `${localize(lang, "/contact")}?interest=surelane`;

/** The Surelane app icon. Decorative: the product name always sits beside it. */
export function SurelaneLogo({ size, eager = false }: { size: number; eager?: boolean }) {
  return (
    <Image
      className="flex-none rounded-[22%] shadow-lg"
      src="/work/surelane-icon.webp"
      width={size}
      height={size}
      alt=""
      loading={eager ? "eager" : "lazy"}
    />
  );
}

/** A phone with Surelane's job list in front of its Today page on a desktop. */
export function SurelaneStage({ lang, eager = false, decorative = false }: { lang: Lang; eager?: boolean; decorative?: boolean }) {
  const { surelaneShots } = getContent(lang);
  return (
    <div className="project-stage" style={vars({ "--tint": surelaneTint })}>
      <div className="grid-bg" aria-hidden="true" />
      <ProjectStage project={{ screen: surelaneShots.jobs, accent: surelaneShots.today }} eager={eager} decorative={decorative} />
    </div>
  );
}

/** Surelane on The Lab page: a short introduction that leads to its own page. */
export function SurelaneTeaser({ lang }: { lang: Lang }) {
  const t = getContent(lang).ui.surelane;
  return (
    <section id="surelane" className="section defer" style={vars({ "--defer-h": "760px" })} aria-labelledby="surelane-heading">
      <div className="wrap">
        <div className="card grid items-center gap-x-12 gap-y-10 p-6 min-[640px]:p-10 min-[1024px]:grid-cols-2 min-[1024px]:p-14" data-reveal data-tilt-scope>
          <div>
            <span className="chip">{t.kind}</span>
            <div className="mt-6 flex items-center gap-4">
              <SurelaneLogo size={56} />
              <div>
                <h2 id="surelane-heading" className="display-2" lang="en">
                  Surelane
                </h2>
                <p className="mt-1 text-muted">{t.tagline}</p>
              </div>
            </div>
            <p className="lead mt-6 max-w-[540px] text-muted">{t.lead}</p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link className="btn btn-primary" href={localize(lang, "/lab/surelane")}>
                {t.more}
                <ArrowRight size={18} className="arrow" />
              </Link>
              <Link className="btn btn-secondary" href={surelaneContact(lang)}>
                {t.ask}
              </Link>
            </div>
          </div>
          <SurelaneStage lang={lang} decorative />
        </div>
      </div>
    </section>
  );
}

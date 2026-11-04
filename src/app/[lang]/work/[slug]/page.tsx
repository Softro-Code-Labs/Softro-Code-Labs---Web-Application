import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProjectScreen, ScreenGallery } from "@/components/ProjectScreen";
import { FoldRow } from "@/components/Ribbon";
import { ClosingEnquiry } from "@/components/Sections";
import { getContent } from "@/content";
import { projects as allProjects } from "@/content/projects";
import { fill, langs, localize, pageMetadata, resolveLang } from "@/i18n";

type Props = { params: Promise<{ lang: string; slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return langs.flatMap((lang) => allProjects.map((project) => ({ lang, slug: project.slug })));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const lang = await resolveLang(params);
  const { slug } = await params;
  const project = getContent(lang).projects.find((item) => item.slug === slug);
  if (!project) return {};
  return pageMetadata(lang, `/work/${slug}`, project.name, project.summary);
}

export default async function CaseStudy({ params }: Props) {
  const lang = await resolveLang(params);
  const { slug } = await params;
  const { ui, projects } = getContent(lang);
  const t = ui.caseStudy;
  const index = projects.findIndex((item) => item.slug === slug);
  if (index < 0) notFound();
  const project = projects[index];
  const next = projects[(index + 1) % projects.length];

  return (
    <>
      <FoldRow
        art={<ProjectScreen project={project} />}
        text={
          <>
            <p className="text-[15px]">
              <Link className="link" href={localize(lang, "/work")}>
                {t.allWork}
              </Link>
            </p>
            <div className="mt-6 flex items-center gap-4">
              {project.slug === "ola-kids" && <Image className="rounded-2xl" src="/work/ola-kids-icon.webp" width={64} height={64} alt="" />}
              <h1 className="display-l">{project.name}</h1>
            </div>
            <p className="mt-2 text-sm text-muted">{project.kind}</p>
            <p className="lead mt-6 max-w-[460px]">{project.summary}</p>
            <p className="mt-6 text-sm text-muted">{project.tech.join(", ")}</p>
            {project.link && (
              <p className="mt-6">
                <a className="link" href={project.link.href}>
                  {project.link.label}
                </a>
              </p>
            )}
          </>
        }
      />

      <div className="on-paper bg-paper px-(--gutter) py-16 text-night min-[981px]:py-24">
        <div className="grid max-w-[1194px] gap-x-16 gap-y-12 min-[981px]:grid-cols-2">
          <section>
            <h2 className="display-m">{t.needed}</h2>
            {project.need.map((text) => (
              <p key={text} className="mt-4 max-w-[60ch]">
                {text}
              </p>
            ))}
            <h2 className="display-m mt-12">{t.stands}</h2>
            <p className="mt-4 max-w-[60ch]">{project.stands}</p>
          </section>
          <section>
            <h2 className="display-m">{t.built}</h2>
            <ul className="mt-4">
              {project.built.map((item) => (
                <li key={item} className="border-t border-muted-paper/40 py-3">
                  {item}
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>

      <section aria-labelledby="screens" className="px-(--gutter) py-16 min-[981px]:py-24">
        <div className="max-w-[1194px]">
          <h2 id="screens" className="display-m mb-10">
            {project.slug === "ola-kids" ? t.screensApp : t.screensSite}
          </h2>
          <ScreenGallery shots={project.gallery} />
          <p className="mt-14">
            <Link className="link" href={localize(lang, `/work/${next.slug}`)}>
              {fill(t.next, { name: next.name })}
            </Link>
          </p>
        </div>
      </section>

      <ClosingEnquiry lang={lang} />
    </>
  );
}

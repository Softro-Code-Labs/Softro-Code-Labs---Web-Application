import { getContent } from "@/content";
import type { LegalDoc } from "@/content/legal";
import { site } from "@/content/site";
import { fill, type Lang } from "@/i18n";
import { Backdrop, Page } from "./ui";

export function Legal({ doc, lang }: { doc: LegalDoc; lang: Lang }) {
  const { ui } = getContent(lang);
  const values = { name: site.name, email: site.email };
  return (
    <Page>
      <section className="hero">
        <Backdrop />
        <div className="wrap pt-14 pb-24 min-[1024px]:pt-20 min-[1024px]:pb-32">
          <div className="mx-auto max-w-[760px]">
            <h1 className="display-1">{doc.title}</h1>
            <p className="mt-4 text-sm text-subtle">{fill(ui.legal.updated, { date: ui.legal.date })}</p>
            <article className="card prose-doc mt-10 p-6 min-[640px]:p-10 [&>*:first-child]:mt-0">
              {doc.blocks.map(([kind, text]) => (kind === "h" ? <h2 key={text}>{text}</h2> : <p key={text}>{fill(text, values)}</p>))}
            </article>
          </div>
        </div>
      </section>
    </Page>
  );
}

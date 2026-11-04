import { getContent } from "@/content";
import type { LegalDoc } from "@/content/legal";
import { site } from "@/content/site";
import { fill, type Lang } from "@/i18n";

export function Legal({ doc, lang }: { doc: LegalDoc; lang: Lang }) {
  const { ui } = getContent(lang);
  const values = { name: site.name, email: site.email };
  return (
    <div className="on-paper bg-paper px-(--gutter) py-16 text-night">
      <article className="mx-auto max-w-[680px] [&_h2]:mt-10 [&_h2]:font-display [&_h2]:text-[32px] [&_h2]:font-semibold [&_p]:mt-3">
        <h1 className="display-l">{doc.title}</h1>
        <p className="text-sm text-muted-paper">{fill(ui.legal.updated, { date: ui.legal.date })}</p>
        {doc.blocks.map(([kind, text]) => (kind === "h" ? <h2 key={text}>{text}</h2> : <p key={text}>{fill(text, values)}</p>))}
      </article>
    </div>
  );
}

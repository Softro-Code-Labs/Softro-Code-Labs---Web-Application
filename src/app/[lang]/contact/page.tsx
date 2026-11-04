import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { getContent } from "@/content";
import { site, whatsapp } from "@/content/site";
import { fill, pageMetadata, resolveLang, type LangParams } from "@/i18n";

export async function generateMetadata({ params }: LangParams): Promise<Metadata> {
  const lang = await resolveLang(params);
  const { contact } = getContent(lang).ui;
  return pageMetadata(lang, "/contact", contact.title, contact.description);
}

export default async function ContactPage({ params }: LangParams) {
  const lang = await resolveLang(params);
  const { ui } = getContent(lang);
  return (
    <div className="grid gap-12 px-(--gutter) pt-14 pb-24 min-[981px]:grid-cols-2 min-[981px]:gap-20 min-[981px]:pt-20">
      <div>
        <h1 className="display-xl">{ui.contact.heading}</h1>
        <p className="lead mt-8 max-w-[520px] text-muted min-[981px]:mt-10">{fill(ui.contact.lead, { time: ui.replyTime })}</p>
        <ul className="mt-10 space-y-3">
          <li>
            <a className="link" href={whatsapp(lang)}>
              WhatsApp {site.phoneDisplay}
            </a>
          </li>
          <li>
            <a className="link" href={`mailto:${site.email}`}>
              {site.email}
            </a>
          </li>
          <li className="max-w-[420px] text-[15px] text-muted">{ui.address}</li>
        </ul>
      </div>
      <ContactForm lang={lang} t={ui.form} replyTime={ui.replyTime} />
    </div>
  );
}

import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { JsonLd } from "@/components/JsonLd";
import { DirectContact, NextSteps } from "@/components/Sections";
import { Backdrop, Eyebrow, Page, vars } from "@/components/ui";
import { getContent } from "@/content";
import { fill, resolveLang, type LangParams } from "@/i18n";
import { breadcrumbJsonLd, pageMetadata } from "@/seo";

export async function generateMetadata({ params }: LangParams): Promise<Metadata> {
  const lang = await resolveLang(params);
  const { contact } = getContent(lang).ui;
  return pageMetadata(lang, "/contact", contact.title, contact.description);
}

export default async function ContactPage({ params }: LangParams) {
  const lang = await resolveLang(params);
  const { ui } = getContent(lang);
  return (
    <Page>
      <JsonLd data={breadcrumbJsonLd(lang, [{ name: ui.chrome.contact, path: "/contact" }])} />
      <section className="hero">
        <Backdrop />
        <div className="wrap grid gap-x-16 gap-y-12 pt-14 pb-24 min-[1024px]:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] min-[1024px]:pt-20 min-[1024px]:pb-32">
          <div>
            <Eyebrow className="enter">{ui.chrome.contact}</Eyebrow>
            <h1 className="display-1 mt-5">{ui.contact.heading}</h1>
            <p className="lead enter mt-6 max-w-[520px] text-muted" style={vars({ "--i": 1 })}>
              {fill(ui.contact.lead, { time: ui.replyTime })}
            </p>
            <div className="enter mt-12 grid gap-10" style={vars({ "--i": 2 })}>
              <NextSteps lang={lang} as="h2" />
              <DirectContact lang={lang} showAddress />
            </div>
          </div>
          <div className="card enter self-start p-5 min-[640px]:p-8 min-[1024px]:sticky min-[1024px]:top-[calc(var(--header-h)+24px)] min-[1024px]:p-10" style={vars({ "--i": 1 })}>
            <ContactForm lang={lang} t={ui.form} replyTime={ui.replyTime} />
          </div>
        </div>
      </section>
    </Page>
  );
}

import Link from "next/link";
import { site, whatsapp } from "@/content/site";
import type { UI } from "@/content/ui";
import { localize, type Lang } from "@/i18n";
import { ArrowRight, ArrowUp, Chat, Mail, Phone, Pin } from "./icons";
import { Mark } from "./Logo";
import { Brand } from "./SiteChrome";
import { vars } from "./ui";

type Chrome = UI["chrome"];

/** The footer keeps the dark "ink" colours in both themes, so every page ends on the same note. */
export function Footer({ lang, t, address }: { lang: Lang; t: Chrome; address: string }) {
  const pages = [
    { href: localize(lang, "/services"), label: t.services },
    { href: localize(lang, "/work"), label: t.work },
    { href: localize(lang, "/lab"), label: t.lab },
    { href: localize(lang, "/about"), label: t.about },
    { href: localize(lang, "/contact"), label: t.contact },
  ];
  return (
    <footer id="site-footer" className="site-footer ink defer" style={vars({ "--defer-h": "760px" })}>
      <div className="wrap grid gap-x-16 gap-y-14 pt-16 pb-14 min-[1024px]:grid-cols-[minmax(0,1.1fr)_minmax(0,1.3fr)] min-[1024px]:pt-24">
        <div className="max-w-[480px]">
          <Brand lang={lang} />
          <p className="lead mt-6 text-muted">{t.tagline}</p>
          <Link href={localize(lang, "/contact")} className="btn btn-primary mt-8">
            {t.start}
            <ArrowRight size={18} className="arrow" />
          </Link>
        </div>

        <div className="grid gap-x-8 gap-y-10 min-[560px]:grid-cols-3">
          <nav aria-label={t.footerPages}>
            <p className="foot-label">{t.footerPages}</p>
            <ul className="space-y-2.5 text-[15.5px]">
              {pages.map((page) => (
                <li key={page.href}>
                  <Link className="foot-link" href={page.href}>
                    {page.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div>
            <p className="foot-label">{t.contact}</p>
            <ul className="space-y-2.5 text-[15.5px]">
              <li>
                <a className="foot-link inline-flex items-center gap-2.5" href={whatsapp(lang)}>
                  <Chat size={17} /> WhatsApp
                </a>
              </li>
              <li>
                <a className="foot-link inline-flex items-center gap-2.5 break-all" href={`mailto:${site.email}`}>
                  <Mail size={17} className="flex-none" /> {site.email}
                </a>
              </li>
              <li>
                <a className="foot-link inline-flex items-center gap-2.5" href={`tel:${site.phoneIntl}`}>
                  <Phone size={17} /> {site.phoneDisplay}
                </a>
              </li>
              <li className="flex gap-2.5 pt-1 text-[14.5px] leading-relaxed text-subtle">
                <Pin size={17} className="mt-0.5 flex-none" />
                {address}
              </li>
            </ul>
          </div>
          <div>
            <p className="foot-label">{t.footerLegal}</p>
            <ul className="space-y-2.5 text-[15.5px]">
              <li>
                <Link className="foot-link" href={localize(lang, "/privacy")}>
                  {t.privacy}
                </Link>
              </li>
              <li>
                <Link className="foot-link" href={localize(lang, "/terms")}>
                  {t.terms}
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* The brand, as large as the page allows. Decorative; the name is in the header and above. */}
      <div className="wrap flex items-end gap-[2.2vw] pb-4" aria-hidden="true">
        <Mark height={150} className="h-[min(10.5vw,150px)] w-auto flex-none" />
        <p className="wordmark-xl">{site.name}</p>
      </div>

      <div className="wrap">
        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-line py-6 text-sm text-subtle">
          <p>
            © {new Date().getFullYear()} <span lang="en">{site.name}</span>
          </p>
          <a href="#main" className="foot-link inline-flex items-center gap-2">
            {t.backToTop}
            <ArrowUp size={16} />
          </a>
        </div>
      </div>
    </footer>
  );
}

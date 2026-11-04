import Link from "next/link";
import { site, whatsapp } from "@/content/site";
import type { UI } from "@/content/ui";
import { localize, type Lang } from "@/i18n";
import { Emblem } from "./Emblem";
import { ArrowUp, Chat, Mail, Phone, Pin } from "./icons";
import { Brand } from "./SiteChrome";
import { vars } from "./ui";

type Chrome = UI["chrome"];

export function Footer({ lang, t, address }: { lang: Lang; t: Chrome; address: string }) {
  const pages = [
    { href: localize(lang, "/services"), label: t.services },
    { href: localize(lang, "/work"), label: t.work },
    { href: localize(lang, "/lab"), label: t.lab },
    { href: localize(lang, "/about"), label: t.about },
    { href: localize(lang, "/contact"), label: t.contact },
  ];
  return (
    <footer id="site-footer" className="defer relative overflow-hidden border-t border-line bg-bg-soft" style={vars({ "--defer-h": "700px" })}>
      <div className="wrap grid gap-x-10 gap-y-12 pt-16 pb-12 min-[640px]:grid-cols-2 min-[1024px]:grid-cols-[1.5fr_1fr_1.2fr_1fr]">
        <div className="max-w-[340px]">
          <Brand lang={lang} />
          <p className="mt-5 text-[15px] leading-relaxed text-muted">{t.tagline}</p>
          <p className="mt-5 flex gap-2.5 text-[14px] leading-relaxed text-subtle">
            <Pin size={17} className="mt-0.5 flex-none" />
            {address}
          </p>
        </div>
        <nav aria-label={t.footerPages}>
          <p className="foot-label">{t.footerPages}</p>
          <ul className="space-y-2.5 text-[15px]">
            {pages.map((page) => (
              <li key={page.href}>
                <Link className="text-muted transition-colors hover:text-fg" href={page.href}>
                  {page.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div>
          <p className="foot-label">{t.contact}</p>
          <ul className="space-y-2.5 text-[15px]">
            <li>
              <a className="inline-flex items-center gap-2.5 text-muted transition-colors hover:text-fg" href={whatsapp(lang)}>
                <Chat size={17} /> WhatsApp
              </a>
            </li>
            <li>
              <a className="inline-flex items-center gap-2.5 text-muted transition-colors hover:text-fg" href={`mailto:${site.email}`}>
                <Mail size={17} /> {site.email}
              </a>
            </li>
            <li>
              <a className="inline-flex items-center gap-2.5 text-muted transition-colors hover:text-fg" href={`tel:${site.phoneIntl}`}>
                <Phone size={17} /> {site.phoneDisplay}
              </a>
            </li>
          </ul>
        </div>
        <div>
          <p className="foot-label">{t.footerLegal}</p>
          <ul className="space-y-2.5 text-[15px]">
            <li>
              <Link className="text-muted transition-colors hover:text-fg" href={localize(lang, "/privacy")}>
                {t.privacy}
              </Link>
            </li>
            <li>
              <Link className="text-muted transition-colors hover:text-fg" href={localize(lang, "/terms")}>
                {t.terms}
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* The brand, large: the 3D mark beside the wordmark. Decorative; the name is in the header and above. */}
      <div className="wrap flex items-end gap-[2.4vw] pb-2" aria-hidden="true">
        <Emblem className="w-[min(7.6vw,112px)] flex-none" />
        <p className="wordmark-xl">{site.name}</p>
      </div>

      <div className="wrap">
        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-line py-6 text-sm text-subtle">
          <p>
            © {new Date().getFullYear()} <span lang="en">{site.name}</span>
          </p>
          <a href="#main" className="inline-flex items-center gap-2 transition-colors hover:text-fg">
            {t.backToTop}
            <ArrowUp size={16} />
          </a>
        </div>
      </div>
    </footer>
  );
}

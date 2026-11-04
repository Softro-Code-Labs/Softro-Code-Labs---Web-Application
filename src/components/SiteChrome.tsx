"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { site, whatsapp } from "@/content/site";
import type { UI } from "@/content/ui";
import { localize, otherLanguagePath, type Lang } from "@/i18n";

type Chrome = UI["chrome"];

function navItems(lang: Lang, t: Chrome) {
  return [
    { href: localize(lang, "/work"), label: t.work },
    { href: localize(lang, "/services"), label: t.services },
    { href: localize(lang, "/lab"), label: t.lab },
    { href: localize(lang, "/about"), label: t.about },
  ];
}

function Brand({ lang }: { lang: Lang }) {
  return (
    <Link href={localize(lang, "/")} className="flex min-h-11 shrink-0 items-center gap-3">
      <Image src="/brand/softro-mark.svg" alt="" width={24} height={36} />
      <span className="font-display text-[22px] leading-none font-semibold max-[480px]:text-[18px]" lang="en">
        {site.name}
      </span>
    </Link>
  );
}

type Theme = "light" | "dark";

/**
 * Switches between the navy and paper themes. The layout's inline script sets the
 * starting theme before paint, from the saved choice or the system setting.
 */
function ThemeToggle({ t, withLabel = false, className = "" }: { t: Chrome; withLabel?: boolean; className?: string }) {
  const [theme, setTheme] = useState<Theme | null>(null);

  useEffect(() => {
    setTheme(document.documentElement.dataset.theme === "light" ? "light" : "dark");
  }, []);

  const next: Theme = theme === "light" ? "dark" : "light";
  const label = next === "light" ? t.toLight : t.toDark;

  function toggle() {
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {
      // Private browsing can block storage; the switch still works for this visit.
    }
    setTheme(next);
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={withLabel ? undefined : label}
      title={withLabel ? undefined : label}
      className={`btn btn-quiet shrink-0 ${withLabel ? "gap-3" : "w-11 px-0!"} ${className}`}
    >
      {/* Shows the theme you will switch to. Empty until the current theme is known, to avoid a mismatch. */}
      {theme === "dark" && <SunIcon />}
      {theme === "light" && <MoonIcon />}
      {withLabel && theme && <span>{label}</span>}
    </button>
  );
}

/** Opens the same page in the other language. Its text is written in that language. */
function LanguageSwitch({ lang, t }: { lang: Lang; t: Chrome }) {
  const pathname = usePathname();
  const other: Lang = lang === "en" ? "si" : "en";
  return (
    <Link
      href={otherLanguagePath(pathname)}
      hrefLang={other}
      lang={other}
      aria-label={t.otherLangLabel}
      title={t.otherLangLabel}
      className="btn btn-quiet shrink-0 px-3!"
    >
      {t.otherLang}
    </Link>
  );
}

function MenuIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" aria-hidden="true">
      <path d="M3 6h18M3 12h18M3 18h18" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" aria-hidden="true">
      <path d="M5 5l14 14M19 5L5 19" />
    </svg>
  );
}

function SunIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" aria-hidden="true">
      <circle cx="12" cy="12" r="4.5" />
      <path d="M12 1.5v3M12 19.5v3M1.5 12h3M19.5 12h3M4.6 4.6l2.1 2.1M17.3 17.3l2.1 2.1M4.6 19.4l2.1-2.1M17.3 6.7l2.1-2.1" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="miter" aria-hidden="true">
      <path d="M20.5 14.5A8.5 8.5 0 1 1 9.5 3.5a7 7 0 0 0 11 11Z" />
    </svg>
  );
}

export function Header({ lang, t }: { lang: Lang; t: Chrome }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const nav = navItems(lang, t);

  useEffect(() => setOpen(false), [pathname]);

  // Escape closes the phone menu.
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="sticky top-0 z-50 bg-night">
      <div className="flex items-center justify-between gap-4 px-(--gutter) py-3 min-[1101px]:py-5">
        <Brand lang={lang} />
        <div className="flex items-center gap-2 min-[1101px]:gap-6">
          <nav aria-label={t.mainNav} className="hidden items-center gap-6 text-[15px] font-semibold min-[1101px]:flex">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={pathname.startsWith(item.href) ? "page" : undefined}
                className="whitespace-nowrap underline-offset-4 hover:underline aria-[current=page]:underline"
              >
                {item.label}
              </Link>
            ))}
            <Link href={localize(lang, "/contact")} className="btn btn-quiet whitespace-nowrap">
              {t.start}
            </Link>
          </nav>
          <LanguageSwitch lang={lang} t={t} />
          <ThemeToggle t={t} className="hide-narrow" />
          <button
            type="button"
            className="btn btn-quiet menu-toggle shrink-0 max-[480px]:w-11 max-[480px]:px-0!"
            aria-expanded={open}
            aria-controls="phone-menu"
            onClick={() => setOpen((value) => !value)}
          >
            <span className="max-[480px]:sr-only">{open ? t.close : t.menu}</span>
            <span aria-hidden="true" className="hidden max-[480px]:block">
              {open ? <CloseIcon /> : <MenuIcon />}
            </span>
          </button>
        </div>
      </div>
      {open && (
        <nav id="phone-menu" aria-label={t.phoneNav} className="border-t border-line px-(--gutter) pb-6 min-[1101px]:hidden">
          {[...nav, { href: localize(lang, "/contact"), label: t.contact }].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={pathname.startsWith(item.href) ? "page" : undefined}
              className="display-m block py-3 underline-offset-8 aria-[current=page]:underline"
            >
              {item.label}
            </Link>
          ))}
          <ThemeToggle t={t} withLabel className="only-narrow mt-4" />
        </nav>
      )}
    </header>
  );
}

export function Footer({ lang, t, address }: { lang: Lang; t: Chrome; address: string }) {
  return (
    <footer className="border-t border-line px-(--gutter) pt-10 pb-8 text-sm text-muted">
      <div className="flex flex-wrap justify-between gap-x-16 gap-y-6">
        <div className="max-w-sm">
          <p className="text-paper" lang="en">
            {site.name}
          </p>
          <p className="mt-1">{address}</p>
        </div>
        <ul className="space-y-1">
          <li>
            <a className="hover:text-paper" href={`mailto:${site.email}`}>
              {site.email}
            </a>
          </li>
          <li>
            <a className="hover:text-paper" href={`tel:${site.phoneIntl}`}>
              {site.phoneDisplay}
            </a>
          </li>
          <li>
            <a className="hover:text-paper" href={whatsapp(lang)}>
              WhatsApp
            </a>
          </li>
        </ul>
        <ul className="space-y-1">
          <li>
            <Link className="hover:text-paper" href={localize(lang, "/privacy")}>
              {t.privacy}
            </Link>
          </li>
          <li>
            <Link className="hover:text-paper" href={localize(lang, "/terms")}>
              {t.terms}
            </Link>
          </li>
        </ul>
      </div>
      <p className="mt-8">
        © {new Date().getFullYear()} <span lang="en">{site.name}</span>
      </p>
    </footer>
  );
}

/** Keeps the two ways of getting in touch within thumb reach on phones. */
export function PhoneBar({ lang, t }: { lang: Lang; t: Chrome }) {
  const pathname = usePathname();
  if (pathname === localize(lang, "/contact")) return null;
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 gap-2 border-t border-line bg-night p-2 min-[1101px]:hidden">
      <Link href={localize(lang, "/contact")} className="btn px-3!">
        {t.start}
      </Link>
      <a href={whatsapp(lang)} className="btn btn-quiet min-h-[52px]!">
        WhatsApp
      </a>
    </div>
  );
}

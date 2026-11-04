"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, type MouseEvent } from "react";
import { flushSync } from "react-dom";
import { site, whatsapp } from "@/content/site";
import type { UI } from "@/content/ui";
import { localize, otherLanguagePath, visiblePath, type Lang } from "@/i18n";
import { ArrowRight, Chat, Close, Mail, Menu, Moon, Sun } from "./icons";
import { vars } from "./ui";

type Chrome = UI["chrome"];

export function navItems(lang: Lang, t: Chrome) {
  return [
    { href: localize(lang, "/work"), label: t.work },
    { href: localize(lang, "/services"), label: t.services },
    { href: localize(lang, "/lab"), label: t.lab },
    { href: localize(lang, "/about"), label: t.about },
  ];
}

const isCurrent = (pathname: string, href: string) => pathname === href || pathname.startsWith(`${href}/`);

export function Brand({ lang }: { lang: Lang }) {
  return (
    <Link href={localize(lang, "/")} className="group flex min-h-11 shrink-0 items-center gap-2.5">
      <Image
        src="/brand/softro-mark.svg"
        alt=""
        width={22}
        height={33}
        className="transition-transform duration-500 ease-expo group-hover:-rotate-6 group-hover:scale-110"
      />
      <span className="font-brand text-[21px] leading-none font-semibold max-[400px]:text-[18px]" lang="en">
        {site.name}
      </span>
    </Link>
  );
}

type Theme = "light" | "dark";

/**
 * Switches between the dark and light themes. Where the browser supports it, the new theme
 * spreads out in a circle from the button. The layout's inline script sets the starting
 * theme before the first paint, from the saved choice or the system setting.
 */
function ThemeToggle({ t, withLabel = false, className = "" }: { t: Chrome; withLabel?: boolean; className?: string }) {
  const [theme, setTheme] = useState<Theme | null>(null);

  useEffect(() => {
    setTheme(document.documentElement.dataset.theme === "light" ? "light" : "dark");
  }, []);

  const next: Theme = theme === "light" ? "dark" : "light";
  const label = next === "light" ? t.toLight : t.toDark;

  function apply() {
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {
      // Private browsing can block storage; the switch still works for this visit.
    }
    setTheme(next);
  }

  function toggle(event: MouseEvent<HTMLButtonElement>) {
    const root = document.documentElement;
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (typeof document.startViewTransition !== "function" || calm) {
      apply();
      return;
    }
    const box = event.currentTarget.getBoundingClientRect();
    const cx = box.left + box.width / 2;
    const cy = box.top + box.height / 2;
    const radius = Math.hypot(Math.max(cx, window.innerWidth - cx), Math.max(cy, window.innerHeight - cy));
    root.classList.add("theme-vt");
    const transition = document.startViewTransition(() => flushSync(apply));
    transition.ready
      .then(() => {
        root.animate(
          { clipPath: [`circle(0px at ${cx}px ${cy}px)`, `circle(${radius}px at ${cx}px ${cy}px)`] },
          { duration: 600, easing: "cubic-bezier(0.16, 1, 0.3, 1)", pseudoElement: "::view-transition-new(root)" },
        );
      })
      .catch(() => {});
    transition.finished.finally(() => root.classList.remove("theme-vt"));
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={withLabel ? undefined : label}
      title={withLabel ? undefined : label}
      className={`icon-btn ${withLabel ? "gap-2.5 px-4!" : ""} ${className}`}
    >
      {/* Shows the theme you will switch to. Empty until the current theme is known, to avoid a mismatch. */}
      <span className={withLabel ? "flex items-center gap-2.5" : "contents"}>
        {theme === "dark" && <Sun size={18} />}
        {theme === "light" && <Moon size={18} />}
        {withLabel && theme && <span>{label}</span>}
      </span>
    </button>
  );
}

/** Opens the same page in the other language. Its text is written in that language. */
function LanguageSwitch({ lang, t }: { lang: Lang; t: Chrome }) {
  const pathname = visiblePath(usePathname());
  const other: Lang = lang === "en" ? "si" : "en";
  return (
    <Link href={otherLanguagePath(pathname)} hrefLang={other} lang={other} aria-label={t.otherLangLabel} title={t.otherLangLabel} className="icon-btn lang-switch px-3.5!">
      {t.otherLang}
    </Link>
  );
}

export function Header({ lang, t, whatsappLabel }: { lang: Lang; t: Chrome; whatsappLabel: string }) {
  const [open, setOpen] = useState(false);
  const pathname = visiblePath(usePathname());
  const headerRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const nav = navItems(lang, t);
  const contact = localize(lang, "/contact");

  useEffect(() => setOpen(false), [pathname]);

  // The header turns to frosted glass once the page has scrolled. Written straight to the
  // element, so scrolling never re-renders React.
  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      header.toggleAttribute("data-scrolled", window.scrollY > 8);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  // While the phone menu is open, the page behind it cannot be reached or scrolled,
  // and Escape closes it.
  useEffect(() => {
    if (!open) return;
    const behind = ["main", "site-footer", "phone-bar"].map((id) => document.getElementById(id));
    behind.forEach((element) => element?.setAttribute("inert", ""));
    const root = document.documentElement;
    const overflow = root.style.overflow;
    root.style.overflow = "hidden";
    const wide = window.matchMedia("(min-width: 1101px)");
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    const onWide = () => wide.matches && setOpen(false);
    window.addEventListener("keydown", onKey);
    wide.addEventListener("change", onWide);
    return () => {
      behind.forEach((element) => element?.removeAttribute("inert"));
      root.style.overflow = overflow;
      window.removeEventListener("keydown", onKey);
      wide.removeEventListener("change", onWide);
    };
  }, [open]);

  return (
    <>
      <header ref={headerRef} className="site-header" data-open={open ? "" : undefined} style={{ viewTransitionName: "site-header" }}>
        <div className="wrap flex h-(--header-h) items-center justify-between gap-4">
          <Brand lang={lang} />
          <nav aria-label={t.mainNav} className="desktop-only flex items-center gap-1">
            {nav.map((item) => (
              <Link key={item.href} href={item.href} aria-current={isCurrent(pathname, item.href) ? "page" : undefined} className="nav-link">
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <LanguageSwitch lang={lang} t={t} />
            <ThemeToggle t={t} className="hide-narrow" />
            <Link href={contact} className="btn btn-primary btn-sm desktop-only ml-1">
              {t.start}
              <ArrowRight size={16} className="arrow" />
            </Link>
            <button
              ref={toggleRef}
              type="button"
              className="icon-btn phone-only"
              aria-expanded={open}
              aria-controls="phone-menu"
              aria-label={open ? t.close : t.menu}
              onClick={() => setOpen((value) => !value)}
            >
              {open ? <Close size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
        <span className="progress" aria-hidden="true" />
      </header>

      {/* Outside the header: its frosted-glass filter would otherwise trap this fixed panel inside it. */}
      {open && (
        <nav id="phone-menu" aria-label={t.phoneNav} className="mobile-menu phone-only">
          <ul>
            {[...nav, { href: contact, label: t.contact }].map((item, index) => (
              <li key={item.href} className="stagger" style={vars({ "--i": index })}>
                <Link href={item.href} aria-current={isCurrent(pathname, item.href) ? "page" : undefined} className="mobile-link">
                  {item.label}
                  <ArrowRight size={22} className="text-subtle" />
                </Link>
              </li>
            ))}
          </ul>
          <div className="stagger mt-auto grid gap-3 pt-10" style={vars({ "--i": 6 })}>
            <Link href={contact} className="btn btn-primary">
              {t.start}
              <ArrowRight size={18} className="arrow" />
            </Link>
            <a href={whatsapp(lang)} className="btn btn-secondary">
              <Chat size={18} />
              {whatsappLabel}
            </a>
            <div className="mt-3 flex flex-wrap items-center justify-between gap-4">
              <a href={`mailto:${site.email}`} className="inline-flex items-center gap-2 text-[15px] text-muted hover:text-fg">
                <Mail size={17} />
                {site.email}
              </a>
              <ThemeToggle t={t} withLabel />
            </div>
          </div>
        </nav>
      )}
    </>
  );
}

/**
 * Keeps the two ways of getting in touch within thumb reach on phones.
 * It waits while the page's own buttons ([data-cta]) or the enquiry form are on screen,
 * so it never repeats them or covers the form, and slides in once they scroll away.
 */
export function PhoneBar({ lang, t }: { lang: Lang; t: Chrome }) {
  const pathname = visiblePath(usePathname());
  const [hidden, setHidden] = useState(true);

  useEffect(() => {
    const targets = document.querySelectorAll("[data-cta], #enquiry");
    if (targets.length === 0) {
      setHidden(false);
      return;
    }
    const onScreen = new Set<Element>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) onScreen.add(entry.target);
          else onScreen.delete(entry.target);
        }
        setHidden(onScreen.size > 0);
      },
      { rootMargin: "0px 0px -15% 0px" },
    );
    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, [pathname]);

  if (pathname === localize(lang, "/contact")) return null;
  return (
    <div id="phone-bar" className="phone-bar glass phone-only" data-hidden={hidden ? "" : undefined}>
      <Link href={localize(lang, "/contact")} className="btn btn-primary btn-sm px-3!" tabIndex={hidden ? -1 : undefined}>
        {t.start}
      </Link>
      <a href={whatsapp(lang)} className="btn btn-secondary btn-sm px-3!" tabIndex={hidden ? -1 : undefined}>
        <Chat size={17} />
        WhatsApp
      </a>
    </div>
  );
}

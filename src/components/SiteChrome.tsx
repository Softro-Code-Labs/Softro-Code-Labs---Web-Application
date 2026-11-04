"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { nav, site } from "@/content/site";

function Brand() {
  return (
    <Link href="/" className="flex min-h-11 items-center gap-3">
      <Image src="/brand/softro-mark.svg" alt="" width={24} height={36} />
      <span className="font-display text-[22px] leading-none font-semibold">{site.name}</span>
    </Link>
  );
}

type Theme = "light" | "dark";

/**
 * Switches between the navy and paper themes. The layout's inline script sets the
 * starting theme before paint, from the saved choice or the system setting.
 */
function ThemeToggle() {
  const [theme, setTheme] = useState<Theme | null>(null);

  useEffect(() => {
    setTheme(document.documentElement.dataset.theme === "light" ? "light" : "dark");
  }, []);

  const next: Theme = theme === "light" ? "dark" : "light";

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
      aria-label={`Switch to ${next} theme`}
      title={`Switch to ${next} theme`}
      className="btn btn-quiet w-11 px-0!"
    >
      {/* Shows the theme you will switch to. Empty until the current theme is known, to avoid a mismatch. */}
      {theme === "dark" && <SunIcon />}
      {theme === "light" && <MoonIcon />}
    </button>
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

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

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
      <div className="flex items-center justify-between gap-4 px-(--gutter) py-3 min-[981px]:py-5">
        <Brand />
        <div className="flex items-center gap-2 min-[981px]:gap-8">
          <nav aria-label="Main" className="hidden items-center gap-8 text-[15px] font-semibold min-[981px]:flex">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={pathname.startsWith(item.href) ? "page" : undefined}
                className="underline-offset-4 hover:underline aria-[current=page]:underline"
              >
                {item.label}
              </Link>
            ))}
            <Link href="/contact" className="btn btn-quiet">
              Start a project
            </Link>
          </nav>
          <ThemeToggle />
          <button
            type="button"
            className="btn btn-quiet menu-toggle"
            aria-expanded={open}
            aria-controls="phone-menu"
            onClick={() => setOpen((value) => !value)}
          >
            {open ? "Close" : "Menu"}
          </button>
        </div>
      </div>
      {open && (
        <nav id="phone-menu" aria-label="Phone" className="border-t border-line px-(--gutter) pb-6 min-[981px]:hidden">
          {[...nav, { href: "/contact", label: "Contact" }].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={pathname.startsWith(item.href) ? "page" : undefined}
              className="display-m block py-3 underline-offset-8 aria-[current=page]:underline"
              style={{ textWrap: "nowrap" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-line px-(--gutter) pt-10 pb-8 text-sm text-muted">
      <div className="flex flex-wrap justify-between gap-x-16 gap-y-6">
        <div className="max-w-sm">
          <p className="text-paper">{site.name}</p>
          <p className="mt-1">{site.address}</p>
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
            <a className="hover:text-paper" href={site.whatsapp}>
              WhatsApp
            </a>
          </li>
        </ul>
        <ul className="space-y-1">
          <li>
            <Link className="hover:text-paper" href="/privacy">
              Privacy policy
            </Link>
          </li>
          <li>
            <Link className="hover:text-paper" href="/terms">
              Terms of use
            </Link>
          </li>
        </ul>
      </div>
      <p className="mt-8">© {new Date().getFullYear()} {site.name}</p>
    </footer>
  );
}

/** Keeps the two ways of getting in touch within thumb reach on phones. */
export function PhoneBar() {
  const pathname = usePathname();
  if (pathname === "/contact") return null;
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 gap-2 border-t border-line bg-night p-2 min-[981px]:hidden">
      <Link href="/contact" className="btn">
        Start a project
      </Link>
      <a href={site.whatsapp} className="btn btn-quiet min-h-[52px]!">
        WhatsApp
      </a>
    </div>
  );
}

"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Footer, Header, PhoneBar } from "@/components/SiteChrome";
import { si } from "@/content/si/ui";
import { en } from "@/content/ui";
import { langOf, localize, type Lang } from "@/i18n";

/**
 * The 404 page. It is built once for every unknown address, so the server cannot
 * know which language was asked for. The first paint shows the message in both
 * languages; once the browser reads the address, the page switches to that language
 * with the matching header and footer.
 */
export function NotFoundShell() {
  const [lang, setLang] = useState<Lang | null>(null);

  useEffect(() => {
    const found = langOf(window.location.pathname);
    document.documentElement.lang = found;
    setLang(found);
  }, []);

  if (!lang) {
    return (
      <main id="main" className="px-(--gutter) py-24">
        <h1 className="display-xl">{en.notFound.heading}</h1>
        <p className="display-m mt-4" lang="si">
          {si.notFound.heading}
        </p>
        <p className="mt-8 flex flex-wrap gap-4">
          <Link className="btn" href="/">
            {en.notFound.home}
          </Link>
          <Link className="btn btn-quiet" href="/si" lang="si">
            {si.notFound.home}
          </Link>
        </p>
      </main>
    );
  }

  const ui = lang === "si" ? si : en;
  return (
    <>
      <a className="skip" href="#main">
        {ui.chrome.skip}
      </a>
      <Header lang={lang} t={ui.chrome} />
      <main id="main" className="px-(--gutter) py-24">
        <h1 className="display-xl">{ui.notFound.heading}</h1>
        <p className="lead mt-6 text-muted">{ui.notFound.lead}</p>
        <p className="mt-8">
          <Link className="btn" href={localize(lang, "/")}>
            {ui.notFound.home}
          </Link>
        </p>
      </main>
      <Footer lang={lang} t={ui.chrome} address={ui.address} />
      <PhoneBar lang={lang} t={ui.chrome} />
    </>
  );
}

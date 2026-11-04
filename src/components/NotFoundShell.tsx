"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Emblem } from "@/components/Emblem";
import { Footer } from "@/components/Footer";
import { Header, PhoneBar } from "@/components/SiteChrome";
import { ArrowRight } from "@/components/icons";
import { Motion } from "@/components/Motion";
import { si } from "@/content/si/ui";
import { en } from "@/content/ui";
import { langOf, localize, type Lang } from "@/i18n";

function Backdrop() {
  return (
    <div className="hero-bg" aria-hidden="true">
      <div className="grid-bg" />
      <div className="glow glow-crimson top-[-30%] right-[-10%] h-[70vw] max-h-[900px] w-[70vw] max-w-[900px]" />
      <div className="glow glow-indigo bottom-[-30%] left-[-20%] h-[50vw] max-h-[700px] w-[50vw] max-w-[700px]" />
    </div>
  );
}

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
      <main id="main" className="hero min-h-[80vh]">
        <Backdrop />
        <div className="wrap py-24">
          <p className="eyebrow">404</p>
          <h1 className="display-1 mt-5">{en.notFound.heading}</h1>
          <p className="title mt-4 text-muted" lang="si">
            {si.notFound.heading}
          </p>
          <p className="mt-10 flex flex-wrap gap-3">
            <Link className="btn btn-primary" href="/">
              {en.notFound.home}
            </Link>
            <Link className="btn btn-secondary" href="/si" lang="si">
              {si.notFound.home}
            </Link>
          </p>
        </div>
      </main>
    );
  }

  const ui = lang === "si" ? si : en;
  return (
    <>
      <a className="skip" href="#main">
        {ui.chrome.skip}
      </a>
      <Header lang={lang} t={ui.chrome} whatsappLabel={ui.home.whatsapp} />
      <main id="main" className="hero" data-tilt-scope>
        <Backdrop />
        <div className="wrap grid items-center gap-14 py-20 min-[1024px]:grid-cols-[minmax(0,1fr)_auto] min-[1024px]:py-32">
          <div>
            <p className="eyebrow">404</p>
            <h1 className="display-1 mt-5">{ui.notFound.heading}</h1>
            <p className="lead mt-6 max-w-[560px] text-muted">{ui.notFound.lead}</p>
            <p className="mt-10">
              <Link className="btn btn-primary" href={localize(lang, "/")}>
                {ui.notFound.home}
                <ArrowRight size={18} className="arrow" />
              </Link>
            </p>
          </div>
          <Emblem className="w-[150px] min-[1024px]:mr-16 min-[1024px]:w-[230px]" interactive />
        </div>
      </main>
      <Footer lang={lang} t={ui.chrome} address={ui.address} />
      <PhoneBar lang={lang} t={ui.chrome} />
      <Motion />
    </>
  );
}

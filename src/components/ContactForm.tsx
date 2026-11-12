"use client";

import Link from "next/link";
import { useEffect, useState, type FormEvent } from "react";
import { flushSync } from "react-dom";
import { site, whatsapp } from "@/content/site";
import type { UI } from "@/content/ui";
import { fill, localize, type Lang } from "@/i18n";
import { ArrowRight, Shield } from "./icons";
import { vars } from "./ui";

type Errors = Partial<Record<"name" | "contact" | "message", string>>;

type Interest = keyof UI["form"]["interests"];
const isInterest = (value: string | null, t: UI["form"]): value is Interest => value !== null && Object.hasOwn(t.interests, value);

/**
 * `interest` adds one of our products as the first choice, already picked: the Surelane page passes "surelane".
 * Without it, a link such as /contact?interest=surelane does the same.
 */
export function ContactForm({ lang, t, replyTime, interest: given }: { lang: Lang; t: UI["form"]; replyTime: string; interest?: Interest }) {
  // "offline": the request never reached us. "failed": it reached us but could not be delivered.
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "failed" | "offline">("idle");
  const [errors, setErrors] = useState<Errors>({});
  const [linked, setLinked] = useState<Interest>();
  const interest = given ?? linked;

  useEffect(() => {
    if (given) return;
    const value = new URLSearchParams(window.location.search).get("interest");
    if (isInterest(value, t)) setLinked(value);
  }, [given, t]);

  const kinds = interest ? [t.interests[interest], ...t.kinds] : t.kinds;

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>;

    const found: Errors = {};
    if (!data.name?.trim()) found.name = t.nameError;
    if (!data.contact?.trim()) found.contact = t.contactError;
    if (!data.message?.trim()) found.message = t.messageError;
    flushSync(() => setErrors(found));
    if (Object.keys(found).length) {
      form.querySelector<HTMLElement>("[aria-invalid='true']")?.focus();
      return;
    }

    setStatus("sending");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // The language tells us which language to reply in.
        body: JSON.stringify({ ...data, lang }),
      });
      setStatus(response.ok ? "sent" : "failed");
    } catch {
      setStatus("offline");
    }
  }

  if (status === "sent") {
    return (
      <div role="status" className="flex min-h-[320px] flex-col justify-center py-6">
        <svg width="64" height="64" viewBox="0 0 64 64" fill="none" aria-hidden="true" className="text-ok">
          <circle cx="32" cy="32" r="30" stroke="currentColor" strokeOpacity="0.3" strokeWidth="2" />
          <path className="check-draw" d="M20 33l8 8 16-17" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" style={vars({ "--len": 40 })} />
        </svg>
        <p className="display-2 mt-6">{t.sentHeading}</p>
        <p className="lead mt-3 text-muted">{fill(t.sentText, { time: replyTime })}</p>
      </div>
    );
  }

  const sending = status === "sending";

  return (
    <form onSubmit={submit} noValidate aria-label={t.label} className="grid gap-6">
      <div className="grid gap-6 min-[640px]:grid-cols-2 min-[640px]:gap-4">
        <Field label={t.name} name="name" autoComplete="name" error={errors.name} />
        <Field label={t.contact} name="contact" error={errors.contact} />
      </div>

      <fieldset>
        <legend className="field-label">{t.kindLegend}</legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {kinds.map((kind, index) => (
            <label key={kind.value} className="pick">
              <input type="radio" name="kind" value={kind.value} defaultChecked={interest ? index === 0 : index === kinds.length - 1} />
              <span>{kind.label}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <label className="block">
        <span className="field-label">{t.message}</span>
        {t.messageHint && <span className="mt-1 block text-sm text-muted">{t.messageHint}</span>}
        <textarea
          className="input"
          name="message"
          rows={4}
          aria-invalid={errors.message ? true : undefined}
          aria-describedby={errors.message ? "message-error" : undefined}
        />
        {errors.message && <Problem id="message-error" text={errors.message} />}
      </label>

      {/* Hidden from people. Bots that fill it in are ignored. */}
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <label>
          Company website
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      {(status === "failed" || status === "offline") && (
        <p role="alert" className="rounded-2xl border border-accent/40 bg-accent/8 p-4 text-[15px] leading-relaxed">
          {status === "offline" ? t.offline : t.failed}{" "}
          <a className="link" href={`mailto:${site.email}`}>
            {site.email}
          </a>{" "}
          {t.or}{" "}
          <a className="link" href={whatsapp(lang)}>
            {t.whatsappLink}
          </a>
          .
        </p>
      )}

      <div className="flex flex-wrap items-center gap-x-6 gap-y-4">
        <button type="submit" className="btn btn-primary w-full min-[640px]:w-auto" disabled={sending} aria-busy={sending || undefined}>
          {sending && <span className="spinner" aria-hidden="true" />}
          {sending ? t.sending : t.send}
          {!sending && <ArrowRight size={18} className="arrow" />}
        </button>
        <p className="flex items-start gap-2 text-sm text-muted">
          <Shield size={16} className="mt-0.5 flex-none text-ok" />
          <span>
            {t.privacyNote}{" "}
            <Link className="underline underline-offset-2 hover:text-fg" href={localize(lang, "/privacy")}>
              {t.privacyLink}
            </Link>
          </span>
        </p>
      </div>
    </form>
  );
}

function Field({ label, name, error, autoComplete }: { label: string; name: string; error?: string; autoComplete?: string }) {
  return (
    <label className="block">
      <span className="field-label">{label}</span>
      <input
        className="input"
        type="text"
        name={name}
        autoComplete={autoComplete}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${name}-error` : undefined}
      />
      {error && <Problem id={`${name}-error`} text={error} />}
    </label>
  );
}

function Problem({ id, text }: { id: string; text: string }) {
  return (
    <span id={id} className="mt-2 block text-sm font-medium text-accent">
      {text}
    </span>
  );
}

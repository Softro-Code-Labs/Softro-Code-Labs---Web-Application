"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { flushSync } from "react-dom";
import { site, whatsapp } from "@/content/site";
import type { UI } from "@/content/ui";
import { fill, localize, type Lang } from "@/i18n";

type Errors = Partial<Record<"name" | "contact" | "message", string>>;

export function ContactForm({ lang, t, replyTime }: { lang: Lang; t: UI["form"]; replyTime: string }) {
  // "offline": the request never reached us. "failed": it reached us but could not be delivered.
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "failed" | "offline">("idle");
  const [errors, setErrors] = useState<Errors>({});

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
      <div role="status" className="border-t border-line pt-6">
        <p className="display-m">{t.sentHeading}</p>
        <p className="mt-3 text-muted">{fill(t.sentText, { time: replyTime })}</p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} noValidate aria-label={t.label} className="space-y-5">
      <Field label={t.name} name="name" autoComplete="name" error={errors.name} />
      <Field label={t.contact} name="contact" error={errors.contact} />

      <fieldset>
        <legend className="text-[15px] font-semibold">{t.kindLegend}</legend>
        <div className="mt-2 flex flex-wrap gap-2">
          {t.kinds.map((kind, index) => (
            <label key={kind.value} className="chip relative">
              <input type="radio" name="kind" value={kind.value} defaultChecked={index === t.kinds.length - 1} />
              <span>{kind.label}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <label className="field">
        {t.message}
        {t.messageHint && <span className="mt-1 block text-sm font-normal text-muted">{t.messageHint}</span>}
        <textarea
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
        <p role="alert" className="text-[15px]">
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

      <button type="submit" className="btn" disabled={status === "sending"}>
        {status === "sending" ? t.sending : t.send}
      </button>
      <p className="text-sm text-muted">
        {t.privacyNote}{" "}
        <Link className="underline underline-offset-2 hover:text-paper" href={localize(lang, "/privacy")}>
          {t.privacyLink}
        </Link>
      </p>
    </form>
  );
}

function Field({ label, name, error, autoComplete }: { label: string; name: string; error?: string; autoComplete?: string }) {
  return (
    <label className="field">
      {label}
      <input
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
    <span id={id} className="mt-1.5 block text-sm font-normal text-accent">
      {text}
    </span>
  );
}

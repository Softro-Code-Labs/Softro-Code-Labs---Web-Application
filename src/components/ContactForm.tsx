"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { flushSync } from "react-dom";
import { site } from "@/content/site";

const kinds = ["Website", "Online store", "Mobile app", "Custom tool", "Not sure yet"];
type Errors = Partial<Record<"name" | "contact" | "message", string>>;

export function ContactForm() {
  // "offline": the request never reached us. "failed": it reached us but could not be delivered.
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "failed" | "offline">("idle");
  const [errors, setErrors] = useState<Errors>({});

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>;

    const found: Errors = {};
    if (!data.name?.trim()) found.name = "Enter your name.";
    if (!data.contact?.trim()) found.contact = "Enter an email address or WhatsApp number so we can reply.";
    if (!data.message?.trim()) found.message = "Tell us a little about what you want to build.";
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
        body: JSON.stringify(data),
      });
      setStatus(response.ok ? "sent" : "failed");
    } catch {
      setStatus("offline");
    }
  }

  if (status === "sent") {
    return (
      <div role="status" className="border-t border-line pt-6">
        <p className="display-m">Enquiry sent.</p>
        <p className="mt-3 text-muted">We&apos;ll reply within {site.replyTime}.</p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} noValidate aria-label="Start a project" className="space-y-5">
      <Field label="Your name" name="name" autoComplete="name" error={errors.name} />
      <Field label="Email or WhatsApp number" name="contact" error={errors.contact} />

      <fieldset>
        <legend className="text-[15px] font-semibold">What do you need?</legend>
        <div className="mt-2 flex flex-wrap gap-2">
          {kinds.map((kind, index) => (
            <label key={kind} className="chip relative">
              <input type="radio" name="kind" value={kind} defaultChecked={index === 4} />
              <span>{kind}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <label className="field">
        What do you want to build?
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
          {status === "offline"
            ? "Your enquiry didn't send. Check your connection and try again, or email us at "
            : "Sorry, our form isn't working right now. Please email us at "}
          <a className="link" href={`mailto:${site.email}`}>
            {site.email}
          </a>{" "}
          or{" "}
          <a className="link" href={site.whatsapp}>
            message us on WhatsApp
          </a>
          .
        </p>
      )}

      <button type="submit" className="btn" disabled={status === "sending"}>
        {status === "sending" ? "Sending enquiry" : "Send enquiry"}
      </button>
      <p className="text-sm text-muted">
        We only use your details to reply.{" "}
        <Link className="underline underline-offset-2 hover:text-paper" href="/privacy">
          Privacy policy
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

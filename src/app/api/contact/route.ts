import { NextResponse } from "next/server";

const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const recent = new Map<string, number[]>();

function isLimited(ip: string) {
  const now = Date.now();
  const hits = (recent.get(ip) ?? []).filter((time) => now - time < WINDOW_MS);
  hits.push(now);
  recent.set(ip, hits);
  return hits.length > MAX_PER_WINDOW;
}

const clean = (value: unknown, max: number) => (typeof value === "string" ? value.trim().slice(0, max) : "");

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (isLimited(ip)) return NextResponse.json({ error: "Too many enquiries. Try again later." }, { status: 429 });

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  // Bots fill in the hidden field. Accept quietly and send nothing.
  if (clean(body.website, 200)) return NextResponse.json({ ok: true });

  const name = clean(body.name, 120);
  const contact = clean(body.contact, 160);
  const kind = clean(body.kind, 40) || "Not given";
  const message = clean(body.message, 4000);
  // Which version of the site they used, so the reply can be in the same language.
  const language = body.lang === "si" ? "Sinhala" : "English";
  if (!name || !contact || !message) return NextResponse.json({ error: "Missing details." }, { status: 400 });

  // Each enquiry goes to two places: an email (Resend) and a lead in Softro CRM.
  // The visitor sees "sent" if at least one of them worked, so nothing is lost.
  const emailReady = Boolean(process.env.RESEND_API_KEY && process.env.CONTACT_TO_EMAIL && process.env.CONTACT_FROM_EMAIL);
  const crmReady = Boolean(process.env.CRM_URL && process.env.CRM_LEAD_API_KEY);
  if (!emailReady && !crmReady) return NextResponse.json({ error: "Email is not set up." }, { status: 503 });

  const [emailSent, savedToCrm] = await Promise.all([
    emailReady ? sendEmail({ name, contact, kind, message, language }) : Promise.resolve(false),
    crmReady ? sendToCrm({ name, contact, kind, message, lang: body.lang === "si" ? "si" : "en", ip }) : Promise.resolve(false),
  ]);

  if (!emailSent && !savedToCrm) return NextResponse.json({ error: "The enquiry could not be sent." }, { status: 502 });
  return NextResponse.json({ ok: true });
}

type Enquiry = { name: string; contact: string; kind: string; message: string; language: string };

async function sendEmail({ name, contact, kind, message, language }: Enquiry) {
  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: process.env.CONTACT_FROM_EMAIL,
        to: process.env.CONTACT_TO_EMAIL,
        reply_to: contact.includes("@") ? contact : undefined,
        subject: `New enquiry from ${name}${language === "Sinhala" ? " (Sinhala)" : ""}`,
        text: `Name: ${name}\nContact: ${contact}\nNeeds: ${kind}\nSite language: ${language}\n\n${message}`,
      }),
      signal: AbortSignal.timeout(10_000),
    });
    if (!response.ok) console.error("Resend failed", response.status, await response.text());
    return response.ok;
  } catch (error) {
    console.error("Resend failed", error);
    return false;
  }
}

/** Creates a lead in Softro CRM (POST /api/leads). See the CRM README, "Website form". */
async function sendToCrm({ name, contact, kind, message, lang, ip }: { name: string; contact: string; kind: string; message: string; lang: "en" | "si"; ip: string }) {
  try {
    const response = await fetch(new URL("/api/leads", process.env.CRM_URL), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.CRM_LEAD_API_KEY!,
        "x-visitor-ip": ip,
      },
      body: JSON.stringify({
        name,
        contact,
        service: kind === "Not given" ? undefined : kind,
        message,
        language: lang,
        page: "softrocodelabs.com contact form",
      }),
      signal: AbortSignal.timeout(10_000),
    });
    if (!response.ok) console.error("CRM lead failed", response.status, await response.text());
    return response.ok;
  } catch (error) {
    console.error("CRM lead failed", error);
    return false;
  }
}

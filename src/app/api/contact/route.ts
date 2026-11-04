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
  if (!name || !contact || !message) return NextResponse.json({ error: "Missing details." }, { status: 400 });

  const key = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL;
  if (!key || !to || !from) return NextResponse.json({ error: "Email is not set up." }, { status: 503 });

  const email = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from,
      to,
      reply_to: contact.includes("@") ? contact : undefined,
      subject: `New enquiry from ${name}`,
      text: `Name: ${name}\nContact: ${contact}\nNeeds: ${kind}\n\n${message}`,
    }),
  });

  if (!email.ok) return NextResponse.json({ error: "The enquiry could not be sent." }, { status: 502 });
  return NextResponse.json({ ok: true });
}

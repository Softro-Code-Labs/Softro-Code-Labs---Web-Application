# Softro Code Labs website

The company website for softrocodelabs.com, built with Next.js, TypeScript and Tailwind CSS.

## Run it

```bash
npm install
npm run dev
```

Before a release, run `npm run typecheck` and `npm run build`.

## Settings

The enquiry form sends email through Resend. It needs three settings, kept in `.env.local` on your computer and in Vercel's Environment Variables for the live site. Never commit them.

| Name | Value |
| --- | --- |
| `RESEND_API_KEY` | Your key from resend.com |
| `CONTACT_TO_EMAIL` | `hello@softrocodelabs.com` (where enquiries arrive) |
| `CONTACT_FROM_EMAIL` | `Softro website <website@softrocodelabs.com>` (must be on the verified domain) |

Until these are set and the domain is verified in Resend, the form shows a message with the email address and WhatsApp link, so enquiries are not lost silently.

## Go live on Vercel

1. Import this GitHub repository into Vercel.
2. Add the three settings above under Environment Variables.
3. Add `softrocodelabs.com` under Domains and follow the DNS steps.
4. Verify the domain in Resend.
5. Send a test enquiry and confirm that it arrives.

## Common edits

| To change | Edit |
| --- | --- |
| Email, phone and WhatsApp | `src/content/site.ts` |
| English page wording, address and reply time | `src/content/ui.ts` |
| Projects, screenshots, services and process (English) | `src/content/projects.ts` |
| Privacy policy and terms (English) | `src/content/legal.ts` |
| Client quotes | `src/content/testimonials.ts` |
| Colours for the dark and light themes | `src/app/globals.css` |

## Sinhala version

Every page also exists in Sinhala under `/si` (for example `/si/work`). The language button in the header switches between the two.

All Sinhala wording is in `src/content/si/`:

| File | Holds |
| --- | --- |
| `si/ui.ts` | Page wording, menu, form, address and reply time |
| `si/projects.ts` | Case studies, services, process steps and screenshot captions |
| `si/legal.ts` | Privacy policy and terms |

Each Sinhala file must have the same items as its English file. If something is missing, `npm run typecheck` or `npm run build` names it.
When you add a screenshot, add its Sinhala caption to `si/projects.ts` too.

## Add or change a screenshot

Put the image in `public/work` (WebP, about 1200px wide for desktop pages and 540px for phone screens), then describe it in `src/content/projects.ts`:

```ts
{ src: "/work/baileyn-desktop.webp", width: 1200, height: 750, frame: "browser",
  alt: "What the screenshot shows, for screen readers",
  caption: "One short line shown under it on the case study page." }
```

`frame` is `"browser"` for a desktop page, `"phone"` for an upright phone screen and `"phone-wide"` for a sideways one.
Each project has one `screen` (shown in the sloped panel) and a `gallery` (shown on its case study page).

Keep test banners, hosting badges and real customer details out of every screenshot.

## Add a client quote

Add real, approved words to `src/content/testimonials.ts`. The section appears on the Home page automatically.

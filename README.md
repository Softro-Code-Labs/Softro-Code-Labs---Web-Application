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
| Contact details and reply time | `src/content/site.ts` |
| Projects, screenshots, services and process | `src/content/projects.ts` |
| Client quotes | `src/content/testimonials.ts` |
| Colours for the dark and light themes | `src/app/globals.css` |

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

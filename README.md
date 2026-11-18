# Softro Code Labs Website

The company website for **Softro Code Labs**, a software company in Balapitiya, Sri Lanka. It shows what we build, our client work and our own products, and turns visitors into enquiries by form, WhatsApp or phone. Every page is in English and Sinhala.

> New here? Start with **[SYSTEM-OVERVIEW.md](SYSTEM-OVERVIEW.md)**. It explains the whole project in plain words.

**Built with:** Next.js 16 · React 19 · TypeScript · Tailwind CSS v4 · three.js · Resend · Vercel

---

## Get it running

```bash
npm install
npm run dev          # English: http://localhost:3000   Sinhala: /si
```

The site runs without any settings. Only the enquiry form needs them (see [Settings](#settings-environment-variables)).

| Command | What it does |
|---|---|
| `npm run dev` | Start the site locally |
| `npm run build` / `npm start` | Make and run a production build |
| `npm run typecheck` | Check the TypeScript, including that every Sinhala file matches its English file |

Before a release, run `npm run typecheck` and `npm run build`.

## Where things live

| I want to… | Look in |
|---|---|
| Change a page's layout | `src/app/[lang]/` (one folder per page) |
| Change shared sections (hero, services, work list, Lab, closing call to action) | `src/components/Sections.tsx` |
| Change the header, menu, phone bar or footer | `src/components/SiteChrome.tsx` and `src/components/Footer.tsx` |
| Change the phone and browser frames and the screenshot gallery | `src/components/Devices.tsx` |
| Change the 3D logo on the home page | `src/components/Hero3D.tsx` |
| Change or add a block illustration | `src/components/Iso.tsx` |
| Change colours, type sizes and motion for both themes | `src/app/globals.css` (tokens at the top) |
| Change the enquiry email | `src/app/api/contact/route.ts` |
| Change search details (share card, business details, breadcrumbs) | `src/seo.ts` |
| Change how languages map to addresses | `src/proxy.ts` and `src/i18n.ts` |

**No design code needed** for wording, projects, services or contact details. They all live in `src/content/`:

| To change | Edit |
|---|---|
| Email, phone, WhatsApp, the address search engines read, the sitemap date | `src/content/site.ts` |
| English page wording, address and reply time | `src/content/ui.ts` |
| What Google shows for each page | `title` and `description` in that page's part of `ui.ts` (home page: `meta.siteTitle` and `meta.description`) |
| The home page numbers (3 projects, 46 tools and so on) | `home.stats` in `ui.ts` |
| "Open for new projects" and the lines under the home buttons | `home.availability` and `home.assurances` in `ui.ts` |
| The three "What happens next" steps beside the form | `closing.next` in `ui.ts` |
| The "What we build" headings and the "Your idea could be next" card | `build` in `ui.ts` |
| Projects, screenshots and the process steps | `src/content/projects.ts` |
| The four core services and their real examples | `services` in `projects.ts` |
| Everything else we can build (ERP, SaaS, AI and so on) and its groups | `capabilityLayout`, `capabilityGroupText` and `capabilityText` in `projects.ts` |
| A project's badge ("Live") and the glow colour behind its screens | `status` and `tint` in `projects.ts` |
| Privacy policy and terms | `src/content/legal.ts` |
| Client quotes | `src/content/testimonials.ts` |

In headings, words between `*asterisks*` are set in the crimson serif italic, as in the home heading "We build the \*software\* your business needs."

**Keep it true:**
- The home page numbers are real counts. Change them when the facts change, and never round them up.
- The capability list says what we *can* build. Finished client work belongs in `projects`, with screenshots and a case study, so visitors can always tell the two apart. When a capability becomes a real project, add the project too.
- Client quotes must be words a client actually said or approved. The section stays hidden while the list is empty and appears on the Home page once you add one.

## Settings (environment variables)

The enquiry form sends email through Resend. Keep these in `.env.local` on your computer and in Vercel's Environment Variables for the live site. **Never commit them.**

To start, copy the template and fill in the real values: `cp .env.example .env.local`

| Variable | What it's for |
|---|---|
| `RESEND_API_KEY` | Your key from resend.com. **Secret, never share it.** |
| `CONTACT_TO_EMAIL` | Where enquiries arrive, e.g. `hello@softrocodelabs.com` |
| `CONTACT_FROM_EMAIL` | The sender, e.g. `Softro website <website@softrocodelabs.com>`. It must be on the domain verified in Resend |
| `CRM_URL` | Softro CRM address, e.g. `https://softro-code-labs-crm-system.vercel.app`. Each enquiry also becomes a lead there |
| `CRM_LEAD_API_KEY` | The same value as `WEBSITE_LEAD_API_KEY` in the CRM. **Secret, never share it.** |

Each enquiry is emailed **and** saved as a lead in the CRM. If one of them fails, the other still goes through and the visitor still sees "sent". Failures are logged in Vercel's function logs.

Until these are set and the domain is verified, the form shows our email address and WhatsApp link instead, so enquiries are never lost silently.

## Sinhala version

Every page also exists in Sinhala under `/si` (for example `/si/work`). The language button in the header switches between the two.

| File | Holds |
|---|---|
| `src/content/si/ui.ts` | Page wording, menu, form, page titles, address and reply time |
| `src/content/si/projects.ts` | Case studies, services, capabilities, process steps and screenshot captions |
| `src/content/si/legal.ts` | Privacy policy and terms |

- Each Sinhala file must have the same items as its English file. If something is missing, `npm run typecheck` or `npm run build` names it.
- When you add a screenshot, add its Sinhala caption to `si/projects.ts` too.
- The newest lines are a first draft, so have a Sinhala reader check them: the home page message, the "What we build" section and capability list, the services, "What happens next", the form choices, the About page additions, the footer labels, the project badges, and the page titles and legal descriptions.

## Add or change a screenshot

Put the image in `public/work` (WebP, about 1200px wide for desktop pages and 540px for phone screens), then describe it in `src/content/projects.ts`:

```ts
{ src: "/work/baileyn-desktop.webp", width: 1200, height: 750, frame: "browser",
  alt: "What the screenshot shows, for screen readers",
  caption: "One short line shown under it on the case study page." }
```

- `frame` is `"browser"` for a desktop page, `"phone"` for an upright phone screen and `"phone-wide"` for a sideways one.
- `width` and `height` must have the same shape as the image (a 2000 × 1250 file can be listed as 1200 × 750), so the page saves exactly the right space for it.
- Each project has one `screen` and an optional `accent`, shown together in its 3D panel, and a `gallery` shown on its case study page.
- Keep test banners, hosting badges and real customer details out of every screenshot.

## Search engines

- Each page's title and description are in the content files (see [Where things live](#where-things-live)). " | Softro Code Labs" is added after every title except the home page's, so keep titles under about 40 characters and descriptions under about 155. Give every page its own.
- When you publish new wording, projects or screenshots, change `updated` in `src/content/site.ts`. The sitemap passes that date to search engines.
- The picture shown when a page is shared on WhatsApp, Facebook, LinkedIn or X is `public/og.png` (1200 × 630).
- The business details search engines read (address, phone, services) and each page's breadcrumb trail are built in `src/seo.ts` from the content files.
- The browser tab icon is `src/app/icon.svg`. `src/app/favicon.ico` (older browsers) and `src/app/apple-icon.png` (iPhone home screens) are made from it, so remake them if the logo changes.

## Keeping it fast

The design is built to stay quick on ordinary phones. When you add to it:

- Animate only `transform` and `opacity`. Everything that moves already respects the phone's "reduce motion" setting.
- Give long sections lower down a page the `defer` class (see `globals.css`), so the browser skips them until they are near the screen.
- Keep to the three fonts in `src/app/fonts.ts`. Each extra font file costs time before the first paint.
- The 3D logo downloads its library (three.js, about 80 kB) only after the page is idle, draws only while it is on screen, and stands still for visitors who ask for less motion. Keep any new 3D to the same rules, and keep it off the inner pages.
- Keep screenshots in WebP at the sizes above. The site serves them as AVIF or WebP, resized for each screen.
- Avoid `filter: blur()` and masks on large areas near the top of a page. Soft glows are drawn with gradients instead.

## Going live on Vercel

1. Import this GitHub repository into Vercel.
2. Add the [settings](#settings-environment-variables) under Environment Variables.
3. Add `softrocodelabs.com` under Domains and follow the DNS steps.
4. Verify the domain in Resend.
5. Send a test enquiry and confirm that it arrives.
6. Add the site to [Google Search Console](https://search.google.com/search-console) and [Bing Webmaster Tools](https://www.bing.com/webmasters), and submit `https://softrocodelabs.com/sitemap.xml` in both.

**Checklist**
- [ ] `https://softrocodelabs.com` opens, and `/si` shows the Sinhala site
- [ ] A test enquiry from each language arrives, and **Reply** goes to the sender
- [ ] A native speaker has checked the Sinhala; privacy and terms pages reviewed
- [ ] Home page numbers are still true, and client quotes are real and approved (or the list is empty)
- [ ] `updated` in `src/content/site.ts` is the launch date
- [ ] A shared link on WhatsApp shows the Softro picture and title
- [ ] Site added to Google Search Console and Bing, and `/sitemap.xml` submitted

## Good to know

- **Addresses:** English pages live at plain addresses (`/work`) and are served from `/en` behind the scenes by `src/proxy.ts`. Any `/en/...` link redirects to the plain address, so each page has one address. Unknown addresses show one "page not found" page for both languages (`src/app/global-not-found.tsx`).
- **Logo:** the logo files are in `public/brand/` and `src/app/icon.svg`. Its outline is also written out in `src/brand/mark.ts`, which the header logo and the 3D model draw from. If the logo ever changes, update that file too.
- **Ink panels:** add the `ink` class to a panel to keep it dark in the light theme too, as the footer and the Lab panel do.
- **Themes:** dark is the default. The site follows the device's light or dark setting until the visitor picks one with the header button, then remembers it.
- **Spam:** the form has a hidden field that only bots fill in, and accepts at most 5 enquiries in 10 minutes from one address. That limit is kept in server memory, so it is a light guard, not a firewall.
- **No database, no admin panel, no analytics, no tracking cookies.** Every change goes through the content files and a redeploy.
- **Security headers** for every page are set in `next.config.mjs`.
- **`AGENTS.md`** is written by `next dev` for coding assistants. Keep it committed, or it reappears as a change.
- **Not included yet:** a Content-Security-Policy, and a way to edit content without touching code.

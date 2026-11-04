import type { Lang } from "@/i18n";

/** Details that are the same in both languages. Translated wording lives in ui.ts and si/ui.ts. */
export const site = {
  name: "Softro Code Labs",
  url: "https://softrocodelabs.com",
  email: "hello@softrocodelabs.com",
  phoneDisplay: "077 278 0771",
  phoneIntl: "+94772780771",
  /** The address as search engines read it. The address shown on the pages is in ui.ts and si/ui.ts. */
  address: { street: "No. 30, Robert De Zoysa Mawatha, Walagedara", town: "Balapitiya", country: "LK" },
  /**
   * When the site's content last changed, as year-month-day. The sitemap gives this date to search engines,
   * so they know when to read the pages again. Change it whenever you publish new wording, projects or screenshots.
   */
  updated: "2026-11-04",
};

const whatsappGreeting: Record<Lang, string> = {
  en: "Hello Softro Code Labs, I would like to talk about a project.",
  si: "ආයුබෝවන් Softro Code Labs, මට ව්‍යාපෘතියක් ගැන කතා කිරීමට අවශ්‍යයි.",
};

/** WhatsApp chat link with a greeting already typed in the visitor's language. */
export const whatsapp = (lang: Lang) => `https://wa.me/94772780771?text=${encodeURIComponent(whatsappGreeting[lang])}`;

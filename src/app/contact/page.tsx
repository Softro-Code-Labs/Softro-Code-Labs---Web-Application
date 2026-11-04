import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Tell Softro Code Labs what you want to build. Send an enquiry, email us or message us on WhatsApp.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <div className="grid gap-12 px-(--gutter) pt-14 pb-24 min-[981px]:grid-cols-2 min-[981px]:gap-20 min-[981px]:pt-20">
      <div>
        <h1 className="display-xl">Tell us what you need</h1>
        <p className="lead mt-8 max-w-[520px] text-muted min-[981px]:mt-10">A few lines is enough. We&apos;ll reply within {site.replyTime}.</p>
        <ul className="mt-10 space-y-3">
          <li>
            <a className="link" href={site.whatsapp}>
              WhatsApp {site.phoneDisplay}
            </a>
          </li>
          <li>
            <a className="link" href={`mailto:${site.email}`}>
              {site.email}
            </a>
          </li>
          <li className="max-w-[420px] text-[15px] text-muted">{site.address}</li>
        </ul>
      </div>
      <ContactForm />
    </div>
  );
}

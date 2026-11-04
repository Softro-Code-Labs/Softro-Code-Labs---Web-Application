import type { Metadata } from "next";
import { Legal } from "@/components/Legal";
import { site } from "@/content/site";

export const metadata: Metadata = { title: "Privacy policy", alternates: { canonical: "/privacy" } };

export default function PrivacyPage() {
  return (
    <Legal title="Privacy policy" updated="4 November 2026">
      <p>This policy explains what {site.name} collects through this website and how we use it.</p>
      <h2>What we collect</h2>
      <p>When you send an enquiry, we receive your name, your email address or WhatsApp number, and what you tell us about your project. Our hosting provider also keeps standard technical logs, such as IP addresses, to run and protect the site.</p>
      <h2>How we use it</h2>
      <p>We use your details only to reply to your enquiry and discuss your project. We do not sell your details or add you to a mailing list.</p>
      <h2>Who handles it</h2>
      <p>Enquiries pass through our email delivery service and our hosting provider, who process them on our behalf.</p>
      <h2>Cookies</h2>
      <p>This site does not use advertising or tracking cookies.</p>
      <h2>Your choices</h2>
      <p>To see, correct or delete the details we hold about you, email {site.email}.</p>
    </Legal>
  );
}

import type { Metadata } from "next";
import { Legal } from "@/components/Legal";
import { site } from "@/content/site";

export const metadata: Metadata = { title: "Terms of use", alternates: { canonical: "/terms" } };

export default function TermsPage() {
  return (
    <Legal title="Terms of use" updated="4 November 2026">
      <p>By using this website, you agree to these terms.</p>
      <h2>Content</h2>
      <p>The text, design and logo on this site belong to {site.name}. Client names and project images belong to their owners and appear with their knowledge.</p>
      <h2>Information on this site</h2>
      <p>We keep this site accurate, but it describes our work in general terms. It is not an offer. The scope, price and timing of any project are agreed separately in writing.</p>
      <h2>Links</h2>
      <p>This site links to other websites. We are not responsible for sites we do not run.</p>
      <h2>Contact</h2>
      <p>Questions about these terms can be sent to {site.email}.</p>
    </Legal>
  );
}

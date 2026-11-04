/**
 * The privacy policy and terms, in English. The Sinhala versions are in si/legal.ts.
 * Each block is a heading ("h") or a paragraph ("p"). {name} and {email} are filled in by the page.
 * The description is what search results show for the page.
 */
export type LegalDoc = { title: string; description: string; blocks: ["h" | "p", string][] };
export type Legal = { privacy: LegalDoc; terms: LegalDoc };

export const legal: Legal = {
  privacy: {
    title: "Privacy policy",
    description:
      "What {name} collects when you send an enquiry, how we use it, and how to see or delete your details. No advertising or tracking cookies.",
    blocks: [
      ["p", "This policy explains what {name} collects through this website and how we use it."],
      ["h", "What we collect"],
      ["p", "When you send an enquiry, we receive your name, your email address or WhatsApp number, and what you tell us about your project. Our hosting provider also keeps standard technical logs, such as IP addresses, to run and protect the site."],
      ["h", "How we use it"],
      ["p", "We use your details only to reply to your enquiry and discuss your project. We do not sell your details or add you to a mailing list."],
      ["h", "Who handles it"],
      ["p", "Enquiries pass through our email delivery service and our hosting provider, who process them on our behalf."],
      ["h", "Cookies"],
      ["p", "This site does not use advertising or tracking cookies."],
      ["h", "Your choices"],
      ["p", "To see, correct or delete the details we hold about you, email {email}."],
    ],
  },
  terms: {
    title: "Terms of use",
    description: "The terms for using the {name} website, including who owns its content and how a project's scope, price and timing are agreed.",
    blocks: [
      ["p", "By using this website, you agree to these terms."],
      ["h", "Content"],
      ["p", "The text, design and logo on this site belong to {name}. Client names and project images belong to their owners and appear with their knowledge."],
      ["h", "Information on this site"],
      ["p", "We keep this site accurate, but it describes our work in general terms. It is not an offer. The scope, price and timing of any project are agreed separately in writing."],
      ["h", "Links"],
      ["p", "This site links to other websites. We are not responsible for sites we do not run."],
      ["h", "Contact"],
      ["p", "Questions about these terms can be sent to {email}."],
    ],
  },
};

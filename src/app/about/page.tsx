import type { Metadata } from "next";
import { RibbonRow } from "@/components/Ribbon";
import { ClosingEnquiry } from "@/components/Sections";
import { steps } from "@/content/projects";

export const metadata: Metadata = {
  title: "About",
  description: "Softro Code Labs is a software studio in Balapitiya, Sri Lanka, building websites, stores, apps and tools.",
  alternates: { canonical: "/about" },
};

const values = [
  { name: "Fit", text: "Software should suit its users, including their language, their phone and how they pay." },
  { name: "Care with data", text: "If an app doesn't need your data, it shouldn't collect it." },
  { name: "Plain speaking", text: "You'll always know what we're building, why, and what it costs." },
];

export default function AboutPage() {
  return (
    <>
      <RibbonRow variant="first" className="pt-14 pb-14 min-[981px]:pt-20">
        <h1 className="display-xl max-w-[900px]">A small lab that ships real software</h1>
        <p className="lead mt-6 max-w-[620px] text-muted">
          Softro Code Labs is based in Balapitiya, Sri Lanka. We build websites, online stores, mobile apps and browser tools for people who need them to work in real life.
        </p>
      </RibbonRow>
      <RibbonRow className="pt-6 pb-12">
        <h2 className="display-l mb-8">Our story</h2>
        <div className="max-w-[640px] space-y-4 text-muted">
          <p>
            In Sri Lanka, plenty of customers order on a phone, ask questions on WhatsApp, read in Sinhala and pay at the door. A lot of software ignores all of that. We started Softro Code Labs to build software that doesn&apos;t.
          </p>
          <p>
            So we begin every project with one question: who will actually use this? That question gave a coconut oil store cash on delivery and order tracking by SMS. It gave young children a handwriting app that works with no internet, and travellers one place to explore the island and plan a trip.
          </p>
          <p>
            Between client projects, we build in the Lab. Swift Converter Hub began with another simple idea: converting a file shouldn&apos;t mean handing it to someone else&apos;s server. It now has 46 free tools that run inside the browser.
          </p>
          <p>We&apos;re based in Balapitiya, and we&apos;re ready for the next project.</p>
        </div>
      </RibbonRow>
      <RibbonRow className="pt-6 pb-12">
        <h2 className="display-l mb-10">What we care about</h2>
        <div className="min-[981px]:pr-16">
          {values.map((value) => (
            <div key={value.name} className="grid gap-x-12 gap-y-2 border-t border-line py-6 min-[981px]:grid-cols-[1fr_1.4fr]">
              <h3 className="font-display text-[32px] leading-tight font-semibold">{value.name}</h3>
              <p className="text-muted">{value.text}</p>
            </div>
          ))}
        </div>
      </RibbonRow>
      <RibbonRow className="pt-6 pb-12">
        <h2 className="display-l mb-10">How we work with you</h2>
        <ol className="grid gap-8 min-[640px]:grid-cols-2 min-[981px]:grid-cols-4 min-[981px]:pr-16">
          {steps.map((step, index) => (
            <li key={step.name}>
              <p aria-hidden="true" className="font-display text-[56px] leading-none font-semibold text-crimson">
                {index + 1}
              </p>
              <h3 className="mt-3 text-[21px] leading-snug font-semibold">{step.name}</h3>
              <p className="mt-2 text-muted">{step.text}</p>
            </li>
          ))}
        </ol>
      </RibbonRow>
      <ClosingEnquiry />
    </>
  );
}

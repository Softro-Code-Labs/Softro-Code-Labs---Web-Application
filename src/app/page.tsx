import Image from "next/image";
import Link from "next/link";
import { RibbonRow } from "@/components/Ribbon";
import { ClosingEnquiry, LabRow, ProjectRow, Testimonials } from "@/components/Sections";
import { projects, services, steps } from "@/content/projects";
import { site } from "@/content/site";

const organization = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: site.name,
  url: site.url,
  logo: `${site.url}/brand/softro-mark.svg`,
  email: site.email,
  telephone: site.phoneIntl,
  address: { "@type": "PostalAddress", streetAddress: "No. 30, Robert De Zoysa Mawatha, Walagedara", addressLocality: "Balapitiya", addressCountry: "LK" },
};

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }} />

      <section className="hero">
        <h1 className="display-xl max-w-[960px]">Software that fits the people using it.</h1>
        <p className="lead mt-8 max-w-[620px] text-muted">
          We&apos;re Softro Code Labs. We build websites, online stores, mobile apps and browser tools, shaped around how your customers actually behave.
        </p>
        <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
          <Link href="/contact" className="btn">
            Start a project
          </Link>
          <a href={site.whatsapp} className="link">
            Chat on WhatsApp
          </a>
          <a href="#work" className="link">
            See our work
          </a>
        </div>
        <p className="mt-10 max-w-[620px] text-sm text-muted">Recent work in education, retail and travel, plus 46 browser tools of our own.</p>
        <Image className="hero-mark" src="/brand/softro-mark.svg" alt="" width={352} height={534} priority />
      </section>

      <RibbonRow id="work" variant="first" as="div" className="pt-10 pb-16">
        <h2 className="display-l">What we&apos;ve built so far</h2>
      </RibbonRow>

      {projects.map((project) => (
        <ProjectRow key={project.slug} project={project} />
      ))}

      <LabRow id="lab" />

      <RibbonRow className="pt-14 pb-12 min-[981px]:pt-[104px]">
        <h2 className="display-l mb-10">Four ways we can help</h2>
        <div className="grid gap-x-12 min-[981px]:grid-cols-2 min-[981px]:pr-16">
          {services.map((service) => (
            <div key={service.name} className="border-t border-line pt-6 pb-8">
              <h3 className="font-display text-[32px] leading-tight font-semibold">{service.name}</h3>
              <p className="mt-2 text-muted">{service.short}</p>
            </div>
          ))}
        </div>
      </RibbonRow>

      <Testimonials />

      <RibbonRow className="pt-10 pb-16">
        <h2 className="display-l mb-10">How a project runs</h2>
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

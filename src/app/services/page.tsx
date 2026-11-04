import type { Metadata } from "next";
import Link from "next/link";
import { RibbonRow } from "@/components/Ribbon";
import { ClosingEnquiry } from "@/components/Sections";
import { services } from "@/content/projects";

export const metadata: Metadata = {
  title: "Services",
  description: "Websites, online stores, mobile apps and custom web tools, each backed by a real project you can see.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <RibbonRow variant="first" className="pt-14 pb-10 min-[981px]:pt-20">
        <h1 className="display-xl max-w-[900px]">What you can hire us for</h1>
        <p className="lead mt-6 max-w-[620px] text-muted">
          Every service below comes from work we&apos;ve already shipped, so you can see a real example before you talk to us.
        </p>
      </RibbonRow>
      <RibbonRow className="pb-16">
        {services.map((service) => (
          <section key={service.name} className="grid gap-x-12 gap-y-3 border-t border-line pt-6 pb-10 min-[981px]:grid-cols-[1fr_1.4fr] min-[981px]:pr-16">
            <h2 className="display-m">{service.name}</h2>
            <div>
              <p>{service.long}</p>
              <p className="mt-4 text-[15px] text-muted">
                Example:{" "}
                <Link className="link" href={service.example.href}>
                  {service.example.label}
                </Link>
              </p>
            </div>
          </section>
        ))}
      </RibbonRow>
      <ClosingEnquiry />
    </>
  );
}

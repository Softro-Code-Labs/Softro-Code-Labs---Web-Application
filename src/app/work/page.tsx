import type { Metadata } from "next";
import { RibbonRow } from "@/components/Ribbon";
import { ClosingEnquiry, ProjectRow } from "@/components/Sections";
import { projects } from "@/content/projects";

export const metadata: Metadata = {
  title: "Work",
  description: "Client projects by Softro Code Labs: Ola Kids, Baileyn and Tourvista Tours.",
  alternates: { canonical: "/work" },
};

export default function WorkPage() {
  return (
    <>
      <RibbonRow variant="first" className="pt-14 pb-14 min-[981px]:pt-20">
        <h1 className="display-xl">Work we&apos;ve shipped</h1>
        <p className="lead mt-6 max-w-[620px] text-muted">Each project had a different audience and a different problem. Here is what we built and why.</p>
      </RibbonRow>
      {projects.map((project) => (
        <ProjectRow key={project.slug} project={project} />
      ))}
      <ClosingEnquiry />
    </>
  );
}

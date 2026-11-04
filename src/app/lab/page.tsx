import type { Metadata } from "next";
import { RibbonRow } from "@/components/Ribbon";
import { ScreenGallery } from "@/components/ProjectScreen";
import { ClosingEnquiry, LabRow } from "@/components/Sections";
import { labShots } from "@/content/projects";

export const metadata: Metadata = {
  title: "The Lab",
  description: "Our own products, including Swift Converter Hub: 46 free file tools that run inside your browser.",
  alternates: { canonical: "/lab" },
};

const how = [
  { title: "The tool loads into your browser", text: "Opening a tool downloads its engine, such as ImageMagick or FFmpeg, into the tab." },
  { title: "Your device does the work", text: "Files go straight into the tab's memory and are processed at your computer's speed." },
  { title: "The result saves back to your device", text: "There is no server copy to delete, because there never was one." },
];

export default function LabPage() {
  return (
    <>
      <LabRow pageTitle />
      <RibbonRow className="pt-14 pb-12 min-[981px]:pt-[104px]">
        <h2 className="display-l max-w-[760px]">Most converters upload your file. Ours comes to your file.</h2>
        <ol className="mt-10 grid gap-8 min-[981px]:grid-cols-3 min-[981px]:pr-16">
          {how.map((step, index) => (
            <li key={step.title}>
              <p aria-hidden="true" className="font-display text-[56px] leading-none font-semibold text-crimson">
                {index + 1}
              </p>
              <h3 className="mt-3 text-[21px] leading-snug font-semibold">{step.title}</h3>
              <p className="mt-2 text-muted">{step.text}</p>
            </li>
          ))}
        </ol>
      </RibbonRow>
      <section aria-labelledby="screens" className="px-(--gutter) pt-10 pb-16 min-[981px]:pb-24">
        <div className="max-w-[1194px]">
          <h2 id="screens" className="display-m mb-10">
            Screens from Swift Converter Hub
          </h2>
          <ScreenGallery shots={[labShots.menu, labShots.phone, labShots.convert, labShots.password]} />
        </div>
      </section>
      <ClosingEnquiry />
    </>
  );
}

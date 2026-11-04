import type { Lang } from "@/i18n";
import { legal as legalEn } from "./legal";
import {
  capabilityGroupText,
  capabilityLayout,
  capabilityText,
  labShots,
  projects,
  services,
  steps,
  studios,
  type CapabilityGroup,
  type CapabilityGroupId,
  type CapabilityId,
  type CapabilityText,
  type Project,
  type Shot,
} from "./projects";
import { legal as legalSi } from "./si/legal";
import {
  capabilityGroupText as capabilityGroupTextSi,
  capabilityText as capabilityTextSi,
  projectText,
  services as servicesSi,
  shotText,
  steps as stepsSi,
  studioNames,
} from "./si/projects";
import { si } from "./si/ui";
import { en } from "./ui";

/** A screenshot with its Sinhala description and caption. Fails the build if one is missing. */
function shotSi(shot: Shot): Shot {
  const text = shotText[shot.src];
  if (!text) throw new Error(`Missing Sinhala text for ${shot.src} in src/content/si/projects.ts`);
  return { ...shot, ...text };
}

function projectSi(project: Project): Project {
  const { linkLabel, ...text } = projectText[project.slug];
  return {
    ...project,
    ...text,
    link: project.link && { ...project.link, label: linkLabel ?? project.link.label },
    screen: shotSi(project.screen),
    accent: project.accent && shotSi(project.accent),
    gallery: project.gallery.map(shotSi),
  };
}

/** The capability groups in one language: the shared layout filled with that language's words. */
function capabilities(groups: Record<CapabilityGroupId, CapabilityText>, items: Record<CapabilityId, CapabilityText>): CapabilityGroup[] {
  return capabilityLayout.map((group) => ({ id: group.id, ...groups[group.id], items: group.items.map((id) => ({ id, ...items[id] })) }));
}

const content = {
  en: { ui: en, projects, labShots, studios, services, steps, capabilities: capabilities(capabilityGroupText, capabilityText), legal: legalEn },
  si: {
    ui: si,
    projects: projects.map(projectSi),
    labShots: Object.fromEntries(Object.entries(labShots).map(([key, shot]) => [key, shotSi(shot)])) as typeof labShots,
    studios: studios.map((studio) => ({ ...studio, name: studioNames[studio.name] ?? studio.name })),
    services: servicesSi,
    steps: stepsSi,
    capabilities: capabilities(capabilityGroupTextSi, capabilityTextSi),
    legal: legalSi,
  },
};

/** Everything a page shows, in one language. */
export const getContent = (lang: Lang) => content[lang];
export type Content = ReturnType<typeof getContent>;

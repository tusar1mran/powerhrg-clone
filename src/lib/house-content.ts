// Copy for the "Your House" homepage and the service-page template. Wherever possible it is drawn
// from the existing content files (content.ts, the *-content.ts service files) so the drawing, the
// layer diagrams and the service pages always say the same thing.
import type { FaqGroup } from "@/components/services/Faq";
import type { Feature } from "@/components/services/FeatureIcons";
import { homeCta, homeHero, processSection, promise, trust } from "./content";
import type { AtticLayer, LayerNote, RoofLayer, WallLayer } from "./house/layers";
import { insulationFeatures, insulationIntro } from "./insulation-content";
import { links, serviceLinks, type ServiceName } from "./links";
import { buildQuoteHref } from "./quote/href";
import {
  roofingCta,
  roofingFaqs,
  roofingFeatures,
  roofingGuarantee,
  roofingHero,
  roofingIntro,
} from "./roofing-content";
import { sameAddress } from "./services-content";
import { sidingFeatures, sidingIntro } from "./siding-content";
import { site } from "./site";

/** Looks a feature up by its title, so a renamed feature fails the build instead of going missing. */
function note(features: Feature[], title: string): LayerNote {
  const found = features.find((f) => f.title === title);
  if (!found) {
    throw new Error(`house-content: no feature titled "${title}"`);
  }
  return { title: found.title, text: found.text };
}

const serviceHref = (name: ServiceName): string => {
  const found = serviceLinks.find((s) => s.name === name);
  return found ? found.href : links.services;
};

export const houseHero = {
  eyebrow: site.tagline,
  title: homeHero.title,
  intro: homeHero.subtitle.join(" "),
};

/** Where each service sits on the drawing, shown under its name in the legend and callout. */
export const partLocations: Record<ServiceName, string> = {
  Roofing: "Roof",
  Insulation: "Attic",
  Siding: "Walls",
  Windows: "Every opening",
  Doors: "Front door",
  Accessories: "Gutters and trim",
};

export const explorerCopy = {
  modeLabel: "What happens when you pick a part of the house",
  modes: {
    explore: "Explore services",
    select: "Build a quote",
  },
  drawingLabel: {
    explore: "Front of a house. Each part links to the service for it.",
    select: "Front of a house. Pick the parts you want quoted.",
  },
  hint: {
    explore: "Point to any part of the house to see what we do there, or pick it to read more.",
    select: "Pick every part that needs work. We’ll carry your list over to the quote form.",
  },
  action: {
    explore: "Open the service page",
    select: "Add to your quote",
    selected: "In your quote. Pick again to remove.",
  },
  legendTitle: "Parts of the house",
  /** Lettering along the top edge of the drawing frame. */
  sheet: {
    title: "Sheet 01 · Your house",
    scale: "Front elevation",
  },
  /** Shown under the drawing until a part is highlighted, like a drawing-sheet caption. */
  figureNote: "Fig. 1 · Not to scale",
  tray: {
    title: "Your quote",
    empty: "Nothing picked yet. Choose parts on the house or in the list.",
    countOne: "part picked",
    countOther: "parts picked",
    submit: "Get a free quote",
    clear: "Clear all",
    /** Prefix for each chip's remove button, read as "Remove Roofing". */
    remove: "Remove",
  },
};

/** Serializable copy passed from the server page to the client explorer. */
export type ExplorerCopy = typeof explorerCopy;

export const storyIntro = {
  eyebrow: "Under the surface",
  title: "Take the house apart",
  text: sameAddress.text,
};

export type StoryChapter<K extends string> = {
  service: ServiceName;
  eyebrow: string;
  title: string;
  text: string;
  href: string;
  linkLabel: string;
  /** Lettering under the exploded diagram. */
  figureLabel: string;
  notes: Record<K, LayerNote>;
};

export const roofStory: StoryChapter<RoofLayer> = {
  service: "Roofing",
  eyebrow: roofingIntro.eyebrow,
  title: roofingIntro.title,
  text: roofingIntro.text,
  href: serviceHref("Roofing"),
  linkLabel: "Roofing in detail",
  figureLabel: "Fig. 2 · Roof system, exploded",
  notes: {
    deck: note(roofingFeatures, "Deck inspection"),
    barrier: note(roofingFeatures, "Ice-and-water barrier"),
    underlayment: note(roofingFeatures, "Synthetic underlayment"),
    flashing: note(roofingFeatures, "Drip edge and flashing"),
    shingles: note(roofingFeatures, "Architectural shingles"),
    ridgeVent: note(roofingFeatures, "Balanced ventilation"),
  },
};

export const wallStory: StoryChapter<WallLayer> = {
  service: "Siding",
  eyebrow: "Siding and walls",
  title: sidingIntro.title,
  text: sidingIntro.text,
  href: serviceHref("Siding"),
  linkLabel: "Siding in detail",
  figureLabel: "Fig. 3 · Wall, exploded",
  notes: {
    sheathing: note(sidingFeatures, "Walls checked first"),
    wrap: note(sidingFeatures, "House wrap"),
    flashing: note(sidingFeatures, "Flashed openings"),
    siding: note(sidingFeatures, "Insulated vinyl"),
    trim: note(sidingFeatures, "Trim, soffit and fascia"),
  },
};

export const atticStory: StoryChapter<AtticLayer> = {
  service: "Insulation",
  eyebrow: insulationIntro.eyebrow,
  title: insulationIntro.title,
  text: insulationIntro.text,
  href: serviceHref("Insulation"),
  linkLabel: "Insulation in detail",
  figureLabel: "Fig. 4 · Attic floor, exploded",
  notes: {
    airSeal: note(insulationFeatures, "Air sealing first"),
    insulation: note(insulationFeatures, "Blown-in insulation"),
    baffles: note(insulationFeatures, "Attic baffles"),
  },
};

export const houseProcess = {
  eyebrow: "Start to finish",
  title: processSection.title,
  steps: processSection.steps,
  cta: processSection.cta,
};

export const housePromise = {
  eyebrow: "General notes",
  title: `${promise.eyebrow} ${promise.title.join(" ").toLowerCase()}`,
  text: promise.paragraphs[0],
  items: promise.items,
  cta: promise.cta,
};

export const houseTrust = {
  eyebrow: "Checked and signed",
  title: trust.title,
  text: trust.text,
};

export const houseClosing = {
  title: homeCta.title.join(" "),
  text: homeCta.text,
  quote: { label: homeCta.label, href: homeCta.href },
  callLabel: `Call ${site.phone.display}`,
  back: { label: "Or pick parts on the house", href: "#house" },
};

// ---- Service-page template ("sheet") -------------------------------------------------------------

export type ServiceSheet<K extends string> = {
  service: ServiceName;
  /** Lettering above the title, like the sheet number on a drawing set. */
  sheetLabel: string;
  /** Eyebrow over the numbered key to the hero drawing. */
  systemEyebrow: string;
  hero: { title: string[]; intro: string };
  figureLabel: string;
  keyPlan: { label: string; back: { label: string; href: string } };
  actions: { quote: { label: string; href: string }; callLabel: string };
  system: StoryChapter<K>;
  included: { eyebrow: string; title: string; text: string; items: Feature[] };
  guarantee: { eyebrow: string; title: string[]; text: string; cta: string; href: string; seal: string };
  faqs: { eyebrow: string; title: string; groups: FaqGroup[] };
  closing: { title: string[]; text: string };
};

/** Features already explained as a layer of the roof are left out of the "included work" list. */
const roofLayerTitles: ReadonlySet<string> = new Set(Object.values(roofStory.notes).map((n) => n.title));

export const roofingSheet: ServiceSheet<RoofLayer> = {
  service: "Roofing",
  sheetLabel: `Sheet 02 · ${roofingIntro.eyebrow}`,
  systemEyebrow: "Key to Fig. 1",
  hero: {
    title: roofingHero.title,
    intro: roofingHero.subtitle.join(" "),
  },
  figureLabel: "Fig. 1 · Roof system, each layer cut back",
  keyPlan: {
    label: `Key plan · ${partLocations.Roofing}`,
    back: { label: "Back to the house", href: `${links.home}#house` },
  },
  actions: {
    quote: { label: roofingCta.label, href: buildQuoteHref(["Roofing"]) },
    callLabel: `Call ${site.phone.display}`,
  },
  system: roofStory,
  included: {
    eyebrow: "Included work",
    title: "Also part of every roof",
    text: "Beyond the layers themselves, this is what comes with a roof replacement from us.",
    items: roofingFeatures.filter((f) => !roofLayerTitles.has(f.title)),
  },
  guarantee: {
    eyebrow: roofingGuarantee.eyebrow,
    title: roofingGuarantee.title,
    text: roofingGuarantee.text,
    cta: roofingGuarantee.cta,
    href: roofingGuarantee.href,
    seal: "Workmanship warranty · In writing · ",
  },
  faqs: {
    eyebrow: "Questions",
    title: "Roofing questions, answered",
    groups: roofingFaqs,
  },
  closing: {
    title: roofingCta.title,
    text: roofingCta.text,
  },
};

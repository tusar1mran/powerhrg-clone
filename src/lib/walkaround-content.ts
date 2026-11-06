// Copy for the homepage "walk-around": the 3D house tour, its chapter panels, the stage controls
// and the quote selection tray. Service names and descriptions come from content.ts, so this file
// only holds the words that belong to the tour itself.
import { headerCta, homeHero } from "./content";
import type { ServiceName } from "./links";
import { roofLayers } from "./roofing-content";
import { site } from "./site";

export const walkaroundHero = {
  eyebrow: site.tagline,
  title: homeHero.title,
  subtitle: homeHero.subtitle,
  start: "Walk around the house",
  quote: headerCta,
  indexLabel: "Jump to a part of the house",
  scrollHint: "Scroll to walk around",
};

/**
 * What the 3D view shows in each chapter. `layers` are the labels drawn on the model and repeated
 * as a list in the panel, so the information is never only in the canvas.
 */
export const chapterDetails: Record<ServiceName, { moment: string; layers: string[] }> = {
  Windows: {
    moment: "Frames, grilles and glass at every opening",
    layers: [],
  },
  Roofing: {
    moment: "The roof system, from the deck up",
    layers: roofLayers
      .filter((layer) => layer.id === "deck" || layer.id === "underlayment" || layer.id === "shingles" || layer.id === "ridgeVent")
      .map((layer) => layer.label),
  },
  Siding: {
    moment: "The wall, layer by layer",
    layers: ["Sheathing", "House wrap", "Siding"],
  },
  Doors: {
    moment: "An entry door that swings true",
    layers: [],
  },
  Insulation: {
    moment: "Inside the attic",
    layers: ["Air sealing", "Blown-in insulation"],
  },
  Accessories: {
    moment: "The finishing pieces",
    layers: ["Gutters and downspouts", "Soffit and fascia", "Trim", "Shutters"],
  },
};

export const walkaroundChrome = {
  stageDescription:
    "Illustrated 3D model of a two-story house. As you scroll, the view moves to each part of the house described in the text.",
  note: "Illustration, not to scale",
  modeLabel: "Clicking the house",
  modes: { explore: "Explore", select: "Pick for quote" },
  timeLabel: "Light",
  times: { day: "Day", dusk: "Dusk" },
  railLabel: "Parts of the house",
  chapterOf: (index: number, total: number) => `${String(index).padStart(2, "0")} / ${String(total).padStart(2, "0")}`,
  learnMore: (service: ServiceName) => `More about ${service.toLowerCase()}`,
  addToQuote: "Add to my quote",
  inQuote: "In my quote",
  hoverExplore: (service: ServiceName) => `Click to see ${service.toLowerCase()}`,
  hoverSelect: (service: ServiceName) => `Click to add or remove ${service.toLowerCase()}`,
  loading: "Loading the 3D house…",
  fallback: "Showing a drawing of the house because 3D isn’t available in this browser.",
};

export const selectionTray = {
  label: "Your quote",
  hint: "Add parts of the house as you go, then send them to us in one request.",
  cta: "Get a quote for these",
  clear: "Clear",
  remove: (service: ServiceName) => `Remove ${service} from your quote`,
  added: (service: ServiceName) => `${service} added to your quote.`,
  removed: (service: ServiceName) => `${service} removed from your quote.`,
  cleared: "Your quote selection was cleared.",
};

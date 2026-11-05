// Copy and image paths for /services/siding. Photos are in /public/assets/photos (see public/assets/CREDITS.md).
import type { FaqGroup } from "@/components/services/Faq";
import type { Feature } from "@/components/services/FeatureIcons";
import { links } from "./links";
import { guarantee } from "./services-content";

export const sidingHero = {
  title: ["Siding with", "a clean finish"],
  subtitle: ["Vinyl, insulated vinyl and fiber cement,", "installed over new house wrap with fresh trim."],
  image: "/assets/photos/siding-hero.jpg",
  overlay: true,
};

export const sidingIntro = {
  eyebrow: "Siding replacement",
  title: "A new look outside, a tighter wall underneath",
  text: "New siding changes how your house looks from the curb, but the work behind it is what keeps water out. We remove the old siding, check the walls, wrap the house, flash every opening and finish the trim, soffit and fascia so the whole exterior matches.",
};

export const sidingFeatures: Feature[] = [
  {
    icon: "style",
    title: "Three material options",
    text: "Vinyl, insulated vinyl and fiber cement. We’ll explain how they differ in look, upkeep and price.",
  },
  {
    icon: "curb",
    title: "Color and profile choices",
    text: "Lap, board-and-batten and shake profiles in a range of colors, with samples you can hold up to the house.",
  },
  {
    icon: "insulation",
    title: "Insulated vinyl",
    text: "Vinyl siding with a rigid foam backing that adds a layer of insulation and makes the panels feel more solid.",
  },
  {
    icon: "installers",
    title: "Walls checked first",
    text: "With the old siding off, we look at the sheathing and repair soft or damaged spots before anything new goes up.",
  },
  {
    icon: "weather",
    title: "House wrap",
    text: "A weather-resistant barrier over the sheathing that sheds water and slows air leaks while letting the wall dry.",
  },
  {
    icon: "water",
    title: "Flashed openings",
    text: "Windows, doors and roof lines get proper flashing so water is directed out and away from the wall.",
  },
  {
    icon: "ventilation",
    title: "Trim, soffit and fascia",
    text: "New trim, vented soffit and covered fascia, so the edges of the house look finished and the attic can breathe.",
  },
  {
    icon: "lowMaintenance",
    title: "Less upkeep",
    text: "No scraping or yearly painting. An occasional wash with a garden hose keeps most siding looking clean.",
  },
  {
    icon: "cleanup",
    title: "Cleanup every day",
    text: "Old siding and scraps hauled away, nails swept up, and a walk around the house with you at the end.",
  },
];

export const sidingGuarantee = guarantee("/assets/photos/siding-card.jpg");

export const sidingCta = {
  title: ["Ready for a", "fresh exterior?"],
  text: "We’ll look at your walls, bring samples and send a written quote for the whole job. No charge, no pressure.",
  label: "Get a free quote",
  href: links.quote,
  tone: "oat" as const,
};

export const sidingFaqs: FaqGroup[] = [
  {
    tab: "General",
    items: [
      {
        q: "What are signs my siding needs to be replaced?",
        a: "Cracked, warped or loose panels, peeling paint on wood siding, soft spots when you press on the wall, mold or staining that keeps coming back, and higher energy bills can all point to siding that isn’t doing its job.",
      },
      {
        q: "How do vinyl, insulated vinyl and fiber cement compare?",
        a: "Vinyl is the most affordable and needs little upkeep. Insulated vinyl adds a foam backing for extra insulation and a sturdier feel. Fiber cement looks more like painted wood, resists fire and impact well, and costs more to buy and install.",
      },
      {
        q: "Does fiber cement need to be painted?",
        a: "Fiber cement can be ordered with a factory finish or painted after installation. Like any painted surface, it will eventually need repainting, and how soon depends on sun exposure and climate.",
      },
      {
        q: "Can I change the color of my house?",
        a: "Yes. We’ll bring samples of siding and trim colors so you can see them in daylight against your roof and windows. If you have an HOA, we’ll give you product and color details for your application.",
      },
    ],
  },
  {
    tab: "Process",
    items: [
      {
        q: "Do you remove the old siding?",
        a: "In most cases, yes. Taking it off lets us find water damage, repair the sheathing and install house wrap correctly. Covering old siding can hide problems that get worse over time.",
      },
      {
        q: "How long does a siding project take?",
        a: "Usually a few days to a week, depending on the size of the house, the number of windows and doors, and the material. Your written quote includes an expected schedule.",
      },
      {
        q: "What is house wrap and why do I need it?",
        a: "House wrap is a weather-resistant barrier that goes between the sheathing and the siding. Siding sheds most water, but some always gets behind it, and the wrap keeps that water from reaching the wall.",
      },
      {
        q: "Will the work disturb my windows and landscaping?",
        a: "We cover plants near the house, protect windows and doors while we work, and pick up debris and nails at the end of each day.",
      },
    ],
  },
  {
    tab: "Cost & Warranty",
    items: [
      {
        q: "What affects the cost of new siding?",
        a: "The size and height of the house, the material and profile you choose, the amount of trim and detail work, and any wall repairs we find once the old siding is off.",
      },
      {
        q: "Can I replace siding on just one side of the house?",
        a: "You can, but matching is hard. Older siding fades in the sun, and colors and profiles change over the years. We’ll tell you honestly whether a partial replacement will look right.",
      },
      {
        q: "Should I do my windows at the same time?",
        a: "If your windows are near the end of their life, doing them with the siding avoids disturbing the new siding and trim later. We’ll quote both separately so you can decide.",
      },
      {
        q: "What warranty comes with my siding?",
        a: [
          "The siding manufacturer’s warranty covers the product, and our written workmanship warranty covers the installation. ",
          { label: "How our warranty works", href: links.warranty },
          ".",
        ],
      },
    ],
  },
];

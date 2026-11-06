// Copy and image paths for /services/roofing. Photos are in /public/assets/photos (see public/assets/CREDITS.md).
import type { FaqGroup } from "@/components/services/Faq";
import type { Feature } from "@/components/services/FeatureIcons";
import type { RoofPart } from "@/components/service-sheet/drawings/RoofSection";
import { links } from "./links";
import { buildServiceSheet } from "./service-sheet";
import { guarantee } from "./services-content";
import { sheets } from "./sheets";
import { site } from "./site";

export const roofingHero = {
  title: ["A roof built", "as a system"],
  subtitle: ["Asphalt shingle roof replacement from the deck up,", "with permits, daily cleanup and a final walk-through."],
  image: "/assets/photos/roofing-hero.jpg",
  overlay: true,
};

export const roofingIntro = {
  eyebrow: "Roof replacement",
  title: "What’s under the shingles matters as much as the shingles",
  text: "A roof keeps water out because every layer does its job: solid decking, a barrier where ice and water collect, underlayment, flashing, and ventilation that lets the attic breathe. We replace the whole system, not just the part you can see from the street.",
};

// `as const` keeps the titles as literal types, so the sheet plan below can only reference real features.
export const roofingFeatures = [
  {
    icon: "installers",
    title: "Full tear-off",
    text: "We strip the old shingles and underlayment down to the deck, so nothing hidden is left under your new roof.",
  },
  {
    icon: "measure",
    title: "Deck inspection",
    text: "With the deck exposed, we check it for soft or rotted spots and replace damaged sheets before anything goes on top.",
  },
  {
    icon: "weather",
    title: "Ice-and-water barrier",
    text: "A self-sealing membrane at the eaves and valleys, where code requires it, to protect against ice dams and wind-driven rain.",
  },
  {
    icon: "insulation",
    title: "Synthetic underlayment",
    text: "A tear-resistant layer over the rest of the deck that sheds water if anything ever gets past the shingles.",
  },
  {
    icon: "water",
    title: "Drip edge and flashing",
    text: "Metal edging along the eaves and rakes, and new flashing at walls, chimneys and vents, where most roof leaks begin.",
  },
  {
    icon: "ventilation",
    title: "Balanced ventilation",
    text: "Ridge and soffit vents work together to move heat and moisture out of the attic, which helps the roof and the house.",
  },
  {
    icon: "style",
    title: "Architectural shingles",
    text: "Thicker, dimensional shingles in a range of colors. We’ll bring samples so you can see them against your house.",
  },
  {
    icon: "cleanup",
    title: "Daily cleanup",
    text: "Tarps over plants and siding, debris hauled off, and a magnetic sweep of the yard and driveway for stray nails.",
  },
  {
    icon: "warranty",
    title: "Two layers of coverage",
    text: "The shingle manufacturer’s warranty on materials, plus our written workmanship warranty on the installation.",
  },
] as const satisfies readonly Feature[];

export const roofingGuarantee = guarantee("/assets/photos/roofing-card.jpg");

export const roofingCta = {
  title: ["Leaks, missing", "shingles, or", "just old?"],
  text: "We’ll get on the roof, take photos, and send a written quote that spells out every layer. No charge, no pressure.",
  label: "Get a free quote",
  href: links.quote,
  tone: "oat" as const,
};

export const roofingFaqs: FaqGroup[] = [
  {
    tab: "General",
    items: [
      {
        q: "How do I know if I need a new roof?",
        a: "Look for curling, cracked or missing shingles, bald patches where the granules have worn off, granules collecting in the gutters, and water stains on ceilings or in the attic. A sagging roofline is a sign of deck damage and should be checked soon.",
      },
      {
        q: "How long does an asphalt shingle roof last?",
        a: "Asphalt shingle roofs commonly last 20 to 30 years. Climate, sun exposure, attic ventilation and the quality of the installation all make a difference.",
      },
      {
        q: "Why tear off the old roof instead of adding a layer?",
        a: "Removing the old shingles lets us find and repair soft decking, install the barrier and underlayment correctly, and replace worn flashing. Many building codes also limit how many layers a roof can have.",
      },
      {
        q: "What’s the difference between architectural and 3-tab shingles?",
        a: "3-tab shingles are a single flat layer. Architectural shingles are made of laminated layers, which makes them thicker and gives the roof more depth and texture. Most homeowners choose architectural shingles today.",
      },
      {
        q: "Why does attic ventilation matter for a roof?",
        a: "Trapped heat and moisture in the attic can shorten the life of shingles and decking, and in cold weather it can contribute to ice dams. Intake vents at the soffits and exhaust vents at the ridge keep air moving through the attic.",
      },
    ],
  },
  {
    tab: "Process",
    items: [
      {
        q: "How long does a roof replacement take?",
        a: "Most homes take one to three days, depending on the size and pitch of the roof and the weather. Your crew lead will keep you updated if rain changes the plan.",
      },
      {
        q: "What happens if you find rotted decking?",
        a: "We stop, show you the damage, and explain the cost before we replace it. Your written quote explains how decking repairs are priced, so you won’t be surprised at the end.",
      },
      {
        q: "What if it rains during the job?",
        a: "We watch the forecast, open only as much roof as we can close up the same day, and keep tarps on site. The house is never left exposed overnight.",
      },
      {
        q: "How do you protect my yard and landscaping?",
        a: "We cover plants, decks and siding near the work area, use a dumpster or trailer for debris, and run a magnetic sweeper over the lawn and driveway each day to pick up nails.",
      },
      {
        q: "Do you pull the permit?",
        a: [
          "Yes. We pull the permits your roof requires and schedule any inspections. ",
          { label: "See our licenses and insurance", href: links.licenses },
          ".",
        ],
      },
    ],
  },
  {
    tab: "Cost & Warranty",
    items: [
      {
        q: "What affects the cost of a new roof?",
        a: "The size and steepness of the roof, how many layers we’re removing, the amount of decking that needs repair, the number of chimneys, skylights and valleys, and the shingle you choose.",
      },
      {
        q: "Can you help with a storm damage claim?",
        a: "Start by contacting your insurance company. We can inspect the roof, photograph what we find and give you a written quote to share with your adjuster. Your policy and the adjuster decide what’s covered.",
      },
      {
        q: "I have an active leak. What should I do?",
        a: `Move valuables away from the drip, catch the water, and call us at ${site.phone.display}. We’ll tell you what we can do and how soon we can get someone out to look.`,
      },
      {
        q: "What warranty comes with my roof?",
        a: [
          "The shingle manufacturer’s warranty covers the materials, and our written workmanship warranty covers the installation. ",
          { label: "How our warranty works", href: links.warranty },
          ".",
        ],
      },
    ],
  },
];

// ---------------------------------------------------------------------------------------------
// Sheet A-200: the roofing page drawn as a construction sheet. The copy is the same as above;
// this only decides which features are drawn as callouts and which are written up as notes.
// ---------------------------------------------------------------------------------------------

const roofingSheetNumber = sheets.roofing.number;

export const roofingSheetIntro = {
  kicker: roofingIntro.eyebrow,
  title: roofingHero.title,
  subtitle: roofingHero.subtitle,
  photo: {
    src: roofingHero.image,
    width: 2400,
    height: 1574,
    alt: "Two-storey house with a dark asphalt shingle roof, tan shake siding and a white garage",
    caption: "Photo ref. 01 · Asphalt shingle roof",
  },
};

export const roofingSheet = buildServiceSheet<typeof roofingFeatures, RoofPart>(roofingFeatures, {
  sheetNumber: roofingSheetNumber,
  detailNumber: "1",
  // Numbered from the deck up, in the order the layers go on.
  callouts: [
    { mark: 1, part: "deck", label: "Roof deck", feature: "Deck inspection" },
    { mark: 2, part: "barrier", label: "Eave membrane", feature: "Ice-and-water barrier" },
    { mark: 3, part: "underlayment", label: "Underlayment", feature: "Synthetic underlayment" },
    { mark: 4, part: "flashing", label: "Drip edge, vent flashing", feature: "Drip edge and flashing" },
    { mark: 5, part: "ventilation", label: "Soffit and ridge vents", feature: "Balanced ventilation" },
    { mark: 6, part: "shingles", label: "Shingles", feature: "Architectural shingles" },
  ],
  notes: ["Full tear-off", "Daily cleanup", "Two layers of coverage"],
  kinds: {
    "Full tear-off": "Workmanship",
    "Deck inspection": "Roof layer",
    "Ice-and-water barrier": "Roof layer",
    "Synthetic underlayment": "Roof layer",
    "Drip edge and flashing": "Metal",
    "Balanced ventilation": "Ventilation",
    "Architectural shingles": "Roof layer",
    "Daily cleanup": "Workmanship",
    "Two layers of coverage": "Coverage",
  },
});

export const roofingDetail = {
  heading: roofingIntro.title,
  text: roofingIntro.text,
  number: "1",
  title: "Roof system section, eave to ridge",
  scale: "NTS",
  hint: "Callouts are numbered from the deck up, in the order the layers go on.",
  description:
    "Cross-section through an asphalt shingle roof from the eave to the ridge. From the bottom up: a rafter, the roof deck, a self-sealing membrane at the eave, synthetic underlayment over the rest of the deck, and architectural shingles. Metal drip edge wraps the eave and a flashing boot seals a plumbing vent. Air enters through the soffit vent, moves up under the deck and leaves through the ridge vent. The gutter, attic insulation and wall siding are shown for reference.",
};

export const roofingNotes = {
  title: "Roofing notes",
  intro: roofingHero.subtitle.join(" "),
};

export const roofingSchedule = {
  title: "Specification",
  heading: "What’s included in a roof replacement",
  caption: "Every item in the roofing scope and where it is shown on this sheet.",
};

export const roofingWarranty = {
  ...roofingGuarantee,
  photo: {
    src: roofingGuarantee.image,
    width: 1600,
    height: 1067,
    alt: "Brick-and-stone house with a brown shingle roof and gables at sunset",
    caption: "Photo ref. 02 · Finished roofline",
  },
};

export const roofingWorkOrder = {
  title: roofingCta.title.join(" "),
  text: roofingCta.text,
  action: { label: roofingCta.label, href: roofingCta.href },
  fields: [
    { label: "Type", value: "Free estimate" },
    { label: "Scope", value: "Roofing" },
    { label: "You receive", value: "Written quote, every layer spelled out" },
    { label: "Charge", value: "No charge, no pressure" },
  ],
};

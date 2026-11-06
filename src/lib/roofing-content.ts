// Copy and image paths for /services/roofing. Photos are in /public/assets/photos (see public/assets/CREDITS.md).
import type { FaqGroup } from "@/components/services/Faq";
import type { Feature } from "@/components/services/FeatureIcons";
import { links } from "./links";
import { guarantee } from "./services-content";
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

export const roofingFeatures: Feature[] = [
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
];

export const roofingGuarantee = guarantee("/assets/photos/roofing-card.jpg");

/**
 * The layers of the roof system, from the deck up, as shown in the interactive 3D roof section
 * and the homepage walk-around. Each layer reuses the copy of the matching feature above, so the
 * two never drift apart. The 3D view is an illustration of the order of the layers, not to scale.
 */
export type RoofLayerId = "deck" | "iceWater" | "underlayment" | "dripEdge" | "shingles" | "ridgeVent";
export type RoofLayer = { id: RoofLayerId; label: string; title: string; text: string };

function roofingFeature(title: string): Pick<Feature, "title" | "text"> {
  const feature = roofingFeatures.find((f) => f.title === title);
  if (!feature) {
    throw new Error(`roofing-content: no roofing feature titled "${title}"`);
  }
  return { title: feature.title, text: feature.text };
}

export const roofLayers: RoofLayer[] = [
  { id: "deck", label: "Roof deck", ...roofingFeature("Deck inspection") },
  { id: "iceWater", label: "Ice-and-water barrier", ...roofingFeature("Ice-and-water barrier") },
  { id: "underlayment", label: "Synthetic underlayment", ...roofingFeature("Synthetic underlayment") },
  { id: "dripEdge", label: "Drip edge", ...roofingFeature("Drip edge and flashing") },
  { id: "shingles", label: "Architectural shingles", ...roofingFeature("Architectural shingles") },
  { id: "ridgeVent", label: "Ridge vent", ...roofingFeature("Balanced ventilation") },
];

export const roofExplorer = {
  title: "Take the roof apart",
  text: "Drag to turn the roof section, pull the layers apart, or pick a layer to see what it does.",
  explodeLabel: "Separate the layers",
  allLayersLabel: "All layers",
  viewsLabel: "View",
  views: [
    { id: "eave", label: "Eave" },
    { id: "ridge", label: "Ridge" },
    { id: "overhead", label: "Overhead" },
  ],
  note: "Illustration of the layer order. Not to scale.",
  fallback: "Your browser can’t show the 3D roof section, so here is the same roof system as a diagram.",
} as const;

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

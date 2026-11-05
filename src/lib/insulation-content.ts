// Copy and image paths for /services/insulation. Photos are in /public/assets/photos (see public/assets/CREDITS.md).
import type { FaqGroup } from "@/components/services/Faq";
import type { Feature } from "@/components/services/FeatureIcons";
import { links } from "./links";
import { guarantee } from "./services-content";

export const insulationHero = {
  title: ["Seal it,", "then fill it"],
  subtitle: ["Attic air sealing and blown-in insulation", "for rooms that hold their temperature."],
  image: "/assets/photos/insulation-hero.jpg",
  overlay: true,
};

export const insulationIntro = {
  eyebrow: "Attic insulation",
  title: "Stop paying to heat and cool the attic",
  text: "In many homes, warm air in winter and hot air in summer move through the attic. We seal the gaps that let air leak between the house and the attic first, then blow in insulation to the level recommended for your climate, so the rooms below stay more comfortable.",
};

export const insulationFeatures: Feature[] = [
  {
    icon: "measure",
    title: "Attic assessment",
    text: "We measure the insulation you have, look for gaps and moisture, and recommend a target level for your climate zone.",
  },
  {
    icon: "wind",
    title: "Air sealing first",
    text: "We seal gaps around wiring, plumbing, light fixtures and top plates before insulating, because insulation alone doesn’t stop air.",
  },
  {
    icon: "insulation",
    title: "Blown-in insulation",
    text: "Loose-fill fiberglass or cellulose, blown in evenly so it fills around joists and into corners.",
  },
  {
    icon: "ventilation",
    title: "Attic baffles",
    text: "Baffles at the eaves keep insulation from blocking the soffit vents, so the attic can still breathe.",
  },
  {
    icon: "sun",
    title: "Radiant barrier option",
    text: "In hot, sunny climates, a radiant barrier under the roof can reduce the heat the attic picks up from the sun.",
  },
  {
    icon: "comfort",
    title: "More even rooms",
    text: "Upstairs rooms that run hot in summer and cold in winter are often the first place homeowners notice a difference.",
  },
  {
    icon: "energy",
    title: "Less work for your HVAC",
    text: "A sealed, insulated attic means your heating and cooling system has less to make up for. Savings depend on your home.",
  },
  {
    icon: "installers",
    title: "Done to code",
    text: "Clearances around chimneys, flues and recessed lights are kept as code requires, and attic hatches are insulated too.",
  },
  {
    icon: "cleanup",
    title: "Contained and clean",
    text: "We protect the path to the attic, keep the mess where it belongs, and show you the finished depth before we leave.",
  },
];

export const insulationGuarantee = guarantee("/assets/photos/insulation-card.jpg");

export const insulationCta = {
  title: ["Hot upstairs?", "Cold floors?"],
  text: "We’ll check your attic, explain what we find and send a written quote. No charge, no pressure.",
  label: "Get a free quote",
  href: links.quote,
  tone: "oat" as const,
};

export const insulationFaqs: FaqGroup[] = [
  {
    tab: "General",
    items: [
      {
        q: "How do I know my attic needs more insulation?",
        a: "If you can see the tops of the ceiling joists, you probably need more. Other signs are upstairs rooms that are hard to heat or cool, drafts near ceilings, and ice dams along the roof edge in winter.",
      },
      {
        q: "How much insulation do I need?",
        a: "It depends on your climate zone. Your local building code sets a minimum, and ENERGY STAR publishes recommended attic levels for each zone. We measure what you have and recommend a target based on that guidance.",
      },
      {
        q: "Fiberglass or cellulose?",
        a: "Both work well when installed to the right depth. Loose-fill fiberglass is light and doesn’t absorb much moisture. Cellulose is made mostly from recycled paper and is denser. We’ll recommend one based on your attic and talk through the trade-offs.",
      },
      {
        q: "Why seal air leaks before adding insulation?",
        a: "Loose-fill insulation slows heat but doesn’t stop air. Warm, moist air leaking into the attic carries heat with it and can cause condensation. Sealing the gaps first makes the insulation more effective.",
      },
      {
        q: "Is a radiant barrier worth it?",
        a: "It helps most in hot, sunny climates, especially when ductwork runs through the attic. In cooler climates the benefit is usually small, and we’ll tell you if we don’t think it’s worth the cost for your home.",
      },
    ],
  },
  {
    tab: "Process",
    items: [
      {
        q: "How long does an attic insulation job take?",
        a: "Most attics are air sealed and insulated in a day. Larger attics, or attics that need old insulation removed or repairs first, can take longer.",
      },
      {
        q: "Do you remove the old insulation?",
        a: "Usually not. We add new insulation on top of dry, clean insulation that’s in good shape. If it’s wet, moldy or contaminated by pests, we’ll recommend removing it and quote that work separately.",
      },
      {
        q: "What if my attic has vermiculite insulation?",
        a: "Vermiculite is a pebble-like, gray-brown insulation that may contain asbestos. If we see it, we stop and recommend having it tested by a qualified professional before anyone disturbs it.",
      },
      {
        q: "Do I need to be home?",
        a: [
          "Someone should be home to let the crew in and for the walk-through at the end. Please clear a path to the attic access. ",
          { label: "See how our process works", href: links.process },
          ".",
        ],
      },
    ],
  },
  {
    tab: "Cost & Warranty",
    items: [
      {
        q: "What affects the cost of attic insulation?",
        a: "The size of the attic, how much insulation you already have, the target level, how much air sealing is needed, how easy the attic is to reach, and whether old insulation has to come out.",
      },
      {
        q: "How much will I save on energy?",
        a: "It depends on how much insulation you have now, how leaky the attic is, your climate and your heating and cooling system. Homes with little insulation and lots of air leaks tend to see the biggest change, but we don’t promise a specific number.",
      },
      {
        q: "What warranty comes with my insulation?",
        a: [
          "The insulation manufacturer’s warranty covers the material, and our written workmanship warranty covers the installation. ",
          { label: "How our warranty works", href: links.warranty },
          ".",
        ],
      },
    ],
  },
];

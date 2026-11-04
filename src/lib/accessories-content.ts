// Copy and image paths for /services/accessories. Photos are in /public/assets/photos (see public/assets/CREDITS.md).
import type { FaqGroup } from "@/components/services/Faq";
import type { Feature } from "@/components/services/FeatureIcons";
import { links } from "./links";
import { guarantee } from "./services-content";

export const accessoriesHero = {
  title: ["The details", "that finish", "the job"],
  subtitle: ["Gutters, guards, trim, shutters, vents and more,", "on their own or added to a bigger project."],
  image: "/assets/photos/accessories-hero.jpg",
  overlay: true,
};

export const accessoriesIntro = {
  eyebrow: "Exterior accessories",
  title: "Small parts that do a lot of work",
  text: "Gutters move water away from the foundation. Trim and capping protect the edges of the house. Vents let the attic breathe. We install these pieces on their own or alongside a roof, siding, window or door project, matched to the rest of the exterior.",
};

export const accessoriesFeatures: Feature[] = [
  {
    icon: "water",
    title: "Gutters and downspouts",
    text: "Sized and pitched for your roof, with downspouts placed to carry water away from the foundation.",
  },
  {
    icon: "lowMaintenance",
    title: "Gutter guards",
    text: "Covers that keep leaves and debris out of the gutters, so you clean them less often.",
  },
  {
    icon: "weather",
    title: "Soffit and fascia",
    text: "New soffit and fascia close up the roof edge against weather and pests, with vented soffit where the attic needs air.",
  },
  {
    icon: "style",
    title: "Trim and capping",
    text: "Window and door trim wrapped in low-maintenance capping, so wood edges stop needing paint every few years.",
  },
  {
    icon: "curb",
    title: "Shutters",
    text: "Decorative shutters in a range of styles and colors that add character to the front of the house.",
  },
  {
    icon: "wind",
    title: "Storm doors",
    text: "An extra layer in front of your entry door, with glass and screen options for different seasons.",
  },
  {
    icon: "comfort",
    title: "Window screens",
    text: "Replacement screens so you can open the windows for fresh air without letting the bugs in.",
  },
  {
    icon: "ventilation",
    title: "Attic and roof vents",
    text: "Ridge, roof and gable vents that help move heat and moisture out of the attic.",
  },
  {
    icon: "installers",
    title: "Matched to the house",
    text: "Colors and profiles chosen to match your roof, siding and windows, installed by the same crew.",
  },
];

export const accessoriesGuarantee = guarantee("/assets/photos/accessories-card.jpg");

export const accessoriesCta = {
  title: ["Finish the", "outside right"],
  text: "Tell us what you’d like to add or replace. We’ll take a look and send a written quote. No charge, no pressure.",
  label: "Get a free quote",
  href: links.quote,
  tone: "sky" as const,
};

export const accessoriesFaqs: FaqGroup[] = [
  {
    tab: "General",
    items: [
      {
        q: "Can I order accessories without a bigger project?",
        a: "Yes. We install gutters, guards, trim, shutters, storm doors, screens and vents on their own. They can also be added to a roof, siding, window or door project.",
      },
      {
        q: "Do gutter guards mean I never clean my gutters?",
        a: "No product makes gutters completely maintenance-free. Guards keep most leaves and debris out, so you clean less often, but it’s still worth checking them once or twice a year, especially under trees.",
      },
      {
        q: "Why should I add capping to my trim?",
        a: "Exposed wood trim around windows and doors needs regular painting and can rot where water sits. Capping covers it with a formed, weather-resistant material, so the edges stay clean and protected.",
      },
      {
        q: "How do I know my soffit and fascia need attention?",
        a: "Peeling paint, soft or rotted boards, sagging gutters, and signs of birds, bees or squirrels getting in along the roof edge are all signs it’s time to repair or replace them.",
      },
      {
        q: "Will new accessories match my house?",
        a: "We bring color samples and match them to your roof, siding and windows. If you’re doing a larger project with us, we order everything together so the colors line up.",
      },
    ],
  },
  {
    tab: "Process",
    items: [
      {
        q: "How long does an accessories job take?",
        a: "Most gutter, trim and shutter jobs take a day or less. Larger soffit and fascia work can take longer if we find rot behind it. Your written quote includes an expected schedule.",
      },
      {
        q: "Should I replace gutters with a new roof?",
        a: "Often it makes sense. Gutters usually have to come down for the new drip edge to be installed, and doing both together means one crew, one visit and one cleanup.",
      },
      {
        q: "What happens if you find rot behind the fascia?",
        a: "We show you the damage and explain the cost of repairing it before we do the work. We don’t cover rotted wood with new material.",
      },
    ],
  },
  {
    tab: "Cost & Warranty",
    items: [
      {
        q: "What affects the cost of accessories?",
        a: [
          "The amount of material, the height and access of the work area, the style and color you choose, and any repairs underneath. ",
          { label: "Request a free quote", href: links.quote },
          " and we’ll price each item separately.",
        ],
      },
      {
        q: "Are accessories covered by your warranty?",
        a: [
          "Yes. Products carry the manufacturer’s warranty, and our installation is covered by our written workmanship warranty. ",
          { label: "How our warranty works", href: links.warranty },
          ".",
        ],
      },
      {
        q: "Do you work in my area?",
        a: [
          "Check our ",
          { label: "service area", href: links.serviceArea },
          ". If you’re near the edge of it, ask anyway and we’ll tell you right away.",
        ],
      },
    ],
  },
];

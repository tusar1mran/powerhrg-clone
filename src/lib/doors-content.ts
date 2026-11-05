// Copy and image paths for /services/doors. Photos are in /public/assets/photos (see public/assets/CREDITS.md).
import type { FaqGroup } from "@/components/services/Faq";
import type { Feature } from "@/components/services/FeatureIcons";
import { links } from "./links";
import { guarantee } from "./services-content";

export const doorsHero = {
  title: ["Doors that", "close tight"],
  subtitle: ["Entry, storm and patio doors,", "fitted and adjusted until they swing true and seal."],
  image: "/assets/photos/doors-hero.jpg",
  overlay: true,
};

export const doorsIntro = {
  eyebrow: "Door replacement",
  title: "A door should open easily and seal every time",
  text: "Doors get used more than anything else on the outside of the house. We help you pick an entry, storm or patio door that suits your home, then set it plumb and level, seal it to the wall and adjust the hardware until it latches without a shove.",
};

export const doorsFeatures: Feature[] = [
  {
    icon: "style",
    title: "Fiberglass or steel",
    text: "Fiberglass resists dents and can look like wood. Steel is strong and affordable. Both come in many panel and glass styles.",
  },
  {
    icon: "curb",
    title: "Color and finish",
    text: "Painted colors or wood-look stains, with options for sidelites and transoms to bring light into the entry.",
  },
  {
    icon: "lock",
    title: "Locks and hardware",
    text: "Deadbolt and multipoint lock options, with handlesets in several finishes to match the rest of the house.",
  },
  {
    icon: "comfort",
    title: "Weatherstripping",
    text: "New weatherstripping and an adjustable threshold that close the gaps where drafts and water get in.",
  },
  {
    icon: "energy",
    title: "Insulated options",
    text: "Insulated door cores and glass, including ENERGY STAR certified options for your climate region.",
  },
  {
    icon: "weather",
    title: "Storm doors",
    text: "A storm door adds a layer against wind and rain, and many let you swap in a screen for a breeze in warm weather.",
  },
  {
    icon: "sun",
    title: "Patio doors",
    text: "Sliding doors that save floor space, or hinged doors that open wide. Both bring more daylight into the room.",
  },
  {
    icon: "measure",
    title: "Sized to the opening",
    text: "We measure the rough opening and the existing frame so the new door fits without oversized gaps or shims.",
  },
  {
    icon: "installers",
    title: "Set and adjusted",
    text: "Your crew lead checks the swing, latch and seal before we leave, and shows you how to adjust the threshold.",
  },
];

export const doorsGuarantee = guarantee("/assets/photos/doors-card.jpg");

export const doorsCta = {
  title: ["Sticking, drafty", "or worn out?"],
  text: "We’ll measure your doors, show you options and send a written quote. No charge, no pressure.",
  label: "Get a free quote",
  href: links.quote,
  tone: "oat" as const,
};

export const doorsFaqs: FaqGroup[] = [
  {
    tab: "General",
    items: [
      {
        q: "How do I know my door needs replacing?",
        a: "Daylight or drafts around the edges, a door that sticks or has to be forced to latch, rot at the bottom of the frame, dents or cracks in the slab, and fogged glass are the usual signs.",
      },
      {
        q: "Should I choose fiberglass or steel?",
        a: "Fiberglass resists dents, rust and swelling, and it can be stained to look like wood. Steel is strong, secure and usually costs less, but it can dent and needs its finish maintained to prevent rust.",
      },
      {
        q: "Do I need a storm door?",
        a: "Not every home needs one. A storm door protects your entry door from the weather and lets you use a screen in warm months. On doors that get strong direct sun, a storm door can trap heat, so we’ll talk about where it makes sense.",
      },
      {
        q: "Sliding or hinged patio door?",
        a: "Sliding doors don’t swing into the room, so they work well where space is tight. Hinged doors open wider and have a more traditional look. We’ll talk through how you use the space.",
      },
      {
        q: "What is a multipoint lock?",
        a: "A multipoint lock latches the door to the frame at several points along its edge with one turn of the handle or key, instead of just at the deadbolt. It can help the door seal evenly and resist being forced.",
      },
    ],
  },
  {
    tab: "Process",
    items: [
      {
        q: "How long does a door installation take?",
        a: "An entry door is usually installed in a day. Patio doors and doors with sidelites can take longer, especially if we find damage in the opening. Your written quote includes an expected schedule.",
      },
      {
        q: "Do you replace the frame too?",
        a: "Usually, yes. Most replacements are prehung units that include a new frame, so the door and frame are made to work together. We’ll check the opening for rot and repair it before the new unit goes in.",
      },
      {
        q: "What if my door is an unusual size?",
        a: "Many doors can be ordered in custom sizes. We’ll measure the opening at the estimate and tell you whether a standard size will fit or whether the opening needs to be adjusted.",
      },
      {
        q: "Will my house be open during the install?",
        a: "Only for part of the day. We remove the old door once the new one is on site and ready, and the opening is secured before the crew leaves.",
      },
    ],
  },
  {
    tab: "Cost & Warranty",
    items: [
      {
        q: "What affects the cost of a new door?",
        a: "The material, style and glass, sidelites or transoms, the hardware you choose, and any repairs needed in the opening.",
      },
      {
        q: "Does a more expensive door make my home more secure?",
        a: "The slab is only part of it. A solid frame, a reinforced strike plate and long screws that reach the wall framing matter just as much. We check those details on every door we install, whichever door you choose.",
      },
      {
        q: "What warranty comes with my door?",
        a: [
          "The door manufacturer’s warranty covers the product, and our written workmanship warranty covers the installation. ",
          { label: "How our warranty works", href: links.warranty },
          ".",
        ],
      },
    ],
  },
];

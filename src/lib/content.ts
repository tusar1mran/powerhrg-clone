// Navigation, footer and homepage copy live here so components stay presentational.
// Photos are in /public/assets/photos (see public/assets/CREDITS.md).
import type { ImageCard } from "@/components/ImageCardPair";
import { links, serviceLinks, type ServiceName } from "./links";
import { servicesHero } from "./services-content";
import { site } from "./site";

export type NavItem = { label: string; href: string };

// Site navigation is the sheet index in src/lib/sheets.ts (one numbered sheet per page).
// The quote button is shown in the header, the title block and the mobile call / quote bar.
export const headerCta = { label: "Request a free quote", href: links.quote };

export const serviceAreaBar = {
  text: `Free, no-obligation estimates across ${site.serviceArea}.`,
  link: { label: "Check your area", href: links.serviceArea },
};

export const homeHero = {
  title: ["Built right", "the first time"],
  subtitle: ["Windows, roofing, siding, doors and insulation,", "installed by a crew that treats your home like its own."],
  image: "/assets/photos/home-hero.jpg",
  overlay: true,
};

const serviceImages: Record<ServiceName, { image: string; text: string }> = {
  Windows: {
    image: "/assets/photos/windows-card.jpg",
    text: "Custom-measured replacement windows with insulated glass, sealed so the draft stops at the frame.",
  },
  Roofing: {
    image: "/assets/photos/roofing-card.jpg",
    text: "Full tear-off and a complete roof system, from the deck and underlayment to the ridge vent.",
  },
  Siding: {
    image: "/assets/photos/siding-card.jpg",
    text: "Vinyl, insulated vinyl or fiber cement over a properly wrapped wall, with matching trim.",
  },
  Doors: {
    image: "/assets/photos/doors-card.jpg",
    text: "Entry, storm and patio doors that swing true, lock firmly and seal against the weather.",
  },
  Insulation: {
    image: "/assets/photos/insulation-card.jpg",
    text: "Attic air sealing and blown-in insulation to keep conditioned air in the house and out of the attic.",
  },
  Accessories: {
    image: "/assets/photos/accessories-card.jpg",
    text: "Gutters, trim, shutters, vents and the other finishing pieces that protect the work.",
  },
};

export const services = serviceLinks.map((s) => ({ name: s.name, href: s.href, ...serviceImages[s.name] }));

export const processSection = {
  title: "How a project works",
  steps: [
    {
      title: "Free estimate",
      text: "We visit, measure, look for hidden problems like rot or leaks, and talk through your options.",
    },
    {
      title: "Written quote",
      text: "You get an itemized quote with products, scope, schedule and warranty, and time to decide.",
    },
    {
      title: "Installation",
      text: "Your crew lead runs the job on site, keeps the work area protected, and cleans up every day.",
    },
    {
      title: "Final walk-through",
      text: "We walk the finished work with you and fix anything that isn’t right before we call it done.",
    },
  ],
  cta: { label: "See each step", href: links.process },
};

export const trust = {
  title: "Proof you can check",
  text: "Any contractor can say they’re reliable. Here’s what we put in writing, so you don’t have to take our word for it.",
};

export const promise = {
  eyebrow: "Our",
  title: ["Crew", "promise"],
  paragraphs: [
    "Letting a crew work on your house takes trust. These are the commitments we make to every homeowner, whether the job is one window or the whole exterior.",
  ],
  cta: { label: "Read our promise", href: links.promise },
  items: [
    {
      title: "Straight answers",
      text: "We tell you what your house needs, what can wait, and what we’d do if it were ours. Sometimes that means a smaller job.",
    },
    {
      title: "No pressure",
      text: "Your quote is in writing and stays open while you decide. No “today only” prices and no pressure to sign at the kitchen table.",
    },
    {
      title: "Fair pricing",
      text: "Prices are based on the work and the materials. They don’t depend on who you are or what your house is worth.",
    },
    {
      title: "One point of contact",
      text: "Your crew lead is on site for the job and is the person you call with questions, from the first day to the last.",
    },
    {
      title: "On time",
      text: "We show up when we say we will. If weather or a delivery changes the plan, you’ll hear it from us first.",
    },
    {
      title: "Respect for your home",
      text: "We protect floors and landscaping, keep the site tidy, and clean up at the end of every day.",
    },
    {
      title: "Done means done",
      text: "We walk the finished job with you before we call it complete, and we fix anything that isn’t right.",
    },
    {
      title: "We come back",
      text: "If something we installed isn’t working as it should, call us. Our workmanship warranty is in writing.",
    },
  ],
};

export const homeCards: ImageCard[] = [
  {
    title: "About",
    image: "/assets/photos/about-story.jpg",
    text: "Who we are, how we work, and the promise we make on every job.",
    cta: "About Shah & Crew",
    href: links.about,
  },
  {
    title: "Support",
    image: "/assets/photos/guarantee.jpg",
    text: "Warranty, licenses, how a project works, and answers to common questions.",
    cta: "Get support",
    href: links.support,
  },
];

export const homeCta = {
  title: ["Let’s take a look"],
  text: "Book a free estimate. We’ll measure, talk through your options and send a written quote. There’s no charge and no pressure.",
  label: "Get a free quote",
  href: links.quote,
  tone: "charcoal" as const,
};

export const footerColumns: { heading: string; links: NavItem[] }[] = [
  {
    heading: "Services",
    links: [{ label: "All Services", href: links.services }, ...serviceLinks.map((s) => ({ label: s.name, href: s.href }))],
  },
  {
    heading: "Company",
    links: [
      { label: "About Us", href: links.about },
      { label: "Our Promise", href: links.promise },
      { label: "Service Area", href: links.serviceArea },
      { label: "Get Support", href: links.support },
      { label: "Warranty", href: links.warranty },
      { label: "Licenses & Insurance", href: links.licenses },
    ],
  },
];

// ---------------------------------------------------------------------------------------------
// Cover sheet (A-000): the homepage drawn as the first sheet of a construction drawing set.
// Everything below reuses the homepage copy above; only the sheet labels are new.
// ---------------------------------------------------------------------------------------------

const serviceNames = serviceLinks.map((s) => s.name);

export const coverSheet = {
  kicker: `Project · ${site.tagline}`,
  title: homeHero.title,
  subtitle: homeHero.subtitle,
  projectData: [
    { label: "Contractor", value: site.name },
    { label: "Scope", value: serviceNames.join(" · ") },
    { label: "Service area", value: site.serviceArea },
    { label: "Estimate", value: "Free, no obligation" },
  ],
  elevation: {
    title: "Front elevation · key plan",
    hint: "Each callout opens the sheet for that part of the house.",
    description:
      "Line drawing of the front of a two-storey house with a hip roof, lap siding, double-hung windows, a covered front door, gutters and downspouts. Dashed hidden lines show insulation on the attic floor. Callouts point to the roof, windows, siding, door, attic insulation and gutters.",
  },
  photo: {
    src: "/assets/photos/home-hero.jpg",
    width: 2400,
    height: 1600,
    alt: "Blue craftsman-style house with a two-car garage at dusk",
    caption: "Photo ref. 01 · Exterior at dusk",
  },
};

export const coverSections = {
  index: { label: "Sheet index", title: "One set of drawings for the whole outside", ref: "A-000 / 01" },
  notes: { label: "General notes", ref: "A-000 / 02" },
  sequence: { label: "Sequence of work", ref: "A-000 / 03" },
  trust: { label: "Title block", ref: "A-000 / 04" },
  workOrder: { label: "Work order", ref: "A-000 / 05" },
};

/** Text for the general (non-service) sheets in the homepage sheet index. */
export const generalSheetText: Record<"services" | "about" | "support", string> = {
  services: servicesHero.subtitle.join(" "),
  about: homeCards[0].text,
  support: homeCards[1].text,
};

export const notesPhoto = {
  src: "/assets/photos/about-story.jpg",
  width: 1600,
  height: 1067,
  alt: "Hands measuring a board with a steel rule on a workbench",
  caption: "Photo ref. 02 · Measure before you cut",
};

export const homeWorkOrder = {
  title: homeCta.title.join(" "),
  text: homeCta.text,
  action: { label: homeCta.label, href: homeCta.href },
  fields: [
    { label: "Type", value: "Free estimate" },
    { label: "Scope", value: serviceNames.join(" · ") },
    { label: "You receive", value: "Written quote" },
    { label: "Charge", value: "No charge, no pressure" },
  ],
};

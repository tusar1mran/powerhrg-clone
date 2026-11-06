// Navigation, footer and homepage copy live here so components stay presentational.
// Photos are in /public/assets/photos (see public/assets/CREDITS.md).
import type { ImageCard } from "@/components/ImageCardPair";
import { links, serviceLinks, type ServiceName } from "./links";
import { site } from "./site";

export type NavItem = { label: string; href: string };
export type NavGroup = { label: string; items: NavItem[] };
/** A top-level entry is either a dropdown group or a single link. */
export type NavEntry = NavGroup | NavItem;

export const isNavGroup = (entry: NavEntry): entry is NavGroup => "items" in entry;

// Top navigation. Groups open a dropdown on click (not hover); plain links go straight to their page.
export const navMenu: NavEntry[] = [
  {
    label: "Services",
    items: [{ label: "All Services", href: links.services }, ...serviceLinks.map((s) => ({ label: s.name, href: s.href }))],
  },
  { label: "About", href: links.about },
  { label: "Support", href: links.support },
];

// Shown in the header search panel before the visitor types anything.
export const topSearches: NavItem[] = [
  { label: "Get a Free Quote", href: links.quote },
  { label: "View All Services", href: links.services },
  { label: "Warranty", href: links.warranty },
  { label: "Licenses & Insurance", href: links.licenses },
  { label: "About Shah & Crew", href: links.about },
];

// Everything the header search can find: services plus the main sections of /about and /support.
export const searchIndex: NavItem[] = [
  { label: "All Services", href: links.services },
  ...serviceLinks.map((s) => ({ label: s.name, href: s.href })),
  { label: "About Shah & Crew", href: links.about },
  { label: "Our Promise", href: links.promise },
  { label: "Service Area", href: links.serviceArea },
  { label: "Get Support", href: links.support },
  { label: "Get a Free Quote", href: links.quote },
  { label: "How It Works", href: links.process },
  { label: "Warranty", href: links.warranty },
  { label: "Licenses & Insurance", href: links.licenses },
];

export const headerCta = { label: "Get a free quote", href: links.quote };

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

// Copy and image paths for /about. Photos are in /public/assets/photos (see public/assets/CREDITS.md).
import type { FaqGroup } from "@/components/services/Faq";
import type { Value } from "@/components/about/Values";
import { links } from "./links";
import { site } from "./site";

export const aboutHero = {
  title: ["Good work", "is personal"],
  subtitle: [
    "Shah & Crew is an exterior renovation company built on a simple idea:",
    "do the job right, say what you mean, and stand behind the work.",
  ],
  image: "/assets/photos/about-hero.jpg",
  overlay: true,
};

export const aboutStory = {
  eyebrow: "How we work",
  title: ["The crew", "you meet", "is the crew", "that builds"],
  paragraphs: [
    "When you call Shah & Crew, you deal with the people who will actually do the work. The person who measures your house understands how it will be built, and your crew lead stays with the job from the first day to the walk-through.",
    "We keep the work focused on the outside of the house: windows, roofs, siding, doors, insulation and the details that tie them together. Sticking to what we know is how we keep quality consistent from one job to the next.",
  ],
  image: "/assets/photos/about-story.jpg",
  imageAlt: "Measuring a board on a workbench",
};

export const aboutValues: { title: string[]; text: string; values: Value[] } = {
  title: ["What we", "hold ourselves to"],
  text: "These aren’t slogans on a wall. They decide how we quote, how we build, and how we handle it when something goes wrong.",
  values: [
    {
      title: "Honesty",
      icon: "honesty",
      text: "We tell you what we see, including when the right answer is a repair, a smaller job, or no job at all.",
    },
    {
      title: "Care",
      icon: "care",
      text: "We treat your home, your yard and your time the way we’d want ours treated.",
    },
    {
      title: "Craft",
      icon: "craft",
      text: "We follow manufacturer instructions and local code, and we take the time to do the parts no one sees.",
    },
    {
      title: "Communication",
      icon: "communication",
      text: "You’ll know who is coming, when they’re coming and what they’re doing. If a plan changes, you’ll hear it from us first.",
    },
    {
      title: "Fairness",
      icon: "fairness",
      text: "Clear, itemized prices based on the work. No inflated “list price” and no pressure to sign today.",
    },
  ],
};

export const serviceArea = {
  id: "service-area",
  title: ["Where we work"],
  text: `We work with homeowners across ${site.serviceArea}.\nNot sure if your home is in our area? Send us your ZIP code and we’ll let you know.`,
  label: "Check my address",
  href: links.quote,
  tone: "white" as const,
};

export const aboutCta = {
  title: ["Meet your crew"],
  text: "Book a free estimate and see how we work before you commit to anything.",
  label: "Get a free quote",
  href: links.quote,
  tone: "navy" as const,
};

export const aboutFaqs: FaqGroup[] = [
  {
    tab: "General",
    items: [
      {
        q: "What does Shah & Crew do?",
        a: [
          "We renovate the outside of the house: replacement windows, roof replacement, siding, entry and patio doors, attic insulation, and accessories like gutters, trim and shutters. ",
          { label: "See all services", href: links.services },
          ".",
        ],
      },
      {
        q: "Do you use subcontractors?",
        a: "Our own crew handles the work and stays responsible for it from start to finish. If a job ever needs a specialist trade, such as an electrician, we’ll tell you in your quote, and we stay your single point of contact.",
      },
      {
        q: "Are you licensed and insured?",
        a: [
          `Yes. We hold a ${site.license.state} ${site.license.type} license (${site.license.number}) and carry ${site.insurance.toLowerCase()}. `,
          { label: "See license and insurance details", href: links.licenses },
          ".",
        ],
      },
      {
        q: "What areas do you serve?",
        a: [
          `We work across ${site.serviceArea}. `,
          { label: "Send us your ZIP code", href: links.quote },
          " if you’re not sure.",
        ],
      },
    ],
  },
  {
    tab: "Working with us",
    items: [
      {
        q: "What makes you different from other contractors?",
        a: "You deal with the people doing the work, you get everything in writing, and you sign off on the finished job before the final payment. We’d rather lose a sale than sell you something your house doesn’t need.",
      },
      {
        q: "Will you pressure me to sign?",
        a: "No. Your quote is written and itemized, and it stays open while you think it over, compare other quotes, or talk it through with your family.",
      },
      {
        q: "What if something goes wrong after the job?",
        a: [
          "Call us. Our workmanship warranty is in writing, and we come back to fix anything we installed that isn’t working as it should. ",
          { label: "How our warranty works", href: links.warranty },
          ".",
        ],
      },
    ],
  },
];

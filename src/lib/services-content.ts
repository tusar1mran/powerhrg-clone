// Copy and image paths for /services, plus the warranty block shared by every service page.
// Photos live in /public/assets/photos (see public/assets/CREDITS.md).
import type { FaqGroup } from "@/components/services/Faq";
import type { ImageCard } from "@/components/ImageCardPair";
import { links } from "./links";

export const servicesHero = {
  title: ["One crew", "for the whole", "outside"],
  subtitle: ["Windows, roofing, siding, doors and insulation,", "quoted together and installed by the same team."],
  image: "/assets/photos/services-hero.jpg",
};

export const sameAddress = {
  title: ["Same house", "Better everything"],
  text: "Most exterior problems don’t stay in one place. A tired roof lets water into the siding, and leaky windows make the furnace work harder. Because we handle the whole envelope of the house, we can look at it as one system, tell you what actually needs attention now, and what can wait.",
  image: "/assets/photos/services-sky.jpg",
};

export const reasons: ImageCard[] = [
  {
    title: "Licensed",
    image: "/assets/photos/card-licenses.jpg",
    text: "We’re licensed and insured, and we pull the permits your project needs. Our license number is on every quote so you can look it up yourself.",
    cta: "See licenses & insurance",
    href: links.licenses,
  },
  {
    title: "Warranty",
    image: "/assets/photos/card-warranty.jpg",
    text: "Your products carry the manufacturer’s warranty, and our installation is covered by a written workmanship warranty from us.",
    cta: "How our warranty works",
    href: links.warranty,
  },
];

export const servicesCta = {
  title: ["Not sure where", "to start?"],
  text: "Tell us what’s bothering you about the house. We’ll come out, take a look and give you a written quote. No charge, no pressure.",
  label: "Get a free quote",
  href: links.quote,
};

export const faqs: FaqGroup[] = [
  {
    tab: "General",
    items: [
      {
        q: "What services does Shah & Crew offer?",
        a: "We replace and install windows, asphalt shingle roofs, siding, entry and patio doors, and attic insulation. We also handle the finishing pieces that go with them, such as gutters, trim, shutters and storm doors.",
      },
      {
        q: "Do you work in my area?",
        a: [
          "Check our ",
          { label: "service area", href: links.serviceArea },
          ". If you’re close to the edge of it, ask anyway. We’ll tell you straight away whether we can take the job.",
        ],
      },
      {
        q: "Can you do more than one project at the same time?",
        a: "Yes. Combining work, such as a roof with new gutters or siding with new windows, often saves time and avoids paying for the same prep work twice. We’ll quote each part separately so you can decide what to do now and what to leave for later.",
      },
      {
        q: "How do I know whether to repair or replace?",
        a: "If the problem is limited to one area and the rest is in good shape, a repair is usually the better value. Widespread wear, repeated leaks, or a product near the end of its life usually make replacement the better long-term choice. We’ll tell you which one we’d pick if it were our house.",
      },
      {
        q: "How should I compare quotes from different contractors?",
        a: "Compare the same scope of work, not just the total. Check the products and their warranties, whether removal, disposal and permits are included, the workmanship warranty, and the contractor’s license and insurance. A lower price that leaves out any of these isn’t really lower.",
      },
    ],
  },
  {
    tab: "Process",
    items: [
      {
        q: "Is the estimate really free?",
        a: [
          "Yes. We visit, measure, talk through options and send you a written quote. There’s no charge and no obligation. ",
          { label: "Request a free quote", href: links.quote },
          ".",
        ],
      },
      {
        q: "How long does a typical project take?",
        a: "Most window, door and roofing projects take one to three days on site. Siding usually takes a few days to a week, depending on the size of the house. Your written quote includes an expected schedule, and weather can move it.",
      },
      {
        q: "Who will be working on my house?",
        a: "Our own crew does the work, led by a crew lead who is on site for the whole job. You’ll know who is coming before they arrive, and you’ll have one person to call with questions.",
      },
      {
        q: "Do you handle permits and HOA approvals?",
        a: "We pull the building permits the job requires. If you have an HOA, we’ll give you product details, colors and drawings for your application, and we won’t start until it’s approved.",
      },
    ],
  },
  {
    tab: "Warranty",
    items: [
      {
        q: "What warranty do I get?",
        a: [
          "Two layers: the manufacturer’s warranty on the products, and our written workmanship warranty on the installation. See ",
          { label: "how our warranty works", href: links.warranty },
          ".",
        ],
      },
    ],
  },
];

// Warranty block shown on every service page; only the photo changes.
export const guarantee = (image: string) => ({
  eyebrow: "Warranty",
  title: ["Our name", "on the work"],
  text: "Every installation comes with our written workmanship warranty, on top of the manufacturer’s warranty on the products. If something we installed isn’t right, call us and we’ll come back and fix it.",
  cta: "How our warranty works",
  href: links.warranty,
  image,
});

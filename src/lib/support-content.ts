// Copy and image paths for /support. Photos are in /public/assets/photos (see public/assets/CREDITS.md).
// Section ids here must match the anchors in links.ts (#process, #warranty, #licenses, #quote).
import type { FaqGroup } from "@/components/services/Faq";
import { links } from "./links";
import { site } from "./site";

export const supportIntro = {
  title: "How can we help?",
  text: "Find answers about estimates, scheduling, warranty and service, or send us a message and a real person will get back to you.",
};

export const contactOptions = {
  phone: { title: "Call us", text: site.hours.join(" · ") },
  email: { title: "Email us", text: "We reply within one business day." },
  quote: { title: "Request a quote", text: "Tell us about your project and we’ll set up a free estimate.", label: "Start here" },
};

export const supportFaqs: FaqGroup[] = [
  {
    tab: "Estimates",
    items: [
      {
        q: "How do I book a free estimate?",
        a: [
          { label: "Fill out the form", href: links.quote },
          ` below or call us at ${site.phone.display}. We’ll confirm a time that works for you, usually within one business day.`,
        ],
      },
      {
        q: "What happens during the estimate?",
        a: "We look at the area you’re concerned about, take measurements and photos, check for hidden problems like rot or leaks, and talk through product options. Most visits take about an hour. You’ll get a written, itemized quote afterward.",
      },
      {
        q: "Do all owners need to be there?",
        a: "We recommend it. It means everyone hears the same information and can ask their own questions, and nobody has to relay details secondhand. If that isn’t possible, we can go over the quote again by phone.",
      },
      {
        q: "How long is my quote good for?",
        a: "The expiration date is printed on your quote. Material prices change, so after that date we’ll confirm the price before we schedule the work.",
      },
    ],
  },
  {
    tab: "Your project",
    items: [
      {
        q: "What happens after I sign?",
        a: [
          "We order your materials, pull any permits, and schedule your installation. Your crew lead confirms the date and what to expect before work starts. ",
          { label: "See each step", href: links.process },
          ".",
        ],
      },
      {
        q: "Who do I call with questions during the job?",
        a: `Your crew lead, who is on site for the job. You can also reach the office at ${site.phone.display} or ${site.email}.`,
      },
      {
        q: "What if the weather changes the schedule?",
        a: "Some work, roofing especially, can’t be done safely in rain, high wind or extreme cold. If we need to move a date, we’ll call you as early as we can, and we’ll never leave your home open to the weather overnight.",
      },
      {
        q: "Can I cancel my contract?",
        a: "Your contract explains your right to cancel, including the time limit set by law for home improvement contracts signed at your home. If you want to cancel, contact us in writing as described in your contract.",
      },
    ],
  },
  {
    tab: "Warranty & service",
    items: [
      {
        q: "What does the warranty cover?",
        a: [
          "Products are covered by their manufacturers’ warranties. Our installation is covered by our written workmanship warranty. ",
          { label: "How our warranty works", href: links.warranty },
          ".",
        ],
      },
      {
        q: "How do I request service?",
        a: `Call us at ${site.phone.display} or email ${site.email} with your name, address and a short description. Photos help. We’ll schedule a visit, and if it’s covered there’s no charge.`,
      },
      {
        q: "Is my information kept private?",
        a: [
          "We use your information to respond to you and do your project, and we never sell it. ",
          { label: "Read our Privacy Notice", href: links.privacy },
          ".",
        ],
      },
    ],
  },
];

export const warranty = {
  id: "warranty",
  eyebrow: "Warranty",
  title: ["Two layers", "of coverage"],
  paragraphs: [
    "Every job is covered twice. The products we install carry their manufacturers’ warranties, and our installation is covered by our written workmanship warranty.",
    "You get copies of both with your project paperwork. If something we installed isn’t working as it should, call us and we’ll come back to look at it.",
  ],
  bulletsLabel: "To make a warranty claim:",
  bullets: [
    `Call ${site.phone.display} or email ${site.email}`,
    "Tell us your address and what you’re seeing; photos help",
    "We schedule a visit and explain what’s covered before any work",
  ],
  image: "/assets/photos/card-warranty.jpg",
  imageAlt: "Finished house exterior",
  imageSide: "left" as const,
  tone: "white" as const,
};

export const licenses = {
  id: "licenses",
  eyebrow: "Licenses & insurance",
  title: ["Licensed,", "insured,", "permitted"],
  paragraphs: [
    "Hiring a licensed and insured contractor protects you if something goes wrong. We’re happy to show you the paperwork before you sign anything.",
  ],
  bullets: [
    `${site.license.state} ${site.license.type} license: ${site.license.number}`,
    site.insurance,
    "Certificate of insurance available on request",
    "Building permits pulled and inspections scheduled for the work that requires them",
  ],
  cta: site.license.lookupUrl
    ? { label: "Verify our license", href: site.license.lookupUrl, external: true }
    : { label: "Ask for our certificate", href: links.quote },
  image: "/assets/photos/card-licenses.jpg",
  imageAlt: "Signing paperwork on a clipboard",
  imageSide: "right" as const,
  tone: "sand" as const,
};

export const contactForm = {
  id: "quote",
  title: "Get a free quote",
  intro: "Tell us a little about your home and what you need. We’ll get back to you within one business day to set up a time.",
  consent:
    "I agree that Shah & Crew may contact me by phone, text or email about this request. Message and data rates may apply. Consent is not a condition of purchase. Reply STOP to opt out of texts.",
  submit: "Send request",
  success: {
    title: "Thanks, we’ve got it",
    text: "Your request is on its way to our office. We’ll be in touch within one business day.",
  },
};

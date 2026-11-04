// Business details used across the site: header, footer, contact, legal pages and metadata.
// Every value marked PLACEHOLDER must be replaced with the real detail before launch.
// Fields that are empty strings or empty arrays are hidden by the components that use them.

export type SocialLink = { name: string; href: string };

export type SiteConfig = {
  name: string;
  /** Registered business name for legal pages and the copyright line. */
  legalName: string;
  tagline: string;
  description: string;
  /** Public origin used for absolute URLs in metadata (no trailing slash). */
  url: string;
  serviceArea: string;
  phone: { display: string; href: string };
  email: string;
  address: string[];
  hours: string[];
  license: {
    /** e.g. "Home Improvement Contractor" */
    type: string;
    number: string;
    state: string;
    /** State license lookup page so homeowners can verify the number themselves. */
    lookupUrl: string;
  };
  insurance: string;
  socials: SocialLink[];
};

export const site: SiteConfig = {
  name: "Shah & Crew",
  legalName: "Shah & Crew", // PLACEHOLDER: registered name, e.g. "Shah & Crew LLC"
  tagline: "Exterior home renovation",
  description:
    "Windows, roofing, siding, entry doors and attic insulation, installed by a licensed and insured crew with a written workmanship warranty.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  serviceArea: "[Service area]", // PLACEHOLDER: e.g. "Greater Philadelphia and South Jersey"
  phone: {
    display: "(555) 010-0100", // PLACEHOLDER: 555-01xx numbers are reserved and never connect
    href: "tel:+15550100100", // PLACEHOLDER
  },
  email: "hello@example.com", // PLACEHOLDER
  address: ["[Street address]", "[City, State ZIP]"], // PLACEHOLDER: or [] to show service area only
  hours: ["Mon–Fri: 8am–6pm", "Sat: 9am–2pm"], // PLACEHOLDER
  license: {
    type: "Home Improvement Contractor", // PLACEHOLDER
    number: "[License number]", // PLACEHOLDER
    state: "[State]", // PLACEHOLDER
    lookupUrl: "", // PLACEHOLDER: state license lookup URL, hidden while empty
  },
  insurance: "General liability and workers’ compensation insurance", // PLACEHOLDER: match the actual policies
  socials: [], // e.g. { name: "Instagram", href: "https://www.instagram.com/..." }
};

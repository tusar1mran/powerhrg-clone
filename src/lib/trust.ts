// Verifiable commitments in place of reviews or awards: each one is something a homeowner can check
// or will see in writing. License details come from site.ts.
import { links } from "./links";
import { site } from "./site";

export type TrustPointId = "licensed" | "insured" | "permitted" | "quoted" | "warranted" | "signedOff";

export type TrustLink = { label: string; href: string; external?: boolean };

export type TrustPoint = { id: TrustPointId; title: string; text: string; link?: TrustLink };

export const trustPoints: TrustPoint[] = [
  {
    id: "licensed",
    title: "Licensed",
    text: `${site.license.state} ${site.license.type} license ${site.license.number}. It’s printed on every quote and contract.`,
    link: site.license.lookupUrl
      ? { label: "Look it up", href: site.license.lookupUrl, external: true }
      : { label: "License details", href: links.licenses },
  },
  {
    id: "insured",
    title: "Insured",
    text: `${site.insurance}. Ask for a certificate of insurance before work starts and we’ll send it.`,
    link: { label: "Insurance details", href: links.licenses },
  },
  {
    id: "permitted",
    title: "Permitted",
    text: "We pull the permits your job requires and schedule the inspections, so the work is on record with your town.",
  },
  {
    id: "quoted",
    title: "Quoted in writing",
    text: "An itemized quote with products, scope and schedule. The price on paper is the price you pay unless you change the scope.",
  },
  {
    id: "warranted",
    title: "Warranted in writing",
    text: "Manufacturer warranties on products, plus our own written workmanship warranty on the installation.",
    link: { label: "How our warranty works", href: links.warranty },
  },
  {
    id: "signedOff",
    title: "Signed off by you",
    text: "You walk the finished job with your crew lead before the final payment. Anything that isn’t right gets fixed first.",
  },
];

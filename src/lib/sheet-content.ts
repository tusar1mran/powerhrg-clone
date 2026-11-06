// Labels for the drawing-sheet frame shared by every page: header, sheet index, title block,
// footer strip and the mobile call / quote bar. Business details come from site.ts.
import { headerCta } from "./content";
import { links } from "./links";
import { site } from "./site";

export const sheetSetLabel = `${site.tagline} · Drawing set`;

export const quoteAction = { label: headerCta.label, href: headerCta.href };

export const callAction = { label: "Call", href: site.phone.href, display: site.phone.display };

export const sheetIndexLabels = {
  heading: "Sheet index",
  menuOpen: "Open sheet index",
  menuDescription: "Every page of the site, numbered like a set of construction drawings.",
};

export const titleBlockLabels = {
  contractor: "Contractor",
  project: "Project",
  license: "License",
  insurance: "Insurance",
  warranty: "Warranty",
  contact: "Call the office",
  sheetTitle: "Sheet title",
  sheetNumber: "Sheet",
};

export const titleBlockWarranty = {
  text: "Written workmanship warranty on every installation, on top of the manufacturer’s warranty.",
  link: { label: "How it works", href: links.warranty },
};

export const titleBlockLicenseLink = site.license.lookupUrl
  ? { label: "Verify license", href: site.license.lookupUrl, external: true }
  : { label: "License details", href: links.licenses, external: false };

export const footerLabels = {
  office: "Office",
  hours: "Hours",
  email: "Email",
  details: "Details",
  legal: "Legal",
  rights: "All rights reserved.",
};

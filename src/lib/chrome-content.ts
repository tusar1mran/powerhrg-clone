// Copy for the site-wide header, footer and mobile call / quote bar of the "Your House" concept.
// Links come from links.ts and business details from site.ts, so nothing here is hardcoded twice.
import { footerColumns, headerCta } from "./content";
import { houseParts } from "./house/parts";
import { links } from "./links";
import { site } from "./site";

export type ChromeLink = { label: string; href: string };
/** A service in the menus, numbered and located as on the homepage house drawing. */
export type ServiceNavLink = ChromeLink & { number: string; location: string };

export const skipLinkLabel = "Skip to main content";

export const headerNav = {
  label: "Main",
  services: {
    label: "Services",
    all: { label: "All services", href: links.services },
    items: houseParts.map(
      (part): ServiceNavLink => ({ label: part.name, href: part.href, number: part.number, location: part.location }),
    ),
  },
  links: [
    { label: "About", href: links.about },
    { label: "Support", href: links.support },
  ] satisfies ChromeLink[],
};

/** Serializable header navigation, passed from the server header to the client menus. */
export type HeaderNav = typeof headerNav;

export const headerActions = {
  homeLabel: `${site.name}, back to the homepage`,
  call: {
    label: `Call ${site.phone.display}`,
    display: site.phone.display,
    href: site.phone.href,
  },
  quote: { label: headerCta.label, href: headerCta.href },
  menu: {
    open: "Open menu",
    title: "Menu",
    description: `${site.tagline} across ${site.serviceArea}.`,
    close: "Close menu",
  },
};

export type HeaderActions = typeof headerActions;

export const mobileBar = {
  label: "Call or get a quote",
  call: { label: "Call", href: site.phone.href, srLabel: `Call ${site.phone.display}` },
  quote: { label: "Free quote", href: links.quote },
};

export const footerContent = {
  tagline: `${site.tagline} for homeowners across ${site.serviceArea}.`,
  columns: footerColumns,
  contactHeading: "Contact",
  quote: { label: headerCta.label, href: headerCta.href },
  license: `${site.license.state} ${site.license.type} License ${site.license.number}. Licensed and insured.`,
  legalLinks: [
    { label: "Privacy Notice", href: links.privacy },
    { label: "Terms of Service", href: links.terms },
  ] satisfies ChromeLink[],
  rights: "All rights reserved.",
};

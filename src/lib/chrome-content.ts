// Copy for the redesigned site chrome: the global header, mobile navigation, footer and the mobile
// Call / Quote bar. Links and business details come from links.ts, content.ts and site.ts, so
// this file only holds the words that belong to the chrome itself.
import { footerColumns, headerCta, homeHero, type NavItem } from "./content";
import { links, serviceLinks } from "./links";
import { site } from "./site";

/** Top-level links in the header. Services are listed one by one in the mobile menu instead. */
export const primaryNav: NavItem[] = [
  { label: "Services", href: links.services },
  { label: "About", href: links.about },
  { label: "Support", href: links.support },
];

export const headerChrome = {
  homeLabel: `${site.name}, back to the homepage`,
  navLabel: "Main",
  callLabel: `Call ${site.name} at ${site.phone.display}`,
  quote: headerCta,
  menu: {
    open: "Open menu",
    title: "Menu",
    description: `${site.tagline}. Pick a service, or call or request a free quote.`,
    servicesHeading: "Services",
    allServices: { label: "All services", href: links.services },
    services: serviceLinks.map((service) => ({ label: service.name, href: service.href })),
    companyHeading: "Company",
    company: [
      { label: "About", href: links.about },
      { label: "Support", href: links.support },
      { label: "Warranty", href: links.warranty },
    ],
  },
};

export const skipLink = { label: "Skip to main content", href: "#main" };

export const mobileActionBar = {
  label: "Call or request a quote",
  call: { label: "Call", srLabel: `Call ${site.phone.display}`, href: site.phone.href },
  quote: { label: "Free quote", href: links.quote },
};

export const footerChrome = {
  // The brand line from the homepage hero, repeated as the footer sign-off.
  statement: homeHero.title,
  blurb: `${site.tagline} for homeowners across ${site.serviceArea}.`,
  columns: footerColumns,
  contactHeading: "Contact",
  quote: headerCta,
  legalLinks: [
    { label: "Privacy Notice", href: links.privacy },
    { label: "Terms of Service", href: links.terms },
  ],
  licenseLine: `${site.license.state} ${site.license.type} License ${site.license.number}. Licensed and insured.`,
  rights: "All rights reserved.",
};

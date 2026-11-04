// Internal links in one place, so section anchors on /support and /about stay in sync with the copy.

export const links = {
  home: "/",
  services: "/services",
  about: "/about",
  promise: "/about#promise",
  serviceArea: "/about#service-area",
  support: "/support",
  quote: "/support#quote",
  process: "/support#process",
  warranty: "/support#warranty",
  licenses: "/support#licenses",
  privacy: "/privacy-notice",
  terms: "/terms-of-service",
} as const;

export const serviceLinks = [
  { name: "Windows", href: "/services/windows" },
  { name: "Roofing", href: "/services/roofing" },
  { name: "Siding", href: "/services/siding" },
  { name: "Doors", href: "/services/doors" },
  { name: "Insulation", href: "/services/insulation" },
  { name: "Accessories", href: "/services/accessories" },
] as const;

export type ServiceName = (typeof serviceLinks)[number]["name"];

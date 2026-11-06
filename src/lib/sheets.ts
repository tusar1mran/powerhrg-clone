// The site as a drawing set: every page is a numbered sheet. The sheet index (header, mobile menu,
// homepage index) and each page's title block read from here, so numbers and titles stay in sync.
// URLs come from links.ts; this file only adds the sheet numbering on top of them.
import { links, serviceLinks, type ServiceName } from "./links";

export type SheetId =
  | "cover"
  | "services"
  | "windows"
  | "roofing"
  | "siding"
  | "doors"
  | "insulation"
  | "accessories"
  | "about"
  | "support"
  | "privacy"
  | "terms";

/** "A" sheets cover the house itself, "G" sheets are general information about the company. */
export type SheetDiscipline = "Architectural" | "General";

export type SheetEntry = {
  id: SheetId;
  /** Sheet number as printed in the title block, e.g. "A-200". */
  number: string;
  title: string;
  href: string;
  discipline: SheetDiscipline;
};

const serviceSheetNumbers: Record<ServiceName, string> = {
  Windows: "A-100",
  Roofing: "A-200",
  Siding: "A-300",
  Doors: "A-400",
  Insulation: "A-500",
  Accessories: "A-600",
};

const serviceSheetIds: Record<ServiceName, SheetId> = {
  Windows: "windows",
  Roofing: "roofing",
  Siding: "siding",
  Doors: "doors",
  Insulation: "insulation",
  Accessories: "accessories",
};

export const serviceSheets: (SheetEntry & { service: ServiceName })[] = serviceLinks.map((s) => ({
  id: serviceSheetIds[s.name],
  number: serviceSheetNumbers[s.name],
  title: s.name,
  href: s.href,
  discipline: "Architectural",
  service: s.name,
}));

const cover: SheetEntry = {
  id: "cover",
  number: "A-000",
  title: "Cover",
  href: links.home,
  discipline: "Architectural",
};

const services: SheetEntry = {
  id: "services",
  number: "A-001",
  title: "All services",
  href: links.services,
  discipline: "Architectural",
};

const about: SheetEntry = {
  id: "about",
  number: "G-001",
  title: "About",
  href: links.about,
  discipline: "General",
};

const support: SheetEntry = {
  id: "support",
  number: "G-002",
  title: "Support",
  href: links.support,
  discipline: "General",
};

const privacy: SheetEntry = {
  id: "privacy",
  number: "G-901",
  title: "Privacy notice",
  href: links.privacy,
  discipline: "General",
};

const terms: SheetEntry = {
  id: "terms",
  number: "G-902",
  title: "Terms of service",
  href: links.terms,
  discipline: "General",
};

/** The sheet index shown in the header and the mobile menu, in drawing-set order. */
export const sheetIndex: SheetEntry[] = [cover, services, ...serviceSheets, about, support];

/** Legal sheets are part of the set but are only linked from the footer. */
export const legalSheets: SheetEntry[] = [privacy, terms];

const allSheets: SheetEntry[] = [...sheetIndex, ...legalSheets];

export const sheets = Object.fromEntries(allSheets.map((s) => [s.id, s])) as Record<SheetId, SheetEntry>;

/** Total sheets in the set, for "Sheet 4 of 12" in the title block. */
export const sheetCount = allSheets.length;

/** 1-based position of a sheet in the set. */
export function sheetPosition(id: SheetId): number {
  return allSheets.findIndex((s) => s.id === id) + 1;
}

/** Looks up a service's sheet, e.g. for "See A-600" cross-references. */
export function serviceSheet(name: ServiceName): SheetEntry {
  return sheets[serviceSheetIds[name]];
}

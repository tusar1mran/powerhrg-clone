// Builds and parses the `?service=` query used to pre-fill the free-quote form, e.g.
// /support?service=roofing&service=windows#quote. The query string is untrusted input, so the
// parser only accepts known service slugs and ignores everything else.
import { z } from "zod";
import { links, serviceLinks, type ServiceName } from "../links";

export const QUOTE_SERVICE_PARAM = "service";

/** URL-safe slug for each service. Kept explicit so a renamed service can't silently change URLs. */
export const serviceSlugByName = {
  Windows: "windows",
  Roofing: "roofing",
  Siding: "siding",
  Doors: "doors",
  Insulation: "insulation",
  Accessories: "accessories",
} as const satisfies Record<ServiceName, string>;

export type ServiceSlug = (typeof serviceSlugByName)[ServiceName];

const serviceNameBySlug = Object.fromEntries(
  serviceLinks.map((service) => [serviceSlugByName[service.name], service.name]),
) as Record<ServiceSlug, ServiceName>;

const slugSchema = z.enum(serviceSlugByName);

/** Upper bounds that keep a hostile URL from making the parser do unbounded work. */
const MAX_PARAM_VALUES = 12;
const MAX_VALUE_LENGTH = 120;

const serviceOrder = new Map<ServiceName, number>(serviceLinks.map((service, index) => [service.name, index]));

/** Removes duplicates and sorts services into the same order as the site navigation. */
export function orderServices(services: Iterable<ServiceName>): ServiceName[] {
  return [...new Set(services)].sort((a, b) => (serviceOrder.get(a) ?? 0) - (serviceOrder.get(b) ?? 0));
}

/** Link to the quote form with the chosen services pre-selected. */
export function buildQuoteHref(services: Iterable<ServiceName>): string {
  const params = new URLSearchParams();
  for (const service of orderServices(services)) {
    params.append(QUOTE_SERVICE_PARAM, serviceSlugByName[service]);
  }

  const [path, hash] = links.quote.split("#");
  const query = params.toString();
  return `${path}${query ? `?${query}` : ""}${hash ? `#${hash}` : ""}`;
}

/**
 * Reads the services named in the URL. Accepts repeated params (`?service=a&service=b`) and
 * comma-separated values (`?service=a,b`); unknown, empty or oversized values are dropped.
 */
export function parseQuoteServices(params: Pick<URLSearchParams, "getAll">): ServiceName[] {
  const found = new Set<ServiceName>();
  const values = params.getAll(QUOTE_SERVICE_PARAM).slice(0, MAX_PARAM_VALUES);

  for (const value of values) {
    if (value.length > MAX_VALUE_LENGTH) {
      continue;
    }
    for (const part of value.split(",", MAX_PARAM_VALUES)) {
      const parsed = slugSchema.safeParse(part.trim().toLowerCase());
      if (parsed.success) {
        found.add(serviceNameBySlug[parsed.data]);
      }
    }
  }

  return orderServices(found);
}

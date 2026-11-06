// Quote builder links: the homepage house (and each service page) links to the quote form with the
// chosen services in the URL, e.g. /support?service=Roofing&service=Siding#quote. The form reads the
// same parameter back (see prefill.ts). This file has no form or zod imports, so the homepage can
// build links without loading the form's code.
import { links, serviceLinks, type ServiceName } from "../links";

export const QUOTE_SERVICE_PARAM = "service";

const serviceNames: ReadonlySet<string> = new Set(serviceLinks.map((s) => s.name));

export function isServiceName(value: string): value is ServiceName {
  return serviceNames.has(value);
}

const serviceOrder: ReadonlyMap<ServiceName, number> = new Map(serviceLinks.map((s, i) => [s.name, i]));

/** Services in the same order as the site navigation, without duplicates. */
export function sortServices(services: Iterable<ServiceName>): ServiceName[] {
  return [...new Set(services)].sort((a, b) => (serviceOrder.get(a) ?? 0) - (serviceOrder.get(b) ?? 0));
}

const [quotePath, quoteHash] = links.quote.split("#");

/** Link to the quote form with the given services pre-selected. No services links to the plain form. */
export function buildQuoteHref(services: readonly ServiceName[]): string {
  const sorted = sortServices(services);
  if (sorted.length === 0) {
    return links.quote;
  }

  const params = new URLSearchParams();
  for (const service of sorted) {
    params.append(QUOTE_SERVICE_PARAM, service);
  }

  const hash = quoteHash ? `#${quoteHash}` : "";
  return `${quotePath}?${params.toString()}${hash}`;
}

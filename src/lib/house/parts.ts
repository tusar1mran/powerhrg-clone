// The six parts of the house drawing, one per service, in the drawing's paint order (see order.ts).
// Built on the server from the homepage services copy and passed to the client explorer as props.
import { services } from "../content";
import { partLocations } from "../house-content";
import type { ServiceName } from "../links";
import { paintOrder } from "./order";

export type HousePart = {
  id: ServiceName;
  /** Two-digit legend number, e.g. "01". */
  number: string;
  name: string;
  location: string;
  /** One-line summary from the homepage services copy. */
  summary: string;
  href: string;
};

export const houseParts: readonly HousePart[] = [...services]
  .sort((a, b) => paintOrder[a.name] - paintOrder[b.name])
  .map((service, index) => ({
    id: service.name,
    number: String(index + 1).padStart(2, "0"),
    name: service.name,
    location: partLocations[service.name],
    summary: service.text,
    href: service.href,
  }));

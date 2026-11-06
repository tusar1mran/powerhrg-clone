// Paint order of the house drawing (back to front). SVG has no z-index, so later parts sit on top
// of earlier ones where their hit areas overlap. The same order is the keyboard order, the legend
// numbering and the order of the quote tray. Kept free of content imports so client code can use it.
import type { ServiceName } from "../links";

export const paintOrder: Record<ServiceName, number> = {
  Roofing: 1,
  Insulation: 2,
  Siding: 3,
  Windows: 4,
  Doors: 5,
  Accessories: 6,
};

/** Sorts services into drawing order without duplicates. */
export function sortByPaintOrder(ids: Iterable<ServiceName>): ServiceName[] {
  return [...new Set(ids)].sort((a, b) => paintOrder[a] - paintOrder[b]);
}

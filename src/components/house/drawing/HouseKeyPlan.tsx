import type { ServiceName } from "@/lib/links";
import { houseParts } from "@/lib/house/parts";
import { cn } from "@/lib/utils";
import { GroundAbove, GroundBelow, HouseCanvas, HousePartGroup, partArt } from "./HouseArt";

type Props = {
  /** The part filled in gold. */
  highlight: ServiceName;
  /** Accessible name. Omit when the thumbnail sits next to text that already says the same thing. */
  label?: string;
  className?: string;
};

/**
 * Small static copy of the house with one part filled in, like the key plan in the corner of a
 * drawing sheet. Fine detail lines are hidden so it stays legible at thumbnail size.
 */
export default function HouseKeyPlan({ highlight, label, className }: Props) {
  return (
    <HouseCanvas
      className={cn("[&_.house-detail]:hidden", className)}
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
    >
      <GroundBelow />
      {houseParts.map((part) => (
        <HousePartGroup key={part.id} tone={part.id === highlight ? "picked-highlight" : "rest"}>
          {partArt[part.id]}
        </HousePartGroup>
      ))}
      <GroundAbove />
    </HouseCanvas>
  );
}

import Link from "next/link";
import { ArrowUp } from "lucide-react";
import { houseClosing } from "@/lib/house-content";
import { houseParts } from "@/lib/house/parts";
import { ClosingPanel } from "../ClosingPanel";
import { GroundAbove, GroundBelow, HouseCanvas, HousePartGroup, partArt } from "../drawing/HouseArt";

/** Last call to action: book the free estimate, call, or go back up and pick parts on the house. */
export default function ClosingCall() {
  return (
    <ClosingPanel
      title={houseClosing.title}
      text={houseClosing.text}
      quote={houseClosing.quote}
      callLabel={houseClosing.callLabel}
      aside={
        // The finished house again, all parts at rest: a quiet sign-off for the page.
        <HouseCanvas aria-hidden className="mx-auto max-w-[520px] [&_.house-detail]:opacity-70">
          <GroundBelow />
          {houseParts.map((part) => (
            <HousePartGroup key={part.id}>{partArt[part.id]}</HousePartGroup>
          ))}
          <GroundAbove />
        </HouseCanvas>
      }
    >
      <Link href={houseClosing.back.href} className="inline-flex w-fit items-center gap-2 py-2 text-charcoal">
        <ArrowUp aria-hidden className="size-4" />
        <span className="link-underline">{houseClosing.back.label}</span>
      </Link>
    </ClosingPanel>
  );
}

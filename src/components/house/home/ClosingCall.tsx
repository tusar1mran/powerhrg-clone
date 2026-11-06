import Link from "next/link";
import { ArrowRight, ArrowUp, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { houseClosing } from "@/lib/house-content";
import { site } from "@/lib/site";
import { GroundAbove, GroundBelow, HouseCanvas, HousePartGroup, partArt } from "../drawing/HouseArt";
import { houseParts } from "@/lib/house/parts";
import { Container } from "../section";

/** Last call to action: book the free estimate, call, or go back up and pick parts on the house. */
export default function ClosingCall() {
  return (
    <section aria-labelledby="closing-title" className="border-t border-charcoal py-16 lg:py-24">
      <Container className="grid items-center gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
        <div className="flex flex-col gap-6">
          <h2 id="closing-title" className="font-display text-[48px] leading-[0.95] tracking-display sm:text-[72px] lg:text-[96px]">
            {houseClosing.title}
          </h2>
          <p className="max-w-[48ch] text-[17px] leading-7 text-charcoal-700">{houseClosing.text}</p>
          <div className="flex flex-wrap items-center gap-3">
            <Button asChild size="touch-lg">
              <Link href={houseClosing.quote.href}>
                {houseClosing.quote.label}
                <ArrowRight data-icon="inline-end" aria-hidden />
              </Link>
            </Button>
            <Button asChild variant="outline" size="touch-lg">
              <a href={site.phone.href}>
                <Phone data-icon="inline-start" aria-hidden strokeWidth={1.75} />
                {houseClosing.callLabel}
              </a>
            </Button>
          </div>
          <Link href={houseClosing.back.href} className="inline-flex w-fit items-center gap-2 py-2 text-charcoal">
            <ArrowUp aria-hidden className="size-4" />
            <span className="link-underline">{houseClosing.back.label}</span>
          </Link>
        </div>

        {/* The finished house again, all parts at rest: a quiet sign-off for the page. */}
        <HouseCanvas aria-hidden className="mx-auto max-w-[520px] opacity-90 [&_.house-detail]:opacity-70">
          <GroundBelow />
          {houseParts.map((part) => (
            <HousePartGroup key={part.id}>{partArt[part.id]}</HousePartGroup>
          ))}
          <GroundAbove />
        </HouseCanvas>
      </Container>
    </section>
  );
}

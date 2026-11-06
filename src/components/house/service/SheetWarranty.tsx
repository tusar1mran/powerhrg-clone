import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useId } from "react";
import type { ServiceSheet } from "@/lib/house-content";
import { Container, Eyebrow } from "../section";

const RING_RADIUS = 72;
// Spread the lettering evenly around the whole ring, whatever its length.
const RING_LENGTH = Math.round(2 * Math.PI * RING_RADIUS) - 4;
// A full circle around the seal centre (100, 100), starting at the left so the text reads over the top.
const RING_PATH = [
  `M${100 - RING_RADIUS} 100`,
  `a${RING_RADIUS} ${RING_RADIUS} 0 1 1 ${RING_RADIUS * 2} 0`,
  `a${RING_RADIUS} ${RING_RADIUS} 0 1 1 -${RING_RADIUS * 2} 0`,
].join("");

/** A round inspector's-style seal with the warranty lettered around the edge. Decorative. */
function WarrantySeal({ text }: { text: string }) {
  const ringId = useId();

  return (
    <svg viewBox="0 0 200 200" aria-hidden className="size-40 shrink-0 -rotate-12 sm:size-48">
      <defs>
        <path id={ringId} d={RING_PATH} />
      </defs>
      <circle cx="100" cy="100" r="94" className="fill-gold-100 stroke-charcoal" strokeWidth={2} />
      <circle cx="100" cy="100" r="58" className="fill-paper stroke-charcoal" strokeWidth={1.5} />
      <text className="fill-charcoal font-mono text-[12px] font-medium uppercase">
        <textPath href={`#${ringId}`} textLength={RING_LENGTH} lengthAdjust="spacing">
          {text}
        </textPath>
      </text>
      <path
        d="M78 101l15 15l30 -32"
        className="fill-none stroke-charcoal"
        strokeWidth={5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** The written workmanship warranty, stamped onto the sheet. */
export function SheetWarranty<K extends string>({ sheet }: { sheet: ServiceSheet<K> }) {
  const { guarantee } = sheet;

  return (
    <section aria-labelledby="sheet-warranty-title" className="py-16 lg:py-24">
      <Container>
        <div className="flex flex-col items-start gap-10 border border-charcoal bg-paper p-6 shadow-[6px_6px_0_0_var(--color-charcoal)] sm:p-10 md:flex-row md:items-center lg:gap-16 lg:p-14">
          <WarrantySeal text={guarantee.seal} />
          <div className="flex flex-col gap-5">
            <Eyebrow>{guarantee.eyebrow}</Eyebrow>
            <h2 id="sheet-warranty-title" className="font-display text-[40px] leading-[1.02] tracking-display sm:text-[56px]">
              {guarantee.title.join(" ")}
            </h2>
            <p className="max-w-[58ch] text-[17px] leading-7 text-charcoal-700">{guarantee.text}</p>
            <Link href={guarantee.href} className="inline-flex w-fit items-center gap-2 py-2 text-charcoal">
              <span className="link-underline">{guarantee.cta}</span>
              <ArrowRight aria-hidden className="size-4" />
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}

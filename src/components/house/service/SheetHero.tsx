import Link from "next/link";
import { ArrowLeft, ArrowRight, Phone } from "lucide-react";
import type { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import type { ServiceSheet } from "@/lib/house-content";
import { site } from "@/lib/site";
import HouseKeyPlan from "../drawing/HouseKeyPlan";
import { Container, Eyebrow } from "../section";

type Props<K extends string> = {
  sheet: ServiceSheet<K>;
  /** The zoomed-in drawing of this part of the house, with numbered layer callouts. */
  figure: ReactNode;
};

/**
 * Top of a service page. The title and actions sit beside a close-up drawing of the part, and a
 * small key plan shows where that part is on the house (and leads back to the full drawing).
 */
export function SheetHero<K extends string>({ sheet, figure }: Props<K>) {
  const [firstLine, ...rest] = sheet.hero.title;

  return (
    <section aria-labelledby="sheet-title" className="border-b border-charcoal/15 drafting-grid">
      <Container className="grid items-center gap-x-14 gap-y-10 pt-8 pb-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:pt-12 lg:pb-16">
        <div className="flex flex-col gap-6">
          <Eyebrow>{sheet.sheetLabel}</Eyebrow>
          <h1 id="sheet-title" className="font-display text-[48px] leading-[0.95] tracking-display sm:text-[64px] xl:text-[80px]">
            <span className="block">{firstLine}</span>
            {rest.map((line) => (
              <span key={line} className="block text-charcoal-700 italic">
                {line}
              </span>
            ))}
          </h1>
          <p className="max-w-[44ch] text-[17px] leading-7 text-charcoal-700 lg:text-[18px]">{sheet.hero.intro}</p>
          <div className="flex flex-wrap items-center gap-3">
            <Button asChild size="touch-lg">
              <Link href={sheet.actions.quote.href}>
                {sheet.actions.quote.label}
                <ArrowRight data-icon="inline-end" aria-hidden />
              </Link>
            </Button>
            <Button asChild variant="outline" size="touch-lg">
              <a href={site.phone.href}>
                <Phone data-icon="inline-start" aria-hidden strokeWidth={1.75} />
                {sheet.actions.callLabel}
              </a>
            </Button>
          </div>

          <Link
            href={sheet.keyPlan.back.href}
            className="group mt-2 flex w-fit items-center gap-4 rounded-md border border-charcoal/20 bg-paper p-2 pr-4 hover:border-charcoal"
          >
            <HouseKeyPlan highlight={sheet.service} className="w-24" />
            <span className="flex flex-col gap-1">
              <span className="annotation text-charcoal-700">{sheet.keyPlan.label}</span>
              <span className="inline-flex items-center gap-2 text-[15px] font-semibold">
                <ArrowLeft aria-hidden className="size-4 transition-transform group-hover:-translate-x-0.5 motion-reduce:transition-none" />
                {sheet.keyPlan.back.label}
              </span>
            </span>
          </Link>
        </div>

        <div className="-mx-4 drawing-in border-y border-charcoal bg-paper sm:mx-0 sm:border-x">
          <div className="px-3 pt-6 pb-2 sm:px-8 sm:pt-8">{figure}</div>
          <p className="annotation border-t border-charcoal/20 px-4 py-2 text-charcoal-700 sm:px-6">{sheet.figureLabel}</p>
        </div>
      </Container>
    </section>
  );
}

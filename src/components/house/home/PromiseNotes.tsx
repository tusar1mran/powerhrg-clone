import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { housePromise } from "@/lib/house-content";
import { Container, SectionHeader } from "../section";

/** The crew promise, set like the numbered general notes on a construction drawing. */
export default function PromiseNotes() {
  return (
    <section aria-labelledby="promise-title" className="py-16 lg:py-24">
      <Container className="grid gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
        <div className="flex flex-col gap-6 lg:sticky lg:top-24 lg:self-start">
          <SectionHeader eyebrow={housePromise.eyebrow} title={housePromise.title} titleId="promise-title">
            <p>{housePromise.text}</p>
          </SectionHeader>
          <Link href={housePromise.cta.href} className="inline-flex w-fit items-center gap-2 py-2 text-charcoal">
            <span className="link-underline">{housePromise.cta.label}</span>
            <ArrowRight aria-hidden className="size-4" />
          </Link>
        </div>

        <ol className="grid border-t border-charcoal sm:grid-cols-2 sm:gap-x-10">
          {housePromise.items.map((item, index) => (
            <li key={item.title} className="flex flex-col gap-2 border-b border-charcoal/20 py-6">
              <span aria-hidden className="annotation text-gold-800">
                Note {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="text-[18px] leading-6 font-semibold">{item.title}</h3>
              <p className="text-[15px] leading-6 text-charcoal-700">{item.text}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}

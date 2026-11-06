import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { houseProcess } from "@/lib/house-content";
import { Container, SectionHeader } from "../section";

/**
 * The four project steps drawn as a dimension string: one ruled line with a tick at every step,
 * running across the page on large screens and down the left edge on phones.
 */
export default function ProcessSteps() {
  return (
    <section aria-labelledby="process-title" className="border-y border-charcoal bg-paper-2 py-16 lg:py-24">
      <Container>
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeader eyebrow={houseProcess.eyebrow} title={houseProcess.title} titleId="process-title" />
          <Link href={houseProcess.cta.href} className="inline-flex w-fit items-center gap-2 py-2 text-charcoal">
            <span className="link-underline">{houseProcess.cta.label}</span>
            <ArrowRight aria-hidden className="size-4" />
          </Link>
        </div>

        <ol className="relative mt-12 grid gap-y-10 border-l border-charcoal pl-8 lg:mt-16 lg:grid-cols-4 lg:gap-x-8 lg:border-t lg:border-l-0 lg:pt-10 lg:pl-0">
          {houseProcess.steps.map((step, index) => (
            <li key={step.title} className="relative flex flex-col gap-3">
              {/* Tick on the dimension line: on the left edge on phones, on the top edge on desktop. */}
              <span
                aria-hidden
                className="absolute top-1 -left-[2.4rem] size-3 rounded-full border border-charcoal bg-gold lg:-top-[2.9rem] lg:left-0"
              />
              <span aria-hidden className="annotation text-gold-800">
                Step {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="font-display text-[30px] leading-[1.05] tracking-display">{step.title}</h3>
              <p className="max-w-[34ch] text-[15px] leading-6 text-charcoal-700">{step.text}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}

import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";
import { processSection } from "@/lib/content";

// "How a project works" in the redesign: four numbered steps on a thin timeline.
export default function ProcessSteps() {
  return (
    <section id="process" aria-labelledby="process-title" className="scroll-mt-24 bg-charcoal-950 px-5 py-24 sm:px-8 lg:px-10 lg:py-36">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-14 lg:gap-20">
        <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
          <h2
            id="process-title"
            className="max-w-[14ch] font-heading text-[44px] leading-[0.95] font-semibold tracking-tightest text-white sm:text-[64px] lg:text-[88px]"
          >
            {processSection.title}
          </h2>
          <Link
            href={processSection.cta.href}
            className="group inline-flex items-center gap-2 text-[15px] font-semibold text-gold hover:text-white focus-visible:text-white focus-visible:outline-none"
          >
            <span className="underline decoration-gold/40 decoration-2 underline-offset-8 group-hover:decoration-white">
              {processSection.cta.label}
            </span>
            <ArrowRightIcon aria-hidden className="size-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <ol className="grid gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
          {processSection.steps.map((step, index) => (
            <li key={step.title} className="flex flex-col gap-6 bg-charcoal-950 p-7 lg:min-h-[22rem] lg:p-9">
              <span aria-hidden className="font-heading text-[56px] leading-none font-semibold tracking-tightest text-gold/90 tabular-nums">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div className="mt-auto flex flex-col gap-3">
                <h3 className="font-heading text-[24px] leading-tight font-semibold text-white lg:text-[28px]">{step.title}</h3>
                <p className="text-[15px] leading-relaxed text-white/70">{step.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

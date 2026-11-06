import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";
import { promise } from "@/lib/content";

// The crew promise in the redesign: a large two-word title beside a grid of commitments.
export default function PromiseGrid() {
  return (
    <section id="promise" aria-labelledby="promise-title" className="scroll-mt-24 bg-charcoal-900 px-5 py-24 sm:px-8 lg:px-10 lg:py-36">
      <div className="mx-auto grid max-w-[1440px] gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <div className="flex flex-col items-start gap-8 lg:sticky lg:top-28 lg:self-start">
          <h2 id="promise-title" className="font-heading leading-[0.9] font-semibold tracking-tightest text-white">
            <span className="block text-[20px] tracking-normal text-gold lg:text-[24px]">{promise.eyebrow}</span>
            {promise.title.map((line) => (
              <span key={line} className="block text-[64px] sm:text-[88px] lg:text-[120px]">
                {line}
              </span>
            ))}
          </h2>
          {promise.paragraphs.map((paragraph) => (
            <p key={paragraph} className="max-w-md text-[17px] leading-relaxed text-white/75">
              {paragraph}
            </p>
          ))}
          <Link
            href={promise.cta.href}
            className="group inline-flex items-center gap-2 text-[15px] font-semibold text-gold hover:text-white focus-visible:text-white focus-visible:outline-none"
          >
            <span className="underline decoration-gold/40 decoration-2 underline-offset-8 group-hover:decoration-white">
              {promise.cta.label}
            </span>
            <ArrowRightIcon aria-hidden className="size-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <ul className="grid gap-4 sm:grid-cols-2">
          {promise.items.map((item) => (
            <li
              key={item.title}
              className="flex flex-col gap-3 rounded-3xl border border-white/10 bg-white/[0.03] p-7 transition-colors hover:border-gold/30 lg:p-8"
            >
              <span aria-hidden className="h-0.5 w-8 rounded-full bg-gold" />
              <h3 className="font-heading text-[22px] leading-tight font-semibold text-white lg:text-[24px]">{item.title}</h3>
              <p className="text-[15px] leading-relaxed text-white/70">{item.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
